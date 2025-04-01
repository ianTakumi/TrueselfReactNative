import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native";
import React from "react";

type ProfilePictureProps = {
  name?: string;
  imageUrl?: string;
  size?: number;
};

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  name = "?",
  imageUrl = "",
  size = 30,
}) => {
  const firstLetter = name?.charAt(0).toUpperCase() || "?"; // Default sa '?' kung wala

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: imageUrl ? "transparent" : "#CA99FF",
        },
      ]}
    >
      {imageUrl.trim() ? ( // Ensure hindi empty string
        <Image
          source={{ uri: imageUrl }}
          style={[
            styles.image,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />
      ) : (
        <Text style={[styles.text, { fontSize: size / 2 }]}>{firstLetter}</Text>
      )}
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  text: TextStyle;
  image: ImageStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    resizeMode: "cover",
  },
});

export default ProfilePicture;
