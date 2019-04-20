# Arquitetura-de-Software
Exercício 2: criar um gerenciamento de vendas com 6 tabelas: Categoria, Compra, Fornecedor, Produto, Venda e Vendedor.

# Requerimentos

## Instalar as dependências
```
    npm install
```

## Configurar o Banco de Dados - Postgres
- Utilizar o banco localhost ou utilizar uma instância de Docker a partir do Kitematic

### Alterar o IP do banco, se preciso for
- No arquivo 'postgres-config.js' dentro da pasta 'config', alterar o campo 'host' para o ip onde está o banco de dados.

### Executar a query
- Executar o arquivo SQL 'models.sql' dentro da pasta 'optional'.

# Rodando o projeto
- Em modo Development:
```
npm run dev
```

- Em modo Production:
```
npm run start
```

# Relacionamento das tabelas

![Modelo Relacional](https://github.com/rodrigorpo/Arquitetura-de-Software/tree/master/exercicio2/optional/relacionamento-tabelas-ex-2.jpg)


# Paths e endpoints

## GET
- / (index)
- /categoria (Retorna uma lista de todas as categorias cadastradas)
- /categoria/{id} (Retorna uma categoria por um Id específico)
- /compra (Retorna uma lista de todas as compras cadastradas)
- /compra/{id} (Retorna uma compra por um Id específico)
- /fornecedor (Retorna uma lista de todos os fornecedores cadastrados)
- /fornecedor/{id} (Retorna um fornecedor por um Id específico)
- /produto (Retorna uma lista de todos os produtos cadastrados)
- /produto/{id} (Retorna um produto por um Id específico)
- /venda (Retorna uma lista de todas as vendas cadastradas)
- /venda/{id} (Retorna uma venda por um Id específico)
- /vendedor (Retorna uma lista de todos os vendedores cadastrados)
- /vendedor/{id} (Retorna um vendedor por um Id específico)

## POST
- /categoria (Cria um novo registro de uma categoria a partir de informações no corpo da requisição)
- /compra (Cria um novo registro de uma compra a partir de informações no corpo da requisição)
- /fornecedor (Cria um novo registro de um fornecedor a partir de informações no corpo da requisição)
- /produto (Cria um novo registro de um produto a partir de informações no corpo da requisição)
- /venda (Cria um novo registro de uma venda a partir de informações no corpo da requisição)
- /vendedor (Cria um novo registro de um vendedor a partir de informações no corpo da requisição)

## PUT
- /categoria/{id} (Edita uma categoria específica a partir de informações no corpo da requisição)
- /compra/{id} (Edita uma compra específica a partir de informações no corpo da requisição)
- /fornecedor/{id} (Edita um fornecedor específico a partir de informações no corpo da requisição)
- /produto/{id} (Edita um produto específico a partir de informações no corpo da requisição)
- /venda/{id} (Edita uma venda específica a partir de informações no corpo da requisição)
- /vendedor/{id} (Edita um vendedor específico a partir de informações no corpo da requisição)

## DELETE
- /categoria/{id} (Deleta uma categoria por um Id específico)
- /compra/{id} (Deleta uma compra por um Id específico)
- /fornecedor/{id} (Deleta um fornecedor por um Id específico)
- /produto/{id} (Deleta um produto por um Id específico)
- /venda/{id} (Deleta uma venda por um Id específico)
- /vendedor/{id} (Deleta um vendedor por um Id específico)

# Observações Gerais
- O exercício conta com um commit, onde precisa estar com um banco de dados ativo para testá-lo. Para tanto, siga as instruções contidas logo acima pra poder proceder da maneira correta e testá-lo.