import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { affirmations } from "@/utils/helpers";

const Affirmations = () => {
  const router = useRouter();

  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold text-center mb-4">Affirmations</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row space-x-4"
      >
        {affirmations.map((affirmation) => (
          <TouchableOpacity
            key={affirmation.id}
            onPress={() =>
              router.push({
                pathname: "/users/SingleAffirmation",
                params: { id: affirmation.id },
              })
            }
            activeOpacity={0.7}
            className="bg-white overflow-hidden rounded-2xl shadow-lg p-4 w-36"
          >
            {affirmation.image && (
              <Image
                source={affirmation.image}
                className="w-full h-40 rounded-md"
                resizeMode="cover"
              />
            )}
            <Text className="text-lg font-semibold mt-2">
              {affirmation.title}
            </Text>

            {/* Watch Video Button */}
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation(); // Prevent card click from triggering navigation
                Linking.openURL(affirmation.url);
              }}
              className="mt-3 bg-blue-500 py-2 rounded-md items-center"
            >
              <Text className="text-white font-bold">Watch Video</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Affirmations;
