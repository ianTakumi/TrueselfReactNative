import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AxiosInstance from "@/utils/AxiosInstance";
import { notifyToast } from "@/utils/helpers";
import { Space } from "@/app/redux/types/Space.type";
import { useRouter } from "expo-router";
import dayjs from "dayjs";

const Search = () => {
  const [communities, setCommunities] = useState<Space[]>([]);
  const router = useRouter();
  const fetchCommunities = async () => {
    await AxiosInstance.get("/spaces")
      .then((res) => {
        setCommunities(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        notifyToast("Error", "Failed to fetch communities", "error");
      });
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <SafeAreaView className="bg-[#FAFAFA] flex-1 px-4">
      {/* Communities List */}
      <View>
        <Text className="text-lg font-bold">Communities</Text>
      </View>
      <FlatList
        data={communities}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex flex-row items-center p-4 bg-white rounded-xl shadow-sm mt-4"
            onPress={() =>
              router.push({
                pathname: "/users/SingleCommunity",
                params: { id: item._id },
              })
            }
          >
            <Image
              source={{ uri: item.profile.url }}
              className="w-14 h-14 rounded-lg"
            />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text className="text-xs text-gray-500">
                Created: {dayjs(item.createdAt).format("MMMM D, YYYY")}
              </Text>
              <Text className="text-sm text-gray-600">
                {item.members.length} members
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
