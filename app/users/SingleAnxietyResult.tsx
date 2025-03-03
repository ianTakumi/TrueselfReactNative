import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { notifyToast } from "@/utils/helpers";
import AxiosInstance from "@/utils/AxiosInstance";
import { AnxietyPrediction } from "../redux/types/AnxietyPrediction.type";
import { useAppSelector } from "../redux/hooks";
import dayjs from "dayjs";
import { useRouter } from "expo-router";

const SingleAnxietyResult = () => {
  const { id } = useLocalSearchParams();
  const [anxietyResult, setAnxietyResult] = useState<AnxietyPrediction | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user.data?._id;
  const router = useRouter();

  const fetchAnxietyResult = async () => {
    try {
      const response = await AxiosInstance.get(`/anxietyPredictions/${id}`);

      if (response.status === 200) {
        setAnxietyResult(response.data.anxietyPrediction);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnxietyResult();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <Text className="text-xl font-bold">Result</Text>
    </SafeAreaView>
  );
};

export default SingleAnxietyResult;
