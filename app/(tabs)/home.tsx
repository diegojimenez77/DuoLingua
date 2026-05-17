import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/languageStore";
import { colors, fonts } from "@/constants/theme";
import { images } from "@/constants/images";
import { getUnitsByLanguage } from "@/data/units";
import { getLessonsByUnit } from "@/data/lessons";
import type { Lesson } from "@/types/learning";

const STREAK = 12;
const XP_CURRENT = 15;
const XP_GOAL = 20;

const GREETINGS: Record<string, string> = {
  es: "Hola",
  fr: "Bonjour",
  de: "Hallo",
  ja: "こんにちは",
  pt: "Olá",
};

type PlanConfig = {
  label: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  iconBg: string;
  completed: boolean;
};

function getPlanConfig(_lesson: Lesson, index: number): PlanConfig {
  const configs: PlanConfig[] = [
    { label: "Lesson",          iconName: "book",       iconBg: colors.linguaBlue, completed: true  },
    { label: "AI Conversation", iconName: "headset",    iconBg: colors.primary,    completed: false },
    { label: "New words",       iconName: "chatbubble", iconBg: "#FF6B6B",         completed: false },
  ];
  return configs[index % configs.length];
}

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguage } = useLanguageStore();

  const firstName    = user?.firstName ?? "Learner";
  const greeting     = selectedLanguage ? (GREETINGS[selectedLanguage.code] ?? "Hello") : "Hello";
  const units        = selectedLanguage ? getUnitsByLanguage(selectedLanguage.code) : [];
  const currentUnit  = units[0] ?? null;
  const lessons      = currentUnit ? getLessonsByUnit(currentUnit.id) : [];
  const todayLessons = lessons.slice(0, 3);
  const xpRatio      = XP_CURRENT / XP_GOAL;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ─── Header ─── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {selectedLanguage ? (
              <Text style={styles.flag}>{selectedLanguage.flag}</Text>
            ) : null}
            <Text style={styles.greeting}>{greeting}, {firstName}! 👋</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.fireEmoji}>🔥</Text>
            <Text style={styles.streakNum}>{STREAK}</Text>
            <View style={styles.bellWrap}>
              <Ionicons name="notifications-outline" size={20} color={colors.heading} />
            </View>
          </View>
        </View>

        {/* ─── Daily Goal ─── */}
        <View style={styles.goalCard}>
          <View style={styles.goalInfo}>
            <Text style={styles.goalLabel}>Daily goal</Text>
            <View style={styles.goalXPRow}>
              <Text style={styles.goalXPNum}>{XP_CURRENT}</Text>
              <Text style={styles.goalXPOf}> / {XP_GOAL} XP</Text>
            </View>
            <View style={styles.goalBarTrack}>
              <View style={[styles.goalBarFill, { width: `${Math.round(xpRatio * 100)}%` }]} />
            </View>
          </View>
          <Image source={images.treasure} style={styles.treasureImg} />
        </View>

        {/* ─── Continue Learning ─── */}
        <View style={styles.continueCard}>
          {/* Text sits on top of image layer */}
          <View style={styles.continueTextBlock}>
            <Text style={styles.continueSub}>Continue learning</Text>
            <Text style={styles.continueLang} numberOfLines={1}>
              {selectedLanguage?.name ?? "Pick a language"}
            </Text>
            <Text style={styles.continueUnit}>
              {currentUnit ? `A${currentUnit.order} · Unit ${currentUnit.order}` : "Select a language"}
            </Text>
            <TouchableOpacity style={styles.continueBtn} activeOpacity={0.85}>
              <Text style={styles.continueBtnText}>Continue</Text>
            </TouchableOpacity>
          </View>
          {/* Palace image absolutely pinned to bottom-right */}
          <Image source={images.palace} style={styles.palaceImg} />
        </View>

        {/* ─── Today's Plan ─── */}
        <View style={styles.planHeaderRow}>
          <Text style={styles.planTitle}>Today's plan</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.planViewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.planCard}>
          {todayLessons.length === 0 && (
            <View style={styles.planEmpty}>
              <Text style={styles.planEmptyText}>Select a language to see today's plan</Text>
            </View>
          )}
          {todayLessons.map((lesson, index) => {
            const cfg    = getPlanConfig(lesson, index);
            const isLast = index === todayLessons.length - 1;
            return (
              <View key={lesson.id}>
                <TouchableOpacity style={styles.planRow} activeOpacity={0.7}>
                  <View style={[styles.planIcon, { backgroundColor: cfg.iconBg }]}>
                    <Ionicons name={cfg.iconName} size={20} color={colors.canvas} />
                  </View>
                  <View style={styles.planInfo}>
                    <Text style={styles.planItemTitle}>{cfg.label}</Text>
                    <Text style={styles.planItemSub}>{lesson.title}</Text>
                  </View>
                  {cfg.completed ? (
                    <View style={styles.checkFilled}>
                      <Ionicons name="checkmark" size={14} color={colors.canvas} />
                    </View>
                  ) : (
                    <View style={styles.checkEmpty} />
                  )}
                </TouchableOpacity>
                {!isLast && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>

        {/* ─── Next Up ─── */}
        <View style={styles.nextCard}>
          <View style={styles.nextInfo}>
            <Text style={styles.nextLabel}>Next up</Text>
            <Text style={styles.nextTitle}>AI Video Call</Text>
            <Text style={styles.nextSub}>Practice speaking</Text>
          </View>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: "https://i.pravatar.cc/150?img=47" }} style={styles.avatar} />
            <View style={styles.videoIconBadge}>
              <Ionicons name="videocam" size={12} color={colors.canvas} />
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  scroll: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 40, gap: 16 },

  /* ── Header ── */
  header:        { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerLeft:    { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  flag:          { fontSize: 28 },
  greeting:      { fontFamily: fonts.semiBold, fontSize: 17, color: colors.heading, flexShrink: 1 },
  headerRight:   { flexDirection: "row", alignItems: "center", gap: 5 },
  fireEmoji:     { fontSize: 20 },
  streakNum:     { fontFamily: fonts.bold, fontSize: 16, color: colors.heading, marginRight: 2 },
  bellWrap: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.surface, alignItems: "center", justifyContent: "center",
  },

  /* ── Daily Goal ── */
  goalCard: {
    backgroundColor: "#FFF5EC",
    borderRadius: 20,
    padding: 20,
    paddingRight: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  goalInfo: { flex: 1 },
  goalLabel: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.body,
    marginBottom: 6,
  },
  goalXPRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  goalXPNum: {
    fontFamily: fonts.bold,
    fontSize: 30,
    color: colors.heading,
    lineHeight: 34,
  },
  goalXPOf: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.body,
    paddingBottom: 2,
  },
  goalBarTrack: {
    height: 8,
    backgroundColor: "#FFD9B8",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 20,
  },
  goalBarFill: {
    height: 8,
    backgroundColor: colors.streak,
    borderRadius: 4,
  },
  treasureImg: { width: 90, height: 90, resizeMode: "contain" },

  /* ── Continue Learning ── */
  continueCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    minHeight: 160,
    overflow: "hidden",
  },
  continueTextBlock: {
    // sits at top-left, does NOT use flex row — image is absolutely placed
    padding: 20,
    paddingRight: 140,   // leave room so text never hides behind the palace image
    gap: 4,
  },
  continueSub:  { fontFamily: fonts.regular, fontSize: 13, color: "rgba(255,255,255,0.80)" },
  continueLang: { fontFamily: fonts.bold, fontSize: 26, color: "#FFFFFF", lineHeight: 32 },
  continueUnit: { fontFamily: fonts.regular, fontSize: 13, color: "rgba(255,255,255,0.80)", marginBottom: 8 },
  continueBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 20, paddingVertical: 9,
  },
  continueBtnText: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.primary },
  palaceImg: {
    position: "absolute",
    bottom: 0, right: 0,
    width: 140, height: 155,
    resizeMode: "contain",
  },

  /* ── Today's Plan ── */
  planHeaderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  planTitle:     { fontFamily: fonts.bold, fontSize: 18, color: colors.heading },
  planViewAll:   { fontFamily: fonts.semiBold, fontSize: 14, color: colors.primary },
  planCard: {
    backgroundColor: colors.canvas,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.separator,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  planEmpty:     { padding: 20, alignItems: "center" },
  planEmptyText: { fontFamily: fonts.regular, fontSize: 13, color: colors.body },
  planRow: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, paddingVertical: 14, gap: 14,
  },
  planIcon:      { width: 46, height: 46, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  planInfo:      { flex: 1, gap: 2 },
  planItemTitle: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.heading },
  planItemSub:   { fontFamily: fonts.regular, fontSize: 13, color: colors.body },
  checkFilled: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: colors.linguaBlue, alignItems: "center", justifyContent: "center",
  },
  checkEmpty: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: colors.separator },
  divider:    { height: 1, backgroundColor: colors.separator, marginHorizontal: 16 },

  /* ── Next Up ── */
  nextCard: {
    backgroundColor: "#EBF7F2", borderRadius: 20, padding: 20,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  nextInfo:  { gap: 3 },
  nextLabel: { fontFamily: fonts.regular, fontSize: 12, color: colors.body },
  nextTitle: { fontFamily: fonts.bold, fontSize: 17, color: colors.heading },
  nextSub:   { fontFamily: fonts.regular, fontSize: 13, color: colors.body },
  avatarWrap:    { position: "relative" },
  avatar:        { width: 64, height: 64, borderRadius: 32 },
  videoIconBadge: {
    position: "absolute", bottom: 0, right: 0,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: colors.linguaGreen,
    alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: "#EBF7F2",
  },
});
