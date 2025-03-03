import React, { useState, useEffect } from "react";
import AxiosInstance from "@/utils/AxiosInstance";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAppSelector } from "../redux/hooks";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { AnxietyPrediction } from "../redux/types/AnxietyPrediction.type";

type SortOrder = "newest" | "oldest";

const AnxietyResults = () => {
  const [testResults, setTestResults] = useState<AnxietyPrediction[]>([]);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const fetchTestResults = async () => {
    try {
      const response = await AxiosInstance.get(
        `/anxietyPredictions/user/${userId}`
      );
      setTestResults(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTestResults();
  }, []);

  const sortedEntries = [...testResults].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = (): void => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FA]">
      <Text className="text-3xl font-bold text-gray-700 px-8 mt-10 py-4">
        Anxiety Results
      </Text>

      {/* Sort Button */}
      <View className="flex-row justify-end mt-4 mr-4">
        <TouchableOpacity
          onPress={toggleSortOrder}
          className="flex-row items-center p-2 bg-white rounded-full shadow-sm"
        >
          <MaterialIcons
            name={sortOrder === "newest" ? "arrow-downward" : "arrow-upward"}
            size={20}
            color="#4A00E0"
          />
          <Text className="ml-2 text-[#4A00E0] font-medium">
            {sortOrder === "newest" ? "Newest" : "Oldest"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results List */}
      <ScrollView className="px-5 mt-4">
        {testResults.length === 0 ? (
          <View className="items-center mt-10">
            <Text className="text-lg text-gray-500">No results found.</Text>
          </View>
        ) : (
          sortedEntries.map((result: AnxietyPrediction) => {
            const getSeverityLabel = (score: number) =>
              score <= 5 ? "Mild" : "Severe";

            const getSeverityColor = (score: number) =>
              score <= 5
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700";

            const formattedDate = new Date(
              result.createdAt
            ).toLocaleDateString();

            return (
              <TouchableOpacity
                key={result._id}
                onPress={() =>
                  router.push({
                    pathname: "/users/SingleAnxietyResult",
                    params: { id: result._id },
                  })
                }
                className="bg-white p-5 mb-4 rounded-2xl shadow-lg border border-gray-200"
              >
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg font-semibold text-gray-800">
                    Test Result
                  </Text>
                  <Text
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(
                      result.severityScore
                    )}`}
                  >
                    {getSeverityLabel(result.severityScore)}
                  </Text>
                </View>

                <View className="mt-3 space-y-1">
                  <Text className="text-sm text-gray-600">
                    Date: {formattedDate}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Stress Level: {result.stressLevel}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Sleep Hours: {result.sleepHours} hrs
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Physical Activity: {result.physicalActivity} hrs
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        className="absolute bottom-8 right-8 bg-purple-600 p-4 rounded-full shadow-lg active:bg-purple-800"
        onPress={() => router.push("/users/(drawers)/(tabs)/anxietyTest")}
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AnxietyResults;
