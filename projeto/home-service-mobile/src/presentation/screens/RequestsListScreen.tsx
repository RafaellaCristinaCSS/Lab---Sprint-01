import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppHeader } from "../components/AppHeader";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { PageContainer } from "../components/PageContainer";
import { PrimaryButton } from "../components/PrimaryButton";
import { RequestCard } from "../components/RequestCard";
import { useServiceRequests } from "../hooks/useServiceRequests";
import { RootStackParamList } from "../navigation/types";

type Navigation = NativeStackNavigationProp<RootStackParamList, "RequestsList">;

export function RequestsListScreen() {
  const navigation = useNavigation<Navigation>();
  const requestsQuery = useServiceRequests();

  return (
    <PageContainer>
      <AppHeader
        title="Solicitacoes"
        subtitle="Lista atualizada automaticamente a cada 5 segundos."
      />

      <PrimaryButton label="Voltar ao dashboard" onPress={() => navigation.navigate("Dashboard")} />

      {requestsQuery.isPending ? <LoadingIndicator message="Carregando solicitacoes..." /> : null}

      {requestsQuery.isError ? (
        <ErrorState
          message="Nao foi possivel carregar a lista de solicitacoes."
          onRetry={() => requestsQuery.refetch()}
        />
      ) : null}

      {!requestsQuery.isPending && !requestsQuery.isError && (requestsQuery.data ?? []).length === 0 ? (
        <EmptyState
          title="Nenhuma solicitacao cadastrada"
          description="Crie uma solicitacao para iniciar o fluxo da sprint."
        />
      ) : null}

      {(requestsQuery.data ?? []).map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onPressDetails={() => navigation.navigate("RequestDetails", { id: request.id })}
        />
      ))}
    </PageContainer>
  );
}
