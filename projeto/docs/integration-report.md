# Relatorio de Integracao - Sprint 2

## Objetivo

Implementar integracao assincrona real entre backend e worker utilizando RabbitMQ para desacoplar o processamento de notificacoes no fluxo de criacao de solicitacao de servico.

## Componentes integrados

- Backend REST API (Node.js + Express + TypeScript)
- PostgreSQL (persistencia principal via Prisma)
- RabbitMQ (MOM)
- Notification Worker (processo independente)

## Arquitetura de integracao

```txt
Client -> Backend REST API -> PostgreSQL
Client -> Backend REST API -> RabbitMQ -> Notification Worker
```

## Evento implementado

- Nome: `service.request.created`
- Fila: `service.request.created`
- Producer: backend (camada service + producer dedicado)
- Consumer: worker de notificacoes

### Payload

```json
{
  "event": "service.request.created",
  "requestId": "uuid",
  "clientId": "uuid",
  "status": "OPEN",
  "createdAt": "2026-05-25T20:00:00.000Z"
}
```

## Fluxo de execucao

1. Cliente chama `POST /api/requests`.
2. Backend valida e salva a solicitacao no banco.
3. Backend responde `201 Created` imediatamente.
4. Backend publica `service.request.created` no RabbitMQ.
5. Worker recebe mensagem e processa notificacao com atraso simulado de 3 segundos.

## Evidencia de assincronicidade

- A resposta HTTP ocorre antes do processamento do worker.
- Logs da API e do worker sao exibidos em processos separados.

Logs esperados:

```bash
[API] Solicitacao criada: <requestId>
[Producer] Evento publicado {...}
[Consumer] Evento recebido {...}
[Worker] Processando notificacao...
[Worker] Notificacao enviada para a solicitacao <requestId> do cliente <clientId>
```

## Beneficios obtidos

- Desacoplamento entre criacao de solicitacao e notificacao
- Maior resiliencia para tarefas nao criticas
- Melhor escalabilidade horizontal do processamento assincrono
- Base pronta para novos consumidores e eventos

## Como validar rapidamente

1. `docker compose up --build`
2. Enviar `POST /api/requests`
3. Verificar fila no RabbitMQ Management (`http://localhost:15672`)
4. Confirmar logs do producer (backend) e consumer (worker)

## Observacoes tecnicas

- Canal AMQP configurado com fila duravel.
- Mensagens publicadas como persistentes.
- Consumer com `prefetch(1)` e `ack` manual.
- Em caso de erro de consumo, mensagem recebe `nack` sem requeue para evitar loop infinito em payload invalido.
