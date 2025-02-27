import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import AxiosInstance from "@/utils/AxiosInstance";
import { notifyToast } from "@/utils/helpers";
import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { moodImages } from "@/utils/helpers";
import dayjs from "dayjs";

type MoodData = Record<string, string>; // { "2025-02-26": "Happy", "2025-02-27": "Sad" }

const MoodCalendar: React.FC = () => {
  const [mood, setMood] = useState<MoodData>({});
  const [selectedDate, setSelectedDate] = useState<string>("");
  const user = useAppSelector((state: RootState) => state.auth.user);
  const userId = user.data?._id;
  const [currentDate, setCurrentDate] = useState(dayjs());

  // Fetch mood data for the selected month & year
  const fetchMoodData = async (month: number, year: number) => {
    try {
      const res = await AxiosInstance.get(`/moodEntries/moodPerDay/${userId}`, {
        params: { month, year },
      });

      if (res.status === 200) {
        const transformedData: MoodData = res.data.reduce(
          (acc: MoodData, entry: { date: string; mood: string }) => {
            acc[entry.date] = entry.mood;
            return acc;
          },
          {}
        );

        setMood(transformedData);
      }
    } catch (error) {
      notifyToast("Failed to fetch mood data", "error", "error");
      console.error(error);
    }
  };

  useEffect(() => {
    const month = currentDate.month() + 1;
    const year = currentDate.year();
    fetchMoodData(month, year);
  }, [currentDate]);

  return (
    <View>
      <Calendar
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: "#6C63FF",
          },
        }}
        theme={{
          selectedDayBackgroundColor: "#6C63FF",
          todayTextColor: "#6C63FF",
          arrowColor: "#6C63FF",
        }}
        dayComponent={({ date }: { date: DateData }) => {
          const moodType = mood[date.dateString];

          return (
            <View style={{ alignItems: "center" }}>
              <Text>{date.day}</Text>
              {moodType && (
                <Image
                  source={moodImages[moodType]}
                  style={{ width: 20, height: 20, marginTop: 5 }}
                  resizeMode="contain"
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default MoodCalendar;
