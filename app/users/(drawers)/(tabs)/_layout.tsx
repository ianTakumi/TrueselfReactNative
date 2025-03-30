import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { BlurView } from "expo-blur";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

export default function TabLayout() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: isKeyboardVisible
          ? { display: "none" }
          : {
              borderTopWidth: 0,
              elevation: 5,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
            },
        tabBarActiveTintColor: "#63579F",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView intensity={50} tint="light" style={{ flex: 1 }} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="people-group" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Your Journal",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="notebook" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          title: "Mood Tracker",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="mood" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="anxietyTest"
        options={{
          title: "Anxiety Test",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="face-tired" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
