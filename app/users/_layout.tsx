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
      <Stack.Screen name="Result" options={{ headerShown: false }} />
      <Stack.Screen name="DomesticAbuse" options={{ headerShown: false }} />
      <Stack.Screen name="Recommend" options={{ headerShown: false }} />
      <Stack.Screen name="ChangePassword" options={{ headerShown: false }} />
      <Stack.Screen name="SingleCommunity" options={{ headerShown: false }} />
      <Stack.Screen name="SinglePost" options={{ headerShown: false }} />
      <Stack.Screen name="EditPost" options={{ headerShown: false }} />
      <Stack.Screen name="EditJournalForm" options={{ headerShown: false }} />
      <Stack.Screen name="Healthcare" options={{ headerShown: false }} />
      <Stack.Screen name="MentalHealth" options={{ headerShown: false }} />
      <Stack.Screen name="SelfCare" options={{ headerShown: false }} />
      <Stack.Screen name="SupportSystem" options={{ headerShown: false }} />
      <Stack.Screen name="SupportHotlines" options={{ headerShown: false }} />
    </Stack>
  );
}
