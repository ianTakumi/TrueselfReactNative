import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import AxiosInstance from "@/utils/AxiosInstance";
import * as Progress from "react-native-progress";
import { AnxietyPrediction } from "../redux/types/AnxietyPrediction.type";
import { useAppSelector } from "../redux/hooks";
import { getRecommendations, notifyToast } from "@/utils/helpers";

type TypeData = {
  name: string;
  value: string | number;
  icon: string;
  max?: number;
};

const AnxietyResultScreen = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [anxietyData, setAnxietyData] = useState<AnxietyPrediction | null>(
    null
  );
  const [indicators, setIndicators] = useState<TypeData[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [lifestyleFactors, setLifestyleFactors] = useState<TypeData[]>([]);

  const fetchAnxietyData = async () => {
    await AxiosInstance.get(
      `/anxietyPredictions/lastPrediction/${user.data?._id}`
    )
      .then((res) => {
        setAnxietyData(res.data.data);
        setRecommendations(getRecommendations(res.data.data));
      })
      .catch((error) => {
        notifyToast("Error", "Failed to fetch anxiety data", "error");
      });
  };

  useEffect(() => {
    fetchAnxietyData();
  }, []);

  useEffect(() => {
    if (anxietyData && lifestyleFactors.length === 0) {
      setLifestyleFactors([
        {
          name: "Smoking",
          value: anxietyData.smokingHabits == 1 ? "Yes" : "No",
          icon: "smoking",
        },
        {
          name: "Physical Activity",
          value: Number(anxietyData?.physicalActivity) || 0,
          max: 150,
          icon: "running",
        },
        {
          name: "Caffeine Intake",
          value: Number(anxietyData.caffeineIntake) || 0,
          max: 400,
          icon: "coffee",
        },

        {
          name: "Alcohol Consumption",
          value: anxietyData.alcoholConsumption,
          max: 10,
          icon: "wine-glass",
        },

        {
          name: "Sleep Duration",
          value: anxietyData?.sleepHours,
          max: 8,
          icon: "bed",
        },
        {
          name: "Diet Quality",
          value: anxietyData?.dietQuality,
          max: 10,
          icon: "utensils",
        },
      ]);
    }
  });

  const otherFactors = [
    { name: "Occupation", value: anxietyData?.occupation, icon: "user-tie" },
    {
      name: "Recent major life event",
      value: anxietyData?.recentMajorLifeEvent ? "Yes" : "No",
      icon: "calendar-check",
    },
  ];

  useEffect(() => {
    if (anxietyData && indicators.length === 0) {
      setIndicators([
        {
          name: "Family History",
          value: anxietyData.familyHistory === 1 ? "Yes" : "No",
          icon: "dna",
        },
        {
          name: "Dizziness",
          value: anxietyData.dizziness === 1 ? "Yes" : "No",
          icon: "exclamation-triangle",
        },
        {
          name: "Medication",
          value: anxietyData.medication === 1 ? "Yes" : "No",
          icon: "capsules",
        },
        {
          name: "Therapy Sessions",
          value: anxietyData.theraphySession ?? 0,
          icon: "user-md",
        },
        {
          name: "Sweating Level",
          value: Number(anxietyData.sweatingLevel) ?? 0,
          icon: "tint",
          max: 5,
        },
        {
          name: "Stress Level",
          value: Number(anxietyData.stressLevel) ?? 0,
          icon: "exclamation-triangle",
          max: 10,
        },
        {
          name: "Heart Rate",
          value: Number(anxietyData.heartRate) ?? 0,
          icon: "heartbeat",
          max: 100,
        },
        {
          name: "Breathing Rate",
          value: anxietyData.breathingRate ?? 0,
          icon: "lungs",
          max: 20,
        },
      ]);
    }
  }, [anxietyData]);

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Curved Header */}
      <View className="relative h-56">
        <LinearGradient
          colors={["#E0C3FC", "#8E44AD"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="h-full w-full justify-center "
          style={{
            height: "100%",
            width: "100%",
            borderBottomRightRadius: 9999,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }}
        >
          <Text className="absolute top-28 left-6 text-white text-2xl font-bold self-start">
            Anxiety Prediction Result
          </Text>
        </LinearGradient>
      </View>

      {/* Severity Score */}
      <View className="bg-white mx-6 mt-6 p-6 rounded-2xl shadow-lg items-center">
        <Text className="text-gray-700 text-lg font-semibold">
          Severity Score
        </Text>

        {/* Circular Progress with Centered Icon */}
        <View className="relative mt-4">
          <Progress.Circle
            size={100} // Adjust size
            progress={(anxietyData?.severityScore ?? 0) / 10}
            thickness={8} // Border thickness
            color="#FFA500" // Progress color
            unfilledColor="#E5E7EB" // Background color
            borderWidth={0} // No border
          />
          {/* Centered Icon */}
          <View className="absolute inset-0 flex items-center justify-center">
            <FontAwesome5 name="smile" size={40} color="#FFA500" />
          </View>
        </View>

        {/* Score Text */}
        <Text className="text-4xl font-bold text-yellow-500 mt-2">
          {Math.round(anxietyData?.severityScore ?? 0)}/10
        </Text>
        <Text className="text-gray-500">Mild Anxiety</Text>
      </View>

      {/* Lifestyle Factors */}
      <View className="bg-white mx-6 mt-4 p-6 rounded-2xl shadow-lg">
        <Text className="text-gray-700 text-lg font-semibold mb-2">
          Lifestyle Factors
        </Text>

        {lifestyleFactors.map((factor, index) => (
          <View key={index} className="mb-5">
            <View className="flex-row items-center">
              <FontAwesome5 name={factor.icon} size={16} color="#4B5563" />
              <Text className="text-gray-600 ml-2">
                {factor.name}:{" "}
                <Text
                  className={`font-bold ${
                    factor.name === "Smoking"
                      ? factor.value === "No"
                        ? "text-green-500"
                        : "text-red-500"
                      : factor.name === "Diet Quality"
                      ? typeof factor.value === "number"
                        ? factor.value >= 8
                          ? "text-green-500"
                          : factor.value >= 5
                          ? "text-yellow-500"
                          : "text-red-500"
                        : ""
                      : ""
                  }`}
                >
                  {factor.value}
                </Text>
              </Text>
            </View>

            {/* Progress Bar for Numeric Values */}
            {typeof factor.value === "number" && (
              <Progress.Bar
                progress={factor.max ? factor.value / factor.max : 0}
                width={200}
                height={8}
                color={
                  factor.name === "Physical Activity"
                    ? factor.value >= 150
                      ? "green"
                      : factor.value >= 75
                      ? "#FFA500"
                      : "red"
                    : factor.name === "Sleep Duration"
                    ? factor.value >= 7 && factor.value <= 8
                      ? "green"
                      : factor.value >= 5 && factor.value < 7
                      ? "#FFA500"
                      : "red"
                    : factor.name === "Diet Quality"
                    ? factor.value >= 8
                      ? "green"
                      : factor.value >= 5
                      ? "#FFA500"
                      : "red"
                    : factor.name === "Caffeine Intake"
                    ? factor.value <= 400
                      ? "green"
                      : factor.value <= 1200
                      ? "#FFA500"
                      : "red"
                    : factor.name === "Alcohol Consumption"
                    ? factor.value <= 2
                      ? "green"
                      : factor.value <= 7
                      ? "#FFA500"
                      : "red"
                    : undefined
                }
                unfilledColor="#E5E7EB"
                borderWidth={0}
                style={{ marginTop: 4 }}
              />
            )}
          </View>
        ))}
      </View>

      {/* Health Indicators */}
      <View className="bg-white mx-6 mt-4 mb-10 p-6 rounded-2xl shadow-lg">
        <Text className="text-gray-700 text-lg font-semibold mb-2">
          Health Indicators
        </Text>

        {indicators.map((indicator, index) => (
          <View key={index} className="mb-3">
            <View className="flex-row items-center">
              <FontAwesome5 name={indicator.icon} size={18} color="#4B5563" />
              <Text className="text-gray-600 ml-2">
                {indicator.name}:{" "}
                <Text
                  className={`font-bold ${
                    indicator.value === "No" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {indicator.value}
                </Text>
              </Text>
            </View>

            {/* Progress Bar for Therapy Sessions */}
            {indicator.name === "Sweating Level" && (
              <Progress.Bar
                progress={
                  typeof indicator.value === "number"
                    ? indicator.value / (indicator.max || 1)
                    : 0
                }
                width={200}
                height={8}
                color={
                  typeof indicator.value === "number" && indicator.value > 5
                    ? "green"
                    : "red"
                }
                unfilledColor="#E5E7EB"
                borderWidth={0}
                style={{ marginTop: 4 }}
              />
            )}

            {/* Progress Bar for Stress Level */}
            {indicator.name === "Stress Level" && (
              <Progress.Bar
                progress={
                  typeof indicator.value === "number"
                    ? indicator.value / (indicator.max || 1)
                    : 0
                }
                width={200}
                height={8}
                color={
                  typeof indicator.value === "number" && indicator.value < 5
                    ? "green"
                    : "red"
                }
                unfilledColor="#E5E7EB"
                borderWidth={0}
                style={{ marginTop: 4 }}
              />
            )}

            {/* Progress Bar for Heart Rate */}
            {indicator.name === "Heart Rate" && (
              <Progress.Bar
                progress={
                  typeof indicator.value === "number"
                    ? indicator.value / (indicator.max || 1)
                    : 0
                }
                width={200}
                height={8}
                color={
                  typeof indicator.value === "number"
                    ? indicator.value >= 60 && indicator.value <= 100
                      ? "green"
                      : "red"
                    : "red"
                }
                unfilledColor="#E5E7EB"
                borderWidth={0}
                style={{ marginTop: 4 }}
              />
            )}

            {/* Progress Bar for Breathing Rate */}
            {indicator.name === "Breathing Rate" && (
              <Progress.Bar
                progress={
                  typeof indicator.value === "number"
                    ? indicator.value / (indicator.max || 1)
                    : 0
                }
                width={200}
                height={8}
                color={
                  typeof indicator.value === "number"
                    ? indicator.value >= 12 && indicator.value <= 20
                      ? "green" // Normal breathing rate
                      : "red" // Abnormal (Bradypnea < 12, Tachypnea > 20)
                    : "red"
                }
                unfilledColor="#E5E7EB"
                borderWidth={0}
                style={{ marginTop: 4 }}
              />
            )}
          </View>
        ))}
      </View>

      {/* Other factors */}
      <View className="bg-white mx-6 mt-4 mb-10 p-6 rounded-2xl shadow-lg">
        <Text className="text-gray-700 text-lg font-semibold mb-2">
          Other factors
        </Text>
        {otherFactors.map((factor, index) => (
          <View key={factor.name} className="mb-3">
            <View className="flex-row items-center">
              <FontAwesome5 name={factor.icon} size={18} color="#4B5563" />
              <Text className="text-gray-600 ml-2">
                {factor.name}:{" "}
                <Text
                  className={`font-bold ${
                    typeof factor?.value === "string" &&
                    factor.value.toLowerCase() === "no"
                      ? "text-green-500"
                      : typeof factor?.value === "string" &&
                        factor.value.toLowerCase() === "yes"
                      ? "text-blue-500"
                      : "text-black"
                  }`}
                >
                  {factor?.value ?? "N/A"}
                </Text>
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Recommendations */}
      <View className="bg-white mx-6 mt-4 mb-10 p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <Text className="text-xl font-bold text-center mb-2">
          Recommendations
        </Text>
        <Text className="text-gray-600 text-center mb-4">
          Here are some recommendations based on your results.
        </Text>
        {recommendations.length > 0 ? (
          recommendations.map((rec: any, index: any) => (
            <View key={index} className="flex-row items-start mb-2">
              <FontAwesome5
                name="check-circle"
                size={16}
                color="green"
                className="mt-1"
              />
              <Text className="text-gray-700 ml-2 flex-1">{rec}</Text>
            </View>
          ))
        ) : (
          <Text className="text-gray-500 text-center italic">
            No recommendations available.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default AnxietyResultScreen;
