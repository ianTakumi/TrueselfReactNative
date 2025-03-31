import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from "react-native";

const SelfCare = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView className="mx-6 my-4">
        <Text className="text-2xl font-bold text-center mt-10 mb-6">
          Self-Care Practices for LGBTQIA+ Individuals
        </Text>

        <Image
          source={require("../../assets/images/articles/selfCare.png")}
          className="w-full h-48 rounded-lg mb-6"
          resizeMode="cover"
        />

        <Text className="text-gray-700 text-base leading-relaxed">
          Mental and emotional well-being is vital, especially for those facing
          marginalization. Practicing self-care strategies can improve overall
          health and resilience.
        </Text>

        <Text className="text-xl font-bold mt-8 mb-3">
          Mindfulness and Meditation Techniques
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed">
          Mindfulness and meditation are powerful tools for managing stress and
          enhancing self-awareness. Engaging in daily mindfulness exercises,
          such as body scans or guided meditations, can help center the mind and
          reduce anxiety.
        </Text>

        <TouchableOpacity
          onPress={() => Linking.openURL("https://insighttimer.com")}
        >
          <Text className="text-blue-500 underline mt-2">
            Explore guided meditations on Insight Timer
          </Text>
        </TouchableOpacity>

        <Text className="text-gray-700 text-base leading-relaxed mt-4">
          Reflecting on the colors of the Pride flag through meditation can
          foster a sense of self-acceptance and connection to the LGBTQIA+
          community.
        </Text>

        <Text className="text-xl font-bold mt-8 mb-3">
          Creating Safe and Affirming Spaces
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed">
          Establishing an environment where you feel safe and validated is
          crucial for mental health. Personalizing your space with symbols and
          colors that resonate with your identity can be a daily affirmation of
          self-worth.
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed mt-4">
          Connecting with supportive communities, both online and offline, can
          provide a sense of belonging and understanding.
        </Text>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.includedhealth.com/lgbtq-care")
          }
        >
          <Text className="text-blue-500 underline mt-2">
            Find LGBTQ+ health and support at Included Health
          </Text>
        </TouchableOpacity>

        <Text className="text-xl font-bold mt-8 mb-3">
          The Power of Chosen Families
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed">
          Chosen families—networks of friends and loved ones who provide
          support—play a significant role in the lives of many LGBTQIA+
          individuals. Cultivating these relationships can offer emotional
          support, reduce feelings of isolation, and enhance overall well-being.
        </Text>

        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.luminarycounseling.com")}
        >
          <Text className="text-blue-500 underline mt-2">
            Learn more about chosen families at Luminary Counseling
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelfCare;
