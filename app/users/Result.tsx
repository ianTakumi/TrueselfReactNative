import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "@/app/redux/hooks";
import { notifyToast } from "@/utils/helpers";

const Result = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.data?._id;
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchResult = async () => {
    try {
      const response = await AxiosInstance.get(
        `/anxietyPredictions/lastPrediction/${userId}`
      );

      if (response.status === 200) {
        setResult(response.data.data);
      }
    } catch (error) {
      console.error(error);
      notifyToast("Error", "Failed to fetch result", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

  // Dynamically style metrics based on severity
  const getMetricStyle = (value: any, thresholds: any) => {
    if (value >= thresholds.high) return "bg-red-200 text-red-700 font-bold";
    if (value >= thresholds.medium)
      return "bg-yellow-200 text-yellow-700 font-bold";
    return "bg-green-200 text-green-700 font-bold";
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4 ">
        {/* Header */}
        <View className="bg-purple-700 p-4 rounded-xl shadow-md mb-6 mt-10 flex items-center justify-center">
          <Text className="text-center text-3xl font-extrabold text-white tracking-wide pb-4">
            Anxiety Prediction Result
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" className="mt-10" />
        ) : result ? (
          <>
            <View className="bg-white p-5 rounded-2xl shadow-md space-y-4">
              <View className="flex-row justify-between bg-gray-100 p-3 rounded-lg">
                <Text className="text-lg font-semibold">Severity Score:</Text>
                <Text
                  className={`text-lg ${
                    Math.round(result.severityScore) > 5
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {Math.round(result.severityScore)}
                </Text>
              </View>

              {/* Key Metrics with Icons */}
              <View className="space-y-3">
                <View
                  className={`flex-row items-center p-3 mt-5 mb-3 rounded-lg ${getMetricStyle(
                    result.heartRate,
                    { medium: 80, high: 100 }
                  )}`}
                >
                  <FontAwesome5 name="heartbeat" size={20} className="mr-2" />
                  <Text className="font-semibold">Heart Rate: </Text>
                  <Text>{result.heartRate} bpm</Text>
                </View>

                <View
                  className={`flex-row items-center p-3 mb-3 rounded-lg ${getMetricStyle(
                    result.stressLevel,
                    { medium: 4, high: 7 }
                  )}`}
                >
                  <MaterialIcons name="psychology" size={20} className="mr-2" />
                  <Text className="font-semibold">Stress Level: </Text>
                  <Text>{result.stressLevel}/10</Text>
                </View>

                <View
                  className={`flex-row items-center p-3 mb-3 rounded-lg ${getMetricStyle(
                    result.breathingRate,
                    { medium: 16, high: 20 }
                  )}`}
                >
                  <FontAwesome5 name="lungs" size={20} className="mr-2" />
                  <Text className="font-semibold">Breathing Rate: </Text>
                  <Text>{result.breathingRate} breaths/min</Text>
                </View>

                <View
                  className={`flex-row items-center p-3 rounded-lg ${getMetricStyle(
                    result.sleepHours,
                    { medium: 5, high: 7 }
                  )}`}
                >
                  <FontAwesome5 name="bed" size={20} className="mr-2" />
                  <Text className="font-semibold">Sleep Hours: </Text>
                  <Text>{result.sleepHours} hrs</Text>
                </View>
              </View>
            </View>
            <View className="h-[1px] bg-gray-300 my-12" />
            <View className="bg-white p-5 rounded-2xl shadow-md  space-y-4">
              <View>
                <Text className="text-xl font-bold mb-2">
                  Lifestyle Factors
                </Text>
                <Text className="text-lg">
                  <Text className="font-semibold">Physical Activity:</Text>{" "}
                  {result.physicalActivity}
                </Text>
                <Text className="text-lg">
                  <Text className="font-semibold">Caffeine Intake:</Text>{" "}
                  {result.caffeineIntake}
                </Text>
                <Text className="text-lg">
                  <Text className="font-semibold">Alcohol Consumption:</Text>{" "}
                  {result.alcoholConsumption}
                </Text>
                <Text className="text-lg">
                  <Text className="font-semibold">Smoking:</Text>{" "}
                  {result.smoking ? "Yes" : "No"}
                </Text>
              </View>
            </View>
            <View className="h-[1px] bg-gray-300 my-12" />
            <View className="bg-white p-5 rounded-2xl shadow-md  space-y-4">
              <View>
                <Text className="text-xl font-bold mb-2">
                  Health Indicators
                </Text>
                <Text className="text-lg">
                  <Text className="font-semibold">Family History:</Text>{" "}
                  {result.familyHistory ? "Yes" : "No"}
                </Text>
                <Text className="text-lg">
                  <Text className="font-semibold">Dizziness:</Text>{" "}
                  {result.dizziness ? "Yes" : "No"}
                </Text>

                <Text className="text-lg">
                  <Text className="font-semibold">Medication:</Text>{" "}
                  {result.medication ? "Yes" : "No"}
                </Text>
                <Text className="text-lg">
                  <Text className="font-semibold">Therapy Sessions:</Text>{" "}
                  {result.therapySessions}
                </Text>
                <Text className="text-lg">
                  <Text className="font-semibold">
                    Recent Major Life Event:
                  </Text>{" "}
                  {result.recentMajorLifeEvent ? "Yes" : "No"}
                </Text>
              </View>
            </View>

            <View className="h-[1px] bg-gray-300 my-12" />

            <View className="bg-white p-5 rounded-2xl shadow-md  space-y-4">
              <View className="mb-20">
                <Text className="text-xl font-bold mb-2">
                  Additional Information
                </Text>
                <Text className="text-lg">
                  <Text className="font-semibold">Diet Quality:</Text>{" "}
                  {result.dietQuality}
                </Text>
                <Text className="text-lg">
                  <Text className="font-semibold">Occupation:</Text>{" "}
                  {result.occupation}
                </Text>
                <Text className="text-lg">
                  <Text className="font-semibold">Created At:</Text>{" "}
                  {new Date(result.createdAt).toLocaleString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // 24-hour format
                  })}
                </Text>
              </View>
            </View>
            <View className="h-[1px] bg-gray-300 my-12" />
          </>
        ) : (
          <Text className="text-center text-lg text-red-500 mt-6">
            No result found.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Result;
