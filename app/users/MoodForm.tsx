import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MoodEntry } from "../redux/types/MoodEntry.type";
import { useForm, Controller, set } from "react-hook-form";
import { moodImages, moodGradients, notifyToast } from "@/utils/helpers";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "../redux/hooks";

const moods = Object.keys(moodImages);

const MoodForm = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  let mood: MoodEntry | null =
    params && typeof params === "object" && params.id
      ? ({
          _id: params.id,
          mood: params.mood,
          note: params.note,
          createdAt: params.createdAt,
        } as MoodEntry)
      : null;
  const [selectedMood, setSelectedMood] = useState<string | null>(
    mood?.mood || null
  );

  const user = useAppSelector((state) => state.auth.user);
  console.log(params);

  if (params && typeof params === "object") {
    mood = {
      _id: params.id,
      mood: params.mood,
      note: params.note,
      createdAt: params.createdAt,
    } as MoodEntry;
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MoodEntry>({
    defaultValues: {
      note: mood?.note || "",
      mood: mood?.mood || "",
    },
  });

  const onSubmit = async (data: MoodEntry) => {
    if (!selectedMood) {
      alert("Please select a mood before submitting.");
      return;
    }

    if (mood?._id != null) {
      console.log("Mood updated:", data);
      await AxiosInstance.put(`/moodEntries/${mood._id}`, data)
        .then((res) => {
          if (res.status === 200) {
            notifyToast("Mood updated", "Success", "success");
          }
        })
        .catch((err) => {
          notifyToast("Failed to update mood", "error", "error");
        });
    } else {
      console.log("New mood added:", data);
      await AxiosInstance.post(`/moodEntries/${user.data?._id}`, data)
        .then((res) => {
          if (res.status === 201) {
            notifyToast("Mood added successfully", "success", "success");
            setValue("note", "");
            setValue("mood", "");
          }
        })
        .catch((err) => {
          notifyToast("Failed to add mood", "error", "error");
        });
    }
    router.push("/users/Moods");
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5 py-10 mt-10">
      <TouchableOpacity
        className="absolute top-10 left-5 bg-slate-400 rounded-full p-2 shadow-lg"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-center my-1">
        {mood?._id ? "Edit Mood" : "Add Mood"}
      </Text>

      <View className="mt-10">
        <Text className="text-lg font-semibold mb-2">Select a Mood:</Text>
        <FlatList
          data={moods}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`m-2 rounded-lg overflow-hidden border-2 ${
                selectedMood === item
                  ? "border-purple-500"
                  : "border-transparent"
              }`}
              onPress={() => {
                setSelectedMood(item);
                setValue("mood", item);
              }}
            >
              <LinearGradient
                colors={moodGradients[item]}
                className="w-24 h-24 justify-center items-center rounded-lg"
              >
                <Image source={moodImages[item]} className="w-12 h-12 mb-1" />
                <Text className="text-white font-bold">{item}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
        {errors.mood && (
          <Text className="text-red-500">{errors.mood.message}</Text>
        )}
      </View>

      <View className="mb-8">
        <Text className="text-black font-bold text-lg mb-2">Note</Text>
        <Controller
          control={control}
          name="note"
          rules={{ required: "Mood note is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-300 px-4 py-3 rounded-lg mb-3"
              placeholder="Enter your mood note"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.note && (
          <Text className="text-red-500">{errors.note.message}</Text>
        )}
      </View>

      <TouchableOpacity
        className={`border py-3 rounded-lg mt-4 ${
          selectedMood ? "border-purple-500" : "border-gray-300 opacity-50"
        }`}
        onPress={handleSubmit(onSubmit)}
        disabled={!selectedMood}
      >
        <Text
          className={`text-center font-bold ${
            selectedMood ? "text-purple-500" : "text-gray-400"
          }`}
        >
          Save Mood
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MoodForm;
