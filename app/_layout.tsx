import "../global.css";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack />;
}
