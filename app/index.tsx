import { useAuth, useClerk, useUser } from "@clerk/expo";
import { colors, fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) return null;

  if (!isSignedIn) return <Redirect href="/onboarding" />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.canvas }}>
      <View style={styles.container}>
        <Text style={styles.title}>DuoLingua</Text>

        <View style={styles.card}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={32} color={colors.primary} />
          </View>
          <Text style={styles.emailLabel}>Signed in as</Text>
          <Text style={styles.email}>
            {user?.primaryEmailAddress?.emailAddress ?? "—"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.languageBtn}
          onPress={() => router.push("/language-selection")}
          activeOpacity={0.85}
        >
          <Ionicons name="earth-outline" size={20} color={colors.primary} />
          <Text style={styles.languageBtnText}>Choose a Language</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => signOut()}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.canvas} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 20,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.heading,
    marginBottom: 8,
  },
  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: colors.separator,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.canvas,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.separator,
    marginBottom: 4,
  },
  emailLabel: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.body,
  },
  email: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.heading,
  },
  languageBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.canvas,
    borderRadius: 16,
    height: 52,
    width: "100%",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  languageBtnText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.primary,
    flex: 1,
    textAlign: "center",
  },
  signOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 52,
    width: "100%",
  },
  signOutText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.canvas,
  },
});
