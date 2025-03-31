import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../utils/AxiosInstance";
import { useAppSelector } from "@/app/redux/hooks";
import { ActivityIndicator, View, Text, Dimensions } from "react-native";

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

  return (
    <View>
      <Text>H</Text>
    </View>
  );
}
