import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { MotiView } from "moti";
import { useAppSelector } from "@/app/redux/hooks";
import { Quote } from "@/app/redux/types/Quote.type";
import { MaterialIcons } from "@expo/vector-icons";
import { JournalEntry } from "@/app/redux/types/JournalEntry.type";
import AxiosInstance from "@/utils/AxiosInstance";
import RenderHTML from "react-native-render-html";
import { useRouter } from "expo-router";
import JournalPieChart from "@/components/user/charts/JournalPieChart";
import { WebView } from "react-native-webview";

type SortOrder = "newest" | "oldest";

const Diary = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const { width } = useWindowDimensions();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(3);

  const fetchJournalEntries = async (): Promise<void> => {
    try {
      const response = await AxiosInstance.get<{ data: JournalEntry[] }>(
        `/journalEntries/${userId}`
      );
      setJournalEntries(response.data.data);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
  };

  const loadMoreEntries = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get("http://api.quotable.io/random");
      setQuote(response.data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const sortedEntries = [...journalEntries].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const visibleEntries = sortedEntries.slice(0, visibleCount);

  const toggleSortOrder = (): void => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  const truncateContent = (htmlContent: string, limit: number): string => {
    const textContent = htmlContent.replace(/<[^>]+>/g, "");
    return textContent.length > limit
      ? `${textContent.substring(0, limit)}...`
      : textContent;
  };

  return (
    <SafeAreaView className="bg-[#FAFAFA] flex-1 px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title & Intro Text */}
        <View className="flex justify-center items-center p-4">
          <Text className="text-4xl font-bold text-gray-900">My Diary</Text>
          <Text className="text-center text-lg text-gray-700 mt-3">
            Your story matters. Express yourself freely and embrace your true
            self in a safe space.
          </Text>
        </View>

        <MotiView
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "timing",
            duration: 700,
            loop: true,
            repeatReverse: true,
          }}
          className="rounded-2xl shadow-md w-full mt-6"
        >
          <LinearGradient
            colors={["#E3FDFD", "#FFE6FA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-2xl p-6"
          >
            {loading ? (
              // Skeleton Placeholder for Text
              <View className="flex justify-center items-center">
                <MotiView className="h-6 w-3/4 bg-gray-300 rounded-md my-2" />
                <MotiView className="h-6 w-1/2 bg-gray-300 rounded-md my-2" />
              </View>
            ) : (
              quote && (
                <View>
                  <Text className="text-xl font-semibold text-gray-800 italic text-center">
                    "{quote.content}"
                  </Text>
                  <Text className="text-right text-gray-600 mt-3 font-medium">
                    — {quote.author}
                  </Text>
                </View>
              )
            )}
          </LinearGradient>
        </MotiView>

        {/* Journal list */}
        <View className="flex-row-reverse items-center justify-between mt-5 mb-5">
          {/* Sort Icon & Label */}
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={toggleSortOrder}
              className="p-2 rounded-full bg-gray-100 active:bg-gray-300"
            >
              <MaterialIcons
                name={
                  sortOrder === "newest" ? "arrow-downward" : "arrow-upward"
                }
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Text className="text-xs text-gray-500">
              {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            </Text>
          </View>
        </View>

        <View className="mt-1">
          {visibleEntries.length === 0 ? (
            <Text className="text-center text-gray-500 mt-5">
              No journal entries found.
            </Text>
          ) : (
            visibleEntries.map((entry) => (
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

                {/* WebView for Rendering HTML Content (Truncated) */}
                <View style={{ height: 150, overflow: "hidden" }}>
                  <RenderHTML
                    contentWidth={width ? width - 40 : 300} // Default width kung undefined
                    source={{ html: entry.content || "" }} // Empty string kung walang content
                  />
                </View>

                <Text className="text-gray-400 text-xs mt-2">
                  Created at: {new Date(entry.createdAt).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* View More Button */}
        {visibleCount < sortedEntries.length && (
          <TouchableOpacity
            onPress={loadMoreEntries}
            className="my-3 bg-purple-600 p-3 rounded-xl items-center"
          >
            <Text className="text-white font-semibold">View More</Text>
          </TouchableOpacity>
        )}

        {/* Pie Chart */}
        <View className="my-5">
          <JournalPieChart />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-20 right-5 bg-purple-600 p-4 rounded-full shadow-lg active:bg-purple-800"
        onPress={() => router.push("/users/JournalForm")}
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Diary;
