# Banco de Dados

O banco é PostgreSQL, com mapeamento pelo Prisma.

## Entidades

### users
Guarda clientes e prestadores.

Campos principais:
- id
- name
- email (único)
- phone
- userType
- address
- city
- state
- createdAt
- updatedAt

### service_categories
Categorias de serviço (ex.: elétrica, encanamento).

Campos:
- id
- name (único)
- description
- createdAt

### service_requests
Solicitações abertas por clientes.

Campos:
- id
- clientId
- providerId (opcional)
- categoryId
- title
- description
- status
- scheduledDate
- estimatedPrice (opcional)
- finalPrice (opcional)
- createdAt
- updatedAt

### reviews
Avaliações de solicitações concluídas.

Campos:
- id
- requestId (único)
- rating
- comment
- createdAt

## Relacionamentos

- User (cliente) 1:N ServiceRequest
- User (prestador) 1:N ServiceRequest
- ServiceCategory 1:N ServiceRequest
- ServiceRequest 1:1 Review

## Observação

O schema completo está em `prisma/schema.prisma`.
Para aplicar no banco local:

```bash
npx prisma migrate dev
```
