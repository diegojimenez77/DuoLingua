import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "@/constants/theme";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import { useEffect } from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type TabConfig = {
  name: string;
  label: string;
  icon: IconName;
  activeIcon: IconName;
};

const TAB_CONFIG: TabConfig[] = [
  { name: "home", label: "Home", icon: "home-outline", activeIcon: "home" },
  { name: "learn", label: "Learn", icon: "book-outline", activeIcon: "book" },
  { name: "ai-teacher", label: "Teacher", icon: "sparkles-outline", activeIcon: "sparkles" },
  { name: "chat", label: "Chat", icon: "chatbubbles-outline", activeIcon: "chatbubbles" },
  { name: "profile", label: "Profile", icon: "person-outline", activeIcon: "person" },
];

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / TAB_CONFIG.length;
const CIRCLE_SIZE = 52;
const BAR_HEIGHT = 72;

function getCircleX(index: number) {
  return index * TAB_WIDTH + (TAB_WIDTH - CIRCLE_SIZE) / 2;
}

export default function CustomTabBar({ state, navigation, insets }: BottomTabBarProps) {
  const translateX = useSharedValue(getCircleX(state.index));

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    translateX.value = withTiming(getCircleX(state.index), {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
  }, [state.index]);

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.bar}>
        <Animated.View style={[styles.circle, circleStyle]} />
        {state.routes.map((route, index) => {
          const config = TAB_CONFIG[index];
          const isActive = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isActive && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isActive ? config.activeIcon : config.icon}
                size={22}
                color={isActive ? colors.canvas : colors.body}
              />
              {!isActive && <Text style={styles.label}>{config.label}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.canvas,
    borderTopWidth: 1,
    borderTopColor: colors.separator,
  },
  bar: {
    flexDirection: "row",
    height: BAR_HEIGHT,
  },
  circle: {
    position: "absolute",
    top: (BAR_HEIGHT - CIRCLE_SIZE) / 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.primary,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    zIndex: 1,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.body,
  },
});
