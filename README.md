# Projeto Labecommerce - BackEnd

![Diagrama do Banco de Dados](./src/assets/diagram.png)

## Introdução

O projeto **Labecommerce** consiste na criação de uma **API REST** para um e-commerce, utilizando um banco de dados SQL. O sistema inclui operações **CRUD** para gerenciar o ciclo completo de vendas, permitindo a criação, leitura, atualização e exclusão de **usuários, produtos e pedidos**.

## Documentação

- Acesse a documentação da API no Postman: [Clique aqui!](https://documenter.getpostman.com/view/25826545/2s93XyUP1f)

## Sobre o Projeto

### Instalação

```bash
# Clone o repositório
$ git clone https://github.com/suuzanemoura/labecommerce-backend.git

# Acesse a pasta do projeto
$ cd labecommerce-backend

# Instale todas as dependências
$ npm install

# Crie um arquivo .env com as configurações necessárias (veja o .env.example)

# Execute o projeto
$ npm run dev

# A aplicação será iniciada na porta 3003
```

> ⚠️ **Dica:** Use algum API Client (Postman, Insomnia, Thunder Client) para testar as requisições.

### Tecnologias

O projeto foi desenvolvido com as seguintes tecnologias:

- **Node.js**
- **Typescript**
- **Express**
- **Knex**
- **SQLite3**

## Destaques do Projeto

- **Arquitetura modular**: Organização do código em camadas bem definidas para melhor manutenção e escalabilidade.
- **Validação de dados**: Uso de validações para garantir a integridade das informações processadas pela API.
- **Tratamento de erros**: Implementação de mensagens de erro claras para facilitar a depuração e o uso da API.
- **Performance otimizada**: Consultas eficientes ao banco de dados para garantir tempos de resposta rápidos.
- **Documentação detalhada**: API documentada no Postman para facilitar a integração com outros sistemas.

## Endpoints

### 🟢 **Users**
- **POST** `/users` → Criação de um novo usuário.
- **GET** `/users` → Retorna todos os usuários cadastrados.
- **PUT** `/users/:id` → Atualiza um usuário pelo seu ID.
- **DELETE** `/users/:id` → Exclui um usuário cadastrado.

### 🟠 **Products**
- **POST** `/products` → Criação de um novo produto.
- **GET** `/products` → Retorna todos os produtos cadastrados.
- **GET** `/products/search?name=xyz` → Pesquisa produtos pelo nome.
- **GET** `/products/:id` → Retorna as informações de um produto pelo seu ID.
- **PUT** `/products/:id` → Atualiza um produto pelo seu ID.
- **DELETE** `/products/:id` → Exclui um produto cadastrado.

### 🔵 **Purchases**
- **POST** `/purchases` → Criação de um novo pedido.
- **GET** `/purchases` → Retorna todos os pedidos cadastrados.
- **GET** `/purchases/:id` → Retorna os detalhes de um pedido (incluindo os produtos e o usuário).
- **GET** `/users/:id/purchases` → Retorna todos os pedidos feitos por um usuário.
- **DELETE** `/purchases/:id` → Exclui um pedido realizado.

## Status do Projeto

- ✅ **Concluído**

## <img alt="Coração Roxo" height="15" src="https://github.com/suuzanemoura/suuzanemoura/assets/104701271/ce158244-38f2-4162-b0a4-24b1cfa66ef8"> **Contato**  
[![Email](https://img.shields.io/badge/-Gmail-EBE2F1?style=for-the-badge&logo=gmail&logoColor=460C68)](mailto:suuzanemoura@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-EBE2F1?style=for-the-badge&logo=linkedin&logoColor=460C68)](https://www.linkedin.com/in/suuzanemoura)
[![Behance](https://img.shields.io/badge/-Behance-EBE2F1?style=for-the-badge&logo=behance&logoColor=460C68)](https://www.behance.net/suzanemoura)
