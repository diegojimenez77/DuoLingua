import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fonts } from "@/constants/theme";

export default function AITeacherScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.canvas }} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>AI Teacher</Text>
        <Text style={styles.subtitle}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.heading,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.body,
  },
});
