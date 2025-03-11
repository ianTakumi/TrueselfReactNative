import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import AxiosInstance from "@/utils/AxiosInstance";
import { useRouter } from "expo-router";
import { notifyToast } from "@/utils/helpers";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const { newPassword, confirmPassword, currentPassword } = data;

    const cleanedData = {
      newPassword,
      confirmPassword,
      currentPassword,
    };

    await AxiosInstance.put(`/auth/changePassword/${userId}`, cleanedData).then(
      (response) => {
        if (response.status === 200) {
          notifyToast("Success!", "Password updated successfully!", "success");
          reset();
          router.push("/users/updateProfile");
        }
      }
    );

    console.log(cleanedData);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] ">
      <View className="relative h-56">
        <LinearGradient
          colors={["#E0C3FC", "#8E44AD"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="h-full w-full justify-center "
          style={{
            height: "100%",
            width: "100%",
            borderBottomLeftRadius: 9999,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }}
        >
          <Text className="absolute top-28 right-6 text-white text-2xl font-bold self-start">
            Change Password
          </Text>
        </LinearGradient>
      </View>

      {/* Current Password */}
      <View className="mt-10 mb-4 relative px-5">
        <Text className="text-lg mb-2 font-bold text-gray-800">
          Current Password
        </Text>
        <Controller
          control={control}
          name="currentPassword"
          rules={{
            required: "Current password is required",
          }}
          render={({ field: { onChange, value } }) => (
            <View className="relative shadow-sm">
              <TextInput
                className="border border-gray-300 rounded-lg p-4 pr-12 text-base bg-white"
                placeholder="Current Password"
                placeholderTextColor="#999"
                secureTextEntry={!showCurrentPassword}
                value={value}
                onChangeText={onChange}
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowCurrentPassword((prev) => !prev)}
              >
                <Ionicons
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.currentPassword && (
          <Text className="text-red-500 mt-2">
            {errors.currentPassword.message}
          </Text>
        )}
      </View>
      {/* New Password */}
      <View className="mb-4 relative px-5 ">
        <Text className="text-lg mb-2 font-bold text-gray-800">
          New Password
        </Text>

        <Controller
          control={control}
          name="newPassword"
          rules={{
            required: "New password is required",
          }}
          render={({ field: { onChange, value } }) => (
            <View className="relative shadow-sm">
              <TextInput
                className="border border-gray-300 rounded-lg p-4 pr-12 text-base bg-white"
                placeholder="New Password"
                placeholderTextColor="#999"
                secureTextEntry={!showNewPassword}
                value={value}
                onChangeText={onChange}
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowNewPassword((prev) => !prev)}
              >
                <Ionicons
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.newPassword && (
          <Text className="text-red-500 mt-2">
            {errors.newPassword.message}
          </Text>
        )}
      </View>

      {/* Change Password */}
      <View className="mb-4 relative px-5">
        <Text className="text-lg mb-2 font-bold text-gray-800">
          Confirm Password
        </Text>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Please confirm your password",
            validate: (value) => {
              return value === watch("newPassword") || "Passwords do not match";
            },
          }}
          render={({ field: { onChange, value } }) => (
            <View className="relative shadow-sm">
              <TextInput
                className="border border-gray-300 rounded-lg p-4 pr-12 text-base bg-white"
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
                value={value}
                onChangeText={onChange}
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowConfirmPassword((prev) => !prev)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.confirmPassword && (
          <Text className="text-red-500 mt-2">
            {errors.confirmPassword.message}
          </Text>
        )}
      </View>

      <View className="mb-8 mt-5 px-5 w-full">
        <TouchableOpacity
          className="border-2 border-purple-600 py-3 rounded-lg items-center active:bg-purple-100"
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-purple-600 font-semibold text-lg">
              Change Password
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
