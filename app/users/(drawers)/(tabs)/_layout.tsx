import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "#63579F",
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "#63579F",
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Your Journal",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="notebook" size={24} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "#63579F",
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          title: "Mood Tracker",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="mood" size={24} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "#63579F",
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tabs.Screen
        name="anxietyTest"
        options={{
          title: "Anxiety Test",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="face-tired" size={24} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "#63579F",
          tabBarInactiveTintColor: "gray",
        }}
      />
    </Tabs>
  );
}
