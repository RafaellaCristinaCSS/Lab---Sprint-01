# App Flutter - Home Service

## Estrutura (Clean Architecture)

```txt
app/lib/
  core/           # constantes, tema, utilitarios
  domain/         # entities + repository interfaces
  data/           # datasources, models, repository impl
  presentation/   # screens, widgets, providers
```

## Pre-requisitos

- Flutter SDK 3.x
- Backend rodando em `http://localhost:3000`
- Docker Compose (recomendado)

## 1) Subir backend + worker + RabbitMQ

Na pasta `projeto/`:

```bash
docker compose up --build
```

Aguarde API, Postgres, RabbitMQ e worker ficarem ativos.

## 2) Popular dados demo

```bash
node scripts/seed-demo-data.js
```

Isso cria categorias, clientes e fornecedores para teste no app.

## 3) Rodar o app Flutter

```bash
cd app
flutter pub get
flutter run
```

### URL da API

A URL padrao e escolhida automaticamente por plataforma:

- **Web / Chrome / Windows / iOS simulator:** `http://localhost:3000`
- **Emulador Android:** `http://10.0.2.2:3000`
- **Celular fisico:** `http://IP_DA_SUA_MAQUINA:3000`

Use o botao **Testar conexao com backend** na tela inicial antes de entrar no app.

Se aparecer `Failed to fetch`, quase sempre e URL errada para a plataforma ou backend parado.

## Fluxos implementados

### Cliente
1. Escolher perfil Cliente
2. Selecionar usuario cliente
3. Criar solicitacao (`POST /service-requests`)
4. Acompanhar status com polling automatico (5s)
5. Ver transicao assincrona `PENDING -> OPEN` apos worker RabbitMQ
6. Cancelar solicitacao (`PUT /service-requests/:id/cancel`)

### Fornecedor
1. Escolher perfil Fornecedor
2. Selecionar usuario prestador
3. Ver solicitacoes abertas (`GET /api/requests/open`)
4. Aceitar (`PUT /service-requests/:id/assign`)
5. Iniciar servico (`PUT /service-requests/:id/start`)
6. Concluir (`PUT /service-requests/:id/complete`)

## Mensageria assincrona

Ao criar solicitacao:
- API salva com status `PENDING`
- Worker consome evento RabbitMQ
- Apos ~3s, worker atualiza status para `OPEN`
- App reflete mudanca via polling (sem refresh manual)

## Checklist instrucoes.md

- Fluxo Cliente e Fornecedor completos
- Integracao REST com endpoints exigidos
- Polling assincrono respeitando event-driven
- Clean Architecture no Flutter
- UI adaptada por perfil de usuario
