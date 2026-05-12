# Arquitetura do Sistema

## Visão geral

A entrega implementada nesta Sprint 1 contempla os seguintes blocos:
- Backend REST API
- Banco de Dados PostgreSQL

Como visao de sistema, a API foi pensada para ser consumida por uma aplicacao unica, web ou mobile, com suporte a diferentes perfis de usuario dentro do mesmo sistema.

Na modelagem atual, cliente e prestador representam papeis de uso da plataforma, e nao aplicacoes separadas.

Essa interface unica ainda nao faz parte da implementacao atual da sprint.

Como evolução futura, o projeto pode incluir uma camada de mensageria (MOM) para eventos assíncronos, mas essa parte nao foi implementada nesta sprint.

## Comunicação entre componentes

- Aplicacao cliente da plataforma -> Backend: HTTP/HTTPS com JSON
- Backend -> Banco: Prisma ORM sobre PostgreSQL

Na implementacao atual da Sprint 1, nao existe integracao com RabbitMQ, Kafka ou outro broker.

## Fluxo principal

1. Usuario acessa a plataforma e atua conforme seu perfil de uso.
2. Backend valida e persiste a solicitacao.
3. Prestador assume a solicitacao.
4. Backend atualiza status e registra conclusao.
5. Cliente envia avaliacao.

Na entrega atual, o foco esta no backend e no banco de dados. A interface da aplicacao ainda esta prevista como consumidor futuro da API.

Observacao: uma etapa de publicacao de eventos assincronos pode ser adicionada no futuro, mas nao faz parte da entrega atual.

## Organização interna do backend

- controllers: mapeiam requisição e resposta
- services: aplicam regras de negócio
- repositories: acessam o banco
- validations: validam dados de entrada
- middlewares: logging e tratamento de erro

Essa separação facilita manutenção, testes e evolução da API.
