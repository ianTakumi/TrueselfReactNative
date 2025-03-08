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

      <Text className="text-gray-700">
        Domestic abuse is a pervasive issue that affects individuals across all
        communities, including those within the LGBTQIA+ spectrum. However,
        LGBTQIA+ individuals often encounter unique barriers when seeking help,
        making it imperative to understand the distinct dynamics of abuse in
        these relationships. Recognizing the various forms of abuse and being
        aware of available resources are crucial steps toward ensuring safety
        and well-being.
      </Text>

      <Text className="text-xl font-bold mt-6 mb-2">
        Recognizing Abuse Beyond Physical Violence
      </Text>

      <Text className="text-gray-700">
        Abuse in relationships extends beyond physical harm and can manifest in
        multiple ways:
      </Text>

      <View className="mt-4 space-y-2">
        {[
          [
            "Emotional Abuse",
            "Constant criticism, humiliation, or undermining self-worth.",
          ],
          [
            "Financial Control",
            "Restricting access to financial resources, monitoring spending, or preventing employment.",
          ],
          [
            "Isolation",
            "Limiting contact with friends, family, or support networks to increase dependence.",
          ],
          [
            "Identity Exploitation",
            "Threatening to disclose a partner's sexual orientation or gender identity without consent.",
          ],
          [
            "Digital Surveillance",
            "Monitoring communications, tracking movements, or controlling online interactions.",
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

      <Text className="text-gray-700">
        Power dynamics in LGBTQIA+ relationships can be influenced by external
        societal pressures and internalized stigma. Factors contributing to
        these dynamics include:
      </Text>

      <View className="mt-4 space-y-2">
        {[
          [
            "Societal Discrimination",
            "External homophobia or transphobia can exacerbate feelings of isolation.",
          ],
          [
            "Internalized Stigma",
            "Negative beliefs about one's own identity can lower self-esteem.",
          ],
          [
            "Lack of Legal Recognition",
            "Victims may have limited access to legal protections.",
          ],
          [
            "Community Visibility",
            "Fear of damaging the LGBTQIA+ community’s reputation can deter individuals from reporting abuse.",
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

      <Text className="text-gray-700">
        Numerous organizations assist LGBTQIA+ individuals experiencing domestic
        abuse:
      </Text>

      <View className="mt-4 space-y-2">
        {[
          [
            "National Coalition of Anti-Violence Programs (NCAVP)",
            "Works to prevent and respond to all forms of violence against LGBTQIA+ communities.",
          ],
          [
            "Community United Against Violence (CUAV)",
            "Offers support groups and counseling for same-sex domestic violence survivors.",
          ],
          [
            "LGBTQ Domestic Violence Awareness Foundation",
            "Provides education and resources to break down barriers to accessing help.",
          ],
        ].map(([title, description], index) => (
          <Text key={index} className="text-gray-700">
            <Text className="font-bold">{title}:</Text> {description}
          </Text>
        ))}
      </View>

      <TouchableOpacity className="mt-4">
        <Text className="text-blue-500 underline">
          Visit DCVLP for more resources
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DomesticAbuse;
