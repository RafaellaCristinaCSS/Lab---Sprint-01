# Evidencias Sprint 2 - MOM + Eventos

Este documento organiza as evidencias obrigatorias para apresentacao.

## 1) RabbitMQ Management

- URL: http://localhost:15672
- Usuario/senha: guest/guest
- Evidencia esperada: dashboard aberto com overview e fila criada.

Espaco para print:
- print_rabbitmq_dashboard.png

## 2) Fila criada

- Fila obrigatoria: service.request.created
- Evidencia esperada: fila visivel em Queues and Streams.

Espaco para print:
- print_fila_service_request_created.png

## 3) Mensagens trafegando

- Acao: disparar POST /service-requests ou POST /api/requests
- Evidencia esperada: atividade de mensagens na fila.

Espaco para print:
- print_mensagens_fila.png

## 4) Logs do Producer (API)

Logs esperados:

```bash
[API] Solicitacao criada: <requestId>
[Producer] Evento publicado { ... }
```

Espaco para print:
- print_logs_api_producer.png

## 5) Logs do Consumer (Worker)

Logs esperados:

```bash
[Consumer] Evento recebido { ... }
[Worker] Processando notificacao...
[Worker] Notificacao enviada para a solicitacao <requestId> do cliente <clientId>
```

Espaco para print:
- print_logs_worker_consumer.png

## 6) docker ps funcionando

Comando:

```bash
docker compose ps
```

Evidencia esperada: backend, worker, postgres e rabbitmq em execucao.

Espaco para print:
- print_docker_compose_ps.png

## 7) Comando sugerido para gerar todas as evidencias

```bash
docker compose up --build
```

Depois execute um POST e capture os prints listados acima.
