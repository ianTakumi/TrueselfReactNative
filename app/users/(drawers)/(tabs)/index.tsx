import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";
import MoodCalendar from "@/components/user/MoodCalendar";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { moodImages, notifyToast, songs } from "@/utils/helpers";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "@/utils/AxiosInstance";
import Playlist from "@/components/user/Playlist";
import Affirmations from "@/components/user/Affirmations";
import FloatingMusicPlayer from "@/components/user/FloatingMusicPlayer";
interface MoodNoteForm {
  note: string;
}

export default function IndexPage() {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const userId = user.data?._id;
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MoodNoteForm>();

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setModalVisible(true);
  };

  const onSubmit = async (data: MoodNoteForm) => {
    console.log(`Mood: ${selectedMood}, Note: ${data.note}`);

    const cleaneData = {
      mood: selectedMood,
      note: data.note,
    };

    AxiosInstance.post(`/moodEntries/${userId}`, cleaneData).then((res) => {
      if (res.status === 201) {
        setModalVisible(false);
        reset();
        notifyToast("Mood added successfully", "success", "success");
      }
    });
  };

  return (
    <ScrollView className="flex-1 px-4 bg-[#FAFAFA] pb-28">
      <View className="flex flex-col items-center justify-center mt-5">
        <Text className="font-light text-xl">How do you feel today?</Text>

        <View className="flex-row space-x-4 mt-4">
          {Object.entries(moodImages).map(([mood, imageSource]) => (
            <TouchableOpacity
              key={mood}
              onPress={() => handleMoodSelect(mood)}
              className={`p-2 rounded-full ${
                selectedMood === mood ? "border-2 border-blue-500" : ""
              }`}
            >
              <Image source={imageSource} className="w-14 h-14 opacity-80" />
              <Text className="text-center mt-1">{mood}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="mt-10">
        <MoodCalendar />
      </View>

      <ScrollView horizontal className="my-10 flex-1">
        <View className="flex-col">
          <Text className="font-light text-xl mb-4">
            Listen to relaxing music
          </Text>
          <Playlist />
        </View>
      </ScrollView>
      <FloatingMusicPlayer />

      <View className="mb-10">
        <Affirmations />
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <View className="bg-white p-6 rounded-2xl w-4/5">
            <Text className="text-lg font-semibold mb-4">
              Add a note for today's mood
            </Text>

            <Controller
              control={control}
              name="note"
              rules={{ required: "Note is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border border-gray-300 rounded-lg p-2 h-16"
                  multiline
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {/* Validation Error */}
            {errors.note && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.note.message}
              </Text>
            )}

            <View className="flex-row justify-end space-x-2 mt-4">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className="bg-blue-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
