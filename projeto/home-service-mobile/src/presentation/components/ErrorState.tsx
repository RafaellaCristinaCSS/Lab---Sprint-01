import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { PrimaryButton } from "./PrimaryButton";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Card mode="contained" style={styles.card}>
      <Card.Content style={styles.content}>
        <Text variant="titleMedium">Falha ao carregar</Text>
        <Text variant="bodyMedium">{message}</Text>
        {onRetry ? <PrimaryButton label="Tentar novamente" onPress={onRetry} /> : null}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff1f0"
  },
  content: {
    gap: 10
  }
});
