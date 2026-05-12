# Arquitetura do Sistema

```mermaid
flowchart LR
    Web[Aplicacao Web]
    Mobile[Aplicacao Mobile]

    API[Backend REST API<br/>Node.js + Express + TypeScript]

    DB[(PostgreSQL)]

    Web -->|HTTPS REST API<br/>HTTP/JSON| API
    Mobile -->|HTTPS REST API<br/>HTTP/JSON| API

    API -->|SQL/TCP<br/>PostgreSQL Protocol| DB
```

## Leitura rápida

- As aplicacoes web e mobile consomem a mesma API por HTTPS e JSON.
- O backend usa Node.js, Express e TypeScript.
- A persistência é feita em PostgreSQL.

Observacao: RabbitMQ ou outra camada de mensageria pode ser adicionada como evolucao futura, mas nao foi implementada na versao atual.

## Legenda técnica

- HTTPS REST API e HTTP/JSON: comunicação entre aplicativos e backend
- SQL/TCP e PostgreSQL Protocol: comunicação entre backend e banco
