# Arquitetura do Sistema - Sprint 2

## Visao geral

A arquitetura implementada e orientada a eventos, com dois fluxos complementares:

- Fluxo sincrono: requisicao HTTP, validacao e persistencia no PostgreSQL.
- Fluxo assincrono: publicacao do evento no RabbitMQ e processamento por worker desacoplado.

Componentes principais:

- Cliente (Postman/Swagger/app cliente)
- Backend REST API (Node.js + Express + TypeScript)
- PostgreSQL (Prisma ORM)
- RabbitMQ (MOM)
- Notification Worker (consumidor separado)

## Diagrama oficial

O diagrama desta arquitetura esta em `docs/DIAGRAMA_ARQUITETURA.png`.

## Comunicacao entre componentes

- Cliente -> Backend: HTTP/JSON
- Backend -> PostgreSQL: SQL/TCP via Prisma
- Backend -> RabbitMQ: AMQP (publish)
- RabbitMQ -> Worker: AMQP (consume)

## Fluxo funcional implementado

1. Cliente envia `POST /service-requests` (alias) ou `POST /api/requests`.
2. Backend valida os dados e persiste a solicitacao no PostgreSQL.
3. Backend retorna `201 Created` imediatamente para o cliente.
4. Backend publica o evento `service.request.created` no RabbitMQ.
5. Worker consome a fila `service.request.created`.
6. Worker executa processamento assincrono (com atraso simulado) e registra logs.

Esse fluxo comprova assincronicidade real: a resposta HTTP acontece antes da conclusao do processamento no worker.

## Contrato do evento

Nome: `service.request.created`

Payload:

```json
{
  "event": "service.request.created",
  "requestId": "uuid",
  "clientId": "uuid",
  "status": "OPEN",
  "createdAt": "2026-05-25T20:00:00.000Z"
}
```

## Mapeamento para o codigo

- Roteamento HTTP: `src/app.ts`
- Caso de uso principal (persistencia + publish): `src/services/ServiceRequestService.ts`
- Producer: `src/producers/serviceRequestCreated.producer.ts`
- Conexao e operacoes RabbitMQ: `src/queues/rabbitmq.ts`
- Consumer: `src/consumers/serviceRequestCreated.consumer.ts`
- Worker: `src/workers/notification.worker.ts`

## Decisoes arquiteturais

- Desacoplamento entre API e processamento de notificacoes.
- Possibilidade de escalar workers sem afetar latencia da API.
- Melhor resiliencia para tarefas de background.
- Base pronta para adicionar novos eventos e consumidores.
