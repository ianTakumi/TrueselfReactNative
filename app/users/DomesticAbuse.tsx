import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const DomesticAbuse = () => {
  return (
    <ScrollView className="p-6 bg-white rounded-lg shadow-md my-10">
      <Text className="text-2xl font-bold text-center mb-4">
        Recognizing Domestic Abuse in LGBTQIA+ Relationships
      </Text>

      <Image
        source={require("../../assets/images/articles/domesticAbuse.png")}
        className="w-full h-48 rounded-lg mb-4"
        resizeMode="cover"
      />

      <Text className="text-gray-700 leading-6">
        Domestic abuse is a pervasive issue affecting individuals across all
        communities, including the LGBTQIA+ spectrum. However, LGBTQIA+
        individuals often encounter unique barriers when seeking help, making it
        imperative to understand the distinct dynamics of abuse in these
        relationships. Recognizing different forms of abuse and knowing
        available resources are crucial steps toward ensuring safety and
        well-being.
      </Text>

      <Text className="text-xl font-bold mt-6 mb-2">
        Recognizing Abuse Beyond Physical Violence
      </Text>

      <Text className="text-gray-700 leading-6">
        Abuse in relationships extends beyond physical harm and can manifest in
        multiple ways:
      </Text>

      <View className="mt-4 space-y-2">
        {[
          [
            "Emotional Abuse",
            "Constant criticism, humiliation, or manipulation.",
          ],
          ["Financial Control", "Restricting access to money or employment."],
          [
            "Isolation",
            "Limiting contact with friends, family, or support groups.",
          ],
          [
            "Identity Exploitation",
            "Threatening to disclose a partner’s identity.",
          ],
          [
            "Digital Surveillance",
            "Tracking movements and monitoring communication.",
          ],
        ].map(([title, description], index) => (
          <Text key={index} className="text-gray-700">
            <Text className="font-bold">{title}:</Text> {description}
          </Text>
        ))}
      </View>

      <Text className="text-xl font-bold mt-6 mb-2">
        How Power Dynamics Affect LGBTQIA+ Relationships
      </Text>

      <Text className="text-gray-700 leading-6">
        Power dynamics in LGBTQIA+ relationships can be influenced by external
        societal pressures and internalized stigma. Factors include:
      </Text>

      <View className="mt-4 space-y-2">
        {[
          [
            "Societal Discrimination",
            "External homophobia or transphobia can increase isolation.",
          ],
          [
            "Internalized Stigma",
            "Negative beliefs about identity can lower self-esteem.",
          ],
          [
            "Lack of Legal Recognition",
            "Limited access to legal protections for victims.",
          ],
          [
            "Community Visibility",
            "Fear of harming the LGBTQIA+ community’s image.",
          ],
        ].map(([title, description], index) => (
          <Text key={index} className="text-gray-700">
            <Text className="font-bold">{title}:</Text> {description}
          </Text>
        ))}
      </View>

      <Text className="text-xl font-bold mt-6 mb-2">
        Available Support Services
      </Text>

      <Text className="text-gray-700 leading-6">
        Various organizations assist LGBTQIA+ individuals experiencing domestic
        abuse:
      </Text>

      <View className="mt-4 space-y-2">
        {[
          [
            "National Coalition of Anti-Violence Programs (NCAVP)",
            "Works to prevent violence against LGBTQIA+ communities.",
          ],
          [
            "Community United Against Violence (CUAV)",
            "Offers support groups and counseling for survivors.",
          ],
          [
            "LGBTQ Domestic Violence Awareness Foundation",
            "Provides education and resources to access help.",
          ],
        ].map(([title, description], index) => (
          <Text key={index} className="text-gray-700">
            <Text className="font-bold">{title}:</Text> {description}
          </Text>
        ))}
      </View>

      <TouchableOpacity className="mt-6">
        <Text className="text-blue-500 underline text-center">
          Visit DCVLP for more resources
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DomesticAbuse;
