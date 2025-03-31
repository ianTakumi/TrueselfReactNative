import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";

const MentalHealth = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView className="mx-6 my-4">
        {/* Title */}
        <Text className="text-2xl font-bold text-center mt-10 mb-6">
          Mental Health and the LGBTQIA+ Community
        </Text>

        {/* Image */}
        <Image
          source={require("../../assets/images/articles/mentalHealth.png")}
          className="w-full h-48 rounded-lg mb-6"
          resizeMode="cover"
        />

        <Text className="text-gray-700 text-base leading-relaxed">
          Mental health concerns are notably prevalent within the LGBTQIA+
          community, often stemming from experiences of stigma, discrimination,
          and a lack of supportive resources. Addressing these challenges
          through affirming therapy and robust community networks is essential
          for fostering mental well-being.
        </Text>

        <Text className="text-xl font-bold mt-8 mb-3">
          The Impact of Discrimination on Mental Health
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed">
          Discrimination against LGBTQIA+ individuals manifests in various areas
          of life, including:
        </Text>

        {/* Bullet Points */}
        <View className="mt-3">
          {[
            "Personal relationships and family rejection",
            "Employment and workplace discrimination",
            "Limited access to inclusive healthcare",
            "Housing insecurity and homelessness",
            "Harassment and peer bullying",
          ].map((item, index) => (
            <Text key={index} className="text-gray-700 text-base ml-4">
              • {item}
            </Text>
          ))}
        </View>

        <Text className="text-gray-700 text-base leading-relaxed mt-4">
          Such pervasive discrimination contributes to heightened levels of
          stress, anxiety, and depression. A study by the{" "}
          <Text
            className="text-blue-600"
            onPress={() => Linking.openURL("https://www.americanprogress.org")}
          >
            Center for American Progress
          </Text>{" "}
          highlights that many LGBTQIA+ individuals continue to face significant
          barriers to well-being due to systemic bias.
        </Text>

        {/* Section: Mental Health Disparities */}
        <Text className="text-xl font-bold mt-8 mb-3">
          LGBTQIA+ Mental Health Disparities
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed">
          Studies show that bisexual and transgender individuals report higher
          rates of mental health concerns compared to their heterosexual and
          cisgender counterparts. Contributing factors include:
        </Text>

        {/* Bullet Points */}
        <View className="mt-3">
          {[
            "Higher rates of family rejection",
            "Increased exposure to social stigma",
            "Greater vulnerability to violence and discrimination",
            "Limited access to affirming mental health care",
            "Higher risk of self-harm and suicidal ideation",
          ].map((item, index) => (
            <Text key={index} className="text-gray-700 text-base ml-4">
              • {item}
            </Text>
          ))}
        </View>

        <Text className="text-gray-700 text-base leading-relaxed mt-4">
          According to{" "}
          <Text
            className="text-blue-600"
            onPress={() => Linking.openURL("https://www.mhanational.org")}
          >
            Mental Health America
          </Text>
          , these challenges often lead to higher rates of substance abuse and
          emotional distress.
        </Text>

        {/* Section: Affirming Therapy */}
        <Text className="text-xl font-bold mt-8 mb-3">
          Importance of Affirming Therapy
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed">
          Affirming therapy plays a crucial role in addressing the unique mental
          health needs of LGBTQIA+ individuals. This approach:
        </Text>

        {/* Bullet Points */}
        <View className="mt-3">
          {[
            "Provides a supportive, non-judgmental space",
            "Validates sexual orientation and gender identity",
            "Encourages resilience against societal pressures",
            "Offers culturally competent care tailored to LGBTQIA+ experiences",
          ].map((item, index) => (
            <Text key={index} className="text-gray-700 text-base ml-4">
              • {item}
            </Text>
          ))}
        </View>

        <Text className="text-gray-700 text-base leading-relaxed mt-4">
          The{" "}
          <Text
            className="text-blue-600"
            onPress={() => Linking.openURL("https://www.nami.org")}
          >
            National Alliance on Mental Illness (NAMI)
          </Text>{" "}
          emphasizes the importance of seeking LGBTQIA+-affirming therapy to
          ensure individuals receive proper support.
        </Text>

        {/* Spacing at the bottom */}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MentalHealth;
