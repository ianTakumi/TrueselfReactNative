import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "@/app/redux/hooks";
import { notifyToast } from "@/utils/helpers";

const screenWidth = Dimensions.get("window").width;

// Define types for mood data
interface MoodData {
  mood: string;
  percentage: number;
}

export default function MoodPieChart() {
  const [data, setData] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.data?._id;

  const moodColors: Record<string, string> = {
    Happy: "#FFD700", // Gold
    Sad: "#1E90FF", // DodgerBlue
    Angry: "#FF4500", // OrangeRed
    Anxious: "#8A2BE2", // BlueViolet
    Neutral: "#A9A9A9", // DarkGray
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await AxiosInstance.get<{ moodPercentages: MoodData[] }>(
        `/moodEntries/moodPercentages/${userId}`
      );
      if (res.status === 200) {
        setData(res.data.moodPercentages);
      }
    } catch (err) {
      console.error(err);
      notifyToast("Error", "Unable to fetch mood data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <View className="w-24 h-24 flex justify-center items-center">
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text className="text-gray-500 mt-2">Loading...</Text>
        </View>
      </View>
    );
  }

  const chartData = data.map((item) => ({
    name: item.mood,
    population: Math.round(item.percentage),
    color: moodColors[item.mood] || "#808080",
    legendFontColor: "#000",
    legendFontSize: 14,
  }));

  return (
    <View className="p-4 bg-white  rounded-xl shadow-md mb-4">
      <Text className="text-lg font-bold text-gray-900 mb-2">
        Mood Distribution
      </Text>
      <PieChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute={false}
      />
    </View>
  );
}
