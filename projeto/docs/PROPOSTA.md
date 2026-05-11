Proposta de Projeto - Sprint 1

Tema

Plataforma de serviços residenciais (Home Service).

Contexto do problema

No dia a dia, muitas pessoas precisam de serviços como encanamento, elétrica, limpeza ou pintura, mas ainda contratam por indicação informal. Esse modelo tem alguns limites: pouca padronização, pouca rastreabilidade e dificuldade para comparar prestadores.

A proposta do projeto é criar um backend que organize esse processo em uma API única, com fluxo claro entre cliente e prestador.

Justificativa da escolha

O domínio foi escolhido por três motivos:
- é realista e comum no mercado
- permite modelar regras de negócio relevantes sem exagerar na complexidade
- atende bem ao escopo da sprint, que exige arquitetura e endpoints REST funcionais

Perfis de usuário

#Cliente
Pessoa que abre uma solicitação de serviço, informa descrição, data e acompanha o andamento.

#Prestador
Profissional que recebe atribuição de uma solicitação e executa o serviço.

Funcionalidades principais

- cadastro de usuários (cliente/prestador)
- cadastro e consulta de categorias de serviço
- criação de solicitação de serviço
- atribuição de prestador
- atualização de status da solicitação
- registro de avaliação após conclusão

Escopo técnico da sprint

- API REST com Node.js + Express + TypeScript
- persistência com PostgreSQL e Prisma
- validação de entrada com Joi
- organização por camadas (controller, service, repository)
- documentação de endpoints e arquitetura

Resultado esperado

Ao final da sprint, o sistema deve permitir o fluxo mínimo de ponta a ponta:
1. cliente é cadastrado
2. cliente abre solicitação
3. prestador é atribuído
4. solicitação é concluída
5. cliente avalia o atendimento