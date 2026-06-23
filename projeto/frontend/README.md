# Home Service Frontend - Sprint 3

Frontend React + TypeScript + Vite para o marketplace de servicos residenciais, integrado ao backend REST desenvolvido nas sprints anteriores.

## Objetivo

Demonstrar o fluxo completo da sprint:

1. Usuario cria solicitacao no frontend.
2. Backend persiste no PostgreSQL.
3. Backend publica evento no RabbitMQ.
4. Worker processa em segundo plano.
5. Status muda no banco.
6. Frontend reflete mudanca automaticamente sem refresh manual.

## Stack

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- TanStack Query

## Arquitetura

Clean Architecture adaptada para frontend:

```
src/
  core/
    api/
    constants/
    types/
  domain/
    entities/
    repositories/
  application/
    useCases/
  infrastructure/
    repositories/
    services/
  presentation/
    pages/
    components/
    hooks/
    layouts/
    styles/
  App.tsx
  main.tsx
```

## Funcionalidades implementadas

- Dashboard:
  - Total de solicitacoes
  - Quantidade pendente
  - Quantidade concluida
- Listagem:
  - Titulo
  - Descricao
  - Status com badge visual
  - Data
  - Acesso aos detalhes
- Criacao de solicitacao:
  - Campos de titulo e descricao
  - Feedback de sucesso e erro
  - Atualizacao de lista apos criacao
- Detalhes:
  - ID
  - Titulo
  - Descricao
  - Status
  - Data de criacao
- Estados de interface:
  - Loading
  - Error
  - Empty state
  - Success

## Atualizacao assincrona (sem F5)

As telas de dashboard, listagem e detalhes usam polling automatico com TanStack Query:

- `refetchInterval: 5000`

Isso permite que o frontend reflita a mudanca de status apos o worker processar o evento.

## Integracao com backend e RabbitMQ

O frontend NAO se conecta ao RabbitMQ diretamente.

Fluxo real:

1. Frontend chama backend REST.
2. Backend grava no PostgreSQL.
3. Backend publica evento no RabbitMQ.
4. Worker consome o evento e atualiza dados.
5. Frontend reconsulta a API e atualiza a tela.

## Endpoints consumidos

- `GET /service-requests`
- `GET /service-requests/{id}`
- `POST /service-requests`
- `GET /api/users` (dados auxiliares de cliente)
- `GET /api/categories` (dados auxiliares de categoria)

Observacao: o backend desta base expoe equivalentes de status em `PUT /service-requests/:requestId/...`.

## Configuracao da API

Criar arquivo `.env` em `frontend/` com:

```
VITE_API_BASE_URL=http://localhost:3000
```

Se nao informado, o frontend usa `http://localhost:3000` por padrao.

## Como executar

### Backend (na raiz `projeto/`)

1. `npm install`
2. `npm run dev`

### Frontend (em `projeto/frontend/`)

1. `npm install`
2. `npm run dev`
3. Abrir URL exibida pelo Vite (normalmente `http://localhost:5173`)

## Como demonstrar para o professor

1. Iniciar backend e worker.
2. Iniciar frontend.
3. Criar solicitacao na tela Nova solicitacao.
4. Mostrar request na listagem com status inicial.
5. Mostrar transicao de status apos processamento do worker sem recarregar a pagina.
6. Abrir tela de detalhes e confirmar atualizacao automatica.
