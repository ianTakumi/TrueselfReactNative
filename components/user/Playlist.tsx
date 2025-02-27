import { ScrollView, Text, Image, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";
import { useState } from "react";
import { songs } from "@/utils/helpers";
import { setSong, setIsPlaying } from "@/app/redux/slices/SongSlice";
import { RootState } from "@/app/redux/store";

export default function Playlist() {
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state: RootState) => state.musicPlayer);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSound = async (song: any) => {
    if (currentSong?.title === song.title) {
      return;
    }

    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }

    const { sound: newSound } = await Audio.Sound.createAsync(song.src);
    setSound(newSound);
    dispatch(setSong(song)); // Update Redux state with the current song
    dispatch(setIsPlaying(true)); // Set playing status to true
    await newSound.playAsync();

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        dispatch(setIsPlaying(false));
      }
    });
  };

  return (
    <ScrollView horizontal className="my-5">
      {songs.map((song, index) => (
        <TouchableOpacity
          key={index}
          className="mr-4"
          onPress={() => playSound(song)}
        >
          <View className="w-40 rounded-2xl overflow-hidden shadow-lg">
            <Image source={song.pic} className="w-full h-32" />
            <View className="p-2 bg-gray-200 flex-row justify-between items-center rounded-b-2xl">
              <View>
                <Text className="font-semibold text-sm text-gray-800">
                  {song.title}
                </Text>
              </View>
              <TouchableOpacity onPress={() => playSound(song)}>
                <Text className="text-gray-600 text-lg">▶️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
