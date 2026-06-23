import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        {title}
      </Text>
      {subtitle ? (
        <Text variant="bodyMedium" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    marginBottom: 4
  },
  title: {
    color: "#0f172a",
    fontWeight: "700"
  },
  subtitle: {
    color: "#475569"
  }
});
