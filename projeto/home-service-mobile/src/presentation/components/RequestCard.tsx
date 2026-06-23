import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { ServiceRequest } from "../../domain/entities/ServiceRequest";
import { PrimaryButton } from "./PrimaryButton";
import { StatusBadge } from "./StatusBadge";

interface RequestCardProps {
  request: ServiceRequest;
  onPressDetails: () => void;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("pt-BR");
}

export function RequestCard({ request, onPressDetails }: RequestCardProps) {
  return (
    <Card mode="elevated">
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            {request.title}
          </Text>
          <StatusBadge status={request.status} />
        </View>
        <Text variant="bodyMedium">{request.description}</Text>
        <Text variant="bodySmall" style={styles.date}>
          Criada em: {formatDate(request.createdAt)}
        </Text>
        <PrimaryButton label="Ver detalhes" onPress={onPressDetails} />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  },
  title: {
    flex: 1,
    fontWeight: "700"
  },
  date: {
    color: "#64748b"
  }
});
