import React, { useState, useEffect } from "react";
import AxiosInstance from "@/utils/AxiosInstance";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useAppSelector } from "../redux/hooks";
import { JournalEntry } from "../redux/types/JournalEntry.type";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type SortOrder = "newest" | "oldest";

const Journals: React.FC = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;
  const { width } = useWindowDimensions();
  const router = useRouter();

  const fetchJournalEntries = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await AxiosInstance.get<{ data: JournalEntry[] }>(
        `/journalEntries/${userId}`
      );
      setJournalEntries(response.data.data);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const truncateContent = (htmlContent: string, limit: number): string => {
    const textContent = htmlContent.replace(/<[^>]+>/g, "");
    return textContent.length > limit
      ? `${textContent.substring(0, limit)}...`
      : textContent;
  };

  const sortedEntries = [...journalEntries].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = (): void => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] p-8">
      <Text className="text-2xl text-black font-bold mt-10">
        Journal Entries
      </Text>

      {/* Add Button & Sort Icon with Label */}
      <View className="flex-row-reverse items-center justify-between mt-2 mb-5">
        {/* Sort Icon & Label */}
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            onPress={toggleSortOrder}
            className="p-2 rounded-full bg-gray-100 active:bg-gray-300"
          >
            <MaterialIcons
              name={sortOrder === "newest" ? "arrow-downward" : "arrow-upward"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <Text className="text-xs text-gray-500">
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </Text>
        </View>
      </View>

      {/* Loading State */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text className="text-gray-500 mt-2">Loading journal entries...</Text>
        </View>
      ) : (
        // Scrollable List of Journal Entries
        <ScrollView className="mt-5">
          {sortedEntries.length === 0 ? (
            <Text className="text-center text-gray-500 mt-5">
              No journal entries found.
            </Text>
          ) : (
            sortedEntries.map((entry) => (
              <TouchableOpacity
                key={entry._id}
                onPress={() =>
                  router.push({
                    pathname: "/users/SingleJournal",
                    params: { id: entry._id },
                  })
                }
                className="bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-200"
              >
                <Text className="text-lg font-semibold text-black">
                  {entry.title}
                </Text>
                <RenderHTML
                  contentWidth={width}
                  source={{ html: truncateContent(entry.content, 100) }}
                  baseStyle={{ color: "#4B5563", marginTop: 8 }}
                />
                <Text className="text-gray-400 text-xs mt-2">
                  Created at: {new Date(entry.createdAt).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
      <TouchableOpacity
        className="absolute bottom-12 right-6 bg-purple-600 p-4 rounded-full shadow-lg active:bg-purple-800"
        onPress={() => router.push("/users/JournalForm")}
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Journals;
