# Home Service API

Backend REST desenvolvido para a Sprint 1 da disciplina de Laboratório.

## Visão geral

O projeto simula uma plataforma de serviços residenciais. O objetivo é conectar:
- clientes que precisam de um serviço
- prestadores que executam esse serviço

A API cobre o fluxo principal: cadastro de usuários, abertura de solicitação, atribuição de prestador, conclusão e avaliação.

## Tecnologias

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Joi (validação)
- Jest (estrutura de testes)

## Arquitetura adotada

A estrutura segue camadas simples e separadas por responsabilidade:
- controllers: entrada e saída HTTP
- services: regras de negócio
- repositories: acesso ao banco
- validations: validação de payload
- middlewares: logging e tratamento de erro

Estrutura de pastas principal:

```txt
src/
  app.ts
  controllers/
  services/
  repositories/
  routes/
  middlewares/
  validations/
  entities/
  database/
```

## Critérios de avaliação atendidos

### 1. Clareza e viabilidade da proposta de domínio

O projeto apresenta um domínio claro, objetivo e compatível com a Sprint 1: uma plataforma de serviços residenciais que conecta clientes e prestadores em um fluxo de cadastro, solicitação, atribuição, conclusão e avaliação.

Esse critério é sustentado por:

- definição do problema e contexto em `docs/PROPOSTA.md`
- perfis de usuário bem definidos: cliente e prestador
- funcionalidades principais coerentes com um backend REST acadêmico
- escopo técnico viável para a sprint

### 2. Qualidade e completude do diagrama de arquitetura

O projeto possui documentação arquitetural específica, com descrição textual e diagrama da solução implementada na Sprint 1.

Esse critério é atendido por:

- visão geral da arquitetura em `docs/ARQUITETURA.md`
- diagrama principal em `docs/DIAGRAMA_ARQUITETURA.md`
- definição dos componentes centrais: App Cliente, App Prestador, Backend REST API e PostgreSQL
- explicitação de que mensageria é uma possibilidade de evolução futura, nao fazendo parte da implementação atual

### 3. Funcionalidade e correção dos endpoints REST

A API disponibiliza endpoints REST organizados por recurso, com operações de criação, listagem, consulta por ID, atualização e remoção, além de fluxos específicos do domínio, como atribuição e conclusão de solicitação.

Esse critério é atendido por:

- rotas separadas por contexto em `src/routes/`
- controllers dedicados em `src/controllers/`
- regras de negócio em `src/services/`
- validações com Joi em `src/validations/`
- suporte a respostas em JSON e códigos HTTP adequados aos fluxos principais

Exemplos de recursos cobertos:

- usuários
- categorias
- solicitações
- avaliações
- health check da API

### 4. Organização do código (Clean Architecture / boas práticas)

O projeto segue uma arquitetura em camadas com separação clara de responsabilidades, favorecendo manutenção, legibilidade e evolução incremental do backend.

Esse critério é atendido por:

- `controllers` para entrada e saída HTTP
- `services` para regras de negócio
- `repositories` para acesso ao banco
- `middlewares` para logging e tratamento de erro
- `validations` para validação de payload
- uso de TypeScript para tipagem e organização estrutural do código

Embora o projeto esteja estruturado como arquitetura em camadas, ele também incorpora boas práticas normalmente esperadas em avaliações acadêmicas de backend, como modularização, separação de responsabilidades e documentação complementar.

### 5. Documentação dos endpoints (coleção de testes)

Os endpoints estão documentados tanto no README quanto em documentação complementar, permitindo validação manual e apresentação prática do sistema.

Esse critério é atendido por:

- listagem dos endpoints principais neste README
- documentação detalhada em `docs/API_ENDPOINTS.md`
- coleção Postman em `postman/home-service-api.postman_collection.json`
- guia de execução e testes manuais em `COMO_RODAR.md`

Com isso, o projeto oferece uma base suficiente para demonstração, validação funcional e apresentação acadêmica da API.

## Como executar

1. Instale dependências:

```bash
npm install
```

2. Configure variáveis de ambiente (copie `.env.example` para `.env` e ajuste):

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5433/home_service_db
NODE_ENV=development
```

Se voce ja tiver um PostgreSQL local em execucao na porta `5432`, use a configuracao acima para conectar no banco do Docker pela porta `5433` e evitar conflito.

Se quiser rodar sem Docker, ajuste o `DATABASE_URL` para o seu PostgreSQL local, por exemplo:

```env
PORT=3000
DATABASE_URL=postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/home_service_db
NODE_ENV=development
```

Antes da migration, garanta que o banco `home_service_db` exista na sua instalacao local do PostgreSQL.

3. Rode migrations:

```bash
npx prisma migrate dev
```

4. Opcional: popular dados iniciais:

```bash
npm run seed
```

5. Inicie a API:

```bash
npm run dev
```

Servidor: `http://localhost:3000`

## Endpoints principais

### Health
- GET `/api/health`

### Usuários
- POST `/api/users`
- GET `/api/users`
- GET `/api/users/providers`
- GET `/api/users/:id`
- PUT `/api/users/:id`
- DELETE `/api/users/:id`

### Solicitações
- POST `/api/requests`
- GET `/api/requests`
- GET `/api/requests/open`
- GET `/api/requests/client/:clientId`
- GET `/api/requests/:id`
- PUT `/api/requests/:requestId/assign`
- PUT `/api/requests/:requestId/complete`
- PUT `/api/requests/:requestId/cancel`
- DELETE `/api/requests/:id`

### Categorias
- POST `/api/categories`
- GET `/api/categories`
- GET `/api/categories/:id`
- PUT `/api/categories/:id`
- DELETE `/api/categories/:id`

### Avaliações
- POST `/api/reviews`
- GET `/api/reviews`
- GET `/api/reviews/:id`
- PUT `/api/reviews/:id`
- DELETE `/api/reviews/:id`

## Exemplo rápido de request

Criar usuário:

```http
POST /api/users
Content-Type: application/json
```

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "11999999999",
  "userType": "CLIENT",
  "address": "Rua A, 123",
  "city": "São Paulo",
  "state": "SP"
}
```

## Tratamento de erros

A API retorna erros em JSON no formato:

```json
{
  "error": "mensagem"
}
```

Status mais comuns:
- 200 OK
- 201 Created
- 400 Bad Request
- 404 Not Found
- 500 Internal Server Error

## Testes

```bash
npm test
```

## Observação

A documentação acadêmica da proposta e arquitetura está em `docs/`.
