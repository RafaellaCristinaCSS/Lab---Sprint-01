# Home Service Mobile - Sprint 3

Aplicativo mobile em React Native + Expo com integracao REST ao backend do projeto e arquitetura em camadas (Clean Architecture).

## Arquitetura

Estrutura implementada:

```txt
src/
   core/
      api/
      constants/
      types/
   domain/
      entities/
      repositories/
   application/
      useCases/
   infrastructure/
      repositories/
      services/
   presentation/
      screens/
      components/
      hooks/
      navigation/
```

## Dependencias principais

- React Native
- Expo
- TypeScript
- React Navigation
- TanStack Query
- Axios
- React Native Paper

## Integracao REST (endpoints reais)

Os servicos mobile utilizam exclusivamente endpoints existentes no backend:

- GET /service-requests
- GET /service-requests/:id
- POST /service-requests
- GET /api/users
- GET /api/categories

Campos do formulario de criacao seguem o contrato real do backend:

- clientId
- categoryId
- title
- description
- scheduledDate
- estimatedPrice (opcional)

## Atualizacao assincrona

As telas de dashboard, lista e detalhes usam polling automatico com TanStack Query:

- refetchInterval: 5000

Assim, toda alteracao de status refletida no backend aparece no app sem refresh manual.

## Como instalar

Na pasta home-service-mobile:

```bash
npm install
```

## Como executar

```bash
npx expo start
```

## Configuracao da API

Padrao local configurado em app.json:

```json
"extra": {
   "apiBaseUrl": "http://localhost:3000"
}
```

Para Android Emulator local, ajuste para `http://10.0.2.2:3000` se necessario.

## Estados de interface implementados

- Loading
- Error
- Empty
- Success

## Componentes reutilizaveis implementados

- AppHeader
- DashboardCard
- RequestCard
- StatusBadge
- LoadingIndicator
- ErrorState
- EmptyState
- PrimaryButton
- TextField
- PageContainer

## Navegacao

Fluxo com React Navigation (stack):

1. Dashboard
2. Lista de solicitacoes
3. Detalhes da solicitacao
4. Nova solicitacao

## Roteiro de apresentacao (Sprint 3)

1. Abrir Dashboard e mostrar cards de total, pendentes, em andamento e concluidas.
2. Ir para Lista de solicitacoes e mostrar cards com status.
3. Abrir Detalhes de uma solicitacao e destacar polling de 5 segundos.
4. Criar Nova solicitacao no app.
5. Mostrar nova solicitacao na lista sem reiniciar app.
6. Mostrar mudanca de status no backend e atualizacao automatica no app.
