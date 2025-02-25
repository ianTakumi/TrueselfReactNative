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

interface RegisterFormData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <SafeAreaView className="flex-1 items-center p-5  bg-white">
      <View className="my-10">
        <Image
          source={require("../assets/images/register.png")}
          className="w-52 h-52 "
        />
        <Text className="text-2xl font-bold text-center">Register</Text>
      </View>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="w-full p-3 border border-gray-300 rounded mb-3"
            placeholder="Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="w-full p-3 border border-gray-300 rounded mb-3"
            placeholder="Email"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="w-full p-3 border border-gray-300 rounded mb-3"
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View className="w-full p-3 border border-gray-300 rounded mb-3 flex-row items-center">
            <TextInput
              className="flex-1"
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              value={value}
              onChangeText={onChange}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <FontAwesome
                name={passwordVisible ? "eye" : "eye-slash"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <View className="w-full p-3 border border-gray-300 rounded mb-3 flex-row items-center">
            <TextInput
              className="flex-1"
              placeholder="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
              value={value}
              onChangeText={onChange}
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <FontAwesome
                name={confirmPasswordVisible ? "eye" : "eye-slash"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity className="w-full bg-purple-300 p-4 rounded items-center">
        <Text className="text-white text-lg">Submit</Text>
      </TouchableOpacity>

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
        <FontAwesome name="facebook" size={20} color="blue" className="mr-2" />
        <Text className="text-blue-400 text-center flex-1">Facebook</Text>
      </TouchableOpacity>
      <Text className="mt-5 text-sm">
        Already have an account?{" "}
        <Text
          className="text-purple-300 font-bold"
          onPress={() => {
            router.navigate("/login");
          }}
        >
          Login here
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default Register;
