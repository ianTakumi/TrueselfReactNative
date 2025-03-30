import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useMusic } from "@/app/contexts/MusicContext";
import { songs } from "@/utils/helpers";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Playlist() {
  const { playSound } = useMusic();

  return (
    <ScrollView horizontal className="my-5 px-4">
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
                <FontAwesome name="play-circle" size={24} color="#CA99FF" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
