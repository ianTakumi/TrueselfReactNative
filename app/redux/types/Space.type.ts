import { ImageSourcePropType } from "react-native";

export interface Space {
  _id: string;
  name: string;
  description: string;
  mission: string;
  rules: string;
  createdBy: string;
  members: string[];
  status: string;
  banner: {
    url: string;
    public_id: string;
  };
  profile: {
    url: string;
    public_id: string;
  };
  createdAt: string;
  updatedAt: string;
}
