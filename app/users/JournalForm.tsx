import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import { notifyToast } from "@/utils/helpers";
import { useForm, Controller, set } from "react-hook-form";
import AxiosInstance from "@/utils/AxiosInstance";

export default function App(): JSX.Element {
  const editorRef = useRef<RichEditor>(null);
  const router = useRouter();
  const { id, title, content } = useLocalSearchParams();
  const user = useAppSelector((state) => state.auth.user);
  const [editorContent, setEditorContent] = useState<string>(
    typeof content === "string" ? content : ""
  );

  useEffect(() => {
    if (typeof content === "string") {
      setEditorContent(content);
    }
  }, [content]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: Array.isArray(title) ? title[0] : title || "", // Ensure title is always a string
    },
  });

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      content: editorContent,
    };

    if (id) {
      await AxiosInstance.put(`/journalEntries/${id}`, payload)
        .then((res) => {
          if (res.status === 200) {
            notifyToast(
              "Success",
              "Journal entry updated successfully",
              "success"
            );
            router.push("/users/(drawers)/(tabs)/journal");
          }
        })
        .catch((err) => {
          console.log(err);
          notifyToast("Error", "Failed to update journal entry", "error");
        });
    } else {
      await AxiosInstance.post(`/journalEntries/${user.data?._id}`, payload)
        .then((res) => {
          if (res.status === 201) {
            notifyToast(
              "Success",
              "Journal entry created successfully",
              "success"
            );
            router.push("/users/(drawers)/(tabs)/journal");
          }
        })
        .catch((err) => {
          console.log(err);
          notifyToast("Error", "Failed to create journal entry", "error");
        });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] p-4">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          className="bg-slate-400 rounded-full p-2 shadow-lg"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-center flex-1">
          {id ? "Edit Journal" : "Create Journal"}
        </Text>

        <View className="w-10" />
      </View>

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

      <Text className="text-black font-bold text-lg mb-2 mt-5">Content</Text>

      <RichEditor
        ref={editorRef}
        style={styles.editor}
        className="mt-10"
        placeholder="Write something..."
        initialContentHTML={editorContent || ""}
        onChange={(content) => {
          setEditorContent(content);
        }}
      />

      <RichToolbar
        editor={editorRef}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.keyboard,
          actions.setStrikethrough,
          actions.setUnderline,
          actions.removeFormat,
          actions.checkboxList,
          actions.undo,
          actions.redo,
        ]}
      />

      <TouchableOpacity
        className="border-purple-500 border py-3 rounded-lg mt-4"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-center font-bold text-purple-500">
          {id ? "Update Journal" : "Create Journal"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  editor: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    height: 700,
    width: "auto",
  },
});
