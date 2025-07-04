# Guia de Apresentação - Anderson Schieck Lopes

# Projeto "Bamburgueria" (Sistema de Restaurante com Cardápio Online e Pedidos)

Este guia serve como roteiro para apresentar o projeto **Bamburgueria**, um sistema Full-Stack com funcionalidades para clientes e administradores, destacando tecnologias, arquitetura, funcionamento e execução prática.

---

## 1. Introdução (2-3 minutos)

* **Objetivo:** Criar um sistema digital para cardápio e gestão de pedidos em tempo real.
* **Problema Resolvido:** Agiliza o atendimento, facilita a gestão e moderniza o processo de pedidos.
* **Visão Geral:** Arquitetura Full-Stack dividida entre Back-End (API com Java Spring Boot) e Front-End (Interface com React + TypeScript).

---

## 2. Tecnologias Utilizadas (5-7 minutos)

### 2.1. Back-End (Java + Spring Boot)

* **Linguagem:** Java 17+
* **Framework:** Spring Boot

  * API RESTful com segurança e escalabilidade.
* **Segurança:** Spring Security com JWT

  * Garantia de acesso apenas a usuários autenticados.
* **Banco de Dados:** MySQL
* **ORM:** Spring Data JPA / Hibernate
* **Build:** Maven (`mvn` ou `./mvnw`)

### 2.2. Front-End (React + TypeScript)

* **Linguagem:** TypeScript
* **Framework:** React
* **Build Tool:** Vite
* **Gerenciamento de Estado:** Context API, `useState`, `useEffect`
* **Estilo:** Bootstrap
* **Roteamento:** React Router DOM

---

## 3. Estrutura do Projeto (3-4 minutos)

### 3.1. Back-End

* **`model`:** Entidades (Produto, User, Compra, ItemCompra).
* **`repository`:** Interfaces JPA.
* **`service`:** Regras de negócio.
* **`controller`:** Endpoints REST.
* **`dto`:** Objetos de transferência.
* **`config`/`filter`/`util`:** Autenticação e segurança JWT.

### 3.2. Front-End

* **`components`:** LoginPage, ProductList, Carrinho, etc.
* **`context`:** Carrinho e notificações.
* **`services`:** API (`api.ts`).
* **`models`:** Interfaces para os dados.

### Fluxo de Autenticação

1. Envia login → recebe JWT.
2. Armazena no `localStorage`.
3. JWT usado em todas as requisições protegidas.

---

## 4. Demonstração (5-7 minutos)

### Execução

#### ✅ Pré-requisitos

* **Java 17+** e **Maven** instalados
* **Node.js 16+** e **npm**

---

### 🚀 Passo a passo

#### 1. **Backend**

* Localização: pasta raiz do projeto backend.

```bash
# Na pasta do back-end:
mvn clean install
mvn spring-boot:run
# ou (se tiver wrapper Maven)
./mvnw spring-boot:run
```

* Porta padrão: `http://localhost:8080`

##### Banco de dados:

* Se **você limpou o banco** (DROP):
  No `application.properties`, defina:

  ```
  spring.jpa.hibernate.ddl-auto=create
  ```

  Inicie o servidor uma vez → ele recria as tabelas → depois altere para:

  ```
  spring.jpa.hibernate.ddl-auto=update
  ```

* Se **você NÃO limpou o banco**:
  Use diretamente:

  ```
  spring.jpa.hibernate.ddl-auto=update
  ```

---

#### 2. **Frontend**

* Localização: pasta com `package.json`.

```bash
# Instale as dependências
npm install

# Instale o React Router
npm install react-router-dom

# Inicie o servidor
npm run dev
```

* Porta padrão: `http://localhost:5173`

---

### Demonstração de Funcionalidades

#### Cliente:

* Acessa a página inicial.
* Visualiza produtos.
* Adiciona ao carrinho.
* Visualiza carrinho.

#### Administrador:

* Acessa `/login`, autentica (`admin`/`admin123`).
* Header muda de cor para modo administrador.
* Acessa `/admin`, adiciona, edita e exclui produtos.
* Sai do sistema → Header retorna ao estado original.

---

## 5. Perguntas e Respostas (Tempo restante)

* Abertura para perguntas e interações.
* Ferramentas de IA utilizadas:

  * Claude, Gemini AI e ChatGPT (para apoio, correção e aceleração de desenvolvimento).

---

**Muito obrigado pela oportunidade e atenção!**
Atenciosamente,
**Anderson Schieck Lopes**

