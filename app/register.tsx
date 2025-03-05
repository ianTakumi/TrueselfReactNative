import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  genderIdentityOptions,
  sexualOrientationOptions,
  pronounsOptions,
  notifyToast,
  isValidPhilippineNumber,
} from "@/utils/helpers";
import dayjs from "dayjs";
import AxiosInstance from "@/utils/AxiosInstance";

interface RegisterFormData {
  name: string;
  email: string;
  phoneNumber: string;
  dob: string;
  genderIdentity: string;
  pronouns: string;
  sexualOrientation: string;
  password: string;

  confirmPassword: string;
}

const Register: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const router = useRouter();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

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

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data);

    await AxiosInstance.post("/auth/registerMobile", data).then((res) => {
      if (res.status === 201) {
        notifyToast(
          "Registration Suc cessful",
          "You have successfully registered",
          "success"
        );
        router.push({
          pathname: "/verifyEmail",
          params: { email: data.email },
        });
      }
    });
  };

  const checkUniqueEmail = async (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      notifyToast("Email is required", "Please enter your email", "info");
      return false;
    }

    if (!emailRegex.test(email)) {
      notifyToast(
        "Invalid email format",
        "Please enter a valid email",
        "error"
      );
      return false;
    }

    try {
      const res = await AxiosInstance.get(`/auth/check-email/${email}`);

      if (res.status === 200) {
        return true;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        return false;
      }
    }

    return false;
  };

  const checkUniquePhoneNumber = async (phoneNumber: string) => {
    if (!isValidPhilippineNumber(phoneNumber)) {
      return false;
    }

    if (!phoneNumber) {
      notifyToast("Email is required", "Please enter your email", "info");
      return false;
    }

    try {
      const res = await AxiosInstance.get(`/auth/check-phone/${phoneNumber}`);

      if (res.status === 200) {
        return true;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        return false;
      }
    }
    return false;
  };

  return (
    <ScrollView
      className="flex-1  p-5 bg-[#FAFAFA]"
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View className="my-10">
        <Image
          source={require("../assets/images/register.png")}
          className="w-52 h-52 "
        />
        <Text className="text-2xl font-bold text-center">Register</Text>
      </View>

      {/* Social Login Buttons */}
      <TouchableOpacity className="flex-row items-center border border-red-400 p-3 rounded-md mb-3 w-full">
        <FontAwesome name="google" size={20} color="red" className="mr-2" />
        <Text className="text-red-400 text-center flex-1">Google</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center border border-blue-400 p-3 rounded-md w-full mb-5">
        <FontAwesome name="facebook" size={20} color="blue" className="mr-2" />
        <Text className="text-blue-400 text-center flex-1">Facebook</Text>
      </TouchableOpacity>

      <View className="flex-row items-center my-8 w-full">
        <View className="flex-1 border-b border-gray-300" />
        <Text className="px-2 text-gray-500">Or</Text>
        <View className="flex-1 border-b border-gray-300" />
      </View>

      {/* Form Inputs */}
      <View className="mb-8 w-full">
        <Text className="text-black text-base mb-2 font-bold ">Name</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className=" p-3 border border-gray-300 rounded "
              placeholder="Name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && (
          <Text className="text-red-500 mt-1">{errors.name.message}</Text>
        )}
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
            validate: async (value) => {
              return (await checkUniqueEmail(value)) || "Email already exists";
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="p-3 border border-gray-300 rounded"
              placeholder="Email"
              keyboardType="email-address"
              value={value}
              onChangeText={async (text) => {
                onChange(text); // Update form state
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
                  await checkUniqueEmail(text); // Check uniqueness only if format is valid
                }
              }}
              onBlur={async () => {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  await checkUniqueEmail(value);
                }
              }}
            />
          )}
        />

        {errors.email && (
          <Text className="text-red-500 mt-1">{errors.email.message}</Text>
        )}
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">
          Phone Number
        </Text>
        <Controller
          control={control}
          name="phoneNumber"
          rules={{
            required: "Phone Number is required",
            validate: async (value) => {
              return (
                (await checkUniquePhoneNumber(value)) || "Phone already exists"
              );
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="p-3 border border-gray-300 rounded "
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.phoneNumber && (
          <Text className="text-red-500 mt-1">
            {errors.phoneNumber.message}
          </Text>
        )}
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">
          Date of Birth
        </Text>
        <Controller
          control={control}
          name="dob"
          rules={{ required: "Date of Birth is required" }}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                onPress={() => setDatePickerVisible(true)}
                className="border border-gray-300 p-3 rounded-md"
              >
                <Text className={value ? "text-black" : "text-gray-400"}>
                  {value ? new Date(value).toDateString() : "Select a date"}
                </Text>
              </TouchableOpacity>

              {isDatePickerVisible && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()} // Ensure value is a valid Date
                  onChange={(event, date) => {
                    setDatePickerVisible(false); // Hide picker after selection
                    if (date) {
                      onChange(date.toISOString()); // Save as ISO string to avoid issues
                    }
                  }}
                  display="spinner"
                  mode="date"
                />
              )}
            </>
          )}
        />
        {errors.dob && (
          <Text className="text-red-500 mt-1">{errors.dob.message}</Text>
        )}
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">
          Gender Identity
        </Text>
        <Controller
          control={control}
          name="genderIdentity"
          rules={{ required: "Gender Identity is required" }}
          render={({ field: { onChange, value } }) => (
            <SelectList
              data={genderIdentityOptions}
              setSelected={onChange}
              placeholder="Select your gender identity"
              inputStyles={{ width: "100%", paddingHorizontal: 10 }}
            />
          )}
        />
        {errors.genderIdentity && (
          <Text className="text-red-500 mt-1">
            {errors.genderIdentity.message}
          </Text>
        )}
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">
          Sexual Orientation
        </Text>
        <Controller
          control={control}
          rules={{ required: "Sexual Orientation is required" }}
          name="sexualOrientation"
          render={({ field: { onChange, value } }) => (
            <SelectList
              data={sexualOrientationOptions}
              setSelected={onChange}
              placeholder="Select your sexual orientation"
              inputStyles={{ width: "100%", paddingHorizontal: 10 }}
            />
          )}
        />
        {errors.sexualOrientation && (
          <Text className="text-red-500 mt-1">
            {errors.sexualOrientation.message}
          </Text>
        )}
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">Pronouns</Text>
        <Controller
          control={control}
          rules={{ required: "Pronouns are required" }}
          name="pronouns"
          render={({ field: { onChange, value } }) => (
            <SelectList
              data={pronounsOptions}
              setSelected={onChange}
              placeholder="Select your pronouns"
              inputStyles={{ width: "100%", paddingHorizontal: 10 }}
            />
          )}
        />
        {errors.pronouns && (
          <Text className="text-red-500 mt-1">{errors.pronouns.message}</Text>
        )}
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">Password</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, value } }) => (
            <View className=" p-3 border border-gray-300 rounded  flex-row items-center">
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
        {errors.password && (
          <Text className="text-red-500 mt-1">{errors.password.message}</Text>
        )}
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">
          Confirm Password
        </Text>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{ required: "Confirm Password is required" }}
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
                onPress={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
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
        {errors.confirmPassword && (
          <Text className="text-red-500 mt-1">
            {errors.confirmPassword.message}
          </Text>
        )}
      </View>

      <TouchableOpacity
        className="w-full bg-purple-300 p-4 rounded items-center"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-lg">Submit</Text>
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
    </ScrollView>
  );
};

export default Register;
