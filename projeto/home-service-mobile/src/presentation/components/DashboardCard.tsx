import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

interface DashboardCardProps {
  label: string;
  value: number;
}

export function DashboardCard({ label, value }: DashboardCardProps) {
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <Text variant="bodyMedium" style={styles.label}>
          {label}
        </Text>
        <Text variant="headlineSmall" style={styles.value}>
          {value}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140
  },
  content: {
    gap: 4
  },
  label: {
    color: "#64748b"
  },
  value: {
    fontWeight: "700"
  }
});
