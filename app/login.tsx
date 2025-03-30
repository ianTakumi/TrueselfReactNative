import React, { useState, useEffect } from "react";
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
import { registerForPushNotificationsAsync } from "../utils/NotificationRegister";

// import * as Google from "expo-auth-session/providers/google";
// import { makeRedirectUri } from "expo-auth-session";
// import * as AuthSession from "expo-auth-session";
// import { GoogleSignin, User } from "@react-native-google-signin/google-signin";

interface LoginFormData {
  email: string;
  password: string;
  expoPushToken: string;
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

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId:
  //     "963960399942-4a8fa07vv8al5eps7h3s1ujf941jsd0s.apps.googleusercontent.com",
  //   scopes: ["profile", "email"],
  // });

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       "88082402864-3vh119j0eivtmm0v24ulhno23ng3roa2.apps.googleusercontent.com",
  //   });
  // }, []);

  // async function onGoogleButtonPress() {
  //   try {
  //     console.log("Google button pressed");

  //     // Check if device has Google Play Services
  //     await GoogleSignin.hasPlayServices({
  //       showPlayServicesUpdateDialog: true,
  //     });
  //     console.log("Google Play Services available");

  //     // Start the sign-in process
  //     const signInResult = await GoogleSignin.signIn();
  //     console.log("Sign-in result:", signInResult);

  //     // // Extract the ID token
  //     // const idToken = signInResult.data?.idToken;
  //     // console.log("ID Token:", idToken);

  //     // // Check if the ID token is available
  //     // if (!idToken) {
  //     //   throw new Error("No ID token found");
  //     // }
  //   } catch (error: any) {
  //     // Enhanced error logging
  //     console.error("Error during Google sign-in:", error);
  //     console.error("Error details:", {
  //       message: error.message,
  //       code: error.code,
  //       stack: error.stack,
  //       originalError: error,
  //     });

  //     // Handle specific errors
  //     if (error.code === "DEVELOPER_ERROR") {
  //       console.error(
  //         "DEVELOPER_ERROR: Ensure the webClientId and SHA-1 are configured correctly in Firebase."
  //       );
  //     } else if (error.code === "SIGN_IN_CANCELLED") {
  //       console.error(
  //         "SIGN_IN_CANCELLED: User cancelled the Google sign-in process."
  //       );
  //     } else if (error.code === "NETWORK_ERROR") {
  //       console.error("NETWORK_ERROR: Check your internet connection.");
  //     } else {
  //       console.error("An unexpected error occurred.");
  //     }

  //     // Optionally re-throw for higher-level handling
  //     throw error;
  //   }
  // }

  const onSubmit = async (data: LoginFormData) => {
    const expoPushToken = await registerForPushNotificationsAsync();
    data = { ...data, expoPushToken: expoPushToken ?? "" };

    await AxiosInstance.post("/auth/loginMobile", data).then((res) => {
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
        {/* <View className="flex-row items-center my-4 w-full">
          <View className="flex-1 border-b border-gray-300" />
          <Text className="px-2 text-gray-500">Or</Text>
          <View className="flex-1 border-b border-gray-300" />
        </View> */}

        {/* <TouchableOpacity
          className="flex-row items-center border border-red-400 p-3 rounded-md mb-3 w-full"
          // onPress={() => onGoogleButtonPress()}
        >
          <FontAwesome name="google" size={20} color="red" className="mr-2" />
          <Text className="text-red-400 text-center flex-1">Google</Text>
        </TouchableOpacity> */}

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
