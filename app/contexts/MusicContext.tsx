import { createContext, useContext, useRef } from "react";
import { Audio } from "expo-av";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSong, setIsPlaying, stopSong } from "../redux/slices/SongSlice";
import { RootState } from "../redux/store";
import { ReactNode } from "react";

interface MusicProviderProps {
  children: ReactNode;
}

interface MusicContextType {
  playSound: (song: any) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  stopMusic: () => Promise<void>;
}

// Provide a default value (empty functions to prevent errors)
const MusicContext = createContext<MusicContextType>({
  playSound: async () => {},
  togglePlayPause: async () => {},
  stopMusic: async () => {},
});

export function MusicProvider({ children }: MusicProviderProps) {
  const dispatch = useAppDispatch();
  const { currentSong, isPlaying } = useAppSelector(
    (state: RootState) => state.musicPlayer
  );
  const soundRef = useRef<Audio.Sound | null>(null);

  const playSound = async (song: any) => {
    if (currentSong?.title === song.title) return;

    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    const { sound } = await Audio.Sound.createAsync(song.src);
    soundRef.current = sound;
    dispatch(setSong(song));
    dispatch(setIsPlaying(true));

    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if ("didJustFinish" in status && status.didJustFinish) {
        dispatch(setIsPlaying(false));
      }
    });
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) return;

    const status = await soundRef.current.getStatusAsync();
    if (status.isLoaded) {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        dispatch(setIsPlaying(false));
      } else {
        await soundRef.current.playAsync();
        dispatch(setIsPlaying(true));
      }
    }
  };

  const stopMusic = async () => {
    if (!soundRef.current) return;

    try {
      const status = await soundRef.current.getStatusAsync();

      if (status.isLoaded) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      soundRef.current = null;
      dispatch(stopSong());
      dispatch(setIsPlaying(false));
    } catch (error) {
      console.error("Error stopping music:", error);
    }
  };

  return (
    <MusicContext.Provider value={{ playSound, togglePlayPause, stopMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
