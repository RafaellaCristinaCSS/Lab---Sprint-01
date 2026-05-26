# Diagrama de Arquitetura - Sprint 2

```mermaid
flowchart LR
    C[Cliente]
    API[Backend API\nNode.js + Express + TypeScript]
    DB[(PostgreSQL)]
    MQ[(RabbitMQ\nQueue: service.request.created)]
    W[Notification Worker]
    L[Logs/Notificacao]

    C -->|POST /service-requests| API
    API -->|Prisma SQL| DB
    API -->|Publish event| MQ
    MQ -->|Consume event| W
    W -->|Processamento assincrono| L
```

## Leitura rapida

- A API salva dados no PostgreSQL e publica evento no RabbitMQ.
- O worker consome o evento em processo separado.
- O cliente recebe resposta HTTP antes do fim do processamento do worker.

## Protocolos

- Cliente -> API: HTTP/JSON
- API -> Banco: SQL/TCP (Prisma)
- API -> RabbitMQ: AMQP (publish)
- RabbitMQ -> Worker: AMQP (consume)
