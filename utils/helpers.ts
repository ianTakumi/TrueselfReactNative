import { createNotifications } from "react-native-notificated";
import { ImageSourcePropType } from "react-native";

type NotificationStatus = "success" | "error" | "info" | "warning";
type Option = { value: string; label: string };
type MoodColors = Record<string, string>;

interface NotificationParams {
  title: string;
  description: string;
}

const { useNotifications } = createNotifications({
  isNotch: true,

  defaultStylesSettings: {
    darkMode: true,
    globalConfig: {
      borderRadius: 5000,
    },
  },
});

const { notify } = useNotifications();

export const sexualOrientationOptions: Option[] = [
  { value: "Lesbian", label: "Lesbian" },
  { value: "Gay", label: "Gay" },
  { value: "Bisexual", label: "Bisexual" },
  { value: "Pansexual", label: "Pansexual" },
  { value: "Asexual", label: "Asexual" },
  { value: "Aromantic", label: "Aromantic" },
  { value: "Demisexual", label: "Demisexual" },
  { value: "Demiromantic", label: "Demiromantic" },
  { value: "Heterosexual", label: "Heterosexual" },
  { value: "Homosexual", label: "Homosexual" },
  { value: "Queer", label: "Queer" },
  { value: "Questioning", label: "Questioning" },
  { value: "Polysexual", label: "Polysexual" },
  { value: "Androsexual", label: "Androsexual" },
  { value: "Gynosexual", label: "Gynosexual" },
  { value: "Skoliosexual", label: "Skoliosexual" },
  { value: "Omnisexual", label: "Omnisexual" },
  { value: "Graysexual", label: "Graysexual" },
  { value: "Grayromantic", label: "Grayromantic" },
  { value: "Allosexual", label: "Allosexual" },
];

export const genderIdentityOptions: Option[] = [
  { value: "Cisgender", label: "Cisgender" },
  { value: "Transgender", label: "Transgender" },
  { value: "Nonbinary", label: "Nonbinary" },
  { value: "Genderqueer", label: "Genderqueer" },
  { value: "Agender", label: "Agender" },
  { value: "Bigender", label: "Bigender" },
  { value: "Demiboy", label: "Demiboy" },
  { value: "Demigirl", label: "Demigirl" },
  { value: "Two-spirit", label: "Two-spirit" },
  { value: "Androgynous", label: "Androgynous" },
  { value: "Pangender", label: "Pangender" },
  { value: "Xenogender", label: "Xenogender" },
  { value: "Questioning", label: "Questioning" },
  { value: "Third Gender", label: "Third Gender" },
  { value: "Intersex", label: "Intersex" },
];

export const pronounsOptions: Option[] = [
  { value: "He/Him/His", label: "He/Him/His" },
  { value: "She/Her/Hers", label: "She/Her/Hers" },
  { value: "They/Them/Theirs", label: "They/Them/Theirs" },
  { value: "Ze/Zir/Zirs", label: "Ze/Zir/Zirs" },
  { value: "Xe/Xem/Xyrs", label: "Xe/Xem/Xyrs" },
  { value: "Ve/Vir/Vis", label: "Ve/Vir/Vis" },
  { value: "E/Em/Eirs", label: "E/Em/Eirs" },
  { value: "Ey/Em/Eir", label: "Ey/Em/Eir (Spivak Pronouns)" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

export const moodColors: MoodColors = {
  Happy: "#FDC700",
  Sad: "#51A2FF",
  Angry: "#FF6467",
  Neutral: "#99A1AF",
  Anxious: "#00D5BE",
};

export const moodGradients: Record<string, [string, string]> = {
  Happy: ["#FFE29F", "#FFA99F"],
  Sad: ["#89F7FE", "#66A6FF"],
  Angry: ["#FF5858", "#FBAB7E"],
  Anxious: ["#D3CCE3", "#E9E4F0"],
  Neutral: ["#E0EAFc", "#CFDEF3"],
};

export const moodImages: Record<string, ImageSourcePropType> = {
  Happy: require("@/assets/images/moods/smiley.png"),
  Sad: require("@/assets/images/moods/sad.png"),
  Angry: require("@/assets/images/moods/angry.png"),
  Anxious: require("@/assets/images/moods/anxious.png"),
  Neutral: require("@/assets/images/moods/neutral.png"),
};

export const notifyToast = (
  title: string,
  description: string,
  status: NotificationStatus
): void => {
  notify(status, {
    params: {
      title,
      description,
    } as NotificationParams,
  });
};
