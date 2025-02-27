import { ImageSourcePropType } from "react-native";
export interface Affirmation {
  id: number;
  title: string;
  description: string;
  image?: ImageSourcePropType;
  url: string;
}
