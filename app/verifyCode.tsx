import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Vibration,
} from "react-native";
import { notifyToast } from "@/utils/helpers";
import { useRouter } from "expo-router";

const CODE_LENGTH = 6;

const VerifyCode = () => {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleCodeChange = (value: string, index: number) => {
    if (/^\d$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < CODE_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    if (code.includes("")) {
      notifyToast("Error", "Please enter the complete code", "error");
      Vibration.vibrate(200);
      return;
    }

    setLoading(true);
    const enteredCode = code.join("");

    setTimeout(() => {
      setLoading(false);
      if (enteredCode === "123456") {
        notifyToast("Success", "Code verified successfully", "success");
        router.push("/resetPassword");
      } else {
        notifyToast("Error", "Invalid verification code", "error");
        Vibration.vibrate(400);
      }
    }, 1500);
  };

  const handleResendCode = () => {
    setTimer(60);
    notifyToast("Info", "New code sent to your email", "info");
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-[#FAFAFA] px-5">
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-gray-800">Verify Code</Text>
        <Text className="text-gray-600 mt-2 text-center">
          Enter the 6-digit code sent to your email.
        </Text>
      </View>

      {/* Code Input */}
      <View className="flex-row justify-between mb-6">
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl bg-white shadow-md"
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleCodeChange(value, index)}
            onFocus={() => {
              const newCode = [...code];
              newCode[index] = "";
              setCode(newCode);
            }}
          />
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        className="bg-purple-400 py-4 rounded-lg items-center flex-row justify-center"
        onPress={handleVerify}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg font-semibold">Verify Code</Text>
        )}
      </TouchableOpacity>

      {/* Resend Code */}
      <View className="items-center mt-4">
        {timer > 0 ? (
          <Text className="text-gray-500">Resend code in {timer}s</Text>
        ) : (
          <TouchableOpacity onPress={handleResendCode}>
            <Text className="text-purple-500 font-semibold">Resend Code</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VerifyCode;
