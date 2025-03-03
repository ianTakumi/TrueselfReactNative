import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { notifyToast } from "@/utils/helpers";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "../redux/hooks";
import { ImageSourcePropType } from "react-native";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { JournalEntry } from "../redux/types/JournalEntry.type";

const SingleJournal = () => {
  const { id } = useLocalSearchParams();
  const [journal, setJournal] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;
  const router = useRouter();

  const fetchJournal = async () => {
    try {
      const response = await AxiosInstance.get(
        `/journalEntries/${userId}/${id}`
      );

      if (response.status === 200) {
        setJournal(response.data.data);
      }
    } catch (error) {
      console.log(error);
      notifyToast("Error fetching journal entry", "error", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteJournal = async () => {
    try {
      const response = await AxiosInstance.delete(`/journalEntries/${id}`);

      if (response.status === 200) {
        notifyToast("Mood deleted!", "success", "success");
        router.push("/users/Journals");
      }
    } catch (error) {
      console.log(error);
      notifyToast("Error deleting journal entry", "error", "error");
    }
  };

  // if (loading) {
  //   return (
  //     <SafeAreaView className="flex-1 justify-center items-center bg-white">
  //       <ActivityIndicator size="large" color="#FFA99F" />
  //       <Text className="text-lg mt-4">Loading...</Text>
  //     </SafeAreaView>
  //   );
  // }

  // if (!journal) {
  //   return (
  //     <SafeAreaView className="flex-1 justify-center items-center">
  //       <Text className="text-lg">Journal entry not found.</Text>
  //     </SafeAreaView>
  //   );
  // }

  useEffect(() => {
    fetchJournal();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] ">
      {/* Back Icon */}
      <TouchableOpacity
        className="absolute top-10 left-5 bg-slate-400 rounded-full p-2 shadow-lg"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SingleJournal;
