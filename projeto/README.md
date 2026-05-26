# Home Service API - Sprint 2 (Eventos Assincronos)

Backend REST de marketplace de servicos residenciais com arquitetura orientada a eventos usando RabbitMQ.

## Objetivo da sprint

Implementar comunicacao assincrona real para o fluxo de criacao de solicitacao de servico:

1. Cliente chama endpoint HTTP
2. API valida e salva no PostgreSQL
3. API publica evento no RabbitMQ
4. Worker consumidor processa evento de forma desacoplada

## Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- RabbitMQ (amqplib)
- Docker Compose

## Arquitetura

```txt
Client App
   | HTTP/JSON
Backend REST API
   | SQL/TCP
PostgreSQL

Backend REST API
   | AMQP
RabbitMQ
   |
Notification Worker
```

Estrutura relevante da Sprint 2:

```txt
src/
  app.ts
  queues/rabbitmq.ts
  producers/serviceRequestCreated.producer.ts
  consumers/serviceRequestCreated.consumer.ts
  workers/notification.worker.ts
  controllers/
  services/
  repositories/
  routes/
  validations/
  middlewares/
  database/
  entities/
  types/
```

## Fluxo assincrono implementado

### Fluxo sincrono (HTTP)

- Endpoint: `POST /api/requests` (alias: `POST /service-requests`)
- A API valida os dados
- A API salva no banco
- A API responde `201 Created`

### Fluxo assincrono (evento)

- Producer publica evento `service.request.created`
- RabbitMQ enfileira no nome de fila `service.request.created`
- Worker consumidor recebe e processa com atraso simulado de 3 segundos

Logs esperados:

```bash
[API] Solicitacao criada: <requestId>
[Producer] Evento publicado { ... }
[Consumer] Evento recebido { ... }
[Worker] Processando notificacao...
[Worker] Notificacao enviada para a solicitacao <requestId> do cliente <clientId>
```

## Documentacao do evento

Nome do evento:

```txt
service.request.created
```

Payload:

```json
{
  "event": "service.request.created",
  "requestId": "a9b39d40-7229-4628-bf8a-4e4b9f68d900",
  "clientId": "2fd3d0c2-0f58-489e-88dd-cd640d5c97f4",
  "status": "OPEN",
  "createdAt": "2026-05-25T20:00:00.000Z"
}
```

- Producer: Backend REST API
- Consumer: Notification Worker
- Fila: `service.request.created`
- Tipo: Async Event

## Variaveis de ambiente

Copie `.env.example` para `.env`.

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5433/home_service_db
RABBITMQ_URL=amqp://localhost:5672
NODE_ENV=development
```

## Execucao com Docker Compose

Subir tudo (backend + postgres + rabbitmq + worker):

```bash
docker compose up --build
```

Servicos disponiveis:

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api/docs`
- RabbitMQ Management: `http://localhost:15672` (guest/guest)
- AMQP: `localhost:5672`

### Modo distribuido (servidores separados)

Para rodar producer e consumer em servidores separados, use `docker-compose.distributed.yml`.

- Servidor da API (producer):

```bash
docker compose -f docker-compose.distributed.yml up -d backend
```

- Servidor do Worker (consumer):

```bash
docker compose -f docker-compose.distributed.yml up -d worker
```

Ambos devem apontar para o mesmo RabbitMQ via `RABBITMQ_URL`.
No servidor da API, configure tambem `DATABASE_URL` para o PostgreSQL compartilhado.

## Execucao local (sem container para a API)

1. Instale dependencias:

```bash
npm install
```

2. Suba Postgres e RabbitMQ via Docker:

```bash
docker compose up -d postgres rabbitmq
```

3. Rode migration:

```bash
npx prisma migrate dev
```

4. Inicie API e worker em terminais separados:

```bash
npm run dev
npm run dev:worker
```

## Endpoints principais

- GET `/api/health`
- POST `/api/requests`
- POST `/service-requests` (alias)
- GET `/api/requests`
- PUT `/api/requests/:requestId/assign`
- PUT `/api/requests/:requestId/complete`
- PUT `/api/requests/:requestId/cancel`

Demais endpoints seguem ativos para usuarios, categorias e avaliacoes.

## Evidencias para apresentacao

1. Print do RabbitMQ Management com fila `service.request.created`
2. `docker compose ps` com backend, worker, postgres e rabbitmq ativos
3. Log da API com `[Producer] Evento publicado`
4. Log do worker com `[Consumer] Evento recebido`
5. Requisicao `POST /api/requests` respondendo 201 antes do processamento do worker

## Testes

```bash
npm test
```

## Documentos de apoio

- `docs/integration-report.md`
- `docs/API_ENDPOINTS.md`
- `docs/ARQUITETURA.md`
- `COMO_RODAR.md`
