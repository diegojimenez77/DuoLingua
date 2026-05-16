// Design tokens — mirrors global.css @theme variables.
// Use these in StyleSheet.create() and inline styles for exception components.

export const colors = {
  // Primary
  primary: "#6C4EF5",
  primaryDeep: "#5B38F6",
  linguaBlue: "#4D88FF",
  linguaGreen: "#21C16B",

  // Semantic
  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D88FF",

  // Neutrals
  heading: "#001328",
  body: "#687280",
  separator: "#E5E7EB",
  surface: "#F6F7FB",
  canvas: "#FFFFFF",
} as const;

export const fonts = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

// Typography scale — computed line-heights match the design spec (px × ratio).
export const typography = {
  h1: { fontSize: 32, fontFamily: fonts.bold, lineHeight: 38 },
  h2: { fontSize: 24, fontFamily: fonts.semiBold, lineHeight: 31 },
  h3: { fontSize: 20, fontFamily: fonts.semiBold, lineHeight: 26 },
  h4: { fontSize: 16, fontFamily: fonts.medium, lineHeight: 22 },
  bodyLarge: { fontSize: 16, fontFamily: fonts.regular, lineHeight: 26 },
  bodyMedium: { fontSize: 14, fontFamily: fonts.regular, lineHeight: 22 },
  bodySmall: { fontSize: 13, fontFamily: fonts.regular, lineHeight: 21 },
  caption: { fontSize: 11, fontFamily: fonts.regular, lineHeight: 15 },
} as const;
