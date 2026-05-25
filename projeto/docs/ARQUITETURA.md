# Arquitetura do Sistema

## Visão geral

Esta entrega da Sprint 2 contempla os seguintes blocos:
- Backend REST API
- Banco de Dados PostgreSQL
- RabbitMQ (MOM)
- Worker consumidor para processamento assincrono

## Comunicação entre componentes

- Aplicacao cliente da plataforma -> Backend: HTTP/HTTPS com JSON
- Backend -> Banco: Prisma ORM sobre PostgreSQL
- Backend -> RabbitMQ: AMQP (publicacao de eventos)
- RabbitMQ -> Worker: consumo assíncrono de eventos

Diagrama simplificado:

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

## Fluxo principal

1. Cliente envia `POST /api/requests`.
2. Backend valida e persiste a solicitacao.
3. Backend retorna `201 Created` (fluxo sincrono).
4. Backend publica evento `service.request.created` no RabbitMQ.
5. Worker consome a fila `service.request.created`.
6. Worker executa processamento assincrono desacoplado.

Esse fluxo comprova assincronicidade real: a resposta HTTP ocorre antes do processamento do worker.

Evento publicado:

```json
{
  "event": "service.request.created",
  "requestId": "uuid",
  "clientId": "uuid",
  "status": "OPEN",
  "createdAt": "2026-05-25T20:00:00.000Z"
}
```

## Organização interna do backend

- controllers: mapeiam requisição e resposta
- services: aplicam regras de negócio
- repositories: acessam o banco
- queues: conexao RabbitMQ e operacoes de publish/consume
- producers: publicacao de eventos
- consumers: regras de consumo por evento
- workers: processo separado para executar consumidores
- validations: validam dados de entrada
- middlewares: logging e tratamento de erro

Essa separação facilita manutenção, testes e evolução da API.
