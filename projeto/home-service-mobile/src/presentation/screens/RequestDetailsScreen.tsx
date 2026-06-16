import React from "react";
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card, Text } from "react-native-paper";
import { AppHeader } from "../components/AppHeader";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { PageContainer } from "../components/PageContainer";
import { PrimaryButton } from "../components/PrimaryButton";
import { StatusBadge } from "../components/StatusBadge";
import { useServiceRequestDetails } from "../hooks/useServiceRequestDetails";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "RequestDetails">;

function formatDate(value: string) {
  return new Date(value).toLocaleString("pt-BR");
}

export function RequestDetailsScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const detailsQuery = useServiceRequestDetails(id);

  return (
    <PageContainer>
      <AppHeader
        title="Detalhes da solicitacao"
        subtitle="Tela com atualizacao automatica para refletir mudancas assincronas."
      />
      <PrimaryButton label="Voltar para lista" onPress={() => navigation.navigate("RequestsList")} />

      {detailsQuery.isPending ? <LoadingIndicator message="Carregando detalhes..." /> : null}

      {detailsQuery.isError ? (
        <ErrorState
          message="Nao foi possivel carregar os detalhes da solicitacao."
          onRetry={() => detailsQuery.refetch()}
        />
      ) : null}

      {!detailsQuery.isPending && !detailsQuery.isError && !detailsQuery.data ? (
        <EmptyState
          title="Solicitacao nao encontrada"
          description="Verifique se a solicitacao ainda existe no backend."
        />
      ) : null}

      {detailsQuery.data ? (
        <Card mode="elevated">
          <Card.Content style={styles.content}>
            <Text variant="titleMedium">{detailsQuery.data.title}</Text>
            <Text variant="bodyMedium">{detailsQuery.data.description}</Text>
            <StatusBadge status={detailsQuery.data.status} />
            <Text variant="bodySmall">ID: {detailsQuery.data.id}</Text>
            <Text variant="bodySmall">Cliente ID: {detailsQuery.data.clientId}</Text>
            <Text variant="bodySmall">Cliente: {detailsQuery.data.clientName}</Text>
            <Text variant="bodySmall">Prestador ID: {detailsQuery.data.providerId ?? "Nao atribuido"}</Text>
            <Text variant="bodySmall">Categoria ID: {detailsQuery.data.categoryId}</Text>
            <Text variant="bodySmall">
              Data agendada: {formatDate(detailsQuery.data.scheduledDate)}
            </Text>
            <Text variant="bodySmall">
              Preco estimado: {detailsQuery.data.estimatedPrice ?? "Nao informado"}
            </Text>
            <Text variant="bodySmall">Preco final: {detailsQuery.data.finalPrice ?? "Nao informado"}</Text>
            <Text variant="bodySmall">Criada em: {formatDate(detailsQuery.data.createdAt)}</Text>
            <Text variant="bodySmall">Atualizada em: {formatDate(detailsQuery.data.updatedAt)}</Text>
          </Card.Content>
        </Card>
      ) : null}
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 8
  }
});
