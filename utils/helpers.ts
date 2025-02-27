import { createNotifications } from "react-native-notificated";
import { ImageSourcePropType } from "react-native";
import { Song } from "@/app/redux/types/Song.type";
import { Affirmation } from "@/app/redux/types/Affirmations.type";

export const affirmations: Affirmation[] = [
  {
    id: 1,
    title: "Overall Health Affirmations",
    description:
      "A powerful collection of affirmations designed to promote physical, mental, and emotional well-being, reinforcing a healthy and balanced lifestyle.",
    url: "https://youtu.be/lLMVefQKyaE?si=eq59oIe04BSzIqjc",
    image: require("@/assets/images/affirmations/a-powerful-collection-of-affirmations-designed-to.png"),
  },
  {
    id: 2,
    title: "Trauma Healing Affirmations",
    description:
      "A soothing set of affirmations aimed at fostering emotional resilience, healing past wounds, and promoting inner peace.",
    url: "https://youtu.be/9H5Bre278BU?si=LWZTlcyiuyG4Lkqh",
    image: require("@/assets/images/affirmations/a-soothing-set-of-affirmations-aimed-at-fostering.png"),
  },
  {
    id: 3,
    title: "Confidence, Success, and Wealth Affirmations",
    description:
      "Motivational affirmations to boost self-confidence, attract success, and cultivate a mindset of abundance and financial prosperity.",
    url: "https://youtu.be/GvAl2Q5Oj8k?si=m2iwmamJiPBZbhlj",
    image: require("@/assets/images/affirmations/motivational-affirmations-to-boost-self-confidence.png"),
  },
  {
    id: 4,
    title: "Happiness and Blissful Life Affirmations",
    description:
      "A series of uplifting affirmations to invite joy, gratitude, and fulfillment into daily life, enhancing overall happiness.",
    url: "https://youtu.be/eMkNUWDylUY?si=mUnj9h4PBkFiVqJM",
    image: require("@/assets/images/affirmations/a-series-of-uplifting-affirmations-to-invite-joy.png"),
  },
  {
    id: 5,
    title: "Positive Thinking 'I AM' Affirmations",
    description:
      "Empowering 'I AM' statements designed to reshape thoughts, encourage self-belief, and cultivate a strong, positive mindset.",
    url: "https://youtu.be/14G0pl1-IRQ?si=C5i4EZFXdr1wo8MM",
    image: require("@/assets/images/affirmations/empowering--i-am--statements-designed-to-reshape-t.png"),
  },
  {
    id: 6,
    title: "Abundance Affirmations",
    description:
      "A set of affirmations to attract prosperity, financial success, and a life filled with unlimited possibilities and opportunities.",
    url: "https://youtu.be/HmjrC-A5l7o?si=1aPid1T2ZiWUZBKJ",
    image: require("@/assets/images/affirmations/a-set-of-affirmations-to-attract-prosperity--finan.png"),
  },
  {
    id: 7,
    title: "Self Love Affirmations",
    description:
      "Affirmations that nurture self-acceptance, compassion, and appreciation, fostering a deep sense of love and respect for oneself.",
    url: "https://youtu.be/_eU3nHz_e34?si=w_1Hole-erO2C0x1",
    image: require("@/assets/images/affirmations/affirmations-that-nurture-self-acceptance--compass.png"),
  },
  {
    id: 8,
    title: "Self Worth, Value, and Respect Affirmations",
    description:
      "Encouraging affirmations to reinforce personal worth, set healthy boundaries, and inspire self-respect and dignity.",
    url: "https://youtu.be/e35HHbd25ho?si=rCI9n2xDD-gckuWh",
    image: require("@/assets/images/affirmations/encouraging-affirmations-to-reinforce-personal-wor.png"),
  },
  {
    id: 9,
    title: "Self Concept Affirmations",
    description:
      "Affirmations crafted to help reshape self-identity, enhance self-esteem, and align personal beliefs with confidence and success.",
    url: "https://youtu.be/-wKJB-bSpL4?si=TZ8Qa1LwJgZe10kz",
    image: require("@/assets/images/affirmations/affirmations-crafted-to-help-reshape-self-identity.png"),
  },
  {
    id: 10,
    title: "Mental Clarity Affirmations",
    description:
      "Focused affirmations to improve concentration, clear mental fog, and promote a sharp, peaceful, and organized mind.",
    url: "https://youtu.be/U1bl5QslMLk?si=zoYw-HuKfueS9aSN",
    image: require("@/assets/images/affirmations/focused-affirmations-to-improve-concentration--cle.png"),
  },
];

