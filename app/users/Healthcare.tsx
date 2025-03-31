import React from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";

const Healthcare = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView className="mx-6 my-4">
        {/* Title */}
        <Text className="text-2xl font-bold text-center mt-10 mb-6">
          Bridging the Healthcare Gap for LGBTQIA+ Individuals
        </Text>

        {/* Image */}
        <Image
          source={require("../../assets/images/articles/healthcare.png")}
          className="w-full h-48 rounded-lg mb-6"
          resizeMode="cover"
        />

        {/* Introduction */}
        <Text className="text-gray-700 text-base leading-relaxed">
          Access to quality healthcare is a fundamental right, yet LGBTQIA+
          individuals often face significant barriers in medical settings.
          Discrimination, stigma, and a lack of knowledgeable providers
          contribute to health disparities. Implementing LGBTQIA+ competency
          training for medical professionals can significantly improve
          healthcare experiences and patient outcomes.
        </Text>

        {/* Section: Inclusive Healthcare */}
        <Text className="text-xl font-bold mt-8 mb-3">
          The Importance of LGBTQIA+ Inclusive Healthcare
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed">
          Creating an inclusive healthcare environment ensures LGBTQIA+
          individuals feel safe and respected when seeking medical care.
          Negative experiences—such as discrimination or lack of understanding
          from providers—often lead to avoidance of healthcare, resulting in
          delayed diagnoses and treatment.
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed mt-4">
          Inclusive healthcare means recognizing and addressing the unique needs
          of LGBTQIA+ patients by:
        </Text>

        <View className="mt-3">
          {[
            "Using correct pronouns and inclusive language",
            "Understanding specific health risks",
            "Providing culturally competent care",
            "Offering screenings and treatments tailored to LGBTQIA+ needs",
          ].map((item, index) => (
            <Text key={index} className="text-gray-700 text-base ml-4">
              • {item}
            </Text>
          ))}
        </View>

        {/* Section: Health Disparities */}
        <Text className="text-xl font-bold mt-8 mb-3">
          Common Health Disparities Faced by LGBTQIA+ Individuals
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed">
          LGBTQIA+ individuals experience higher health disparities compared to
          their heterosexual and cisgender counterparts:
        </Text>

        <View className="mt-3">
          {[
            {
              title: "Mental Health:",
              description:
                "Higher rates of depression, anxiety, and suicidal ideation due to societal stigma and discrimination.",
            },
            {
              title: "Substance Use:",
              description:
                "Increased rates of smoking, alcohol, and drug use as coping mechanisms for stress and discrimination.",
            },
            {
              title: "Chronic Conditions:",
              description:
                "Higher risk of chronic diseases due to limited access to preventive care and screenings.",
            },
          ].map((item, index) => (
            <View key={index} className="mt-4">
              <Text className="text-gray-700 font-bold">• {item.title}</Text>
              <Text className="text-gray-700 text-base ml-4">
                {item.description}
              </Text>
            </View>
          ))}
        </View>

        {/* Bottom spacing */}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Healthcare;
