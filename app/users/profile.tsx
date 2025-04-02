import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AxiosInstance from "@/utils/AxiosInstance";
import { notifyToast } from "@/utils/helpers";
import { updateUser } from "../redux/slices/authSlices";
import ProfilePost from "@/components/user/ProfilePost";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [profileImage, setProfileImage] = useState(
    user?.data?.profile?.url || null
  );

  const pickImage = async (fromCamera: boolean) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    // Convert image URI to Blob
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;

      const formData = new FormData();
      formData.append("profilePicture", {
        uri: result.assets[0].uri,
        name: `profilePicture-${user.data?._id}.jpg`,
        type: "image/jpeg",
      } as any);

      try {
        const res = await AxiosInstance.put(
          `/users/update-profile-picture/${user.data?._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (res.status === 200) {
          console.log("Profile Picture Updated");
          notifyToast(
            "Success",
            "Profile Picture Updated Successfully",
            "success"
          );

          const updatedUser = res.data.user;
          setProfileImage(updatedUser.profile.url); // Update state with new image URL
          dispatch(updateUser({ user: updatedUser }));
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="relative h-56">
          <LinearGradient
            colors={["#E0C3FC", "#8E44AD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="h-full w-full justify-center"
            style={{
              borderBottomLeftRadius: 9999,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
            }}
          >
            <View className="mx-5">
              <View className="mt-10 mb-3 flex flex-row-reverse items-center relative">
                <View className="relative">
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      className="w-24 h-24 rounded-full"
                    />
                  ) : (
                    <View className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center">
                      <Text className="text-white text-3xl font-bold">
                        {user?.data?.name?.charAt(0).toUpperCase() || "U"}
                      </Text>
                    </View>
                  )}

                  {/* Camera Icon */}
                  <TouchableOpacity
                    className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md"
                    onPress={() => pickImage(false)}
                  >
                    <Ionicons name="camera" size={20} color="#8E44AD" />
                  </TouchableOpacity>
                </View>

                <View className="mr-10">
                  <Text className="text-black font-bold text-2xl mb-1">
                    {user?.data?.name || "User"}
                  </Text>
                  <Text className="text-black">15 following</Text>
                </View>
              </View>

              <View className="flex flex-row-reverse items-center">
                <TouchableOpacity
                  className="bg-white/30 border border-white rounded-full p-2 w-16 mx-2"
                  onPress={() => router.push("/users/updateProfile")}
                >
                  <Text className="text-white text-center font-bold">Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View className="p-4 bg-gray-100 min-h-screen">
          <ProfilePost />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
