import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../redux/hooks";
import { useRouter } from "expo-router";
import ProfilePicture from "@/components/ProfilePicture";
const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const handleRedirectToProfile = () => {
    router.push("/users/updateProfile");
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#fdfbfb", "#ebedee"]}
        className="flex-1 items-center p-5"
      >
        <View className="mx-5">
          <View className="my-10  flex flex-row items-center">
            <ProfilePicture
              name={user.data?.name}
              imageUrl={user.data?.profile.url}
              size={100}
            />
            <View className="ml-5">
              <Text className="text-black font-bold text-2xl mb-1">
                {user.data?.name || "User"}
              </Text>

              <Text className="text-black">15 following</Text>
            </View>
          </View>
          <TouchableOpacity
            className="bg-transparent border border-[#63579F] rounded-full p-2 w-16 mx-2"
            onPress={handleRedirectToProfile}
          >
            <Text className="text-black text-center font-bold">Edit</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Profile;