export const songs: Song[] = [
  {
    title: "400HZ",
    src: require("@/assets/music/400HZ.mp3"),
    pic: require("@/assets/music/images/400hz.png"),
  },
  {
    title: "432HZ",
    src: require("@/assets/music/432HZMeditation.mp3"),
    pic: require("@/assets/music/images/432hz-meditation.png"),
  },
  {
    title: "Calming Music",
    src: require("@/assets/music/CalmingMusic.mp3"),
    pic: require("@/assets/music/images/calming-music.png"),
  },
  {
    title: "Classical Music",
    src: require("@/assets/music/ClassicalMusic.mp3"),
    pic: require("@/assets/music/images/classical-music.png"),
  },
  {
    title: "Deep Music",
    src: require("@/assets/music/DeepMusic.mp3"),
    pic: require("@/assets/music/images/deep-music.png"),
  },
  {
    title: "Meditation Music",
    src: require("@/assets/music/MeditationMusic.mp3"),
    pic: require("@/assets/music/images/meditation-music.png"),
  },
  {
    title: "Meditation Piano",
    src: require("@/assets/music/MeditationPiano.mp3"),
    pic: require("@/assets/music/images/meditation-piano.png"),
  },
  {
    title: "Most Relaxing Piano",
    src: require("@/assets/music/MostRelaxingPiano.mp3"),
    pic: require("@/assets/music/images/most-relaxing-piano.png"),
  },
  {
    title: "Music Mindfulness",
    src: require("@/assets/music/MusicMindfulness.mp3"),
    pic: require("@/assets/music/images/music-mindfulness.png"),
  },
  {
    title: "Peaceful Instrumental Piano",
    src: require("@/assets/music/PeacefulInstrumentalPiano.mp3"),
    pic: require("@/assets/music/images/peaceful-instrumental-piano.png"),
  },
  {
    title: "Relaxing Acoustic Guitar",
    src: require("@/assets/music/RelaxingAcousticGuitar.mp3"),
    pic: require("@/assets/music/images/relaxing-acoustic-guitar.png"),
  },
  {
    title: "Relaxing Background Music",
    src: require("@/assets/music/RelaxingBackgroundMusic.mp3"),
    pic: require("@/assets/music/images/relaxing-background-music.png"),
  },
  {
    title: "Relaxing Classic Guitar",
    src: require("@/assets/music/RelaxingClassicGuitar.mp3"),
    pic: require("@/assets/music/images/relaxing-classic-guitar.png"),
  },
  {
    title: "Relaxing Music and Alarm",
    src: require("@/assets/music/RelaxingMusicAndAlarm.mp3"),
    pic: require("@/assets/music/images/relaxing-music-and-alarm.png"),
  },
  {
    title: "Relaxing Power Nap",
    src: require("@/assets/music/RelaxingPowerNap.mp3"),
    pic: require("@/assets/music/images/relaxing-power-nap.png"),
  },
  {
    title: "Relaxing Romantic Music",
    src: require("@/assets/music/RelaxingRomanticMusic.mp3"),
    pic: require("@/assets/music/images/relaxing-romantic-music.png"),
  },
  {
    title: "Soft Music",
    src: require("@/assets/music/SoftMusic.mp3"),
    pic: require("@/assets/music/images/softmusic.png"),
  },
  {
    title: "Soft Piano",
    src: require("@/assets/music/SoftPiano.mp3"),
    pic: require("@/assets/music/images/soft-piano.png"),
  },
  {
    title: "Super Deep Meditation",
    src: require("@/assets/music/SuperDeepMeditation.mp3"),
    pic: require("@/assets/music/images/super-deep-meditation.png"),
  },
  {
    title: "Walk with him",
    src: require("@/assets/music/WalkWithHim.mp3"),
    pic: require("@/assets/music/images/walk-with-him.png"),
  },
];

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
