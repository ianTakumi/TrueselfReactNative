import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "@/app/redux/hooks";
import { LinearGradient } from "expo-linear-gradient";

type MoodType = "Anxious" | "Happy" | "Sad" | "Angry" | "Neutral";

interface MoodEntry {
  _id: string;
  userId: string;
  mood: MoodType;
  note: string;
  createdAt: string;
  updatedAt: string;
}

const moodImages: Record<MoodType, any> = {
  Anxious: require("@/assets/images/moods/anxious.png"),
  Happy: require("../../../../assets/images/moods/smiley.png"),
  Sad: require("../../../../assets/images/moods/sad.png"),
  Angry: require("../../../../assets/images/moods/angry.png"),
  Neutral: require("../../../../assets/images/moods/neutral.png"),
};

const Mood: React.FC = () => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.data?._id;

  const fetchMoods = async () => {
    try {
      const res = await AxiosInstance.get(`/moodEntries/${userId}`);
      setMoods(res.data.moodEntries);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  return (
    <LinearGradient
      colors={["#C8A2C8", "#B0E0E6"]} // Lilac to Powder Blue gradient
      className="flex-1"
    >
      <SafeAreaView className="flex-1 items-center p-6">
        <Text
          style={{ fontFamily: "Raleway-Bold" }}
          className="text-white text-3xl font-bold mb-6"
        >
          Mood Tracker
        </Text>

        <FlatList
          data={moods}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7} className="w-full">
              <View className="flex-row items-center bg-white p-4 m-2 rounded-2xl shadow-lg w-full">
                <Image
                  source={moodImages[item.mood]}
                  className="w-16 h-16 mr-4"
                  resizeMode="contain"
                />
                <Text className="text-lg font-semibold text-gray-700">
                  {item.mood.charAt(0).toUpperCase() + item.mood.slice(1)}
                </Text>
                {/* <Text className="text-base font-normal text-black">
                  {item.note}
                </Text> */}
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Mood;
