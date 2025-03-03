import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNotifications } from "react-native-notificated";

import { useFonts } from "expo-font";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import store from "./redux/store";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { MusicProvider } from "./contexts/MusicContext";
import "@/global.css";

const { NotificationsProvider } = createNotifications();
const fetchFonts = () => {
  return Font.loadAsync({
    "Raleway-Regular": require("../assets/fonts/Raleway-VariableFont_wght.ttf"),
    "Raleway-Italic": require("../assets/fonts/Raleway-Italic-VariableFont_wght.ttf"),
  });
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await fetchFonts(); // Load fonts
        setFontsLoaded(true); // Fonts loaded successfully
        await SplashScreen.hideAsync(); // Hide SplashScreen
      } catch (error) {
        console.warn("Error loading fonts: ", error);
      }
    };

    loadFonts();
  }, []);

  // Show nothing until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <MusicProvider>
        <GestureHandlerRootView>
          <NotificationsProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="users" options={{ headerShown: false }} />
              <Stack.Screen name="admin" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="getStarted"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen
                name="forgotPassword"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="resetPassword"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="verifyCode"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="profile" options={{ headerShown: false }} />
              <Stack.Screen
                name="updateProfile"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AllAnxietyResults"
                options={{ headerShown: false }}
              />
            </Stack>
            <StatusBar style="light" />
          </NotificationsProvider>
        </GestureHandlerRootView>
      </MusicProvider>
    </Provider>
  );
}
