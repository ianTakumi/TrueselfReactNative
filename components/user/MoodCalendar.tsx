import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import AxiosInstance from "@/utils/AxiosInstance";
import { notifyToast } from "@/utils/helpers";
import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { moodImages } from "@/utils/helpers";
import dayjs from "dayjs";

type MoodData = Record<string, string>;

const MoodCalendar: React.FC = () => {
  const [mood, setMood] = useState<MoodData>({});
  const [selectedDate, setSelectedDate] = useState<string>("");
  const user = useAppSelector((state: RootState) => state.auth.user);
  const userId = user.data?._id;
  const [currentDate, setCurrentDate] = useState(dayjs());
  const scaleAnim = new Animated.Value(1); // Animation for selection

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

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);

    // Animate the selection
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
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
          textDayFontWeight: "bold",
          textMonthFontWeight: "bold",
          textDayHeaderFontSize: 14,
        }}
        dayComponent={({ date }: { date: DateData }) => {
          const moodType = mood[date.dateString];
          const isSelected = selectedDate === date.dateString;

          return (
            <TouchableOpacity onPress={() => handleDayPress(date)}>
              <Animated.View
                style={[
                  styles.dayContainer,
                  isSelected && styles.selectedDay,
                  { transform: [{ scale: isSelected ? scaleAnim : 1 }] },
                ]}
              >
                <Text
                  style={[styles.dayText, isSelected && styles.selectedDayText]}
                >
                  {date.day}
                </Text>
                {moodType && (
                  <Image
                    source={moodImages[moodType]}
                    style={styles.moodIcon}
                    resizeMode="contain"
                  />
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectedDay: {
    backgroundColor: "#EDEBFF",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  selectedDayText: {
    color: "#6C63FF",
  },
  moodIcon: {
    width: 24,
    height: 24,
    marginTop: 5,
  },
});

export default MoodCalendar;
