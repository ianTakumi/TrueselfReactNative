import { View, Text, TouchableOpacity, Image } from "react-native";
import { useMusic } from "@/app/contexts/MusicContext";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
        <Text className="text-xl">
          {isPlaying ? (
            <FontAwesome5 name="pause-circle" size={24} color="#CA99FF" />
          ) : (
            <FontAwesome name="play-circle" size={24} color="#CA99FF" />
          )}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={stopMusic} className="ml-3">
        <FontAwesome5 name="stop-circle" size={24} color="#CA99FF" />
      </TouchableOpacity>
    </View>
  );
}
