import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ErrorMessage } from "../components/ErrorMessage";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { PageHeader } from "../components/PageHeader";
import { useCreateServiceRequest } from "../hooks/useCreateServiceRequest";
import { useLookups } from "../hooks/useLookups";

export function CreateServiceRequestPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { usersQuery, categoriesQuery } = useLookups();
  const createRequestMutation = useCreateServiceRequest();

  const selectedClient = useMemo(
    () => usersQuery.data?.find((user) => user.userType === "CLIENT"),
    [usersQuery.data]
  );

  const selectedCategory = categoriesQuery.data?.[0];

  const loadingLookups = usersQuery.isPending || categoriesQuery.isPending;
  const lookupsError = usersQuery.isError || categoriesQuery.isError;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (title.trim().length < 5) {
      setFormError("O titulo deve ter no minimo 5 caracteres.");
      return;
    }

    if (description.trim().length < 10) {
      setFormError("A descricao deve ter no minimo 10 caracteres.");
      return;
    }

    if (!selectedClient || !selectedCategory) {
      setFormError("Cadastre ao menos 1 cliente e 1 categoria no backend para criar solicitacoes.");
      return;
    }

    const scheduledDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    try {
      await createRequestMutation.mutateAsync({
        clientId: selectedClient.id,
        categoryId: selectedCategory.id,
        title: title.trim(),
        description: description.trim(),
        scheduledDate
      });

      setSuccessMessage("Solicitacao criada com sucesso.");
      setTitle("");
      setDescription("");

      setTimeout(() => {
        navigate("/requests");
      }, 800);
    } catch (error) {
      setFormError("Falha ao criar solicitacao. Verifique se a API esta no ar.");
    }
  }

  if (loadingLookups) {
    return <Loading message="Carregando dados auxiliares..." />;
  }

  if (lookupsError) {
    return <ErrorMessage message="Nao foi possivel carregar clientes e categorias da API." />;
  }

  return (
    <>
      <PageHeader
        title="Nova solicitacao"
        subtitle="Informe titulo e descricao. Os demais campos obrigatorios sao preenchidos automaticamente."
      />

      <Card>
        <form className="form-grid" onSubmit={handleSubmit}>
          <Input
            label="Titulo"
            placeholder="Ex: Instalacao de torneira"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label className="field" htmlFor="description">
            <span className="field__label">Descricao</span>
            <textarea
              className="field__textarea"
              id="description"
              placeholder="Descreva o servico solicitado"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </label>

          <p className="field__hint">
            Cliente automatico: <strong>{selectedClient?.name ?? "Nao encontrado"}</strong> | Categoria
            automatica: <strong>{selectedCategory?.name ?? "Nao encontrada"}</strong>
          </p>

          {formError ? <div className="alert alert--error">{formError}</div> : null}
          {successMessage ? <div className="alert alert--success">{successMessage}</div> : null}

          <Button type="submit" disabled={createRequestMutation.isPending}>
            {createRequestMutation.isPending ? "Criando..." : "Criar Solicitacao"}
          </Button>
        </form>
      </Card>
    </>
  );
}
