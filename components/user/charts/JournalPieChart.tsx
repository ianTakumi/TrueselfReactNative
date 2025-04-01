import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../utils/AxiosInstance";
import { useAppSelector } from "@/app/redux/hooks";
import { ActivityIndicator, View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function JournalPieChart() {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.data?._id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await AxiosInstance.get(`/journalEntries/perMonthPie/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.error(err.response.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = data.map((item: any, index) => ({
    name: item.month,
    population: parseFloat(item.percentage),
    color: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"][index % 5],
    legendFontColor: "#7F7F7F",
    legendFontSize: 14,
  }));

  return (
    <View className="flex justify-center items-center mt-6 bg-white rounded-xl shadow-md p-4">
      {loading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : (
        <>
          <Text className="text-lg font-semibold mb-4">
            Journal Entries Per Month
          </Text>
          <PieChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute={false}
          />
        </>
      )}
    </View>
  );
}
