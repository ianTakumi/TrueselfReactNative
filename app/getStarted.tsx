import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { loadUser } from "./redux/slices/authSlices";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export default function GetStarted() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const isAuthenticated = useAppSelector(
    (state) => state.auth.user.isAuthenticated
  );

  console.log(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated === null) return;
    console.log(isAuthenticated);
    setLoading(false);

    if (isAuthenticated) {
      router.push("/users");
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-surface_a0">
        <Image
          source={require("../assets/images/adaptive-icon.png")}
          style={{ width: 300, height: 300 }}
        />
        <Text className="text-white text-2xl">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] p-8">
      <View className="flex-1 justify-center items-center">
        {/* Logo */}
        <Image
          source={require("../assets/images/logo/trueself5.png")}
          className="w-40 h-40 mb-10 object-contain"
        />

        {/* App Title */}
        <Text
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: "Raleway-Regular" }}
        >
          Welcome to True Self
        </Text>

        {/* Instruction Text */}
        <Text
          className="text-base text-center mb-10"
          style={{ fontFamily: "Raleway-Regular" }}
        >
          Discover and track your journey to self-discovery. Get started now to
          explore your full potential!
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          className="bg-[#D6A9D1] py-3 px-6 rounded-2xl"
          onPress={() => router.push("/login")} // Navigate to login screen
        >
          <Text
            className="text-white font-bold text-lg text-center"
            style={{ fontFamily: "Raleway-Regular" }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
