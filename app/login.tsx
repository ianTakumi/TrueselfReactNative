import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { saveUser } from "./redux/slices/authSlices";
import { notifyToast } from "@/utils/helpers";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login Data:", data);
    await AxiosInstance.post("/auth/login", data).then((res) => {
      if (res.status === 200) {
        const user = res.data.user;
        const token = res.data.token;
        dispatch(
          saveUser({
            user: user,
            token: token,
          })
        );
        router.push("/users");
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="flex-1 justify-center items-center">
        {/* Illustration */}
        <Image
          source={require("../assets/images/login.png")}
          className="w-64 h-64 mb-4"
        />
        <Text className="text-2xl font-bold mb-6">Login</Text>

        {/* Email Input */}
        <View className="w-full mb-2">
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Email"
                className="border border-gray-300 p-3 rounded-md w-full"
                keyboardType="email-address"
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </Text>
          )}
        </View>

        {/* Password Input */}
        <View className="w-full mb-2">
          <View className="flex-row items-center border border-gray-300 p-3 rounded-md w-full">
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  className="flex-1"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <FontAwesome
                name={passwordVisible ? "eye-slash" : "eye"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </Text>
          )}
        </View>

        {/* Reset Password */}
        <Text
          className="text-right text-gray-500 self-end mb-4"
          onPress={() => router.push("/forgotPassword")}
        >
          Reset Password?
        </Text>

        {/* Login Button */}
        <TouchableOpacity
          className={`p-3 rounded-md mb-4 w-full ${
            isValid ? "bg-purple-400" : "bg-gray-300"
          }`}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center font-bold">Login</Text>
        </TouchableOpacity>

        {/* Social Login */}
        <View className="flex-row items-center my-4 w-full">
          <View className="flex-1 border-b border-gray-300" />
          <Text className="px-2 text-gray-500">Or</Text>
          <View className="flex-1 border-b border-gray-300" />
        </View>

        <TouchableOpacity className="flex-row items-center border border-red-400 p-3 rounded-md mb-3 w-full">
          <FontAwesome name="google" size={20} color="red" className="mr-2" />
          <Text className="text-red-400 text-center flex-1">Google</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center border border-blue-400 p-3 rounded-md w-full">
          <FontAwesome
            name="facebook"
            size={20}
            color="blue"
            className="mr-2"
          />
          <Text className="text-blue-400 text-center flex-1">Facebook</Text>
        </TouchableOpacity>

        {/* Register Link */}
        <Text className="text-center text-gray-500 mt-4">
          Don't have an account yet?{" "}
          <Text
            className="text-blue-500"
            onPress={() => router.push("/register")}
          >
            Register here
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
