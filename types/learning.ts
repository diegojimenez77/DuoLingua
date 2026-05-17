export type LanguageCode = "es" | "fr" | "de" | "ja" | "pt";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export type ActivityType =
  | "multiple_choice"
  | "fill_blank"
  | "match_pairs"
  | "listen_select"
  | "speak_repeat"
  | "translate";

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
}

export interface PhraseItem {
  phrase: string;
  translation: string;
  pronunciation: string;
  context: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  question: string;
  correctAnswer: string;
  options?: string[];
  hint?: string;
  xpReward: number;
}

export interface LessonGoal {
  description: string;
  target: number;
  unit: "words" | "phrases" | "activities" | "minutes";
}

export interface AITeacherPrompt {
  intro: string;
  encouragement: string[];
  correction: string;
  completion: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  type: "vocabulary" | "grammar" | "conversation" | "listening" | "review";
  order: number;
  xpReward: number;
  estimatedMinutes: number;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: Activity[];
  aiTeacherPrompt: AITeacherPrompt;
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  order: number;
  color: string;
  icon: string;
  lessonIds: string[];
}
