import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AxiosInstance from "@/utils/AxiosInstance";
import { notifyToast } from "@/utils/helpers";
import { Space } from "@/app/redux/types/Space.type";
import dayjs from "dayjs";
import { WebView } from "react-native-webview";
import { Post } from "@/app/redux/types/Post.type";
import { Video, ResizeMode } from "expo-av";
import CommunityPost from "@/components/user/CommunityPost";
import { MaterialIcons } from "@expo/vector-icons";

export default function SingleCommunity() {
  const [community, setCommunity] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [post, setPosts] = useState<Post[]>([]);
  const [webViewHeight, setWebViewHeight] = useState(300);
  const lastHeight = useRef(300);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [communityRes, postsRes] = await Promise.all([
          AxiosInstance.get(`/spaces/${id}`),
          AxiosInstance.get(`/posts/community/${id}`),
        ]);

        setCommunity(communityRes.data.data);
        setPosts(postsRes.data.data);
      } catch (error) {
        console.log(error);
        notifyToast("Error", "Failed to fetch data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#FAFAFA]">
        <ActivityIndicator size="large" color="#6200EE" />
      </SafeAreaView>
    );
  }

  if (!community) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#FAFAFA]">
        <Text className="text-gray-500 text-lg">Community not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-[#FAFAFA] flex-1">
      <ScrollView className="px-4">
        {/* Banner Image */}
        <Image
          source={{ uri: community.banner.url }}
          className="w-full h-40 rounded-xl mb-4 mt-10"
          resizeMode="cover"
        />

        {/* Profile and Details */}
        <View className="bg-white p-4 rounded-xl shadow-sm mb-10">
          {/* Community Profile */}
          <View className="flex-row items-center space-x-4 ">
            <Image
              source={{ uri: community.profile.url }}
              className="w-16 h-16 rounded-lg"
            />
            <View>
              <Text className="text-xl font-bold ml-3">{community.name}</Text>
              <Text className="text-gray-500 text-xs ml-3">
                Created: {dayjs(community.createdAt).format("MMMM D, YYYY")}
              </Text>
              {/* Members Count */}
              <View className=" flex-row items-center ml-3">
                <Text className="text-lg font-semibold text-gray-800">
                  Members:
                </Text>
                <Text className="text-gray-600 text-lg ml-2">
                  {community.members.length}
                </Text>
              </View>
            </View>
          </View>
          {/* Description */}
          <Text className="text-gray-600 text-sm">{community.description}</Text>
          {/* Mission */}
          <View className="mt-4">
            <Text className="text-lg font-semibold text-gray-800">Mission</Text>
            <Text className="text-gray-600 text-sm">{community.mission}</Text>
          </View>
          {/* Rules */}
          <View className="mt-4">
            <Text className="text-lg font-semibold text-gray-800">Rules</Text>

            <WebView
              originWhitelist={["*"]}
              source={{
                html: `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap" rel="stylesheet">
              <style>
                body { 
                  font-family: 'Raleway', sans-serif; 
                  font-size: 16px; 
                  color: #333; 
                  padding: 10px; 
                  margin: 0;
                }
                p { margin-bottom: 10px; }
              </style>
              <script>
                function sendHeight() {
                  setTimeout(() => {
                    const height = document.documentElement.scrollHeight;
                    window.ReactNativeWebView.postMessage(height);
                  }, 100); // Debounce to avoid flickering
                }
                window.onload = sendHeight;
                window.onresize = sendHeight;
              </script>
            </head>
            <body onload="sendHeight()">${community.rules}</body>
          </html>
        `,
              }}
              style={{ width: width - 20, height: webViewHeight }}
              onMessage={(event) => {
                const newHeight = Number(event.nativeEvent.data);
                if (Math.abs(newHeight - lastHeight.current) > 10) {
                  // Update only if significant change
                  lastHeight.current = newHeight;
                  setWebViewHeight(newHeight);
                }
              }}
            />
          </View>
        </View>

        {/* Posts */}
        <View>
          <Text className="text-lg font-semibold text-gray-800">Posts</Text>
          <CommunityPost id={id as string} />
        </View>
      </ScrollView>
      <TouchableOpacity className="absolute bottom-8 right-8 bg-purple-600 p-4 rounded-full shadow-lg active:bg-purple-800">
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
