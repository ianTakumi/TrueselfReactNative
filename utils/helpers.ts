import { createNotifications } from "react-native-notificated";
import { ImageSourcePropType } from "react-native";
import { Song } from "@/app/redux/types/Song.type";
import { Affirmation } from "@/app/redux/types/Affirmations.type";
import { Article } from "@/app/redux/types/Articles.type";
import { Post } from "@/app/redux/types/Post.type";

export const sendPushNotification = async (
  title: string,
  body: string,
  expoPushToken: string,
  status: string,
  post: Post
) => {
  try {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: title,
      body: body,
      data: { postId: post._id },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};

export const getRecommendations = (data: any) => {
  const recommendations = [];

  // Sleep Hours
  if (data.sleepHours < 6) {
    recommendations.push(
      "Try to get at least 7-9 hours of sleep per night. Poor sleep can increase anxiety levels."
    );
  } else if (data.sleepHours > 10) {
    recommendations.push(
      "Excessive sleep might be linked to fatigue or depression. Consider maintaining a balanced sleep schedule."
    );
  }

  // Physical Activity
  if (data.physicalActivity < 2) {
    recommendations.push(
      "Engage in at least 150 minutes of moderate exercise per week to help manage anxiety."
    );
  }

  // Caffeine Intake
  if (data.caffeineIntake > 400) {
    recommendations.push(
      "High caffeine intake can contribute to anxiety. Try reducing coffee or energy drink consumption."
    );
  }

  // Alcohol Consumption
  if (data.alcoholConsumption > 14) {
    recommendations.push(
      "Excessive alcohol consumption can negatively impact mental health. Consider reducing intake."
    );
  }

  // Smoking
  if (data.smoking) {
    recommendations.push(
      "Smoking may increase anxiety and stress over time. Consider seeking support to quit smoking."
    );
  }

  // Stress Level
  if (data.stressLevel > 3) {
    recommendations.push(
      "Practice relaxation techniques such as meditation, deep breathing, or yoga to manage stress."
    );
  }

  // Dizziness
  if (data.dizziness) {
    recommendations.push(
      "Frequent dizziness may be a sign of dehydration or anxiety-related hyperventilation. Stay hydrated and consult a doctor if persistent."
    );
  }

  // Diet Quality
  if (data.dietQuality < 3) {
    recommendations.push(
      "Improve your diet by including more fruits, vegetables, and whole foods for better mental health."
    );
  }

  return recommendations;
};

export const articles: Article[] = [
  {
    id: 1,
    title: "Recognizing Domestic Abuse in LGBTQIA+ Relationships",
    image: require("@/assets/images/articles/domesticAbuse.png"),
    filename: "/users/DomesticAbuse",
  },
  {
    id: 2,
    title: "Bridging the Healthcare Gap for LGBTQIA+ Individuals",
    image: require("@/assets/images/articles/healthcare.png"),
    filename: "/users/Healthcare",
  },
  {
    id: 3,
    title: " Mental Health and the LGBTQIA+ Community",
    image: require("@/assets/images/articles/mentalHealth.png"),
    filename: "/users/MentalHealth",
  },
  {
    id: 4,
    title: "Self-Care Practices for LGBTQIA+ Individuals",
    image: require("@/assets/images/articles/selfCare.png"),
    filename: "/users/SelfCare",
  },
  {
    id: 5,
    title:
      "Breaking the Silence: Support Systems for LGBTQIA+ Survivors of Domestic Abuse",
    image: require("@/assets/images/articles/supportSystem.png"),
    filename: "/users/SupportSystem",
  },
];

export const getAge = (dob: string | Date): number => {
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const isValidPhilippineNumber = (phoneNumber: string): boolean => {
  const regex = /^(09\d{9}|\+639\d{9})$/;
  return regex.test(phoneNumber);
};

export const audioFiles: Record<"en" | "tg", Record<number, any>> = {
  en: {
    1: require("@/assets/voices/en/1.mp3"),
    2: require("@/assets/voices/en/2.mp3"),
    3: require("@/assets/voices/en/3.mp3"),
    4: require("@/assets/voices/en/4.mp3"),
    5: require("@/assets/voices/en/5.mp3"),
    6: require("@/assets/voices/en/6.mp3"),
    7: require("@/assets/voices/en/7.mp3"),
    8: require("@/assets/voices/en/8.mp3"),
    9: require("@/assets/voices/en/9.mp3"),
    10: require("@/assets/voices/en/10.mp3"),
    11: require("@/assets/voices/en/11.mp3"),
    12: require("@/assets/voices/en/12.mp3"),
    13: require("@/assets/voices/en/13.mp3"),
    14: require("@/assets/voices/en/14.mp3"),
    15: require("@/assets/voices/en/15.mp3"),
    16: require("@/assets/voices/en/16.mp3"),
  },
  tg: {
    1: require("@/assets/voices/tg/1.mp3"),
    2: require("@/assets/voices/tg/2.mp3"),
    3: require("@/assets/voices/tg/3.mp3"),
    4: require("@/assets/voices/tg/4.mp3"),
    5: require("@/assets/voices/tg/5.mp3"),
    6: require("@/assets/voices/tg/6.mp3"),
    7: require("@/assets/voices/tg/7.mp3"),
    8: require("@/assets/voices/tg/8.mp3"),
    9: require("@/assets/voices/tg/9.mp3"),
    10: require("@/assets/voices/tg/10.mp3"),
    11: require("@/assets/voices/tg/11.mp3"),
    12: require("@/assets/voices/tg/12.mp3"),
    13: require("@/assets/voices/tg/13.mp3"),
    14: require("@/assets/voices/tg/14.mp3"),
    15: require("@/assets/voices/tg/15.mp3"),
    16: require("@/assets/voices/tg/16.mp3"),
  },
};

interface QuestionOption {
  value: string | number;
  label: string;
}

const jobOptions: QuestionOption[] = [
  { value: "student", label: "Student" },
  { value: "engineer", label: "Engineer" },
  { value: "teacher", label: "Teacher" },
  { value: "unemployed", label: "Unemployed" },
  { value: "other", label: "Other" },
];

const yesNoOptions: QuestionOption[] = [
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
];

const scale1to5Options: QuestionOption[] = Array.from(
  { length: 5 },
  (_, i) => ({
    value: i + 1,
    label: (i + 1).toString(),
  })
);

const scale1to10Options: QuestionOption[] = Array.from(
  { length: 10 },
  (_, i) => ({
    value: i + 1,
    label: (i + 1).toString(),
  })
);

export const translations = {
  en: {
    questions: [
      {
        key: "jobRole",
        label: "1. What's your occupation?",
        type: "select",
        options: jobOptions,
      },
      {
        key: "sleepDuration",
        label: "2. How many hours do you sleep per day?",
        type: "number",
      },
      {
        key: "exerciseMinutes",
        label: "3. How many minutes do you exercise per week?",
        type: "number",
      },
      {
        key: "caffeineIntake",
        label: "4. How much caffeine in milligrams do you consume daily?",
        type: "number",
      },
      {
        key: "alcoholIntake",
        label:
          "5. How many alcoholic drinks do you consume per week (in bottles or glasses)? ",
        type: "number",
      },
      {
        key: "heartRateAnxiety",
        label:
          "6. What is your typical heart rate during an anxiety attack, in beats per minute (BPM)?",
        type: "number",
      },
      {
        key: "breathingRate",
        label:
          "7. What is your typical breathing rate during an anxiety attack, in breaths per minute?",
        type: "number",
      },
      {
        key: "sweatingSeverity",
        label:
          "8. On a scale of 1 to 5, how severe is your sweating during an anxiety attack? (1 = no sweating, 5 = extreme sweating)",
        type: "select",
        options: scale1to5Options,
      },
      {
        key: "therapySessions",
        label:
          "9. How many therapy sessions do you attend per month for anxiety?",
        type: "number",
      },
      {
        key: "smoking",
        label: "10. Do you currently have a smoking habit?",
        type: "select",
        options: yesNoOptions,
      },
      {
        key: "familyAnxiety",
        label: "11. Do you have a family history of anxiety disorders?",
        type: "select",
        options: yesNoOptions,
      },
      {
        key: "dizziness",
        label: "12. Do you experience dizziness during anxiety attacks?",
        type: "select",
        options: yesNoOptions,
      },
      {
        key: "medication",
        label: "13. Are you currently taking any medication for anxiety?",
        type: "select",
        options: yesNoOptions,
      },
      {
        key: "lifeEvents",
        label:
          "14. Have you recently experienced any major life events that may have impacted your well-being?",
        type: "select",
        options: yesNoOptions,
      },
      {
        key: "dietQuality",
        label:
          "15. On a scale of 1 to 10, how would you rate the overall quality of your diet? (1 = very unhealthy, 10 = very healthy)",
        type: "select",
        options: scale1to10Options,
      },
      {
        key: "stressLevel",
        label:
          "16. On a scale of 1 to 10, how would you rate your current stress level? (1 = very low, 10 = extremely high)",
        type: "select",
        options: scale1to10Options,
      },
    ],
    title: "AI Anxiety Test",
    next: "Next",
    submit: "Submit",
    manageMildAnxiety: "Manage Mild Anxiety",
    anxietyLevel: "Your anxiety level is:",
    techniques: "Try these techniques to manage mild anxiety:",
    mindfulness: "Practice mindfulness (e.g., meditation, deep breathing)",
    physicalActivity: "Engage in physical activity",
    balancedDiet: "Maintain a balanced diet and get enough sleep",
    limitCaffeine: "Limit caffeine and alcohol",
    connectLovedOnes: "Connect with loved ones for support",
    enjoyHobbies: "Enjoy hobbies to relax",
    seekHelp: "If anxiety persists, consider seeking professional help.",
    gotIt: "Got it!",
  },
  tg: {
    questions: [
      {
        key: "jobRole",
        label: "1. Ano ang iyong trabaho?",
        type: "select",
        options: jobOptions,
      },
      {
        key: "sleepDuration",
        label: "2. Ilang oras ka natutulog bawat araw?",
        type: "number",
      },
      {
        key: "exerciseMinutes",
        label: "3. Ilang minuto kang nag-eehersisyo bawat linggo?",
        type: "number",
      },
      {
        key: "caffeineIntake",
        label:
          "4. Gaano karaming caffeine ang iniinom mo bawat araw (milligram)?",
        type: "number",
      },
      {
        key: "alcoholIntake",
        label: "5. Ilang inuming may alkohol ang iniinom mo bawat linggo?",
        type: "number",
      },
      {
        key: "heartRateAnxiety",
        label:
          "6. Gaano kabilis ang tibok ng puso mo kapag nakakaramdam ka ng matinding pagkabalisa? (BPM)",
        type: "number",
      },
      {
        key: "breathingRate",
        label:
          "7. Gaano kabilis ang iyong paghinga ng makaramdam ng matinding pagkabalisa(Hinga bawat minuto)",
        type: "number",
      },
      {
        key: "sweatingSeverity",
        label:
          "8. Gaano kalala ang pagpapawis mo kapag may matinding pagkabalisa? Sagutin sa sukat na 1 (pinakamagaan) hanggang 5 (pinakamatindi)",
        type: "select",
        options: scale1to5Options,
      },
      {
        key: "therapySessions",
        label:
          "9. Ilang therapy session para sa pagkabalisa ang tinatake mo bawat buwan?",
        type: "number",
      },
      {
        key: "smoking",
        label: "10. ikaw ba ay naninigarilyo? ",
        type: "select",
        options: yesNoOptions,
      },
      {
        key: "familyAnxiety",
        label: "11. Mayroon bang kasaysayan ng pagkabalisa sa iyong pamilya?",
        type: "select",
        options: yesNoOptions,
      },
      {
        key: "dizziness",
        label:
          "12. Nakakaranas ka ba ng pagkahilo sa panahon ng atake ng pagkabalisa?",
        type: "select",
        options: yesNoOptions,
      },
      {
        key: "medication",
        label: "13. Umiinom ka ba ng anumang gamot para sa pagkabalisa?",
        type: "select",
        options: yesNoOptions,
      },
      {
        key: "lifeEvents",
        label:
          "14. Nakaranas ka ba ng anumang malalaking kaganapan sa buhay kamakailan?",
        type: "select",
        options: yesNoOptions,
      },
      {
        key: "dietQuality",
        label:
          "15. Sa sukat na 1 hanggang 10, gaano ka-nutritious at balanced ang iyong pagkain? (1 - Puro junk food, 10 - Masustansya at balanse)",
        type: "select",
        options: scale1to10Options,
      },
      {
        key: "stressLevel",
        label:
          "16. Gaano kataas ang iyong stress ngayon sa sukat na 1 hanggang 10? (1 - Walang stress, 10 - Matinding stress)",
        type: "select",
        options: scale1to10Options,
      },
    ],
    title: "AI Anxiety Test",
    next: "Susunod",
    submit: "Ipasa",
    manageMildAnxiety: "Pamahalaan ang Banayad na Pagkabalisa",
    anxietyLevel: "Ang antas ng iyong pagkabalisa ay:",
    techniques:
      "Subukan ang mga teknik na ito upang pamahalaan ang banayad na pagkabalisa:",
    mindfulness:
      "Magsanay ng mindfulness (hal. pagmumuni-muni, malalim na paghinga)",
    physicalActivity: "Mag-ehersisyo",
    balancedDiet: "Panatilihin ang balanseng diyeta at sapat na tulog",
    limitCaffeine: "Limitahan ang caffeine at alkohol",
    connectLovedOnes: "Makipag-ugnayan sa mga mahal sa buhay para sa suporta",
    enjoyHobbies: "Magsaya sa mga libangan upang mag-relax",
    seekHelp:
      "Kung magpatuloy ang pagkabalisa, isaalang-alang ang propesyonal na tulong.",
    gotIt: "Nakuha ko na!",
  },
};

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
