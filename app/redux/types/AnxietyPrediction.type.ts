export interface AnxietyPrediction {
  _id: string;
  userId: string;
  severityScore: number;
  age: number;
  sleepHours: number;
  physicalActivity: number;
  caffeineIntake: number;
  alcoholConsumption: number;
  smokingHabits: number;
  familyHistory: number;
  stressLevel: number;
  heartRate: number;
  breathingRate: number;
  sweatingLevel: number;
  dizziness: number;
  medication: number;
  therapySessions: number;
  recentMajorLifeEvent: number;
  dietQuality: number;
  occupation: string;
  createdAt: string;
  updatedAt: string;
}
