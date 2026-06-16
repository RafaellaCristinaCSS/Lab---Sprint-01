import { MD3LightTheme } from "react-native-paper";

export const appTheme = {
  ...MD3LightTheme,
  roundness: 14,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0f766e",
    secondary: "#0ea5e9",
    background: "#f4f7f8",
    surface: "#ffffff",
    surfaceVariant: "#e8f0ee",
    error: "#b42318"
  }
};
