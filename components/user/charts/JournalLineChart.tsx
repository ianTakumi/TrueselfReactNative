import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "@/app/redux/hooks";
import { notifyToast } from "@/utils/helpers";

const screenWidth = Dimensions.get("window").width;

export default function JournalLineChart() {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.data?._id;
  interface JournalEntry {
    month: string;
    count: number;
  }

  const [data, setData] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await AxiosInstance.get(`/journalEntries/perMonth/${userId}`);
      if (res.status === 200) {
        setData(res.data.data);
        console.log("Journal data:", res.data.data);
      }
    } catch (err) {
      notifyToast("Error", "Unable to fetch journal data", "error");
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

  const chartData = {
    labels: data.map((entry) => entry.month),
    datasets: [
      {
        data: data.map((entry) =>
          typeof entry.count === "number" ? entry.count : 0
        ), // Ensure valid numbers
        strokeWidth: 2,
      },
    ],
  };

  console.log("Chart Data:", chartData);
  console.log("Chart Data Values:", chartData.datasets[0].data);

  return (
    <View className="flex justify-center items-center bg-white rounded-xl shadow-md p-4">
      <Text className="text-lg font-semibold mb-4">
        Journal Entries per Month
      </Text>

      {!loading && data.length !== 0 && (
        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 8,
            },
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#6C63FF",
            },
          }}
          bezier
          style={{
            borderRadius: 8,
          }}
        />
      )}
    </View>
  );
}
