import React from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Vision() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <View style={{ position: "relative", height: 224 }}>
        <LinearGradient
          colors={["#E0C3FC", "#8E44AD"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            height: "100%",
            width: "100%",
            borderBottomRightRadius: 9999,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            justifyContent: "center",
            paddingHorizontal: 24,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 26,
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            TrueSelf's Mission
          </Text>
        </LinearGradient>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            color: "#333",
            textAlign: "center",
            lineHeight: 26,
          }}
        >
          We envision TrueSelf as a leader in mental health technology, where UX
          design meets empathy. By leveraging human-centered design, our goal is
          to create a safe and interactive space where users feel heard,
          supported, and motivated to improve their mental well-being through an
          intuitive and aesthetically pleasing digital experience.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
