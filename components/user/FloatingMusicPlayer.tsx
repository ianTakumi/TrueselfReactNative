import { View, Text, TouchableOpacity, Image } from "react-native";
import { useMusic } from "@/app/contexts/MusicContext";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export default function MusicPlayer() {
  const { togglePlayPause, stopMusic } = useMusic();
  const { currentSong, isPlaying } = useSelector(
    (state: RootState) => state.musicPlayer
  );

  if (!currentSong) return null;

  return (
    <View className="absolute bottom-0 left-0 right-0 w-full bg-white p-3 flex-row items-center shadow-lg Z-50">
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
