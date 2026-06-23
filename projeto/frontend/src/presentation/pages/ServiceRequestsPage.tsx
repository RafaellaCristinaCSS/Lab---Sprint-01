import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { EmptyState } from "../components/EmptyState";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loading } from "../components/Loading";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useServiceRequests } from "../hooks/useServiceRequests";

function formatDate(value: string) {
  return new Date(value).toLocaleString("pt-BR");
}

export function ServiceRequestsPage() {
  const requestsQuery = useServiceRequests();

  if (requestsQuery.isPending) {
    return <Loading message="Carregando solicitacoes..." />;
  }

  if (requestsQuery.isError) {
    return <ErrorMessage message="Nao foi possivel carregar a listagem de solicitacoes." />;
  }

  const requests = requestsQuery.data ?? [];

  return (
    <>
      <PageHeader
        title="Solicitacoes"
        subtitle="Lista atualizada automaticamente a cada 5 segundos para refletir mudancas do worker."
      />

      {requests.length === 0 ? (
        <EmptyState
          title="Nenhuma solicitacao cadastrada"
          description="Use o menu Nova solicitacao para criar o primeiro registro."
        />
      ) : (
        <Card>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Descricao</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.title}</td>
                    <td>{request.description}</td>
                    <td>
                      <StatusBadge status={request.status} />
                    </td>
                    <td>{formatDate(request.createdAt)}</td>
                    <td>
                      <Link className="link-inline" to={`/requests/${request.id}`}>
                        Ver detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
