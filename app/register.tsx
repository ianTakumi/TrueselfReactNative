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
import DateTimePicker, { getDefaultStyles } from "react-native-ui-datepicker";
import DatePicker from "react-native-date-picker";

import {
  genderIdentityOptions,
  sexualOrientationOptions,
  pronounsOptions,
} from "@/utils/helpers";
import dayjs from "dayjs";

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
  const defaultStyles = getDefaultStyles();
  const [open, setOpen] = useState(false);

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
          render={({ field: { onChange, value } }) => (
            <TextInput
              className=" p-3 border border-gray-300 rounded "
              placeholder="Name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className=" p-3 border border-gray-300 rounded "
              placeholder="Email"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">
          Phone Number
        </Text>
        <Controller
          control={control}
          name="phoneNumber"
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
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">
          Date of Birth
        </Text>
        <Controller
          control={control}
          name="dob"
          defaultValue={dayjs().format("YYYY-MM-DD")} // Ensures an initial date value
          render={({ field: { onChange, value } }) => {
            // Ensure value is always a Date
            const selectedDate = value ? new Date(value) : new Date();

            return (
              <>
                <TouchableOpacity
                  className="border border-gray-300 p-3 rounded-md"
                  onPress={() => setOpen(true)}
                >
                  <Text className="text-black">
                    {selectedDate.toDateString()}
                  </Text>
                </TouchableOpacity>

                <DatePicker
                  modal
                  open={open}
                  date={selectedDate}
                  mode="date"
                  onConfirm={(date: Date) => {
                    setOpen(false);
                    onChange(date);
                  }}
                  onCancel={() => setOpen(false)}
                />
              </>
            );
          }}
        />
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">
          Gender Identity
        </Text>
        <Controller
          control={control}
          name="genderIdentity"
          render={({ field: { onChange, value } }) => (
            <SelectList
              data={genderIdentityOptions}
              setSelected={onChange}
              placeholder="Select your gender identity"
              inputStyles={{ width: "100%", paddingHorizontal: 10 }}
            />
          )}
        />
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">
          Sexual Orientation
        </Text>
        <Controller
          control={control}
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
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">Pronouns</Text>
        <Controller
          control={control}
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
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">Password</Text>
        <Controller
          control={control}
          name="password"
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
      </View>

      <View className="w-full mb-8">
        <Text className="text-black text-base mb-2 font-bold">
          Confirm Password
        </Text>
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
      </View>

      <TouchableOpacity className="w-full bg-purple-300 p-4 rounded items-center">
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
