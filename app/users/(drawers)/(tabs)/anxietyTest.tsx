import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Audio } from "expo-av";
import { translations, audioFiles } from "@/utils/helpers";

const AnxietyTest: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "tg">("en");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const questions = translations[language].questions;

  const playAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    const questionNumber = currentQuestionIndex + 1;
    const audioSource = audioFiles[language]?.[questionNumber];

    if (!audioSource) {
      console.error("Audio file not found");
      return;
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(audioSource, {
        shouldPlay: true,
      });
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  useEffect(() => {
    playAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentQuestionIndex, language]);

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

  const handleLanguageChange = (selectedLanguage: "en" | "tg") => {
    setLanguage(selectedLanguage);
    setCurrentQuestionIndex(0);
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

      {/* Language Selector */}
      <View className="w-full mb-4">
        <Text className="text-lg mb-2">Select Language / Piliin ang Wika:</Text>
        <Picker selectedValue={language} onValueChange={handleLanguageChange}>
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Tagalog" value="tg" />
        </Picker>
      </View>

      <View className="w-full bg-white p-4 rounded-lg shadow-md">
        <Text className="text-lg mb-2">{currentQuestion.label}</Text>
        {currentQuestion.type === "select" && currentQuestion.options ? (
          <Picker
            selectedValue={answers[currentQuestion.key] || ""}
            onValueChange={(itemValue) =>
              handleAnswer(currentQuestion.key, itemValue)
            }
          >
            {currentQuestion.options.map((option: any) => (
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
