# Como rodar e testar o software (Sprint 2)

Este guia cobre backend + PostgreSQL + RabbitMQ + worker assincrono.

## 1. Preparar o projeto

No PowerShell:

```powershell
cd projeto
npm install
Copy-Item .env.example .env
```

Edite `.env` se necessario:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5433/home_service_db
RABBITMQ_URL=amqp://localhost:5672
NODE_ENV=development
```

## 2. Subir infraestrutura com Docker

Pre-requisito:

```powershell
docker version
```

Suba os servicos:

```powershell
docker compose up -d postgres rabbitmq
docker compose ps
```

RabbitMQ Management:

```text
http://localhost:15672
```

Usuario e senha padrao:

```text
guest / guest
```

## 3. Criar as tabelas

Com o banco pronto:

```powershell
npx prisma migrate dev --name init
```

## 4. Subir API e worker

Use dois terminais.

Terminal 1 (API):

```powershell
npm run dev
```

Terminal 2 (worker):

```powershell
npm run dev:worker
```

## 5. Validar funcionamento

### Teste 1: Health check

```text
GET http://localhost:3000/api/health
```

Esperado: JSON com `status: healthy`.

### Teste 2: Swagger

```text
GET http://localhost:3000/api/docs
```

### Teste 3: Criar solicitacao (dispara evento)

```text
POST http://localhost:3000/api/requests
Content-Type: application/json
```

```json
{
	"clientId": "COLE_O_ID_DO_CLIENTE_AQUI",
	"categoryId": "COLE_O_ID_DA_CATEGORIA_AQUI",
	"title": "Troca de tomada",
	"description": "Preciso trocar uma tomada que parou de funcionar no quarto",
	"scheduledDate": "2026-05-20T14:00:00.000Z",
	"estimatedPrice": 120
}
```

Resposta esperada:

```json
{
	"message": "Solicitacao criada com sucesso",
	"data": {
		"id": "..."
	}
}
```

### Teste 4: Evidencia de assincronicidade

No terminal da API:

```bash
[API] Solicitacao criada: <requestId>
[Producer] Evento publicado {...}
```

No terminal do worker (depois da resposta HTTP):

```bash
[Consumer] Evento recebido {...}
[Worker] Processando notificacao...
[Worker] Notificacao enviada para a solicitacao <requestId> do cliente <clientId>
```

## 6. Opcao alternativa: subir tudo pelo compose

```powershell
docker compose up --build
```

Esse comando sobe `backend`, `worker`, `postgres` e `rabbitmq`.

## 7. Rodar testes automatizados

```powershell
npm test
```

## Troubleshooting

### Erro `P1001: Can't reach database server`

Verifique se o `DATABASE_URL` aponta para `localhost:5433` quando usar PostgreSQL do Docker.

### Erro ao conectar no RabbitMQ

1. confira se `docker compose ps` mostra `rabbitmq` ativo
2. confira `RABBITMQ_URL=amqp://localhost:5672`
3. teste o painel em `http://localhost:15672`

### API responde 201 mas worker nao processa

1. confirme que `npm run dev:worker` esta rodando
2. veja se a fila `service.request.created` existe no RabbitMQ Management
