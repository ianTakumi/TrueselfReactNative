import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "@/utils/AxiosInstance";
import { notifyToast } from "@/utils/helpers";

const VerifyEmail = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const cleanedData = {
      email,
      otp: data.code,
    };
    try {
      const response = await AxiosInstance.post("/auth/verifyOTP", cleanedData);
      if (response.status === 200) {
        console.log("Email verified successfully");
        notifyToast("Email verified successfully", "success", "success");
      } else if (response.status === 400) {
        notifyToast("Invalid code", "error", "error");
      } else if (response.status === 410) {
        notifyToast("Code expired, please request a new one", "error", "error");
      }

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] items-center p-6">
      <Text className="text-xl font-bold mt-10">Verify your email</Text>
      <Image
        source={require("../assets/svg/verify/email.png")}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
          marginTop: 20,
        }}
      />
      <Text className="text-gray-600 text-center mt-4">
        Enter the 6-digit code we sent to your email.
      </Text>

      <Controller
        control={control}
        name="code"
        rules={{
          required: "Verification code is required",
          minLength: { value: 6, message: "Code must be 6 digits" },
          maxLength: { value: 6, message: "Code must be 6 digits" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: errors.code ? "red" : "#ddd",
              borderRadius: 10,
              textAlign: "center",
              fontSize: 18,
              letterSpacing: 5,
              padding: 10,
              marginTop: 20,
              width: "60%",
              backgroundColor: "#fff",
            }}
            keyboardType="number-pad"
            maxLength={6}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.code && (
        <Text className="text-red-500 mt-2">
          {typeof errors.code.message === "string"
            ? errors.code.message
            : "Invalid code"}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-blue-500 p-3 rounded-xl mt-5 w-1/2"
      >
        <Text className="text-white text-center text-lg">Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VerifyEmail;
