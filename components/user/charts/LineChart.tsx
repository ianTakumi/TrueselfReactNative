import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "@/app/redux/hooks";
import { notifyToast } from "@/utils/helpers";

const screenWidth = Dimensions.get("window").width;

// Define mood colors
const moodColors: Record<string, string> = {
  Happy: "#FFD700", // Gold
  Sad: "#1E90FF", // DodgerBlue
  Angry: "#FF4500", // OrangeRed
  Anxious: "#8A2BE2", // BlueViolet
  Neutral: "#A9A9A9", // DarkGray
};

const MoodChart = () => {
  const [moodData, setMoodData] = useState([]);
  const [chartData, setChartData] = useState<any>(null);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.data?._id;
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await AxiosInstance.get(`/moodEntries/moodPerMonth/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setMoodData(res.data.moodsPerMonth);
          formatChartData(res.data.moodsPerMonth);
        }
      })
      .catch((err) => {
        console.log(err);
        notifyToast("Error", "Unable to fetch mood data", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formatChartData = (data: any) => {
    const monthsMap = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Extract unique mood types
    const moodTypes = new Set();
    data.forEach((entry: any) => {
      entry.moods.forEach((mood: any) => moodTypes.add(mood.mood));
    });

    // Initialize datasets
    const datasets = Array.from(moodTypes).map((mood) => ({
      label: mood,
      data: Array(12).fill(0),
      color: (opacity = 1) =>
        `${moodColors[mood as string]}${Math.floor(opacity * 255).toString(
          16
        )}`, // Assign mood color
    }));

    // Populate mood data into datasets
    data.forEach((entry: any) => {
      const monthIndex = entry._id.month - 1; // Convert to 0-based index
      entry.moods.forEach((mood: any) => {
        const moodDataset = datasets.find(
          (dataset) => dataset.label === mood.mood
        );
        if (moodDataset) {
          moodDataset.data[monthIndex] = mood.count;
        }
      });
    });

    // Filter out months with no data (i.e., all moods are 0)
    const validMonths: number[] = [];
    for (let i = 0; i < 12; i++) {
      const hasData = datasets.some((dataset) => dataset.data[i] > 0);
      if (hasData) {
        validMonths.push(i);
      }
    }

    // Filter datasets and labels based on valid months
    const filteredLabels = validMonths.map((index) => monthsMap[index]);
    const filteredDatasets = datasets.map((dataset) => ({
      ...dataset,
      data: validMonths.map((index) => dataset.data[index]),
    }));

    setChartData({
      labels: filteredLabels,
      datasets: filteredDatasets,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <View className="w-24 h-24 flex justify-center items-center">
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text className="text-gray-500 mt-2">Loading..</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="p-4">
      <Text className="text-lg font-bold text-gray-900 mb-2">
        Monthly Mood Trends
      </Text>
      {chartData && chartData.labels.length > 0 ? (
        <LineChart
          data={chartData}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#f0f0f0", // Adjust to your preferred color
            backgroundGradientTo: "#f0f0f0", // Match the same color
            backgroundColor: "#f0f0f0", // Ensure consistency

            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#4682B4",
            },

            propsForBackgroundLines: {
              stroke: "#f0f0f0", // Match the same color to blend in
            },
          }}
          bezier
        />
      ) : (
        <Text className="text-gray-500 text-center mt-4">
          No mood data available.
        </Text>
      )}
    </View>
  );
};

export default MoodChart;
