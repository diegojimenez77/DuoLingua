import { colors, fonts } from "@/constants/theme";
import { router } from "expo-router";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.06,
      useNativeDriver: true,
      friction: 5,
      tension: 120,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
      tension: 120,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DuoLingua</Text>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/onboarding")}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.buttonText}>View Onboarding</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.canvas,
    gap: 16,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 24,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: "#8B6FF8",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 10,
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.canvas,
  },
});
