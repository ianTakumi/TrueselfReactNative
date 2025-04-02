import React, { useState, useRef, useEffect } from "react";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "../redux/hooks";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { notifyToast } from "@/utils/helpers";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

interface PostFormData {
  title: string;
  content?: string;
  media?: string | null;
  mediaType?: string;
}

export default function AddPost() {
  const router = useRouter();
  const { id, communityId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [postType, setPostType] = useState<"text" | "image" | "video">("text");
  const [editorContent, setEditorContent] = useState<string>("");
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      media: null,
      mediaType: "",
    },
  });
  const editorRef = useRef<RichEditor>(null);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.data?._id;

  const onSubmit = async (data: any) => {
    if (!userId) {
      notifyToast("Error", "User not found", "error");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", editorContent);
      formData.append("id", communityId as string);
      formData.append("type", postType);

      // If post type is image or video, append the media to FormData
      if (postType === "image" || postType === "video") {
        if (data.media) {
          const mediaUris = data.media.split(","); // Split URIs if there are multiple images
          mediaUris.forEach((uri: any, index: any) => {
            formData.append("media", {
              uri: uri,
              type: data.mediaType || "image/jpeg",
              name: `upload${index + 1}.${
                data.mediaType?.split("/")[1] || "jpg"
              }`,
            } as any);
          });
        }
      }

      // Log the FormData for debugging (optional)
      for (const [key, value] of formData.entries()) {
        if (key === "media") {
          if (Array.isArray(value)) {
            console.log(`${key}: (Multiple images)`);
            value.forEach((file, index) => {
              console.log(`  Image ${index + 1}:`, file.uri);
            });
          } else {
            console.log(`${key}: (Single video or image)`, value.uri);
          }
        } else {
          console.log(`${key}:`, value); // Log other fields
        }
      }

      // Send the FormData to the server
      await AxiosInstance.post(`/posts/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        if (res.status === 201) {
          notifyToast("Success", "Post created successfully", "success");
          router.push({
            pathname: "/users/SingleCommunity",
            params: { id: communityId },
          });
        }
      });
    } catch (error) {
      console.error("Error creating post:", error);
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
        aspect: [1, 1],
        quality: 1,
        allowsMultipleSelection: true, // Allows multiple image selection
      });

      // Limit to 2 images only
      if (!result.canceled) {
        if (result.assets.length > 2) {
          alert("You can only select up to 2 images.");
          return; // Prevent further action if more than 2 images are selected
        }
        // Store URIs of the selected images as a comma-separated string
        setValue("media", result.assets.map((asset) => asset.uri).join(","));
        setValue("mediaType", result.assets[0].type); // Assuming all selected images have the same type
      }
    } else if (type === "video") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        allowsMultipleSelection: false, // Only allow 1 video
      });

      // Limit to 1 video only
      if (!result.canceled) {
        if (result.assets.length > 1) {
          alert("You can only select 1 video.");
          return; // Prevent further action if more than 1 video is selected
        }
        setValue("media", result.assets[0].uri); // Store URI of the selected video
        setValue("mediaType", result.assets[0].type); // Store the type of the video
      }
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 p-4 bg-[#FAFAFA]"
      behavior={Platform.OS === "android" ? "height" : undefined}
      style={{ flex: 1 }}
    >
      <View className="flex-row items-center justify-between px-4 py-3 mt-5">
        <TouchableOpacity
          className="bg-slate-400 rounded-full p-2 shadow-lg"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-center flex-1">
          {id ? "Edit Post" : "Create Post"}
        </Text>

        <View className="w-10" />
      </View>

      {/* Post Type Selection */}
      <View className="flex-row justify-around mt-5">
        {["text", "image", "video"].map((type) => (
          <TouchableOpacity
            key={type}
            className={`px-4 py-2 rounded-lg ${
              postType === type ? "bg-blue-500" : "bg-gray-300"
            }`}
            onPress={() => setPostType(type as "text" | "image" | "video")}
          >
            <Text className="text-white capitalize">{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="mt-5">
        {/* Title */}
        <Text className="text-black font-bold text-lg mb-2">Title</Text>
        <Controller
          control={control}
          rules={{ required: "Title is required" }}
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
        />
        {errors.title && (
          <Text style={{ color: "red" }}>{errors.title.message}</Text>
        )}

        {/* Content (for Text Post) */}
        {postType === "text" && (
          <>
            <Text className="text-black font-bold text-lg mb-2 mt-5">
              Content
            </Text>
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
          </>
        )}

        {/* Media Picker (for Image/Video Post) */}
        {(postType === "image" || postType === "video") && (
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-lg mt-4"
            onPress={() => pickMedia(postType)}
          >
            <Text className="text-white text-center">Pick {postType}</Text>
          </TouchableOpacity>
        )}

        {/* Media Preview */}
        {watch("media") && (
          <View className="mt-4">
            {postType === "image" ? (
              <Image
                source={{ uri: watch("media") ?? undefined }} // Ensures it's never null
                className="w-full h-60 rounded-lg"
              />
            ) : (
              <Text className="text-center text-blue-500">
                Video selected: {watch("media")}
              </Text>
            )}
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="border-purple-500 border py-3 rounded-lg mt-4"
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-center font-bold text-purple-500">
              {id ? "Update Post" : "Create Post"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  editor: {
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    height: 400, // Dagdagan ang height
    minHeight: 400,
    width: "auto",
  },
});
