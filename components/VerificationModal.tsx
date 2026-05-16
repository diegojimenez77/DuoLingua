import { colors, fonts } from "@/constants/theme";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  visible: boolean;
  email: string;
  onClose: () => void;
}

export default function VerificationModal({ visible, email, onClose }: Props) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [visible]);

  useEffect(() => {
    if (code.length === 6) {
      setTimeout(() => {
        onClose();
        router.replace("/");
      }, 200);
    }
  }, [code]);

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(cleaned);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Backdrop tap closes modal */}
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          {/* Sheet — inner TouchableOpacity blocks backdrop from firing */}
          <TouchableOpacity activeOpacity={1} style={styles.sheet}>
            <View style={styles.handle} />

            <Text style={styles.title}>Check your email 📬</Text>
            <Text style={styles.subtitle}>
              We sent a 6-digit verification code to{"\n"}
              <Text style={styles.emailText}>
                {email || "your email address"}
              </Text>
            </Text>

            <TouchableOpacity
              activeOpacity={1}
              style={styles.digitRow}
              onPress={() => inputRef.current?.focus()}
            >
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.digitBox,
                      code[i] !== undefined && styles.digitBoxFilled,
                      i === code.length && styles.digitBoxActive,
                    ]}
                  >
                    <Text style={styles.digitText}>{code[i] ?? ""}</Text>
                  </View>
                ))}
            </TouchableOpacity>

            <Text style={styles.hint}>Tap the boxes above to enter code</Text>

            {/* Hidden input that drives the digit boxes */}
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              maxLength={6}
              style={styles.hiddenInput}
              caretHidden
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  keyboardView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.canvas,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 28,
    paddingBottom: 48,
    paddingTop: 16,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.separator,
    marginBottom: 24,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.heading,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.body,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  emailText: {
    fontFamily: fonts.semiBold,
    color: colors.heading,
  },
  digitRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  digitBox: {
    width: 46,
    height: 58,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.separator,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  digitBoxFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.canvas,
  },
  digitBoxActive: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.canvas,
  },
  digitText: {
    fontFamily: fonts.semiBold,
    fontSize: 22,
    color: colors.heading,
  },
  hint: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.body,
    marginBottom: 8,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
    top: -100,
  },
});
