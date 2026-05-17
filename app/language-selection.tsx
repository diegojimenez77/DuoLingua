import { images } from "@/constants/images";
import { colors, fonts } from "@/constants/theme";
import { languages } from "@/data/languages";
import type { Language } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DIFFICULTY_COLORS: Record<Language["difficulty"], string> = {
  beginner: colors.linguaGreen,
  intermediate: colors.warning,
  advanced: colors.error,
};

export default function LanguageSelectionScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  function handleConfirm() {
    if (!selected) return;
    // Navigate to home (tabs) once language is chosen
    router.replace("/");
  }

  return (
    <SafeAreaView style={styles.screen}>
      {/* ── Header ─────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.heading} />
        </TouchableOpacity>
      </View>

      {/* ── Hero image + title ──────────────────────────────── */}
      <View style={styles.hero}>
        <Image
          source={images.earth}
          style={styles.earthImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>What do you want{"\n"}to learn?</Text>
        <Text style={styles.subtitle}>
          Pick a language and start your journey today.
        </Text>
      </View>

      {/* ── Language list ───────────────────────────────────── */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {languages.map((lang) => {
          const isSelected = selected === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => setSelected(lang.code)}
              activeOpacity={0.8}
            >
              {/* Flag */}
              <View style={styles.flagContainer}>
                <Text style={styles.flag}>{lang.flag}</Text>
              </View>

              {/* Info */}
              <View style={styles.cardInfo}>
                <View style={styles.cardNameRow}>
                  <Text style={styles.cardName}>{lang.name}</Text>
                  <Text style={styles.cardNative}>{lang.nativeName}</Text>
                </View>
                <Text style={styles.cardDescription}>{lang.description}</Text>
                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: DIFFICULTY_COLORS[lang.difficulty] + "20" },
                  ]}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      { color: DIFFICULTY_COLORS[lang.difficulty] },
                    ]}
                  >
                    {lang.difficulty}
                  </Text>
                </View>
              </View>

              {/* Selection indicator */}
              {isSelected && (
                <View style={styles.checkmark}>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.primary}
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Confirm button ──────────────────────────────────── */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmBtn, !selected && styles.confirmBtnDisabled]}
          onPress={handleConfirm}
          activeOpacity={selected ? 0.85 : 1}
          disabled={!selected}
        >
          <Text style={styles.confirmBtnText}>Start Learning</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.canvas} />
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  earthImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 36,
    color: colors.heading,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.body,
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: "transparent",
    gap: 14,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.canvas,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  flagContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.canvas,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.separator,
  },
  flag: {
    fontSize: 30,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  cardNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardName: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.heading,
  },
  cardNative: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.body,
  },
  cardDescription: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.body,
  },
  difficultyBadge: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 2,
  },
  difficultyText: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    textTransform: "capitalize",
  },
  checkmark: {
    marginLeft: 4,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },
  confirmBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 56,
  },
  confirmBtnDisabled: {
    backgroundColor: colors.separator,
  },
  confirmBtnText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.canvas,
  },
});
