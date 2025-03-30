import React, { useState, useEffect } from "react";
import AxiosInstance from "@/utils/AxiosInstance";
import { notifyToast } from "@/utils/helpers";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Comment } from "@/app/redux/types/Comment.type";

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await AxiosInstance.get(`/comments/${postId}`);
        if (res.status === 200) {
          setComments(res.data.data);
        }
      } catch (error) {
        console.error(error);
        notifyToast("Error", "Failed to fetch comments", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <SafeAreaView className="flex-1 p-4">
      {loading ? (
        <ActivityIndicator size="large" color="#3B82F6" />
      ) : comments.length === 0 ? (
        <Text className="text-center text-gray-600 mt-4">No comments yet.</Text>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <CommentCard comment={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <View className="bg-white p-4 rounded-xl shadow-md mb-3 flex-row items-start">
      {/* User Avatar */}
      {comment.user.profile.url ? (
        <Image
          source={{ uri: comment.user.profile.url }}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
        />
      ) : (
        <View className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
          <Text className="text-gray-700 font-bold text-lg">
            {comment.user.name[0]}
          </Text>
        </View>
      )}

      {/* Comment Content */}
      <View className="flex-1">
        <Text className="font-semibold text-gray-900">{comment.user.name}</Text>
        <Text className="text-gray-700">{comment.content}</Text>

        {/* Comment Actions */}
        <View className="flex-row mt-2 space-x-4">
          <View className="flex-row items-center">
            <AntDesign name="like1" size={18} color="gray" />
            <Text className="ml-1 text-gray-700">{comment.upvotes.length}</Text>
          </View>

          <View className="flex-row items-center">
            <AntDesign name="dislike1" size={18} color="gray" />
            <Text className="ml-1 text-gray-700">
              {comment.downvotes.length}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
