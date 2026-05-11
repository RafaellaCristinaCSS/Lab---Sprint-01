# Arquitetura do Sistema

## Visão geral

A solução implementada nesta Sprint 1 foi organizada em quatro blocos principais:
- Frontend do Cliente
- Frontend do Prestador
- Backend REST API
- Banco de Dados PostgreSQL

Como evolução futura, o projeto pode incluir uma camada de mensageria (MOM) para eventos assíncronos, mas essa parte nao foi implementada nesta sprint.

## Comunicação entre componentes

- Frontends -> Backend: HTTP/HTTPS com JSON
- Backend -> Banco: Prisma ORM sobre PostgreSQL

Na implementacao atual da Sprint 1, nao existe integracao com RabbitMQ, Kafka ou outro broker.

## Fluxo principal

1. Cliente cria solicitação no app.
2. Backend valida e persiste a solicitação.
3. Prestador assume a solicitação.
4. Backend atualiza status e registra conclusão.
5. Cliente envia avaliação.

Observacao: uma etapa de publicacao de eventos assincronos pode ser adicionada no futuro, mas nao faz parte da entrega atual.

## Organização interna do backend

- controllers: mapeiam requisição e resposta
- services: aplicam regras de negócio
- repositories: acessam o banco
- validations: validam dados de entrada
- middlewares: logging e tratamento de erro

Essa separação facilita manutenção, testes e evolução da API.
