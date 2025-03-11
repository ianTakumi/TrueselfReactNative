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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

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
  const router = useRouter();

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

  const generatePDF = async () => {
    console.log(anxietyData);
    try {
      const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
    
            p {
              font-size: 18px;
            }
          </style>
        </head>
        <body>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            "
          >
            <img src="https://res.cloudinary.com/dco6n59if/image/upload/v1741577926/xx1humsio00muwfinicr.png" 
                 alt="Anxiety Assessment Logo" 
                 style="text-align: center" 
                 height="250" 
                 width="700" />
            <h1 style="text-align: center">Anxiety Assessment Report</h1>
          </div>
          
      <div style="padding-left: 20px; padding-right: 20px;">
        <p><strong>Name:</strong> Lianne Deldacan</p>
        <p><strong>Date of Assessment:</strong> ${new Date().toLocaleDateString()}</p>
        <h3>I. Overview</h3>
        <p>
          This report summarizes the findings of your recent anxiety assessment. It includes a
          severity score, potential contributing factors, and tailored recommendations to help you
          manage and reduce anxiety.
        </p>
      </div>

        
     <div style="padding-left: 20px; padding-right: 20px;">
  <h3>II. Key Results</h3>

  <div style="display: flex; gap: 10px; margin-bottom: 8px;">
    <p><strong>Overall Anxiety Severity Score:</strong></p>
    <p>
      <strong>${Math.round(anxietyData?.severityScore ?? 0)}/10</strong> 
      <span>(${
        (anxietyData?.severityScore ?? 0) > 5
          ? "Severe Anxiety"
          : "Mild Anxiety"
      })</span>
    </p>
  </div>

      <div style="display: flex; gap: 10px; margin-bottom: 8px;">
        <p><strong>Heart Rate:</strong></p>
        <p>
          <strong>${anxietyData?.heartRate} bpm</strong> 
          <span>(Normal: 60–100 bpm)</span>
        </p>
      </div>

      <div style="display: flex; gap: 10px; margin-bottom: 8px;">
        <p><strong>Breathing Rate:</strong></p>
        <p>
          <strong>${anxietyData?.breathingRate} breaths/min</strong> 
          <span>(Normal: 12–20 breaths/min)</span>
        </p>
      </div>
    </div>


            
  
     <div style="page-break-before: always; padding-left: 20px; padding-right: 20px; margin-top: 25px;">
  <h3>III. Lifestyle Factors</h3>
  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
    <thead>
      <tr style="background-color: #1e73be; color: white; text-align: left;">
        <th style="padding: 10px; border: 1px solid #ccc;">Factor</th>
        <th style="padding: 10px; border: 1px solid #ccc;">Description</th>
        <th style="padding: 10px; border: 1px solid #ccc;">Recommended Range</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 10px; border: 1px solid #ccc;">Caffeine Intake</td>
        <td style="padding: 10px; border: 1px solid #ccc;">${
          anxietyData?.caffeineIntake
        } mg</td>
        <td style="padding: 10px; border: 1px solid #ccc;">Up to 400 milligrams (mg) of caffeine a day appears to be safe for most healthy
adults. Keep in mind that the actual caffeine content in beverages varies widely,
especially among energy drinks.</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ccc;">Alcohol Consumption</td>
        <td style="padding: 10px; border: 1px solid #ccc;">${
          anxietyData?.alcoholConsumption
        } drinks/week</td>
        <td style="padding: 10px; border: 1px solid #ccc;">For those who consume alcohol, moderation is defined as up to two drinks per day
for men and one drink per day for women, as recommended by health guidelines</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ccc;">Sleep Duration</td>
        <td style="padding: 10px; border: 1px solid #ccc;">${
          anxietyData?.sleepHours
        } hours</td>
        <td style="padding: 10px; border: 1px solid #ccc;">Adequate sleep (7–9 hours per night) is essential for regulating mood and reducing
stress, both of which play a crucial role in managing anxiety. Chronic sleep
deprivation can heighten anxiety symptoms by increasing cortisol levels and
impairing emotional resilience.</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ccc;">Physical Activity</td>
        <td style="padding: 10px; border: 1px solid #ccc;">${
          anxietyData?.physicalActivity
        } minutes/week</td>
        <td style="padding: 10px; border: 1px solid #ccc;">Engage in at least 150 min moderate or 75 min vigorous activity per week.</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ccc;">Smoking</td>
        <td style="padding: 10px; border: 1px solid #ccc;">${
          anxietyData?.smokingHabits ? "Yes" : "No"
        }</td>
        <td style="padding: 10px; border: 1px solid #ccc;">Quitting smoking improves mental well-being and reduces anxiety.</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ccc;">Diet Quality</td>
        <td style="padding: 10px; border: 1px solid #ccc;">${
          anxietyData?.dietQuality
        }/10</td>
        <td style="padding: 10px; border: 1px solid #ccc;">A balanced diet helps regulate mood and reduces anxiety risk.</td>
      </tr>
    </tbody>
  </table>
</div>

 
      <div style="padding-left: 20px; padding-right: 20px; margin-top: 25px;">
        <h2>IV. Health Indicators</h2>
        <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
          <thead>
              <tr style="background-color: #1e73be; color: white; text-align: left;">
                <th style="padding: 10px; border: 1px solid #ccc;">Health Indicator</th>
                <th style="padding: 10px; border: 1px solid #ccc;">Value</th>
                <th style="padding: 10px; border: 1px solid #ccc;">Recommended Range</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td>Heart Rate</td>
              <td>${anxietyData?.heartRate} bpm</td>
              <td>
                  A normal resting heart rate for adults ranges from 60 to 100 beats per minute (bpm),
                with lower rates often indicating better cardiovascular fitness. During anxiety or stress,
                the heart rate can temporarily rise to 100–160 bpm due to the body's fight-or-flight
                response. Consistently elevated heart rates may be linked to chronic anxiety and
                stress-related health issues
              </td>
            </tr>
            <tr>
              <td>
                Breathing Rate
              </td>
              <td>
                ${anxietyData?.breathingRate} breaths/min
              </td>
              <td>
                The normal respiratory rate for adults is 12–20 breaths per minute (bpm) at rest.
                Breathing rates can increase during anxiety or panic attacks, leading to
                hyperventilation, dizziness, and chest tightness. Slow, deep breathing techniques can
                help regulate breathing patterns, reduce anxiety symptoms, and promote relaxation.
              </td>
            </tr>
            <tr>
              <td>
                Stress Level
              </td>
              <td>
                ${anxietyData?.stressLevel}/10
              </td>
              <td>
                Stress levels can vary based on individual experiences, coping mechanisms, and
                environmental factors. Chronic stress and high stress levels can contribute to anxiety
                disorders, depression, and other health conditions. Effective stress management
                techniques include mindfulness, relaxation exercises, physical activity, and social
                support.
              </td>
            </tr>
            <tr>
              <td>
                Sweating Level
              </td>
              <td>
                ${anxietyData?.sweatingLevel}/5
              </td>
              <td>
                Excessive sweating can be triggered by anxiety, stress, hormonal imbalances, or
                medical conditions. While sweating is a normal bodily response to regulate
                temperature, profuse sweating unrelated to physical exertion may indicate an
                underlying health issue or anxiety disorder.
              </td>
            </tr>
            <tr>
              <td>
                Dizziness
              </td>
              <td>
                ${anxietyData?.dizziness ? "Yes" : "No"}
              </td>
              <td>
                Dizziness can result from various factors, including anxiety, dehydration, low blood
                sugar, inner ear problems, or medication side effects. Persistent or recurrent dizziness
                should be evaluated by a healthcare professional to determine the underlying cause
                and appropriate treatment.
              </td>
            </tr>
            <tr>
              <td>
                Family History
              </td>
              <td>
                ${anxietyData?.familyHistory ? "Yes" : "No"}
              </td>
              <td>
                A family history of anxiety or mental health disorders can increase an individual's risk of
                developing similar conditions due to genetic and environmental factors. Understanding
                family medical history can help identify potential risk factors and guide preventive
                measures and treatment options.
              </td>
            </tr>
            <tr>
              <td>
                Medication
              </td>
              <td>
                ${anxietyData?.medication ? "Yes" : "No"}
              </td>
              <td>
                Medication can be prescribed to manage anxiety symptoms, particularly in cases of
                severe or persistent anxiety disorders. It is essential to follow your healthcare provider's
                recommendations regarding medication use, dosage, and potential side effects.
              </td>
            </tr>
            <tr>
              <td>
                Therapy Sessions  
              </td>
              <td>
                ${anxietyData?.therapySessions} sessions
              </td>
              <td>
                Therapy sessions, such as cognitive-behavioral therapy (CBT), mindfulness-based
                stress reduction (MBSR), or exposure therapy, can help individuals develop coping
                strategies, improve emotional regulation, and address underlying issues contributing to
                anxiety. Regular therapy sessions provide a supportive environment for exploring
                thoughts, emotions, and behavioral patterns.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        
     
<div style="padding-left: 20px; padding-right: 20px; margin-top: 25px;">
<h2>V. Other Factors</h2>
        <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #2078C7; color: white;">
              <th>Factor</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Occupation</td>
              <td>${anxietyData?.occupation}</td>
              <td>Occupational stress can contribute to anxiety symptoms. It is essential to establish a healthy work-life balance, set boundaries, and practice stress management techniques to reduce work-related stress and prevent burnout.</td>
            </tr>
            <tr>
              <td>Recent Major Life Event</td>
              <td>${anxietyData?.recentMajorLifeEvent ? "Yes" : "No"}</td>
              <td>Major life events, such as job loss, divorce, relocation, or bereavement, can trigger or exacerbate anxiety symptoms. Seeking social support, professional counseling, or therapy can help individuals cope with the emotional impact of significant life changes.</td>
            </tr>
          </tbody>
        </table>

        <h2 style="margin-top:20px;">VI. Detailed Recommendations</h2>
        <ul className="list-disc pl-5 mt-2">
         ${recommendations
           .map((rec) => `<li style="margin-bottom: 8px;">${rec}</li>`)
           .join("")}
        </ul>

       <p><strong style="font-size: 14px;">Disclaimer:</strong><br>
        <span style="font-size: 12px;">
        This report is based on research findings; however, consulting a qualified healthcare professional is strongly recommended for accurate diagnosis and personalized medical advice. This information is for general awareness and should not replace professional medical consultation.
        </span>
        </p>

</div>

       

        </body>
      </html>
    `;

      // Create PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log("PDF saved to:", uri);

      // Save file locally
      const fileUri = `${FileSystem.documentDirectory}Hospital_Recommendation.pdf`;
      await FileSystem.moveAsync({ from: uri, to: fileUri });

      // Share the PDF
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error(error);
    }
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
          value: anxietyData.therapySessions ?? 0,
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

      {/* Downloaded result pdf */}
      <TouchableOpacity
        onPressIn={() => generatePDF()}
        className="border border-red-500 flex-row items-center justify-center gap-x-2 py-3 px-6 mx-6 mt-4 mb-10"
        onPress={() => {
          // Download PDF
        }}
      >
        <MaterialCommunityIcons name="file-outline" size={24} color="#DC2626" />
        <Text className="font-bold text-lg text-red-500">Download Result</Text>
      </TouchableOpacity>

      {/* View Hospitals */}
      <TouchableOpacity
        className="border border-blue-500 flex-row items-center justify-center gap-x-2 py-3 px-6 mx-6 mb-10"
        onPress={() => {
          router.push("/users/Recommend");
        }}
      >
        <MaterialCommunityIcons
          name="hospital-building"
          size={24}
          color="#2563EB"
        />
        <Text className="font-bold text-lg text-blue-500">
          View Recommended Hospital
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AnxietyResultScreen;
