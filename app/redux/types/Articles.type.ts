import { ImageSourcePropType } from "react-native";

export interface Article {
  id: number;
  title: string;
  image: ImageSourcePropType;
  filename: string;
}
