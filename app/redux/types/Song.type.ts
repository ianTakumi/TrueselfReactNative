import { ImageSourcePropType } from "react-native";
import { AVPlaybackSource } from "expo-av";

export interface Song {
  title: string;
  src: AVPlaybackSource;
  pic: ImageSourcePropType;
}
