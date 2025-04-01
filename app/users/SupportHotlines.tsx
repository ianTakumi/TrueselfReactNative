import React from "react";
import { SafeAreaView, Text, View, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const hotlines = [
  {
    name: "NCMH Crisis Hotline",
    landline: "1553",
    mobile: "0917-899-8727",
    imagePath: require("../../assets/images/CrisisSupport/NCMH.png"),
  },
  {
    name: "Hopeline Philippines",
    landline: "(02) 8804-4673",
    mobile: "0917-558-4673",
    imagePath: require("../../assets/images/CrisisSupport/hopeLine.jpg"),
  },
  {
    name: "Manila Lifeline Centre",
    landline: "(02) 896-9191",
    mobile: "0917-854-9191",
    imagePath: require("../../assets/images/CrisisSupport/Lifeline.webp"),
  },
  {
    name: "In Touch Community Services",
    landline: "(02) 893-7603",
    mobile: "0917-800-1123 / 0922-893-8944",
    imagePath: require("../../assets/images/CrisisSupport/inTouch.png"),
  },
  {
    name: "Western Visayas Suicide Prevention Hotline",
    landline: "1-800-10-333-8336",
    mobile: "0998-532-4047",
    imagePath: require("../../assets/images/CrisisSupport/westernVisayas.png"),
  },
];

export default function SupportHotlines() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
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
          }}
        >
          <Text
            style={{
              position: "absolute",
              top: 112,
              left: 24,
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Crisis Support Hotlines
          </Text>
        </LinearGradient>
      </View>

      <FlatList
        data={hotlines}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-lg shadow-md p-4 mb-4 flex-row items-center">
            <Image
              source={item.imagePath}
              className="w-16 h-16 rounded-lg mr-4"
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#333",
                  flexShrink: 1,
                  flexWrap: "wrap",
                }}
              >
                {item.name}
              </Text>
              <Text style={{ fontSize: 14, color: "#666" }}>
                Landline: {item.landline}
              </Text>
              <Text style={{ fontSize: 14, color: "#666" }}>
                Mobile: {item.mobile}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
