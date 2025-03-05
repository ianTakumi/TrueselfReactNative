import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { notifyToast } from "@/utils/helpers";
import { useRouter } from "expo-router";
import AxiosInstance from "@/utils/AxiosInstance";

type FormData = {
  email: string;
};

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    await AxiosInstance.post("/auth/resetPasswordMobile", data)
      .then((res) => {
        if (res.status === 200) {
          notifyToast(
            "Check Your Email",
            "We've sent you a code to reset your password. Please check your inbox.",
            "success"
          );
          reset();
          router.push({
            pathname: "/verifyCode",
            params: { email: data.email },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notifyToast("Error", "Something went wrong. Try again later.", "error");
      });
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-[#FAFAFA] px-5">
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-gray-800">
          Forgot Password
        </Text>
        <Text className="text-gray-600 mt-2 text-center">
          Enter your email to receive password reset instructions.
        </Text>
      </View>

      <View className="mb-4">
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg p-4 text-base"
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500 mt-2">{errors.email.message}</Text>
        )}
      </View>

      <TouchableOpacity
        className="bg-purple-400 py-4 rounded-lg items-center"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-lg font-semibold">Reset Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotPassword;
