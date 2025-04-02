import React, { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import AxiosInstance from "@/utils/AxiosInstance";
import { notifyToast, sendPushNotification } from "@/utils/helpers";
import { Post } from "../redux/types/Post.type";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Comments from "@/components/user/Comments";
import { Comment } from "../redux/types/Comment.type";
import { WebView } from "react-native-webview";
import { Video, ResizeMode } from "expo-av";
import Entypo from "@expo/vector-icons/Entypo";
import { useAppSelector } from "../redux/hooks";

export default function SinglePost() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const [webViewHeight, setWebViewHeight] = useState(50);
  const { width } = useWindowDimensions();
  const lastHeight = useRef(300);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [refreshComments, setRefreshComments] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postRes] = await Promise.all([
        AxiosInstance.get(`/posts/singlePost/${id}`),
      ]);

      if (postRes.status === 200) {
        setPost(postRes.data.data);
      } else {
        notifyToast("Error", "Failed to fetch post", "error");
      }
    } catch (error) {
      console.error(error);
      notifyToast("Error", "Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    await AxiosInstance.post(`/posts/like/${id}`, { userId })
      .then((res) => {
        if (res.status === 200) {
          notifyToast("Success", "Post liked", "success");
          fetchData();
          sendPushNotification(
            "Post Liked",
            `${user.data?.name} liked your post`,
            post?.user?.expoPushToken || "",
            "liked",
            post as Post
          );
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          notifyToast("Info", "You have already liked this post", "info");
        }
      });
  };

  const handleDislike = async () => {
    console.log("Disliking post");
    await AxiosInstance.post(`/posts/dislike/${id}`, { userId })
      .then((res) => {
        if (res.status === 200) {
          notifyToast("Success", "Post disliked", "success");
          fetchData();
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          notifyToast("Info", "You have already disliked this post", "info");
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View className="p-4 bg-gray-100 min-h-screen flex justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="text-center text-gray-500">Loading...</Text>
      </View>
    );
  }

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      notifyToast("Error", "Comment cannot be empty", "error");
      return;
    }

    await AxiosInstance.post(`/comments/${userId}/${id}`, {
      content: commentText,
    })
      .then((res) => {
        if (res.status === 201) {
          notifyToast("Success", "Comment added", "success");
          setCommentText("");
          fetchData();
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          notifyToast("Error", "Failed to add comment", "error");
        }
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] mt-10">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <FlatList
          data={[{}]} // Dummy data para lang ma-render ang header
          keyExtractor={() => "header"} // Dummy key
          renderItem={null} // Walang actual na list items
          ListHeaderComponent={
            <View className="bg-white p-4 rounded-2xl shadow-md">
              {/* User Info */}
              <View className="flex-row items-center mb-2">
                <Image
                  source={{
                    uri:
                      post?.user?.profile?.url ||
                      "https://via.placeholder.com/50",
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginRight: 10,
                  }}
                />
                <View>
                  <Text className="text-gray-900 font-semibold">
                    {post?.user?.name || "Unknown"}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    {post?.createdAt
                      ? new Date(post.createdAt)
                          .toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })
                          .replace(",", " at")
                      : "Unknown"}
                  </Text>
                </View>
              </View>

              {/* Post Title */}
              <Text className="text-lg font-semibold text-gray-900 mb-2">
                {post?.title}
              </Text>

              {/* Post Content */}
              {post?.type === "text" && (
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
                      }, 100);
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
                      lastHeight.current = newHeight;
                      setWebViewHeight(newHeight);
                    }
                  }}
                />
              )}

              {/* Post Image */}
              {post?.type === "image" && post?.images?.length ? (
                <Image
                  source={{ uri: post.images[0].url || "" }}
                  style={{
                    width: "100%",
                    height: 192,
                    borderRadius: 10,
                    marginBottom: 16,
                  }}
                  resizeMode="cover"
                />
              ) : null}

              {post?.type === "video" && (
                <Video
                  source={{ uri: post.video.url }}
                  style={{ width: "100%", height: 200, borderRadius: 10 }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                />
              )}

              {/* Post Actions */}
              <View className="flex-row justify-start mt-2" style={{ gap: 10 }}>
                <TouchableOpacity
                  onPress={handleLike}
                  disabled={post?.user._id === userId}
                  className="flex-row items-center px-4 py-2 bg-gray-200 rounded-full"
                >
                  <Entypo name="arrow-with-circle-up" size={20} color="gray" />
                  <Text className="ml-2 text-gray-700 font-semibold">
                    {post?.likes.length}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleDislike}
                  disabled={post?.user._id === userId}
                  className="flex-row items-center px-4 py-2 bg-gray-200 rounded-full"
                >
                  <Entypo
                    name="arrow-with-circle-down"
                    size={20}
                    color="gray"
                  />
                  <Text className="ml-2 text-gray-700 font-semibold">
                    {post?.dislikes.length}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowCommentInput(!showCommentInput)}
                  className="flex-row items-center px-4 py-2 bg-gray-200 rounded-full"
                >
                  <AntDesign name="message1" size={20} color="gray" />
                  <Text className="ml-2 text-gray-700 font-semibold">
                    {post?.commentCount}
                  </Text>
                </TouchableOpacity>
              </View>

              {showCommentInput && (
                <View className="flex-row items-center mt-3 bg-gray-100 p-2 rounded-lg">
                  <TextInput
                    value={commentText}
                    onChangeText={setCommentText}
                    placeholder="Write a comment..."
                    className="flex-1 bg-white p-2 rounded-lg"
                  />
                  <TouchableOpacity
                    onPress={handleAddComment}
                    className="ml-2 p-2 bg-[#63579F] rounded-lg"
                  >
                    <Text className="text-white font-semibold">Post</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Comments Component */}
              <Comments
                postId={id as string}
                refresh={refreshComments}
                setRefresh={setRefreshComments}
              />
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
