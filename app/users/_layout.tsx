import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(drawers)" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="updateProfile"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen name="SingleMood" options={{ headerShown: false }} />
      <Stack.Screen
        name="EditMood"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="Moods"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="Journals"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="SingleJournal"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="AnxietyResults"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen name="SingleAffirmation" options={{ headerShown: false }} />
      <Stack.Screen name="JournalForm" options={{ headerShown: false }} />
      <Stack.Screen name="MoodForm" options={{ headerShown: false }} />
    </Stack>
  );
}
