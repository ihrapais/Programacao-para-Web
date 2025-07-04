# Guia de Apresentação - Anderson Schieck Lopes
# Projeto "Bamburgueria" (Sistema de Restaurante com Cardápio Online e Pedidos)

Este guia serve como um roteiro para apresentar o projeto "Bamburgueria", um sistema de cardápio e pedidos online, destacando suas tecnologias, arquitetura e funcionalidades.

## 1. Introdução (2-3 minutos)

- **Objetivo do Projeto:** Apresentar um sistema de cardápio digital e gestão de pedidos para um estabelecimento (ex: hamburgueria), com funcionalidades para clientes (visualizar cardápio, adicionar ao carrinho) e administradores terem a possibilidade de gerenciar,  editar e cadastrar produtos, visualizar pedidos.
- **Contexto:** Como o projeto surgiu, qual problema ele resolve (ex: modernizar pedidos, agilizar atendimento, facilitar gestão).
- **Visão Geral:** É uma aplicação Full-Stack, dividida em Back-End (API) e Front-End (Interface do Usuário).

## 2. Tecnologias Utilizadas (5-7 minutos)

### 2.1. Back-End (API)
- **Linguagem:** Java
- **Framework:** Spring Boot
  - **Por que Spring Boot?** Facilita o desenvolvimento de APIs RESTful, possui um ecossistema robusto, auto-configuração, e é amplamente utilizado no mercado.
- **Segurança:** Spring Security com JWT (JSON Web Tokens)
  - **Explicação:** Como a autenticação e autorização são gerenciadas. JWTs garantem que as requisições sejam seguras e que apenas usuários autorizados (ex: ADMIN) possam acessar certas funcionalidades.
- **Banco de Dados:** MySQL
  - **Explicação:** Banco de dados relacional para testes com possibilidade de persistência de dados alterando o CREATE para UPDATE na ApplicationProperties
- **ORM (Mapeamento Objeto-Relacional):** Spring Data JPA / Hibernate
  - **Explicação:** Facilita a interação com o banco de dados, mapeando objetos Java para tabelas do banco.
- **Ferramenta de Build:** Maven
  - **Explicação:** Gerenciamento de dependências e ciclo de vida do projeto.

### 2.2. Front-End (Interface do Usuário)
- **Linguagem:** TypeScript
  - **Por que TypeScript?** Adiciona tipagem estática ao JavaScript, o que ajuda a prevenir erros, melhora a legibilidade e a manutenibilidade do código, especialmente em projetos maiores.
- **Framework/Biblioteca:** React
  - **Por que React?** Biblioteca popular para construção de interfaces de usuário interativas e reativas, baseada em componentes.
- **Ferramenta de Build:** Vite
  - **Por que Vite?** Ferramenta de build moderna e rápida para projetos front-end, oferece hot module replacement (HMR) e otimizações para produção.
- **Gerenciamento de Estado:** Context API (para carrinho e notificações), `useState`/`useEffect` (para estado de autenticação no `App.tsx`)
  - **Explicação:** Como o estado da aplicação é gerenciado e compartilhado entre componentes.
- **Estilização:** Bootstrap (com classes CSS)
  - **Explicação:** Framework CSS para um design responsivo e rápido.
- **Roteamento:** React Router DOM
  - **Explicação:** Gerencia a navegação entre as diferentes páginas da aplicação.

## 3. Como Foi Construído (3-4 minutos)

- **Arquitetura:** Monolito dividido em dois projetos (Back-End e Front-End) que se comunicam via API REST.
- **Estrutura do Back-End:**
  - **`model`:** Classes que representam as entidades do banco de dados (Produto, User, Compra, ItemCompra).
  - **`repository`:** Interfaces para interação com o banco de dados (Spring Data JPA).
  - **`service`:** Lógica de negócio, onde as regras de negócio são implementadas.
  - **`controller`:** Endpoints da API REST que expõem as funcionalidades.
  - **`dto`:** Objetos de Transferência de Dados, para comunicação entre camadas e com o front-end.
  - **`config`:** Configurações de segurança (Spring Security).
  - **`filter`:** Filtros JWT para autenticação.
  - **`util`:** Utilitários (ex: `JwtUtil` para geração e validação de tokens).
- **Estrutura do Front-End:**
  - **`components`:** Componentes reutilizáveis da UI (LoginPage, ProductList, Carrinho, MenuCliente, etc.).
  - **`context`:** Contextos React para gerenciamento de estado global (Carrinho, Notificações).
  - **`services`:** Camada para fazer requisições à API (ex: `api.ts`).
  - **`models`:** Interfaces TypeScript para tipagem dos dados.
- **Fluxo de Autenticação:** Explicar brevemente como o login funciona (envia credenciais, recebe JWT, armazena no `localStorage`, usa para requisições futuras).

## 4. Demonstração (5-7 minutos)

- **Preparação:** Certifique-se de que o back-end e o front-end estão rodando.
  - **Back-End:** `java -jar target\Menu-Back-End-master-0.0.1-SNAPSHOT.jar`
  - **Front-End:** `npm run dev` (necessário instalar as dependências necessárias ANTES) ex: npm install e a execução do maven também por exemplo 
- **Cenário de Cliente:**
  - Acessar a página inicial (cardápio).
  - Navegar pelos produtos.
  - Adicionar itens ao carrinho.
  - Visualizar o carrinho.
- **Cenário de Administrador:**
  - Acessar a página de login (`/login`).
  - Fazer login com credenciais de administrador (ex: `admin`/`admin123`).
  - **Destacar:** A mudança de cor do header para indicar o modo administrador.
  - Navegar para a página de administração (`/admin`).
  - **Destacar:** O botão "Sair" que aparece na página de administração.
  - Adicionar um novo produto.
  - Editar um produto existente (mostrar a funcionalidade de update que foi corrigida).
  - Excluir um produto.
  - Clicar em "Sair" para deslogar.
  - **Destacar:** O header voltando à cor original.

## 5. Perguntas e Respostas (Tempo restante)

- Aberto para as dúvidas e perguntas da turma.

- Ferramentas de IA utilizadas para apoio de dúvidas e também na resolução (ou criação) de problemas:
-    - Claude
     - Gemini AI
     - ChatGPT
 
Muito Obrigado pela oportunidade e atenção!

Atenciosamente,

Anderson 
