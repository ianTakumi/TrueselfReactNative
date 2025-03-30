import React, { useState } from "react";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "../redux/hooks";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { notifyToast } from "@/utils/helpers";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";

interface PostFormData {
  title: string;
  content?: string;
  media?: string | null;
  mediaType?: string;
}

export default function AddPost() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      content: "",
      media: null,
      mediaType: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.data?._id;

  const onSubmit = async (data: PostFormData) => {
    if (!userId) {
      notifyToast("Error", "User not found", "error");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content || "");
      formData.append("userId", userId);

      if (data.media) {
        formData.append("media", {
          uri: data.media,
          type: data.mediaType || "image/jpeg",
          name: `upload.${data.mediaType?.split("/")[1] || "jpg"}`,
        } as any);
      }

      await AxiosInstance.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      notifyToast("Success", "Post created successfully", "success");
    } catch (error) {
      notifyToast("Error", "Error creating post", "error");
    }
    setLoading(false);
  };

  const pickMedia = async (type: "image" | "video") => {
    let result: ImagePicker.ImagePickerResult;
    if (type === "image") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
      });
    }

    if (!result.canceled) {
      setValue("media", result.assets[0].uri);
      setValue("mediaType", result.assets[0].type);
    }
  };

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Create Post</Text>
      <Controller
        control={control}
        rules={{ required: "Title is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />
      {errors.title && (
        <Text style={{ color: "red" }}>{errors.title.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              marginVertical: 10,
              height: 100,
            }}
            placeholder="Content (optional)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
          />
        )}
        name="content"
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button title="Pick Image" onPress={() => pickMedia("image")} />
        <Button title="Pick Video" onPress={() => pickMedia("video")} />
      </View>

      {/* {watch("media") &&
        (watch("mediaType")?.includes("image") ? (
          <Image
            source={{ uri: watch("media") }}
            style={{ width: 100, height: 100, marginTop: 10 }}
          />
        ) : (
          <Text style={{ marginTop: 10 }}>Video selected</Text>
        ))} */}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "blue",
          padding: 15,
          marginTop: 20,
          alignItems: "center",
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white" }}>Post</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
