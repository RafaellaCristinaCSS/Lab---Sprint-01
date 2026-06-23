import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card mode="contained" style={styles.card}>
      <Card.Content style={styles.content}>
        <Text variant="titleMedium">{title}</Text>
        <Text variant="bodyMedium">{description}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ecfeff"
  },
  content: {
    gap: 6
  }
});
