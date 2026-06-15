import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { EmptyState } from "../components/EmptyState";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loading } from "../components/Loading";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useServiceRequestDetails } from "../hooks/useServiceRequestDetails";

function formatDate(value: string) {
  return new Date(value).toLocaleString("pt-BR");
}

export function ServiceRequestDetailsPage() {
  const { id = "" } = useParams();
  const detailsQuery = useServiceRequestDetails(id);

  if (!id) {
    return <ErrorMessage message="ID da solicitacao nao informado." />;
  }

  if (detailsQuery.isPending) {
    return <Loading message="Carregando detalhes..." />;
  }

  if (detailsQuery.isError) {
    return <ErrorMessage message="Falha ao carregar detalhes da solicitacao." />;
  }

  const request = detailsQuery.data;

  if (!request) {
    return (
      <EmptyState
        title="Solicitacao nao encontrada"
        description="Verifique se a solicitacao ainda existe no backend."
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Detalhes da solicitacao"
        subtitle="Pagina com polling automatico para refletir alteracoes assincronas de status."
      />

      <Card>
        <dl className="details-grid">
          <div>
            <dt>ID</dt>
            <dd>{request.id}</dd>
          </div>
          <div>
            <dt>Titulo</dt>
            <dd>{request.title}</dd>
          </div>
          <div>
            <dt>Descricao</dt>
            <dd>{request.description}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <StatusBadge status={request.status} />
            </dd>
          </div>
          <div>
            <dt>Data de criacao</dt>
            <dd>{formatDate(request.createdAt)}</dd>
          </div>
        </dl>
      </Card>
    </>
  );
}
