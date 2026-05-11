# Arquitetura Backend REST da Sprint 1

```mermaid
flowchart LR
    Cliente[App Cliente]
    Prestador[App Prestador]

    API[Backend REST API<br/>Node.js + Express + TypeScript]

    DB[(PostgreSQL)]

    Cliente -->|HTTPS REST API<br/>HTTP/JSON| API
    Prestador -->|HTTPS REST API<br/>HTTP/JSON| API

    API -->|SQL/TCP<br/>PostgreSQL Protocol| DB
```

## Leitura rápida

- Os dois frontends acessam a mesma API por HTTPS e JSON.
- O backend usa Node.js, Express e TypeScript.
- A persistência é feita em PostgreSQL.

Observacao: RabbitMQ ou outra camada de mensageria pode ser adicionada como evolucao futura, mas nao foi implementada nesta Sprint 1.

## Legenda técnica

- HTTPS REST API e HTTP/JSON: comunicação entre aplicativos e backend
- SQL/TCP e PostgreSQL Protocol: comunicação entre backend e banco
