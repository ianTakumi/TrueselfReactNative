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
      <Text className="text-center text-gray-600 mb-4">
        Find calm and confidence with these affirmations!
      </Text>

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
            className="bg-white overflow-hidden rounded-2xl shadow-lg p-4 w-36 mr-5"
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

            <View className="mt-4">
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  Linking.openURL(affirmation.url);
                }}
                className="py-2 rounded-full items-center shadow-lg active:opacity-80"
                style={{
                  backgroundColor: "#7B61FF",
                  borderWidth: 2,
                  borderColor: "#5A42D1",
                  shadowColor: "#5A42D1",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                }}
              >
                <Text className="text-white font-bold uppercase tracking-wider">
                  Watch Video
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Affirmations;
