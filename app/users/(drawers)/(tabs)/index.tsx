import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../../../redux/hooks";
import { createNotifications } from "react-native-notificated";
import { RootState } from "../../../redux/store";
import { notifyToast } from "../../../../utils/helpers";

export default function IndexPage() {
  const user = useAppSelector((state: RootState) => state.auth.user);

  const handleNotify = () => {
    notifyToast("Welcome back!", `Nice to see you again `, "success");
  };

  return <SafeAreaView className="flex-1 px-4 bg-[#FAFAFA]"></SafeAreaView>;
}
