import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { JournalEntry } from "../redux/types/JournalEntry.type";
import { useForm, Controller, set } from "react-hook-form";
import { notifyToast } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "../redux/hooks";

const JournalForm = () => {
  const params = useLocalSearchParams();

  let journal: JournalEntry | null =
    params && typeof params === "object" && params.id
      ? ({
          _id: params.id,
          title: params.title,
          content: params.content,
          createdAt: params.createdAt,
        } as JournalEntry)
      : null;
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JournalEntry>({
    defaultValues: {
      title: journal?.title || "",
      content: journal?.content || "",
    },
  });

  const onSubmit = async (data: JournalEntry) => {
    if (journal) {
      await AxiosInstance.put(``)
        .then((res) => {})
        .catch((err) => {});
    } else {
    }
    router.push("/users/Journals");
  };

  return (
    <SafeAreaView className="flex-1  bg-[#FAFAFA] px-5 py-10 mt-10 ">
      <TouchableOpacity
        className="absolute top-10 left-5 bg-slate-400 rounded-full p-2 shadow-lg"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-center my-1">
        {journal ? "Edit entry" : "Add entry"}
      </Text>

      <View className="mt-10">
        <Text className="text-black font-bold text-lg mb-2">Title</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 px-4 py-3 rounded-lg mb-3"
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
          rules={{ required: "Title is required" }}
        />
        {errors.title && (
          <Text className="text-red-500">{errors.title.message}</Text>
        )}
      </View>

      <View className="mt-10"></View>
    </SafeAreaView>
  );
};

export default JournalForm;
