import { View, Text, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Audio } from "expo-av";
import { setIsPlaying, stopSong } from "@/app/redux/slices/SongSlice";
import { RootState } from "@/app/redux/store";
import { useState, useEffect } from "react";

export default function FloatingMusicPlayer() {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector(
    (state: RootState) => state.musicPlayer
  );
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAndPlay = async (src: any) => {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(src);
      setSound(newSound);
      await newSound.playAsync();
      dispatch(setIsPlaying(true));
    };

    if (currentSong && isMounted) {
      loadAndPlay(currentSong.src);
    }

    return () => {
      isMounted = false;
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentSong]);

  const togglePlayPause = async () => {
    if (sound) {
      console.log("Merong sound");
      if (isPlaying) {
        console.log("napuase");
        await sound.pauseAsync();
        dispatch(setIsPlaying(false));
      } else {
        console.log("nagplay");
        await sound.playAsync();
        dispatch(setIsPlaying(true));
      }
    }
  };

  const stopMusic = async () => {
    if (sound) {
      await sound.stopAsync();
      dispatch(stopSong());
      dispatch(setIsPlaying(false)); // Ensure the state resets
    }
  };

  if (!currentSong) return null;

  return (
    <View className="absolute bottom-20 left-5 mx-5 mt-10 right-5 bg-white rounded-2xl p-3 flex-row items-center shadow-lg">
      <Image source={currentSong.pic} className="w-12 h-12 rounded-xl" />
      <View className="flex-1 mx-3">
        <Text className="font-semibold">{currentSong.title}</Text>
      </View>
      <TouchableOpacity onPress={togglePlayPause}>
        <Text className="text-xl">{isPlaying ? "⏸️" : "▶️"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={stopMusic} className="ml-3">
        <Text className="text-xl">⏹️</Text>
      </TouchableOpacity>
    </View>
  );
}
