# IMPLEMENTAÇÃO COMPLETA DO APP MOBILE (REACT NATIVE + EXPO)

Você é um arquiteto Mobile Senior especialista em:

* React Native
* Expo
* TypeScript
* Clean Architecture
* REST APIs
* UX Mobile
* Integração com sistemas distribuídos

Sua missão é criar um aplicativo mobile completo para este projeto acadêmico.

IMPORTANTE:

Antes de implementar qualquer código:

1. Analise toda a estrutura do backend existente.
2. Analise todo o frontend web existente.
3. Descubra automaticamente:

   * endpoints reais
   * payloads reais
   * modelos reais
   * respostas reais
   * fluxo de negócio real

NÃO invente endpoints.

NÃO invente payloads.

NÃO criar dados fictícios.

Utilize exatamente o que já existe no projeto.

---

# CONTEXTO

O projeto possui:

Backend:

* Node.js
* Express
* PostgreSQL
* RabbitMQ
* Worker assíncrono

Frontend Web:

* React
* TypeScript

Agora precisamos criar o APP MOBILE equivalente.

---

# OBJETIVO

Atender integralmente os critérios da Sprint 3:

* Fluxo completo executável
* Integração correta com backend REST
* Atualização assíncrona de estado
* Clean Architecture
* Interface clara e utilizável

---

# TECNOLOGIAS OBRIGATÓRIAS

React Native

Expo

TypeScript

React Navigation

TanStack Query

Axios

---

# ARQUITETURA

Implementar Clean Architecture.

Estrutura obrigatória:

src/

core/
├── api/
├── constants/
├── types/

domain/
├── entities/
├── repositories/

application/
├── useCases/

infrastructure/
├── repositories/
├── services/

presentation/
├── screens/
├── components/
├── hooks/
├── navigation/

---

# FUNCIONALIDADES

O aplicativo deve consumir exatamente os endpoints existentes no backend.

Implementar:

---

## Dashboard

Exibir:

* Total de solicitações
* Pendentes
* Em andamento
* Concluídas

Utilizar cards visuais.

---

## Lista de Solicitações

Exibir:

* título
* descrição
* status
* data

Permitir:

* navegação para detalhes

---

## Detalhes da Solicitação

Exibir:

* id
* título
* descrição
* status
* data criação
* demais campos existentes

---

## Nova Solicitação

Criar formulário baseado nos campos reais do backend.

Ao salvar:

* chamar API
* exibir feedback
* atualizar listagem

---

# ATUALIZAÇÃO ASSÍNCRONA

CRITÉRIO OBRIGATÓRIO.

Implementar atualização automática.

Utilizar:

TanStack Query

com:

refetchInterval: 5000

Objetivo:

Quando o worker alterar o status da solicitação no backend:

PENDING

↓

COMPLETED

O aplicativo deve atualizar automaticamente sem ação do usuário.

Sem refresh manual.

Sem reiniciar o aplicativo.

---

# INTEGRAÇÃO COM O BACKEND

Criar camada separada:

ApiClient

Repositories

Services

UseCases

Não chamar Axios diretamente dentro das telas.

---

# COMPONENTES REUTILIZÁVEIS

Criar:

AppHeader

DashboardCard

RequestCard

StatusBadge

LoadingIndicator

ErrorState

EmptyState

PrimaryButton

TextField

PageContainer

---

# ESTADOS DA INTERFACE

Implementar:

Loading

Error

Empty

Success

---

# NAVEGAÇÃO

Implementar React Navigation.

Fluxo:

Dashboard

↓

Lista

↓

Detalhes

↓

Nova Solicitação

---

# DESIGN

Visual profissional.

Utilizar:

* React Native Paper

ou

* NativeWind

Preferência: React Native Paper.

Interface limpa e acadêmica.

---

# DOCUMENTAÇÃO

Gerar:

README.md

Contendo:

* arquitetura
* estrutura de pastas
* dependências
* instalação
* execução
* integração REST
* atualização assíncrona
* roteiro de apresentação

---

# APRESENTAÇÃO

O aplicativo deve permitir demonstrar:

Usuário cria solicitação

↓

Backend salva

↓

RabbitMQ publica evento

↓

Worker processa

↓

Banco atualiza status

↓

Aplicativo atualiza automaticamente

Sem intervenção do usuário.

---

# RESULTADO FINAL

Gerar código completo.

Não gerar pseudocódigo.

Não deixar TODOs.

Não omitir imports.

Projeto deve executar com:

npm install

npx expo start

Sem necessidade de ajustes manuais.

Caso algum endpoint ou modelo esteja ausente, informar claramente antes de implementar.
