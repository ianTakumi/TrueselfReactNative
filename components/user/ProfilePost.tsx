import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import AxiosInstance from "../../utils/AxiosInstance";
import { notifyToast } from "../../utils/helpers";
import { useAppSelector } from "@/app/redux/hooks";
import { Post } from "@/app/redux/types/Post.type";
import { WebView } from "react-native-webview";
import { AntDesign } from "@expo/vector-icons";
import dayjs from "dayjs";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

export default function ProfilePost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [webViewHeight, setWebViewHeight] = useState(50);
  const { width } = useWindowDimensions();
  const lastHeight = useRef(300);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await AxiosInstance.get(`/posts/${user.data?._id}`);
        setPosts(res.data.data);
      } catch (err) {
        console.error(err);
        notifyToast("Error", "Failed to fetch posts", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (post: Post) => {
    router.push({ pathname: "/users/EditPost", params: { id: post._id } });
  };

  const handleDelete = async (postId: any) => {
    console.log("Post ID: ", postId);

    await AxiosInstance.delete(`/posts/${postId}`)
      .then((res) => {
        if (res.status === 200) {
          notifyToast("Success", "Post deleted successfully", "success");
          setPosts(posts.filter((post) => post._id !== postId));
        }
      })
      .catch((err) => {
        console.error(err);
        notifyToast("Error", "Failed to delete post", "error");
      });
  };

  const renderRightActions = (post: Post) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => handleEdit(post)}
        style={{
          backgroundColor: "#3B82F6",
          padding: 12,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      >
        <AntDesign name="edit" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete(post._id)}
        style={{
          backgroundColor: "#EF4444",
          padding: 12,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="p-4 bg-gray-100 min-h-screen">
        <Text className="text-lg font-bold text-gray-800 mb-10">
          My Latest Posts
        </Text>
        <ActivityIndicator size="large" color="#000" />
        <Text className="text-center text-gray-500">Loading...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView className="p-4 bg-gray-100 min-h-screen">
      <Text className="text-lg font-bold text-gray-800 mb-4">
        My Latest Posts
      </Text>
      {posts.length === 0 ? (
        <Text className="text-center text-gray-500">No posts available</Text>
      ) : (
        posts.map((post) => (
          <TouchableOpacity
            key={post._id}
            onPress={() =>
              router.push({
                pathname: "/users/SinglePost",
                params: { id: post._id },
              })
            }
          >
            <Swipeable renderRightActions={() => renderRightActions(post)}>
              <View className="bg-white p-4 rounded-lg shadow-md mb-4">
                <Text className="text-lg font-semibold text-gray-900">
                  {post.title}
                </Text>
                <Text className="text-gray-500 text-sm mt-1">
                  {dayjs(post.createdAt).format("MMMM DD, YYYY [at] hh:mm A")}
                </Text>

                {post.type === "text" && (
                  <WebView
                    originWhitelist={["*"]}
                    source={{
                      html: `
        <!DOCTYPE html>
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
          <body onload="sendHeight()">${post.content}</body>
        </html>
      `,
                    }}
                    style={{ width: width - 20, height: webViewHeight }}
                    onMessage={(event) => {
                      const newHeight = Number(event.nativeEvent.data);
                      if (Math.abs(newHeight - lastHeight.current) > 10) {
                        // Update only if there's a significant change
                        lastHeight.current = newHeight;
                        setWebViewHeight(newHeight);
                      }
                    }}
                  />
                )}

                {post.type === "image" &&
                  post.images.map((img, index) => (
                    <Image
                      key={index}
                      source={{ uri: img.url }}
                      className="w-full h-48 rounded-lg mt-2"
                    />
                  ))}
                {post.type === "video" && (
                  <Video
                    source={{ uri: post.video.url }}
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                  />
                )}
                <View
                  className="flex-row items-center mt-3 "
                  style={{ gap: 10 }}
                >
                  <TouchableOpacity className="flex-row items-center px-4 py-2 bg-gray-200 rounded-full">
                    <AntDesign name="like1" size={20} color="gray" />
                    <Text className="ml-2 text-gray-700 font-semibold">
                      {post.likes.length}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-row items-center px-4 py-2 bg-gray-200 rounded-full">
                    <AntDesign name="dislike1" size={20} color="gray" />
                    <Text className="ml-2 text-gray-700 font-semibold">
                      {post.dislikes.length}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-row items-center px-4 py-2 bg-gray-200 rounded-full">
                    <AntDesign name="message1" size={20} color="gray" />
                    <Text className="ml-2 text-gray-700 font-semibold">
                      {post?.commentCount}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Swipeable>
          </TouchableOpacity>
        ))
      )}
    </GestureHandlerRootView>
  );
}
