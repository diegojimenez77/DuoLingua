import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { colors, fonts } from "@/constants/theme";
import { useSignIn, useSSO } from "@clerk/expo";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { makeRedirectUri } from "expo-auth-session";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (loading) return;
    if (!email.trim()) {
      Alert.alert("Missing Email", "Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await signIn.emailCode.sendCode({ emailAddress: email.trim() });
      if (error) {
        Alert.alert("Sign In Error", error.message);
        return;
      }
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    const { error } = await signIn.emailCode.verifyCode({ code });
    if (error) throw new Error(error.message);
    await signIn.finalize({ navigate: () => router.replace("/") });
  };

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive, authSessionResult } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: makeRedirectUri(),
      });

      // User closed/cancelled the browser — do nothing
      if (authSessionResult?.type === "cancel" || authSessionResult?.type === "dismiss") return;

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      if (err?.status === 429) {
        const seconds = err?.retryAfter ?? 60;
        Alert.alert(
          "Too Many Attempts",
          `Too many requests. Please wait ${seconds} seconds and try again.`
        );
        return;
      }
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Something went wrong.";
      Alert.alert("Google Sign In Error", message);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.heading} />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your journey ✨
          </Text>

          {/* Mascot */}
          <View style={styles.mascotWrap}>
            <Image
              source={images.mascotAuth}
              style={styles.mascot}
              resizeMode="contain"
            />
          </View>

          {/* Email field */}
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={colors.body}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Sign In */}
          <TouchableOpacity
            style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
            onPress={handleSignIn}
            activeOpacity={0.85}
            disabled={loading}
          >
            <Text style={styles.primaryBtnText}>
              {loading ? "Sending code…" : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social buttons */}
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8} onPress={handleGoogleSignIn}>
            <AntDesign name="google" size={20} color="#DB4437" />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <FontAwesome name="facebook-square" size={22} color="#1877F2" />
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <Ionicons name="logo-apple" size={22} color="#000" />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={modalVisible}
        email={email}
        onClose={() => setModalVisible(false)}
        onVerify={handleVerify}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  backBtn: {
    marginTop: 8,
    marginBottom: 16,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.heading,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.body,
    marginBottom: 16,
  },
  mascotWrap: {
    alignItems: "center",
    marginBottom: 20,
  },
  mascot: {
    width: 160,
    height: 160,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: colors.separator,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 12,
  },
  inputLabel: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.body,
    marginBottom: 3,
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.heading,
    padding: 0,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  primaryBtnDisabled: {
    opacity: 0.65,
  },
  primaryBtnText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.canvas,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.separator,
  },
  dividerText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.body,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: colors.separator,
    borderRadius: 14,
    height: 52,
    marginBottom: 10,
    backgroundColor: colors.canvas,
  },
  socialText: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.heading,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  footerText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.body,
  },
  footerLink: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.primary,
  },
});
