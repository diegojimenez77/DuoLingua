import type { Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish units
  {
    id: "es-unit-1",
    languageCode: "es",
    title: "Basics",
    description: "Greetings, numbers, and everyday words",
    order: 1,
    color: "#6C4EF5",
    icon: "👋",
    lessonIds: ["es-u1-l1", "es-u1-l2", "es-u1-l3"],
  },
  {
    id: "es-unit-2",
    languageCode: "es",
    title: "Family & People",
    description: "Talk about yourself and the people around you",
    order: 2,
    color: "#FF8A00",
    icon: "👨‍👩‍👧",
    lessonIds: ["es-u2-l1", "es-u2-l2"],
  },
  // French units
  {
    id: "fr-unit-1",
    languageCode: "fr",
    title: "Basics",
    description: "Greetings, numbers, and everyday words",
    order: 1,
    color: "#4D88FF",
    icon: "👋",
    lessonIds: ["fr-u1-l1", "fr-u1-l2"],
  },
  {
    id: "fr-unit-2",
    languageCode: "fr",
    title: "Food & Dining",
    description: "Order food and navigate French restaurants",
    order: 2,
    color: "#21C16B",
    icon: "🥐",
    lessonIds: ["fr-u2-l1", "fr-u2-l2"],
  },
  // German units
  {
    id: "de-unit-1",
    languageCode: "de",
    title: "Basics",
    description: "Greetings, numbers, and everyday words",
    order: 1,
    color: "#FFC800",
    icon: "👋",
    lessonIds: ["de-u1-l1", "de-u1-l2"],
  },
  // Japanese units
  {
    id: "ja-unit-1",
    languageCode: "ja",
    title: "Hiragana Basics",
    description: "Learn the first Japanese alphabet",
    order: 1,
    color: "#FF4D4F",
    icon: "あ",
    lessonIds: ["ja-u1-l1", "ja-u1-l2"],
  },
  // Portuguese units
  {
    id: "pt-unit-1",
    languageCode: "pt",
    title: "Basics",
    description: "Greetings, numbers, and everyday words",
    order: 1,
    color: "#21C16B",
    icon: "👋",
    lessonIds: ["pt-u1-l1", "pt-u1-l2"],
  },
];

export const getUnitsByLanguage = (languageCode: string) =>
  units.filter((u) => u.languageCode === languageCode).sort((a, b) => a.order - b.order);

export const getUnitById = (id: string) => units.find((u) => u.id === id);
