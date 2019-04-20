# Arquitetura-de-Software
Exercício 1: criar um gerenciamento de vendas com 3 tabelas: Produtos, Vendas e Usuário.

# Requerimentos

## Instalar as dependências
- Dentro da pasta do projeto ./exercicio1:

```
    npm install
```

## Configurar o Banco de Dados - Postgres
- Utilizar o banco localhost ou utilizar uma instância do banco pelo Docker. Ex: utilizar o container 9.6-alpine disponível no dockerhub.
- No caso do Windows: esse container será emulado em um IP da VM, devendo observar qual será ele. Normalmente é o 192.168.99.100.

### Alterar o IP do banco, se preciso for
- No arquivo 'postgres-config.js' dentro da pasta './config', alterar o campo 'host' para o ip onde está o banco de dados.

### Executar a query
- Executar o arquivo SQL 'models.sql' dentro da pasta './optional'.

# Rodando o projeto
- Em modo Development:
```
npm run dev
```

- Em modo Production:
```
npm run start
```

# Paths e endpoints

## GET
- / (index)
- /client (Retorna uma lista de todos os clientes cadastrados)
- /client/{id} (Retorna um cliente por um Id específico)
- /product (Retorna uma lista de todos os produtos cadastrados)
- /product/{id} (Retorna um produto por um Id específico)
- /sale (Retorna uma lista de todas as vendas cadastradas)
- /sale/{id} (Retorna uma venda por um Id específico)

## POST
- /client (Cria um novo registro de cliente a partir de informações no corpo)
- /product (Cria um novo registro de produto a partir de informações no corpo)
- /sale (Cria um novo registro de venda a partir de informações no corpo)

## PUT
- /client/{id} (Edita um cliente específico a partir de informações no corpo)
- /product/{id} (Edita um produto específico a partir de informações no corpo)
- /sale/{id} (Edita uma venda específica a partir de informações no corpo)

## DELETE
- /client/{id} (Deleta um cliente por um Id específico)
- /product/{id} (Deleta um produto por um Id específico)
- /sale/{id} (Deleta uma venda por um Id específico)

# Observações Gerais
- O exercício está em dois commits:
    - O primeiro consta com um Mock
    - O segundo é conectado ao banco de dados