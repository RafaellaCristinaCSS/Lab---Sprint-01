import { GetDashboardStatsUseCase } from "../../application/useCases/GetDashboardStatsUseCase";
import { Card } from "../components/Card";
import { EmptyState } from "../components/EmptyState";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loading } from "../components/Loading";
import { PageHeader } from "../components/PageHeader";
import { useServiceRequests } from "../hooks/useServiceRequests";

const dashboardUseCase = new GetDashboardStatsUseCase();

export function DashboardPage() {
  const requestsQuery = useServiceRequests();

  if (requestsQuery.isPending) {
    return <Loading message="Carregando indicadores..." />;
  }

  if (requestsQuery.isError) {
    return <ErrorMessage message="Falha ao carregar indicadores do dashboard." />;
  }

  const requests = requestsQuery.data ?? [];

  if (requests.length === 0) {
    return (
      <>
        <PageHeader
          title="Dashboard"
          subtitle="Visao geral da operacao com atualizacao automatica a cada 5 segundos."
        />
        <EmptyState
          title="Sem solicitacoes ainda"
          description="Crie a primeira solicitacao para alimentar os indicadores do painel."
        />
      </>
    );
  }

  const stats = dashboardUseCase.execute(requests);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="KPIs em tempo real com polling automatico para refletir o processamento assincrono."
      />
      <section className="kpi-grid">
        <Card title="Total de solicitacoes">
          <p className="kpi-value">{stats.total}</p>
        </Card>
        <Card title="Pendentes">
          <p className="kpi-value">{stats.pending}</p>
        </Card>
        <Card title="Concluidas">
          <p className="kpi-value">{stats.completed}</p>
        </Card>
      </section>
    </>
  );
}
