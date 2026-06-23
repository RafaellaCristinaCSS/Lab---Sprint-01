import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GetDashboardStatsUseCase } from "../../application/useCases/GetDashboardStatsUseCase";
import { AppHeader } from "../components/AppHeader";
import { DashboardCard } from "../components/DashboardCard";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { PageContainer } from "../components/PageContainer";
import { PrimaryButton } from "../components/PrimaryButton";
import { useServiceRequests } from "../hooks/useServiceRequests";
import { RootStackParamList } from "../navigation/types";

const dashboardStatsUseCase = new GetDashboardStatsUseCase();

type Navigation = NativeStackNavigationProp<RootStackParamList, "Dashboard">;

export function DashboardScreen() {
  const navigation = useNavigation<Navigation>();
  const requestsQuery = useServiceRequests();

  if (requestsQuery.isPending) {
    return (
      <PageContainer>
        <LoadingIndicator message="Carregando dashboard..." />
      </PageContainer>
    );
  }

  if (requestsQuery.isError) {
    return (
      <PageContainer>
        <ErrorState
          message="Nao foi possivel carregar os indicadores da API."
          onRetry={() => requestsQuery.refetch()}
        />
      </PageContainer>
    );
  }

  const requests = requestsQuery.data ?? [];

  return (
    <PageContainer>
      <AppHeader
        title="Dashboard"
        subtitle="Indicadores com polling automatico a cada 5 segundos."
      />

      {requests.length === 0 ? (
        <EmptyState
          title="Sem solicitacoes"
          description="Crie a primeira solicitacao para visualizar os indicadores."
        />
      ) : (
        <View style={styles.grid}>
          {(() => {
            const stats = dashboardStatsUseCase.execute(requests);

            return (
              <>
                <DashboardCard label="Total" value={stats.total} />
                <DashboardCard label="Pendentes" value={stats.pending} />
                <DashboardCard label="Em andamento" value={stats.inProgress} />
                <DashboardCard label="Concluidas" value={stats.completed} />
              </>
            );
          })()}
        </View>
      )}

      <PrimaryButton
        label="Ir para lista de solicitacoes"
        onPress={() => navigation.navigate("RequestsList")}
      />
      <PrimaryButton
        label="Criar nova solicitacao"
        onPress={() => navigation.navigate("NewRequest")}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  }
});
