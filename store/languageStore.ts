import * as SecureStore from "expo-secure-store";
import type { Language } from "@/types/learning";
import { create } from "zustand";

const LANGUAGE_KEY = "selected_language";

interface LanguageState {
  selectedLanguage: Language | null;
  isHydrated: boolean;
  setSelectedLanguage: (language: Language) => void;
  clearSelectedLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  selectedLanguage: null,
  isHydrated: false,
  setSelectedLanguage: (language) => {
    set({ selectedLanguage: language });
    SecureStore.setItemAsync(LANGUAGE_KEY, JSON.stringify(language));
  },
  clearSelectedLanguage: () => {
    set({ selectedLanguage: null });
    SecureStore.deleteItemAsync(LANGUAGE_KEY);
  },
}));

// Called once from _layout.tsx when fonts finish loading
export async function hydrateLanguageStore() {
  try {
    const raw = await SecureStore.getItemAsync(LANGUAGE_KEY);
    useLanguageStore.setState({
      selectedLanguage: raw ? (JSON.parse(raw) as Language) : null,
      isHydrated: true,
    });
  } catch {
    useLanguageStore.setState({ isHydrated: true });
  }
}
