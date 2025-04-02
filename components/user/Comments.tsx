import React, { useState, useEffect } from "react";
import AxiosInstance from "@/utils/AxiosInstance";
import { notifyToast } from "@/utils/helpers";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { Comment } from "@/app/redux/types/Comment.type";
import { useAppSelector } from "@/app/redux/hooks";

interface CommentsProps {
  postId: string;
  refresh: any;
  setRefresh: any;
}

export default function Comments({
  postId,
  refresh,
  setRefresh,
}: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <SafeAreaView className="flex-1 p-4 bg-[#F3F4F6]">
      {loading ? (
        <ActivityIndicator size="large" color="#63579F" />
      ) : comments.length === 0 ? (
        <Text className="text-center text-gray-600 mt-4">No comments yet.</Text>
      ) : (
        <FlatList
          data={comments.filter((comment) => !comment.parentComment)}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CommentCard
              comment={item}
              fetchComments={fetchComments}
              postId={postId}
              comments={comments}
              level={0}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

interface CommentCardProps {
  comment: Comment;
  fetchComments: () => Promise<void>;
  level?: number;
  isReply?: boolean;
  postId: string;
  comments: Comment[];
}

const CommentCard = ({
  comment,
  fetchComments,
  level = 0,
  isReply = false,
  postId,
  comments,
}: CommentCardProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const isCurrentUserComment = comment.user._id === user.data?._id;
  const maxIndent = 3;

  const handleDeleteComment = async (commentId: string) => {
    setIsDeleting(true);
    try {
      await AxiosInstance.delete(`/comments/${commentId}`);
      notifyToast("Success", "Comment deleted", "success");
      await fetchComments();
    } catch (error) {
      notifyToast("Error", "Failed to delete", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReply = async (postId: string, commentId: string) => {
    setIsReplying(true);
    if (!replyText.trim()) return;

    await AxiosInstance.post(
      `/comments/${user.data?._id}/${postId}/${commentId}`,
      {
        content: replyText,
      }
    )
      .then((res) => {
        if (res.status === 201) {
          notifyToast("Success", "Reply added", "success");
          setReplyText("");
          fetchComments();
        }
      })
      .catch((err) => {
        console.log(err);
        notifyToast("Error", "Failed to add reply", "error");
      })
      .finally(() => {
        setIsReplying(false);
      });
  };

  const nestedComments = comments.filter(
    (childComment) => childComment.parentComment === comment._id
  );

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <View
      className={`bg-white rounded-lg mb-4 shadow-md ${isReply ? "ml-4" : ""}`}
      style={{
        marginLeft: level > 0 ? Math.min(level, maxIndent) * 12 : 0,
        borderLeftWidth: isReply ? 2 : 0,
        borderLeftColor: isReply ? "#e5e7eb" : "transparent",
      }}
    >
      <View className="p-4">
        {/* Header */}
        <View className="flex-row justify-between mb-2">
          <View className="flex-row items-center">
            {comment.user.profile?.url ? (
              <Image
                source={{ uri: comment.user.profile.url }}
                className="w-10 h-10 rounded-full mr-3"
              />
            ) : (
              <View className="w-10 h-10 bg-gray-200 rounded-full mr-3 justify-center items-center">
                <Text className="text-gray-600 font-medium text-lg">
                  {comment.user.name[0]}
                </Text>
              </View>
            )}
            <View>
              <Text className="font-medium text-gray-900">
                {comment.user.name}
              </Text>
              <Text className="text-gray-500 text-xs">
                {new Date(comment.createdAt).toLocaleString()}
              </Text>
            </View>
          </View>

          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={() => setIsReplying(!isReplying)}
              className="p-1"
            >
              <Feather
                name="message-circle"
                size={20}
                color={isReplying ? "#63579F" : "#9ca3af"}
              />
            </TouchableOpacity>

            {isCurrentUserComment && (
              <TouchableOpacity
                onPress={() => handleDeleteComment(comment._id)}
                disabled={isDeleting}
                className="p-1"
              >
                {isDeleting ? (
                  <ActivityIndicator size="small" color="#ef4444" />
                ) : (
                  <AntDesign name="close" size={20} color="#9ca3af" />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Content */}
        <Text className="text-gray-700 text-base mt-1">{comment.content}</Text>

        {/* Actions */}
        <View className="flex-row items-center mt-3">
          <TouchableOpacity className="flex-row items-center mr-5">
            <MaterialIcons name="thumb-up" size={20} color="#9ca3af" />
            <Text className="text-gray-500 text-xs ml-1">
              {comment.upvotes?.length || 0}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center mr-5">
            <MaterialIcons name="thumb-down" size={20} color="#9ca3af" />
            <Text className="text-gray-500 text-xs ml-1">
              {comment.downvotes?.length || 0}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reply Input */}
        {isReplying && (
          <View className="mt-3 flex-row items-center">
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg p-2 mr-2 bg-gray-50"
              placeholder="Write a reply..."
              value={replyText}
              onChangeText={setReplyText}
              multiline
            />
            <TouchableOpacity
              onPress={() => handleReply(postId, comment._id)}
              disabled={!replyText.trim()}
              className={`p-2 rounded-lg ${
                replyText.trim() ? "bg-[#63579F]" : "bg-gray-300"
              }`}
            >
              <Text className="text-white">Reply</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {nestedComments.length > 0 && (
        <TouchableOpacity
          onPress={toggleReplies}
          className="px-4 py-2 border-t border-gray-200 flex-row items-center"
        >
          <Feather
            name={showReplies ? "chevron-up" : "chevron-down"}
            size={20}
            color="#63579F"
          />
          <Text className="text-[#63579F] text-xs ml-2">
            {nestedComments.length}{" "}
            {nestedComments.length > 1 ? "replies" : "reply"}
          </Text>
        </TouchableOpacity>
      )}
      {showReplies &&
        nestedComments.map((nestedComment) => (
          <CommentCard
            key={nestedComment._id}
            comment={nestedComment}
            fetchComments={fetchComments}
            postId={postId}
            comments={comments}
            level={level + 1}
            isReply
          />
        ))}
    </View>
  );
};
