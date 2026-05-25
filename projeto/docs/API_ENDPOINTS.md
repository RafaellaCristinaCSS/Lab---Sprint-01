# API Endpoints

Base URL: `http://localhost:3000/api`

Este documento descreve os endpoints implementados na API, com seus objetivos, payloads principais e codigos de resposta mais comuns.

## Health

### GET /health
Verifica se a API esta ativa.

Resposta esperada:

```json
{
  "status": "healthy",
  "timestamp": "2026-05-11T12:00:00.000Z"
}
```

Codigos comuns:
- 200 OK

## Usuarios

### POST /users
Cria um usuario do tipo cliente ou prestador.

Payload:

```json
{
  "name": "Joao Silva",
  "email": "joao@example.com",
  "phone": "11999999999",
  "userType": "CLIENT",
  "address": "Rua A, 123",
  "city": "Sao Paulo",
  "state": "SP"
}
```

Codigos comuns:
- 201 Created
- 400 Bad Request

### GET /users
Lista todos os usuarios cadastrados.

Codigos comuns:
- 200 OK

### GET /users/providers
Lista apenas usuarios do tipo prestador.

Codigos comuns:
- 200 OK

### GET /users/:id
Consulta um usuario pelo ID.

Codigos comuns:
- 200 OK
- 404 Not Found

### PUT /users/:id
Atualiza os campos de um usuario.

Exemplo de payload:

```json
{
  "name": "Joao da Silva",
  "city": "Campinas"
}
```

Codigos comuns:
- 200 OK
- 400 Bad Request

### DELETE /users/:id
Remove um usuario pelo ID.

Codigos comuns:
- 200 OK
- 400 Bad Request

## Solicitacoes

### POST /requests
Cria uma solicitacao de servico.

Comportamento:
- fluxo sincrono: valida, salva e retorna 201
- fluxo assincrono: publica evento `service.request.created` no RabbitMQ

Payload:

```json
{
  "clientId": "uuid",
  "categoryId": "uuid",
  "title": "Conserto de vazamento",
  "description": "Vazamento na cozinha do apartamento",
  "scheduledDate": "2026-05-20T10:00:00.000Z",
  "estimatedPrice": 200
}
```

Codigos comuns:
- 201 Created
- 400 Bad Request

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

### POST /service-requests
Alias do endpoint de criacao de solicitacoes (sem prefixo `/api`).

Codigos comuns:
- 201 Created
- 400 Bad Request

### GET /requests
Lista todas as solicitacoes.

Codigos comuns:
- 200 OK

### GET /requests/open
Lista as solicitacoes com status aberto.

Codigos comuns:
- 200 OK

### GET /requests/client/:clientId
Lista as solicitacoes de um cliente especifico.

Codigos comuns:
- 200 OK

### GET /requests/:id
Consulta uma solicitacao pelo ID.

Codigos comuns:
- 200 OK
- 404 Not Found

### PUT /requests/:requestId/assign
Atribui um prestador a uma solicitacao.

Payload:

```json
{
  "providerId": "uuid"
}
```

Codigos comuns:
- 200 OK
- 400 Bad Request

### PUT /requests/:requestId/complete
Marca uma solicitacao como concluida.

Payload:

```json
{
  "finalPrice": 220
}
```

Codigos comuns:
- 200 OK
- 400 Bad Request

### PUT /requests/:requestId/cancel
Cancela uma solicitacao.

Codigos comuns:
- 200 OK
- 400 Bad Request

### DELETE /requests/:id
Remove uma solicitacao pelo ID.

Codigos comuns:
- 200 OK
- 400 Bad Request

## Categorias

### POST /categories
Cria uma categoria de servico.

Payload:

```json
{
  "name": "Eletricidade",
  "description": "Servicos de instalacao e manutencao eletrica"
}
```

Codigos comuns:
- 201 Created
- 400 Bad Request

### GET /categories
Lista todas as categorias.

Codigos comuns:
- 200 OK

### GET /categories/:id
Consulta uma categoria pelo ID.

Codigos comuns:
- 200 OK
- 404 Not Found

### PUT /categories/:id
Atualiza uma categoria.

Exemplo de payload:

```json
{
  "name": "Pintura Residencial",
  "description": "Servicos de pintura interna e externa"
}
```

Codigos comuns:
- 200 OK
- 400 Bad Request

### DELETE /categories/:id
Remove uma categoria pelo ID.

Codigos comuns:
- 200 OK
- 400 Bad Request

## Avaliacoes

### POST /reviews
Cria uma avaliacao vinculada a uma solicitacao.

Payload:

```json
{
  "requestId": "uuid",
  "rating": 5,
  "comment": "Servico muito bom"
}
```

Codigos comuns:
- 201 Created
- 400 Bad Request

### GET /reviews
Lista todas as avaliacoes.

Codigos comuns:
- 200 OK

### GET /reviews/:id
Consulta uma avaliacao pelo ID.

Codigos comuns:
- 200 OK
- 404 Not Found

### PUT /reviews/:id
Atualiza uma avaliacao.

Exemplo de payload:

```json
{
  "rating": 4,
  "comment": "Bom atendimento"
}
```

Codigos comuns:
- 200 OK
- 400 Bad Request

### DELETE /reviews/:id
Remove uma avaliacao pelo ID.

Codigos comuns:
- 200 OK
- 400 Bad Request

## Respostas padrao

A API retorna dados em JSON.

Formato comum de erro:

```json
{
  "error": "mensagem"
}
```

Status mais usados:
- 200 OK
- 201 Created
- 400 Bad Request
- 404 Not Found
- 500 Internal Server Error
