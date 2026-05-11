# Como rodar e testar o software

Este projeto pode ser testado de 2 formas:

1. usando o PostgreSQL instalado no seu computador
2. usando PostgreSQL via Docker

Se voce quer apresentar local no seu notebook, prefira a opcao 1.

## 1. Preparar o projeto

No PowerShell, entre na pasta do projeto e instale as dependencias:

```powershell
cd projeto
npm install
```

Crie o arquivo `.env`:

```powershell
Copy-Item .env.example .env
```

## 2. Configurar o banco de dados

### Opcao 1: PostgreSQL local no seu notebook

Edite o arquivo `.env` e coloque o usuario e a senha reais do seu PostgreSQL local.

Exemplo:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/home_service_db"
NODE_ENV=development
```

Antes de rodar a migration, o banco `home_service_db` precisa existir.

Se voce ja tiver o `psql` no PATH, pode criar assim:

```powershell
createdb -U postgres home_service_db
```

Se nao tiver, abra o pgAdmin ou outro cliente PostgreSQL e crie o banco manualmente com o nome `home_service_db`.

### Opcao 2: PostgreSQL via Docker

Use essa opcao somente se quiser subir um banco isolado pelo Docker.

Pre-requisito no Windows:

```powershell
docker version
```

Se esse comando falhar, abra o Docker Desktop e espere o engine iniciar.

Depois suba o banco:

```powershell
docker compose up -d postgres
docker compose ps
```

Nessa opcao, o projeto esta configurado para acessar o banco pela porta `5433` no host.

## 3. Criar as tabelas

Com o banco pronto, rode:

```powershell
npx prisma migrate dev --name init
```

Esse comando deve:

1. conectar no PostgreSQL
2. criar a estrutura do banco
3. gerar o client do Prisma

Se esse passo falhar, a API nao vai funcionar corretamente.

## 4. Popular dados iniciais

Para inserir dados de exemplo:

```powershell
npm run seed
```

Esse seed cria:

1. categorias de servico
2. um cliente
3. um prestador
4. uma solicitacao concluida
5. uma avaliacao

## 5. Subir a API

Rode:

```powershell
npm run dev
```

A API deve ficar disponivel em:

```text
http://localhost:3000
```

## 6. Confirmar que o software esta funcionando

Faça estes testes minimos.

### Teste 1: health check

Abra no navegador ou no Postman:

```text
GET http://localhost:3000/api/health
```

Voce deve receber um JSON com `status: healthy`.

### Teste 2: listar usuarios

Se voce rodou o seed, teste:

```text
GET http://localhost:3000/api/users
```

Voce deve receber pelo menos os usuarios de exemplo inseridos no seed.

### Teste 3: listar categorias

```text
GET http://localhost:3000/api/categories
```

Voce deve receber categorias como Encanamento, Eletricidade e Limpeza.

### Teste 4: listar solicitacoes

```text
GET http://localhost:3000/api/requests
```

Se o seed rodou corretamente, deve existir ao menos uma solicitacao.

### Teste 5: cadastrar solicitacao

Para esse teste, voce precisa de:

1. um `clientId` de um usuario com `userType = CLIENT`
2. um `categoryId` de uma categoria existente

Voce pode pegar esses IDs em:

```text
GET http://localhost:3000/api/users
GET http://localhost:3000/api/categories
```

Depois faca o POST:

```text
POST http://localhost:3000/api/requests
Content-Type: application/json
```

```json
{
	"clientId": "COLE_O_ID_DO_CLIENTE_AQUI",
	"categoryId": "COLE_O_ID_DA_CATEGORIA_AQUI",
	"title": "Troca de tomada",
	"description": "Preciso trocar uma tomada que parou de funcionar no quarto",
	"scheduledDate": "2026-05-20T14:00:00.000Z",
	"estimatedPrice": 120
}
```

Se estiver tudo certo, a API deve responder com `201 Created` e retornar a solicitacao criada.

## 7. Rodar os testes automatizados

Se quiser validar a aplicacao por testes:

```powershell
npm test
```

## 8. Fluxo recomendado para sua apresentacao local

Se voce for apresentar sem Docker, a ordem mais segura e:

1. confirmar o `.env` com seu PostgreSQL local
2. rodar `npx prisma migrate dev --name init`
3. rodar `npm run seed`
4. rodar `npm run dev`
5. abrir `GET /api/health`
6. mostrar `GET /api/users`
7. mostrar `GET /api/categories`
8. mostrar `POST /api/requests`

## Troubleshooting

### Erro `P1001: Can't reach database server`

Isso significa que o Prisma nao conseguiu chegar no PostgreSQL.

Verifique:

1. se o PostgreSQL esta ligado
2. se o `DATABASE_URL` esta correto
3. se a porta esta correta: `5432` para PostgreSQL local ou `5433` para Docker deste projeto
4. se o banco `home_service_db` existe

### Erro de senha ou autenticacao

Se aparecer erro de autenticacao, o `.env` esta sendo lido, mas o usuario ou a senha do PostgreSQL estao errados.

### API nao sobe mesmo com migration pronta

Confirme se a porta `3000` esta livre e rode novamente:

```powershell
npm run dev
```
