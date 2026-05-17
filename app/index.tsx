import { useAuth } from "@clerk/expo";
import { useLanguageStore } from "@/store/languageStore";
import { Redirect } from "expo-router";

export default function RootIndex() {
  const { isSignedIn, isLoaded } = useAuth();
  const { selectedLanguage, isHydrated } = useLanguageStore();

  if (!isLoaded || !isHydrated) return null;

  if (!isSignedIn) return <Redirect href="/onboarding" />;

  if (!selectedLanguage) return <Redirect href="/language-selection" />;

  return <Redirect href="/home" />;
}
