import { images } from "@/constants/images";
import { colors, fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      {/* ── Logo header ─────────────────────────────────────── */}
      <View style={styles.logoRow}>
        <Image
          source={images.mascotLogo}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>DuoLingua</Text>
      </View>

      {/* ── Title & subtitle ────────────────────────────────── */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleLine1}>Your AI language</Text>
        <Text style={styles.titleLine2}>teacher.</Text>
        <Text style={styles.subtitle}>
          Real conversations, personalized{"\n"}lessons, anytime, anywhere.
        </Text>
      </View>

      {/* ── Mascot with floating speech bubbles ─────────────── */}
      <View style={styles.mascotContainer}>
        <Image
          source={images.mascotWelcome}
          style={styles.mascotImage}
          resizeMode="contain"
        />

        <View style={[
          styles.bubble, 
          styles.bubbleHello,
          { transform: [{ rotate: "7deg" }] },
          ]}
          >
          <Text style={styles.bubbleTextDark}>Hello!</Text>
        </View>

        <View style={[styles.bubble, styles.bubbleHola]}>
          <Text style={[styles.bubbleTextDark, { color: colors.primary }]}>
            ¡Hola!
          </Text>
        </View>

        <View
          style={[
            styles.bubble,
            styles.bubbleChinese,
            { transform: [{ rotate: "-7deg" }] },
          ]}
        >
          <Text style={[styles.bubbleTextDark, { color: colors.error }]}>
            你好!
          </Text>
        </View>
      </View>

      {/* ── CTA button ──────────────────────────────────────── */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/sign-up")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="chevron-forward" size={22} color={colors.canvas} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 8,
    paddingBottom: 24,
  },
  logoImage: {
    width: 36,
    height: 36,
  },
  logoText: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.heading,
  },
  titleContainer: {
    paddingHorizontal: 24,
  },
  titleLine1: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 38,
    color: colors.heading,
  },
  titleLine2: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 38,
    color: colors.primary,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.body,
    marginTop: 12,
  },
  mascotContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mascotImage: {
    width: 300,
    height: 300,
  },
  bubble: {
    position: "absolute",
    backgroundColor: colors.canvas,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.separator,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  bubbleHello: {
    left: 58,
    top: 96,
  },
  bubbleHola: {
    right: 94,
    top: 46,
  },
  bubbleChinese: {
    right: 56,
    top: 110,
  },
  bubbleTextDark: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.heading,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 56,
    gap: 8,
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.canvas,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});
