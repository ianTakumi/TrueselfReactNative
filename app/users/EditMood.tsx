import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import AxiosInstance from "@/utils/AxiosInstance";
import { useLocalSearchParams } from "expo-router";
import { notifyToast } from "@/utils/helpers";
import { MoodEntry } from "../redux/types/MoodEntry.type";
import { useAppSelector } from "../redux/hooks";
import { Link } from "expo-router";
import { moodGradients, moodImages } from "@/utils/helpers";

const EditMood = () => {
  const { id } = useLocalSearchParams();
  const [mood, setMood] = useState<MoodEntry | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;

  // Fetch Mood Entry
  const fetchMood = async () => {
    try {
      const response = await AxiosInstance.get(`/moodEntries/${id}/${userId}`);
      if (response.status === 200) {
        setMood(response.data.moodEntry);
        setSelectedMood(response.data.moodEntry.mood);
        setNotes(response.data.moodEntry.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMood();
  }, []);

  // Update Mood Entry
  const updateMood = async () => {
    //   try {
    //     const response = await AxiosInstance.put(`/moodEntries/${id}`, {
    //       userId,
    //       mood: selectedMood,
    //       notes,
    //     });
    //     if (response.status === 200) {
    //       notifyToast("Mood updated successfully!", "Success", "success");
    //       router.push("/users/Moods");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     notifyToast("Failed to update mood.", "Error", "error");
    //   }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-2xl font-bold text-center my-5">
          Edit Your Mood
        </Text>

        {/* Mood Selection */}
        <View className="flex-row flex-wrap justify-between">
          {Object.keys(moodGradients).map((moodKey) => (
            <TouchableOpacity
              key={moodKey}
              className={`w-[30%] p-3 rounded-xl mb-4 items-center ${
                selectedMood === moodKey
                  ? "bg-gradient-to-r from-yellow-300 to-pink-300"
                  : "bg-gray-200"
              }`}
              onPress={() => setSelectedMood(moodKey)}
            >
              <Image source={moodImages[moodKey]} className="w-10 h-10 mb-2" />
              <Text className="font-medium">{moodKey}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notes Input */}
        <TextInput
          className="h-32 border border-gray-300 rounded-xl p-3 mt-5 text-base"
          placeholder="Add notes..."
          value={notes}
          multiline
          onChangeText={setNotes}
        />

        {/* Update Button */}
        <TouchableOpacity
          className="bg-green-500 py-4 rounded-xl mt-5"
          onPress={updateMood}
        >
          <Text className="text-center text-white font-bold text-lg">
            Update Mood
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditMood;
