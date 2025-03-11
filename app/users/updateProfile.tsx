import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import ProfilePicture from "../../components/ProfilePicture";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "../redux/hooks";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../redux/hooks";
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  genderIdentityOptions,
  sexualOrientationOptions,
  pronounsOptions,
  notifyToast,
  isValidPhilippineNumber,
} from "@/utils/helpers";
import { LinearGradient } from "expo-linear-gradient";

const updateProfile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: user.data?.name,
      email: user.data?.email,
      phoneNumber: user.data?.phoneNumber,
      dob: null,
      genderIdentity: user.data?.genderIdentity,
      sexualOrientation: user.data?.sexualOrientation,
      pronouns: user.data?.pronouns,
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
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

  useEffect(() => {
    if (user.data) {
      setValue("genderIdentity", user.data.genderIdentity);
      setValue("sexualOrientation", user.data.sexualOrientation);
      setValue("pronouns", user.data.pronouns);
    }
  }, [user.data, setValue]);

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Curved Header */}
      <View className="relative h-56">
        <LinearGradient
          colors={["#E0C3FC", "#8E44AD"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="h-full w-full justify-center "
          style={{
            height: "100%",
            width: "100%",
            borderBottomRightRadius: 9999,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }}
        >
          <Text className="absolute top-28 left-6 text-white text-2xl font-bold self-start">
            Update Profile
          </Text>
        </LinearGradient>
      </View>

      <View className="mb-8 mt-10 px-5 w-full">
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
        {errors.name?.message && (
          <Text className="text-red-500 mt-1">
            {String(errors.name.message)}
          </Text>
        )}
      </View>

      <View className="mb-8 px-5 w-full">
        <Text className="text-black text-base mb-2 font-bold ">Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className=" p-3 border border-gray-300 rounded "
              placeholder="Email"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email?.message && (
          <Text className="text-red-500 mt-1">
            {String(errors.email.message)}
          </Text>
        )}
      </View>

      <View className="mb-8 px-5 w-full">
        <Text className="text-black text-base mb-2 font-bold ">
          Phone Number
        </Text>
        <Controller
          control={control}
          name="phoneNumber"
          rules={{ required: "Phone Number is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className=" p-3 border border-gray-300 rounded "
              placeholder="Phone Number"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.phoneNumber?.message && (
          <Text className="text-red-500 mt-1">
            {String(errors.phoneNumber.message)}
          </Text>
        )}
      </View>

      <View className="mb-8 px-5 w-full">
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
              setSelected={(selected: any) => {
                setValue("genderIdentity", selected);
                onChange(selected);
              }}
              placeholder="Select your gender identity"
              defaultOption={genderIdentityOptions
                .map((option) => ({ key: option.value, value: option.value })) // Ensure correct format
                .find((option) => option.value === value)}
            />
          )}
        />

        {errors.genderIdentity?.message && (
          <Text className="text-red-500 mt-1">
            {String(errors.genderIdentity.message)}
          </Text>
        )}
      </View>

      <View className="mb-8 px-5 w-full">
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
              setSelected={(selected: any) => {
                setValue("sexualOrientation", selected);
                onChange(selected);
              }}
              placeholder="Select your sexual orientation"
              inputStyles={{ width: "100%", paddingHorizontal: 10 }}
              defaultOption={sexualOrientationOptions
                .map((option) => ({ key: option.value, value: option.value })) // Ensure correct format
                .find((option) => option.value === value)}
            />
          )}
        />
        {errors.sexualOrientation?.message && (
          <Text className="text-red-500 mt-1">
            {String(errors.sexualOrientation.message)}
          </Text>
        )}
      </View>

      <View className="mb-8 px-5 w-full">
        <Text className="text-black text-base mb-2 font-bold">Pronouns</Text>
        <Controller
          control={control}
          rules={{ required: "Pronouns are required" }}
          name="pronouns"
          render={({ field: { onChange, value } }) => (
            <SelectList
              data={pronounsOptions}
              setSelected={(selected: any) => {
                setValue("pronouns", selected);
                onChange(selected);
              }}
              placeholder="Select your pronouns"
              inputStyles={{ width: "100%", paddingHorizontal: 10 }}
              defaultOption={pronounsOptions
                .map((option) => ({ key: option.value, value: option.value })) // Ensure correct format
                .find((option) => option.value === value)}
            />
          )}
        />

        {errors.pronouns?.message && (
          <Text className="text-red-500 mt-1">
            {String(errors.pronouns.message)}
          </Text>
        )}
      </View>
      <View className="mb-8 px-5 w-full">
        <TouchableOpacity
          onPress={() => router.push("/users/ChangePassword")}
          className="border-2 border-purple-600 py-3 rounded-lg items-center active:bg-purple-100"
        >
          <Text className="text-purple-600 font-semibold text-lg">
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default updateProfile;
