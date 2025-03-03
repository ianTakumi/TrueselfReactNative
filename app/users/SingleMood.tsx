import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { notifyToast } from "@/utils/helpers";
import AxiosInstance from "@/utils/AxiosInstance";
import { MoodEntry } from "../redux/types/MoodEntry.type";
import { useAppSelector } from "../redux/hooks";
import { ImageSourcePropType } from "react-native";
import dayjs from "dayjs";
import { useRouter } from "expo-router";

const moodGradients: Record<string, [string, string]> = {
  Happy: ["#FFE29F", "#FFA99F"],
  Sad: ["#89F7FE", "#66A6FF"],
  Angry: ["#FF5858", "#FBAB7E"],
  Anxious: ["#D3CCE3", "#E9E4F0"],
  Neutral: ["#E0EAFc", "#CFDEF3"],
};

const moodImages: Record<string, ImageSourcePropType> = {
  Happy: require("@/assets/images/moods/smiley.png"),
  Sad: require("@/assets/images/moods/sad.png"),
  Angry: require("@/assets/images/moods/angry.png"),
  Anxious: require("@/assets/images/moods/anxious.png"),
  Neutral: require("@/assets/images/moods/neutral.png"),
};

const SingleMood = () => {
  const { id } = useLocalSearchParams();
  const [mood, setMood] = useState<MoodEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;
  const router = useRouter();

  const fetchMood = async () => {
    try {
      const response = await AxiosInstance.get(`/moodEntries/${id}/${userId}`);
      if (response.status === 200) {
        setMood(response.data.moodEntry);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMood = async () => {
    try {
      const response = await AxiosInstance.delete(
        `/moodEntries/${userId}/${id}`
      );

      if (response.status === 200) {
        notifyToast("Mood deleted!", "success", "success");
        router.push("/users/Moods");
      } else {
        notifyToast("Failed to delete mood.", "error", "error");
      }
    } catch (error) {
      console.log(error);
      notifyToast("Failed to delete mood.", "error", "error");
    }
  };

  useEffect(() => {
    fetchMood();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#FFA99F" />
        <Text className="text-lg mt-4">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!mood) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-lg">Mood not found.</Text>
      </SafeAreaView>
    );
  }

  const gradientColors = moodGradients[mood.mood] || ["#FFFFFF", "#FFFFFF"];
  const moodIcon = moodImages[mood.mood];
  const formattedDate = dayjs(mood.createdAt).format("MMMM D, YYYY");

  return (
    <SafeAreaView
      style={{ backgroundColor: gradientColors[0] }}
      className="flex-1 p-5"
    >
      {/* Back Icon */}
      <TouchableOpacity
        className="absolute top-10 left-5 bg-slate-400 rounded-full p-2 shadow-lg"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <View className="items-center mt-10">
        <View
          style={{
            backgroundColor: gradientColors[1],
          }}
          className="w-32 h-32 rounded-full justify-center items-center shadow-lg"
        >
          <Image source={moodIcon} className="w-20 h-20" resizeMode="contain" />
        </View>

        <Text className="text-3xl font-bold text-black mt-5">{mood.mood}</Text>
        <Text className="text-gray-500 mt-2">{formattedDate}</Text>

        <View className="mt-8 w-full bg-white p-5 rounded-2xl shadow-lg">
          <Text className="text-lg font-semibold text-black">Your Note</Text>
          <Text className="text-gray-700 mt-3">
            {mood.note || "No notes added."}
          </Text>
        </View>
      </View>

      <View className="mt-auto space-y-3">
        {/* Delete Button with Back Icon beside it */}
        <View className="flex-row space-x-3">
          <TouchableOpacity
            className="flex-1 p-3 rounded-xl border-2 border-purple-500 bg-purple-50 shadow-md active:bg-purple-200"
            onPress={() =>
              router.push({
                pathname: "/users/MoodForm",
                params: {
                  id: mood._id,
                  mood: mood.mood,
                  note: mood.note,
                  createdAt: mood.createdAt,
                },
              })
            }
          >
            <Text className="text-black text-center font-bold">Edit</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row space-x-3">
          <TouchableOpacity
            className="flex-1 mt-3 p-3 rounded-xl border-2 border-red-500 bg-red-50 shadow-md active:bg-red-200"
            onPress={() => deleteMood()}
          >
            <Text className="text-black text-center font-bold">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingleMood;
