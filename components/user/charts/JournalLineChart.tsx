import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "@/app/redux/hooks";
import { notifyToast } from "@/utils/helpers";

const screenWidth = Dimensions.get("window").width;

export default function JournalLineChart() {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.data?._id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await AxiosInstance.get(`/journalEntries/perMonth/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch((err) => {
        notifyToast("Error", "Unable to fetch journal data", "error");
      })
      .finally(() => {
        setLoading(false);
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
          <Text className="text-gray-500 mt-2">Loading...</Text>
        </View>
      </View>
    );
  }

  return <div>JournalLineChart</div>;
}
