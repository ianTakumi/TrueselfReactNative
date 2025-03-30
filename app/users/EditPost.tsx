import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import AxiosInstance from "@/utils/AxiosInstance";
import { notifyToast } from "@/utils/helpers";
import { useAppSelector } from "@/app/redux/hooks";
import { Post } from "@/app/redux/types/Post.type";

export default function EditPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      await AxiosInstance.get(`/posts/single/${id}`).then((res) => {
        if (res.status === 200) {
          setPost(res.data.post);
        } else {
          notifyToast("Error", "Failed to fetch post", "error");
        }
      });
    };

    fetchPost();
  }, []);

  if (loading) {
    return (
      <View className="p-4 bg-gray-100 min-h-screen flex justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="text-center text-gray-500">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView>
        <Text>Edit Post</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
