import type { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    description: "Spoken by 500M+ people across the globe",
    difficulty: "beginner",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    description: "The language of love, art, and diplomacy",
    difficulty: "beginner",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    description: "Precise and powerful — great for science and business",
    difficulty: "intermediate",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    description: "Unlock anime, manga, and a rich cultural world",
    difficulty: "advanced",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇧🇷",
    description: "Spoken across Brazil, Portugal, and Africa",
    difficulty: "beginner",
  },
];

export const getLanguageByCode = (code: string) =>
  languages.find((l) => l.code === code);
