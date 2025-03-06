import React, { useState } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import ProfilePicture from "../../components/ProfilePicture";
import AxiosInstance from "@/utils/AxiosInstance";
import { useAppSelector } from "../redux/hooks";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../redux/hooks";
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";

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
      name: "",
      email: "",
      phoneNumber: "",
      dob: null,
      gender: "",
    },
  });

  return (
    <SafeAreaView>
      <Text className="text-black"> Update Profile</Text>
    </SafeAreaView>
  );
};

export default updateProfile;
