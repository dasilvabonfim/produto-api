# API de Produtos

Esta é uma API simples para gerenciar produtos usando Node.js, Express e PostgreSQL. Como atividade de Desenvolvimento Móvel
## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Postman
## Pré-requisitos

Antes de executar o projeto, você precisará ter o PostgreSQL e o pgAdmin instalados. Além disso, será necessário o Postman para realizar as requisições à API.

1. **Instale o PostgreSQL**
2. **Instale o pgAdmin**
3. **Crie um banco de dados**: Após instalar o PostgreSQL e o pgAdmin, crie um banco de dados chamado `products` no pgAdmin.

## Configuração do Ambiente

1. Clone este repositório.
2. No terminal digite o comando cd produto-api.
3. Instale as dependências:

```bash
npm install
```
Crie um arquivo .env usando o exemplo a seguir:
```
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="postgres"
DB_PASSWORD="sua_senha_aqui" # Altere para sua senha do PostgreSQL
DB_DATABASE="products"
```

Inicie o servidor:

 ```bash
 npm start
 ```
## Requisições e Links:
GET /:
- Retorna uma mensagem de boas-vindas.

URL: http://localhost:3000/

POST /products: 
- Cria um novo produto.

URL: http://localhost:3000/product

GET /products/{id}:
- Retorna um produto específico pelo ID.

URL: http://localhost:3000/products/{id}

GET /products: 
- Retorna todos os produtos.

URL: http://localhost:3000/products

PUT /products/{id}: 
- Atualiza um produto específico.

URL: http://localhost:3000/products/{id}

DELETE /products/{id}: 
- Deleta um produto específico pelo ID.

URL: http://localhost:3000/products/{id}
## Uso do postman
1. Abra o Postman.
2. Selecione o método HTTP desejado (GET, POST, PUT ou DELETE).
3. Insira a URL correspondente conforme listado acima.
4. Para as requisições POST e PUT, selecione "Body" e escolha "raw" com o tipo JSON, e insira o corpo da requisição conforme o exemplo a seguir
```
{
  "name": "Nome do produto",
  "price": 1.99,
  "description": "Descrição do produto",
  "quantity": 100
  "date"?: 2024-10-23, campo opcional, a própria tabela irá inserir a data do dia automaticamente.
}
```
5. Clique em "Send" para enviar a requisição e veja a resposta da API.


