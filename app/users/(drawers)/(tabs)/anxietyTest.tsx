import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Audio } from "expo-av";
import { translations, audioFiles, getAge, notifyToast } from "@/utils/helpers";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "@/app/redux/hooks";
import { SelectList } from "react-native-dropdown-select-list";
import AxiosAIInstance from "@/utils/AxiosAIInstance";
import { useRouter } from "expo-router";

const AnxietyTest: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "tg">("en");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const user = useAppSelector((state) => state.auth.user);
  const questions = translations[language].questions;
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: questions.reduce((acc, question) => {
      acc[question.key] = "";
      return acc;
    }, {} as Record<string, string | number>),
  });

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

  const onSubmit = async (data: Record<string, string | number>) => {
    let occupationEncoding: Record<
      | "Occupation_Engineer"
      | "Occupation_Other"
      | "Occupation_Student"
      | "Occupation_Teacher"
      | "Occupation_Unemployed",
      number
    > = {
      Occupation_Engineer: 0,
      Occupation_Other: 0,
      Occupation_Student: 0,
      Occupation_Teacher: 0,
      Occupation_Unemployed: 0,
    };

    const selectedOccupation = data.jobRole as string | undefined;

    if (selectedOccupation) {
      const formattedOccupation = `Occupation_${
        selectedOccupation.charAt(0).toUpperCase() + selectedOccupation.slice(1)
      }` as keyof typeof occupationEncoding;

      if (formattedOccupation in occupationEncoding) {
        occupationEncoding[formattedOccupation] = 1;
      }
    }

    const cleannedData = {
      Age: getAge(user.data?.dob),
      "Sleep Hours": data.sleepDuration,
      "Physical Activity (hrs/week)": data.exerciseMinutes,
      "Caffeine Intake (mg/day)": data.caffeineIntake,
      "Alcohol Consumption (drinks/week)": data.alcoholIntake,
      Smoking: data.smoking,
      "Family History of Anxiety": data.familyAnxiety,
      "Stress Level (1-10)": data.stressLevel,
      "Heart Rate (bpm during attack)": data.heartRateAnxiety,
      "Breathing Rate (breaths/min)": data.breathingRate,
      "Sweating Level (1-5)": data.sweatingSeverity,
      Dizziness: data.dizziness,
      Medication: data.medication,
      "Therapy Sessions (per month)": data.therapySessions,
      "Recent Major Life Event": data.lifeEvents,
      "Diet Quality (1-10)": data.dietQuality,
      ...occupationEncoding,
    };
    console.log(cleannedData);
    await AxiosAIInstance.post(`/predict/${user.data?._id}`, cleannedData)
      .then((res) => {
        console.log(res.data);
        notifyToast("Prediction Successful", "success", "success");
        router.push("/users/Result");
      })
      .catch((err) => {
        console.error("Error Response:", err.response?.data || err.message);
        notifyToast("Prediction Failed", "error", "error");
      });
  };

  const handleNext = () => {
    handleSubmit((data) => {
      const updatedAnswers = {
        ...answers,
        [currentQuestion.key]: data[currentQuestion.key],
      };
      setAnswers(updatedAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        const nextQuestionKey = questions[currentQuestionIndex + 1].key;
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeout(() => setValue(nextQuestionKey, ""), 0); // Ensure input clears
      } else {
        onSubmit(updatedAnswers);
      }
    })();
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleLanguageChange = (selectedLanguage: "en" | "tg") => {
    setLanguage(selectedLanguage);
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="height" className="flex-1">
        <SafeAreaView className="flex-1 bg-[#FAFAFA] items-center justify-center p-4">
          <Text className="font-bold text-2xl mb-4">Anxiety Test</Text>

          <View className="w-full mb-4">
            <Text className="text-lg mb-2">
              Select Language / Piliin ang Wika:
            </Text>
            <SelectList
              setSelected={handleLanguageChange}
              data={[
                { key: "en", value: "English" },
                { key: "tg", value: "Tagalog" },
              ]}
              placeholder="Select Language"
              boxStyles={{ borderColor: "#ccc" }}
              dropdownStyles={{ borderColor: "#ccc" }}
              defaultOption={{ key: "en", value: "English" }}
            />
          </View>

          <View className="w-full bg-white p-4 rounded-lg shadow-md">
            <Text className="text-lg mb-2">{currentQuestion.label}</Text>
            {currentQuestion.type === "select" && currentQuestion.options ? (
              <Controller
                control={control}
                rules={{ required: "This field is required" }}
                name={currentQuestion.key}
                render={({ field: { onChange, value } }) => (
                  <SelectList
                    setSelected={onChange}
                    data={currentQuestion.options.map((option: any) => ({
                      key: option.value,
                      value: option.label,
                    }))}
                    placeholder="Select an option"
                    boxStyles={{ borderColor: "#ccc" }}
                    dropdownStyles={{ borderColor: "#ccc" }}
                  />
                )}
              />
            ) : (
              <Controller
                control={control}
                rules={{ required: "This field is required" }}
                name={currentQuestion.key}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    keyboardType="numeric"
                    className="border border-gray-300 p-2 rounded-md"
                    placeholder="Enter your answer"
                    value={value?.toString()}
                    onChangeText={(text) => {
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.key]: text,
                      }));
                      onChange(text);
                    }}
                  />
                )}
              />
            )}

            {errors[currentQuestion.key] && (
              <Text className="text-red-500 mt-2">
                {errors[currentQuestion.key]?.message}
              </Text>
            )}
          </View>

          <View className="flex-col mt-4 space-y-4 w-full">
            {currentQuestionIndex > 0 && (
              <TouchableOpacity
                onPress={handlePrevious}
                className="bg-pink-500 px-4 py-2 rounded-lg mt-5 mb-4 w-full h-16 flex justify-center items-center shadow-md"
              >
                <Text className="text-white text-lg font-semibold">
                  Previous
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleNext}
              className="bg-purple-500 px-4 py-2 rounded-lg w-full h-16 flex justify-center items-center shadow-md"
            >
              <Text className="text-white text-lg font-semibold">Next</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AnxietyTest;
