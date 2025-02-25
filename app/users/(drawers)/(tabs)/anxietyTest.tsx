import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Option {
  value: string | number;
  label: string;
}

interface Question {
  key: string;
  label: string;
  type: "select" | "number";
  options?: Option[];
}

const jobOptions: Option[] = [
  { value: "student", label: "Student" },
  { value: "engineer", label: "Engineer" },
  { value: "teacher", label: "Teacher" },
  { value: "unemployed", label: "Unemployed" },
  { value: "other", label: "Other" },
];

const yesNoOptions: Option[] = [
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
];

const scale1to5Options: Option[] = Array.from({ length: 5 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString(),
}));

const scale1to10Options: Option[] = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString(),
}));

const questions: Question[] = [
  {
    key: "jobRole",
    label: "1. What's your occupation?",
    type: "select",
    options: jobOptions,
  },
  {
    key: "sleepDuration",
    label: "2. How many hours do you sleep per day?",
    type: "number",
  },
  {
    key: "exerciseMinutes",
    label: "3. How many minutes do you exercise per week?",
    type: "number",
  },
  {
    key: "caffeineIntake",
    label: "4. What is your daily caffeine intake (mg)?",
    type: "number",
  },
  {
    key: "smoking",
    label: "5. Do you currently smoke?",
    type: "select",
    options: yesNoOptions,
  },
  {
    key: "dietQuality",
    label: "6. On a scale of 1 to 10, how would you rate your overall diet?",
    type: "select",
    options: scale1to10Options,
  },
];

const AnxietyTest: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswer = (key: string, value: string | number) => {
    setAnswers({ ...answers, [key]: value });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] items-center justify-center p-4">
      <Text
        className="font-bold text-2xl mb-4"
        style={{ fontFamily: "Raleway-Regular" }}
      >
        Anxiety Test
      </Text>
      <View className="w-full bg-white p-4 rounded-lg shadow-md">
        <Text className="text-lg mb-2">{currentQuestion.label}</Text>
        {currentQuestion.type === "select" && currentQuestion.options ? (
          <Picker
            selectedValue={answers[currentQuestion.key] || ""}
            onValueChange={(itemValue) =>
              handleAnswer(currentQuestion.key, itemValue)
            }
          >
            {currentQuestion.options.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        ) : (
          <TextInput
            keyboardType="numeric"
            className="border p-2 rounded-md"
            placeholder="Enter your answer"
            value={
              answers[currentQuestion.key]
                ? answers[currentQuestion.key].toString()
                : ""
            }
            onChangeText={(text) => handleAnswer(currentQuestion.key, text)}
          />
        )}
      </View>
      <View className="flex-row mt-4 space-x-4">
        {currentQuestionIndex > 0 && (
          <TouchableOpacity
            onPress={handlePrevious}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            <Text>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleNext}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AnxietyTest;
