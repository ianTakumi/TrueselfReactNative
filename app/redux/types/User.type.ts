import { SocialAccount } from "./SocialAccount.type";

export interface User {
  _id: string;
  name: string;
  date: string;
  email: string;
  phoneNumber: string;
  sexualOrientation: string;
  genderIdentity: string;
  pronouns: string;
  profile: {
    url: string;
    public_id: string;
  };
  role: string;
  spaces: string[];
  status: string;
  socialAccounts: SocialAccount[];
  token: string;
  expoPushToken: string;
  password: string;
}
