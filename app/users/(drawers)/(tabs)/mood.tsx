import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "@/app/redux/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import LineChart from "@/components/user/charts/LineChart";
import MoodPieChart from "@/components/user/charts/MoodPieChart";

type SortOrder = "newest" | "oldest";
type MoodType = "Anxious" | "Happy" | "Sad" | "Angry" | "Neutral";

interface MoodEntry {
  _id: string;
  userId: string;
  mood: MoodType;
  note: string;
  createdAt: string;
  updatedAt: string;
}

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

const Mood: React.FC = () => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.data?._id;
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [visibleCount, setVisibleCount] = useState(4);
  const router = useRouter();

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

  const sortedEntries = [...moods].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = (): void => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView>
        <View className="p-4 items-center">
          <Text className="text-xl font-bold text-gray-900">Mood Tracker</Text>
          <Text className="text-sm text-gray-600 mt-1 text-center">
            Keep track of your daily emotions and reflect on your well-being.
          </Text>
        </View>

        <View className="flex-row-reverse items-center px-5">
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
          <Text className="text-xs text-gray-500 mr-2">
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </Text>
        </View>

        <View className="mt-5 px-5">
          {moods.length === 0 ? (
            <Text className="text-center text-gray-500 mt-5">
              No mood entries found.
            </Text>
          ) : (
            sortedEntries.slice(0, visibleCount).map((entry: MoodEntry) => (
              <TouchableOpacity
                key={entry._id}
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

          {/* View More Button (Gradually adds 4 entries) */}
          {moods.length > visibleCount && (
            <TouchableOpacity
              onPress={() => setVisibleCount((prev) => prev + 4)}
              className="mt-3 bg-purple-600 p-3 rounded-xl items-center"
            >
              <Text className="text-white font-semibold">View More</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Analytics Section */}
        <View className="mt-10 px-5">
          <Text className="font-bold text-xl">Analytics</Text>
          <View className="mb-20">
            <Text className="text-gray-500 text-sm mt-2">
              View your mood trends and patterns over time.
            </Text>
            <LineChart />
          </View>

          <MoodPieChart />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 right-3 bg-purple-600 p-4 rounded-full shadow-lg active:bg-purple-800"
        onPress={() => router.push("/users/MoodForm")}
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Mood;
