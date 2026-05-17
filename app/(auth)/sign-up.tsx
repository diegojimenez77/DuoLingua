import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { colors, fonts } from "@/constants/theme";
import { useSignUp, useSSO } from "@clerk/expo";
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

export default function SignUpScreen() {
  const { signUp } = useSignUp();
  const { startSSOFlow } = useSSO();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (loading) return;
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing Fields", "Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const { error: signUpError } = await signUp.password({
        emailAddress: email.trim(),
        password,
      });
      if (signUpError) {
        Alert.alert("Sign Up Error", signUpError.message);
        return;
      }
      const { error: codeError } = await signUp.verifications.sendEmailCode();
      if (codeError) {
        Alert.alert("Verification Error", codeError.message);
        return;
      }
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) throw new Error(error.message);
    await signUp.finalize({ navigate: () => router.replace("/") });
  };

  const handleGoogleSignUp = async () => {
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
      Alert.alert("Google Sign Up Error", message);
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
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>
            Start your language journey today ✨
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

          {/* Password field */}
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={colors.body}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((v) => !v)}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showPassword ? "eye" : "eye-off-outline"}
                  size={20}
                  color={colors.body}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up */}
          <TouchableOpacity
            style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
            onPress={handleSignUp}
            activeOpacity={0.85}
            disabled={loading}
          >
            <Text style={styles.primaryBtnText}>
              {loading ? "Creating account…" : "Sign Up"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social buttons */}
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8} onPress={handleGoogleSignUp}>
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
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text style={styles.footerLink}>Log in</Text>
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
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  eyeBtn: {
    padding: 4,
    marginLeft: 4,
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
