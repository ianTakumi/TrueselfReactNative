import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { notifyToast } from "@/utils/helpers";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "../redux/hooks";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { JournalEntry } from "../redux/types/JournalEntry.type";
import { WebView } from "react-native-webview";
import RenderHTML from "react-native-render-html";

const SingleJournal = () => {
  const { id } = useLocalSearchParams();
  const [journal, setJournal] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;
  const router = useRouter();
  const { width } = useWindowDimensions();

  const fetchJournal = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(
        `/journalEntries/single/${userId}/${id}`
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

  useEffect(() => {
    fetchJournal();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#FFA99F" />
        <Text className="text-lg mt-4">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!journal) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-lg">Journal entry not found.</Text>
      </SafeAreaView>
    );
  }

  const handleDelete = async () => {
    console.log(journal._id);

    await AxiosInstance.delete(`/journalEntries/${journal._id}`)
      .then((res) => {
        if (res.status === 200) {
          notifyToast("Success", "Journal entry deleted", "success");
          router.push("/users/Journals");
        }
      })
      .catch((err) => {
        console.log(err);
        notifyToast("Error", "An error occurred", "error");
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView>
        <View className="mt-5">
          {/* Back Icon */}
          <TouchableOpacity
            className="absolute top-9 left-5 bg-slate-400 rounded-full p-2 shadow-lg"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>

          {/* Journal Entry */}
          <View className="p-5">
            <Text className="text-2xl font-bold text-center">
              {journal.title}
            </Text>
            <Text className="text-gray-500 text-center mt-1">
              {dayjs(journal.createdAt).format("MMM DD, YYYY")}
            </Text>

            <View className="mt-5">
              <RenderHTML
                contentWidth={width - 40}
                source={{ html: journal.content }}
              />
            </View>
          </View>
        </View>

        <View className="mt-5 space-y-3 mx-5">
          {/* Edit Button */}
          <TouchableOpacity
            className="border-2 border-purple-500 py-3 rounded-lg mb-5"
            onPress={() =>
              router.push({
                pathname: "/users/JournalForm",
                params: {
                  id: journal._id,
                  title: journal.title,
                  content: journal.content,
                },
              })
            }
          >
            <Text className="text-purple-500 text-center font-semibold">
              Edit
            </Text>
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity
            className="border-2 border-red-500 py-3 rounded-lg"
            onPress={() => handleDelete()}
          >
            <Text className="text-red-500 text-center font-semibold">
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleJournal;
