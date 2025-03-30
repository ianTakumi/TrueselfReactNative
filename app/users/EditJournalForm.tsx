import React, { useState, useEffect } from "react";
import AxiosInstance from "@/utils/AxiosInstance";
import { useLocalSearchParams, useRouter } from "expo-router";
import { JournalEntry } from "../redux/types/JournalEntry.type";
import { notifyToast } from "@/utils/helpers";
import { useAppSelector } from "../redux/hooks";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditJournalForm() {
  // const [journal, setJournal] = useState<JournalEntry | null>(null);
  const { id, title, content } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;
  console.log(id, title, content);
  // const fetchJournal = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await AxiosInstance.get(
  //       `/journalEntries/single/${userId}/${id}`
  //     );
  //     if (response.status === 200) {
  //       setJournal(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     notifyToast("Error fetching journal entry", "error", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchJournal();
  // }, [id]);

  const onSubmit = async (data: JournalEntry) => {};

  return (
    <SafeAreaView className="flex-1  bg-[#FAFAFA] px-5 py-10 mt-10 ">
      <TouchableOpacity
        className="absolute top-10 left-5 bg-slate-400 rounded-full p-2 shadow-lg"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
      <Text>Edit Journal Entry</Text>
    </SafeAreaView>
  );
}
