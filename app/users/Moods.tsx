import React, { useState, useEffect } from "react";
import AxiosInstance from "@/utils/AxiosInstance";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useAppSelector } from "../redux/hooks";
import { MoodEntry } from "../redux/types/MoodEntry.type";
import { ImageSourcePropType } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

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

type SortOrder = "newest" | "oldest";

const Moods = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [refreshing, setRefreshing] = useState(false);

  const fetchMoodEntries = async () => {
    try {
      setRefreshing(true);
      const response = await AxiosInstance.get(`/moodEntries/${userId}`);
      if (response.status === 200) {
        setMoodEntries(response.data.moodEntries);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMoodEntries();
  }, []);

  const sortedEntries = [...moodEntries].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = (): void => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] p-8">
      <Text className="text-2xl text-black font-bold mt-10">Mood Entries</Text>

      <View className="flex-row-reverse items-center ">
        <TouchableOpacity
          onPress={toggleSortOrder}
          className="p-2 rounded-full bg-gray-100 active:bg-gray-300"
        >
          <MaterialIcons
            name={sortOrder === "newest" ? "arrow-downward" : "arrow-upward"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <Text className="text-xs text-gray-500">
          {sortOrder === "newest" ? "Newest First" : "Oldest First"}
        </Text>
      </View>

      <ScrollView className="mt-5">
        {moodEntries.length === 0 ? (
          <Text className="text-center text-gray-500 mt-5">
            No mood entries found.
          </Text>
        ) : (
          <ScrollView className="mt-5">
            {sortedEntries.length === 0 ? (
              <Text className="text-center text-gray-500 mt-5">
                No journal entries found.
              </Text>
            ) : (
              sortedEntries.map((entry: MoodEntry) => (
                <TouchableOpacity
                  key={entry?._id}
                  onPress={() =>
                    router.push({
                      pathname: "/users/SingleMood",
                      params: { id: entry._id },
                    })
                  }
                >
                  <LinearGradient
                    colors={moodGradients[entry.mood]}
                    className="flex-row items-center justify-between p-4 mb-4 rounded-lg shadow-md border border-gray-200"
                  >
                    {/* Mood Text and Note */}
                    <View className="flex-1 pr-4">
                      <Text className="text-lg font-semibold text-black">
                        {entry.mood}
                      </Text>
                      <Text
                        className="text-sm text-gray-600 mt-2"
                        numberOfLines={2}
                      >
                        {entry.note?.length > 100
                          ? `${entry.note.substring(0, 100)}...`
                          : entry.note}
                      </Text>
                      <Text className="text-gray-400 text-xs mt-1">
                        Created at:{" "}
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </Text>
                    </View>

                    {/* Mood Image */}
                    <Image
                      source={moodImages[entry.mood]}
                      className="w-16 h-16 rounded-full"
                    />
                  </LinearGradient>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        )}
      </ScrollView>
      <TouchableOpacity className="absolute bottom-8 right-8 bg-purple-600 p-4 rounded-full shadow-lg active:bg-purple-800">
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Moods;
