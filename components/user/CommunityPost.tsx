import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import { Video, ResizeMode } from "expo-av";
import dayjs from "dayjs";
import AxiosInstance from "@/utils/AxiosInstance";
import { notifyToast } from "@/utils/helpers";
import { FontAwesome } from "@expo/vector-icons";
import { Post } from "@/app/redux/types/Post.type";
import Entypo from "@expo/vector-icons/Entypo";
interface CommunityPostProps {
  id: string;
}
export default function CommunityPost({ id }: CommunityPostProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { width } = useWindowDimensions();
  const initialHeight = 150;
  const [webViewHeight, setWebViewHeight] = useState(initialHeight);
  const lastHeight = useRef(initialHeight);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await AxiosInstance.get(`/posts/community/${id}`);
        setPosts(res.data.data);
      } catch (err) {
        console.log(err);
        notifyToast("Error", "Failed to fetch posts", "error");
      }
    };
    fetchPosts();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Latest Posts</Text>
        {posts.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() =>
              router.push({
                pathname: `/users/SinglePost`,
                params: { id: item._id },
              })
            }
          >
            <View className="bg-white p-4 rounded-xl shadow-sm mt-4">
              <Text className="text-lg font-semibold">{item.title}</Text>
              <Text className="text-gray-500 text-sm">
                {dayjs(item.createdAt).format("MMMM D, YYYY")}
              </Text>

              {item.type === "text" && (
                <WebView
                  originWhitelist={["*"]}
                  source={{
                    html: `
                      <html>
                        <head>
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <style>
                            body { font-size: 16px; color: #333; padding: 10px; }
                          </style>
                          <script>
                            function sendHeight() {
                              setTimeout(() => {
                                const height = document.documentElement.scrollHeight;
                                window.ReactNativeWebView.postMessage(height);
                              }, 100);
                            }
                            window.onload = sendHeight;
                            window.onresize = sendHeight;
                          </script>
                        </head>
                        <body onload="sendHeight()">${item.content}</body>
                      </html>
                    `,
                  }}
                  style={{ width: width - 20, height: webViewHeight }}
                  onMessage={(event) => {
                    const newHeight = Number(event.nativeEvent.data);
                    if (Math.abs(newHeight - lastHeight.current) > 10) {
                      lastHeight.current = newHeight;
                      setWebViewHeight(newHeight);
                    }
                  }}
                />
              )}

              {item.type === "image" && item.images.length > 0 && (
                <View className="mt-2">
                  {item.images.map((img, index) => (
                    <Image
                      key={index}
                      source={{ uri: img.url }}
                      className="w-full h-48 rounded-lg"
                      resizeMode="cover"
                    />
                  ))}
                </View>
              )}

              {item.type === "video" && item.video?.url && (
                <Video
                  source={{ uri: item.video.url }}
                  style={{ width: "100%", height: 200, borderRadius: 10 }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                />
              )}

              {/* Post Actions */}
              <View
                className="flex-row justify-start items-center mt-3 "
                style={{ gap: 10 }}
              >
                {/* Upvote */}
                <TouchableOpacity className="flex-row items-center">
                  <Entypo name="arrow-with-circle-up" size={24} color="black" />
                  <Text className="ml-2 text-gray-700 font-semibold">
                    {item.likes.length}
                  </Text>
                </TouchableOpacity>

                {/* Downvote */}
                <TouchableOpacity className="flex-row items-center">
                  <Entypo
                    name="arrow-with-circle-down"
                    size={24}
                    color="black"
                  />
                  <Text className="text-gray-700 ml-2 font-semibold">
                    {item.dislikes.length}
                  </Text>
                </TouchableOpacity>

                {/* Comment */}
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() =>
                    router.push({
                      pathname: `/users/SinglePost`,
                      params: { id: item._id },
                    })
                  }
                >
                  <FontAwesome name="comment" size={20} color="gray" />
                  <Text className="ml-2 text-gray-700 font-semibold">
                    {item.commentCount || 0}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
