import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "@/app/redux/hooks";
const diary = () => {
  const [entries, setEntries] = useState([]);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;

  const fetchEntries = async () => {
    await AxiosInstance.get(`/journalEntries/${userId}`)
      .then((res) => {
        setEntries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <SafeAreaView className="bg-[#FAFAFA] flex-1 itesm-center">
      <Text className="text-2xl font-bold my-5">My Diary</Text>
    </SafeAreaView>
  );
};

export default diary;
