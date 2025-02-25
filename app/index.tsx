import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { loadUser } from "./redux/slices/authSlices";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const steps = [
    {
      image: require("../assets/images/welcome/first.png"),
      title: "Take Control of Your Anxiety",
      description:
        "Our AI-powered predictor analyzes your anxiety levels and helps you understand its severity. Take the first step toward a calmer mind.",
      screenBg: "bg-[#5555E2]",
      imageBg: "bg-[#6B6CF4]",
    },
    {
      image: require("../assets/images/welcome/second.png"),
      title: "Journal Your Feelings",
      description:
        "Express your thoughts and track your moods daily to gain deeper self-awareness and emotional clarity.",
      screenBg: "bg-[#F9AE41]",
      imageBg: "bg-[#FDC165]",
    },
    {
      image: require("../assets/images/welcome/third.png"),
      title: "Join the Community",
      description:
        "Engage with others, share experiences, and find support in a safe and understanding forum.",
      screenBg: "bg-[#5555E2]",
      imageBg: "bg-[#6B6CF4]",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/getStarted"); // Redirect to the getStarted screen
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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
    <View className="flex-1 bg-white justify-center items-center px-6">
      {/* Image */}
      <Image source={steps[currentStep].image} className="w-64 h-64" />

      {/* Title */}
      <Text
        className="text-black text-2xl font-bold text-center mt-6"
        style={{ fontFamily: "Raleway-Regular" }}
      >
        {steps[currentStep].title}
      </Text>

      {/* Description */}
      <Text
        className="text-gray-500 text-lg text-center mt-2 "
        style={{ fontFamily: "Raleway-Regular" }}
      >
        {steps[currentStep].description}
      </Text>

      {/* Pagination Dots */}
      <View className="flex-row mt-6">
        {steps.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-6 mx-1 rounded-full ${
              index === currentStep ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View className="absolute bottom-10 flex-row w-full px-6 justify-between">
        {/* Show Back Button only if NOT on the first step */}
        {currentStep > 0 && (
          <TouchableOpacity onPress={handleBack}>
            <Text className="text-gray-500 font-semibold text-lg">Back</Text>
          </TouchableOpacity>
        )}

        {/* Next Button (Align Right if Back Button Exists, Center if Not) */}
        <TouchableOpacity
          onPress={handleNext}
          className={currentStep === 0 ? "self-end w-full flex items-end" : ""}
        >
          <Text className="text-[#C8A2C8] font-semibold text-lg">
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
