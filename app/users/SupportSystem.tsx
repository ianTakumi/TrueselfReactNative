import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";

const SupportSystem = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView className="mx-6 my-4">
        <Text className="text-2xl font-bold text-center mt-10 mb-6">
          Breaking the Silence: Support Systems for LGBTQIA+ Survivors of
          Domestic Abuse
        </Text>

        <Image
          source={require("../../assets/images/articles/supportSystem.png")}
          className="w-full h-48 rounded-lg mb-6"
          resizeMode="cover"
        />

        <Text className="text-gray-700 text-base leading-relaxed">
          Survivors of domestic abuse within the LGBTQIA+ community often face
          unique challenges, including stigma, discrimination, and a lack of
          tailored support services. Establishing inclusive support systems is
          essential for their healing journey and empowerment.
        </Text>

        <Text className="text-xl font-bold mt-8 mb-3">
          The Role of Community Support
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed">
          Community support plays a pivotal role in assisting LGBTQIA+
          survivors. Inclusive organizations provide safe spaces where
          individuals can share experiences without fear of judgment. For
          instance, The Network/La Red offers a 24-hour confidential hotline
          delivering emotional support, information, referrals, safety planning,
          and crisis intervention specifically for LGBTQ+ individuals.Tnlr.
        </Text>
        <Text className="text-gray-700 text-base leading-relaxed">
          Additionally, the LGBTQ Domestic Violence Awareness Foundation works
          to break down barriers to accessing help by promoting awareness and
          education tailored to LGBTQ+ communities.DVA Foundation.
        </Text>

        <Text className="text-xl font-bold mt-8 mb-3">
          Legal Protections Available
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed">
          Understanding legal rights is crucial for survivors seeking justice
          and protection. The Violence Against Women Act (VAWA) in the United
          States, despite its name, supports all survivors of intimate partner
          violence, domestic violence, sexual assault, or stalking. Since 2013,
          VAWA prohibits discrimination based on sex, sexual orientation, and
          gender identity, ensuring that LGBTQ+ individuals have the right to
          access help regardless of their gender or sexual orientation.Trans
          Equality.
        </Text>
        <Text className="text-gray-700 text-base leading-relaxed">
          Legal access projects, such as those provided by the American Bar
          Association, offer individualized support, training, and technical
          assistance to address domestic and sexual violence in LGBTQI+
          communities.American Bar Association.
        </Text>

        <Text className="text-xl font-bold mt-8 mb-3">
          Steps Toward Healing and Empowerment
        </Text>
        <Text className="text-gray-700 text-base leading-relaxed">
          Healing from domestic abuse is a multifaceted process that involves:
        </Text>
        <Text className="text-gray-700 text-base leading-relaxed mt-2">
          • <Text className="font-bold">Accessing Support Services:</Text>{" "}
          Engaging with organizations that offer counseling, support groups, and
          emergency assistance can provide immediate relief and long-term coping
          strategies.
        </Text>
        <Text className="text-gray-700 text-base leading-relaxed mt-2">
          • <Text className="font-bold">Legal Advocacy:</Text> Pursuing legal
          action can be empowering, helping survivors regain a sense of control
          and secure necessary protections.
        </Text>
        <Text className="text-gray-700 text-base leading-relaxed mt-2">
          • <Text className="font-bold">Building Support Networks:</Text>{" "}
          Connecting with others who have similar experiences fosters a sense of
          community and reduces feelings of isolation.
        </Text>
        <Text className="text-gray-700 text-base leading-relaxed mt-2">
          • <Text className="font-bold">Self-Care and Mental Health:</Text>{" "}
          Prioritizing mental health through therapy, mindfulness practices, and
          self-care routines is essential for recovery.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupportSystem;
