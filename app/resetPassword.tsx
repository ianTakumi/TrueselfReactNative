import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { notifyToast } from "@/utils/helpers";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();
  const router = useRouter();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: FormData) => {
    const { newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      notifyToast("Error", "Passwords do not match", "error");
      return;
    }

    notifyToast("Success", "Password has been reset successfully", "success");
    reset();

    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-center px-5"
      >
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-800">
            Reset Password
          </Text>
          <Text className="text-gray-600 mt-2 text-center">
            Enter your new password below.
          </Text>
        </View>

        {/* New Password */}
        <View className="mb-4 relative">
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
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

        {/* Confirm Password */}
        <View className="mb-4 relative">
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
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

        {/* Submit Button */}
        <TouchableOpacity
          className={`${
            isSubmitting ? "bg-purple-300" : "bg-purple-500"
          } py-4 rounded-lg items-center flex-row justify-center shadow-md`}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-lg font-semibold">
              Reset Password
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;
