import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { affirmations } from "@/utils/helpers";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SingleAffirmation = () => {
  const { id } = useLocalSearchParams(); // Get the id from route params
  const router = useRouter(); // Use router for navigation
  const affirmation = affirmations.find((item) => item.id === Number(id)); // Find matching affirmation

  if (!affirmation) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-semibold">Affirmation not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-5 left-4 p-2 rounded-full bg-gray-200"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text className="text-xl font-bold text-center mb-4 mt-12">
        {affirmation.title}
      </Text>

      {affirmation.image && (
        <Image
          source={affirmation.image}
          className="w-full h-56 rounded-md"
          resizeMode="cover"
        />
      )}

      <Text className="text-base text-gray-700 mt-3">
        {affirmation.description}
      </Text>

      <TouchableOpacity
        onPress={() => Linking.openURL(affirmation.url)}
        className="mt-4 bg-blue-500 py-2 rounded-md items-center"
      >
        <Text className="text-white font-bold">Watch Video</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SingleAffirmation;
