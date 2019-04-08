# Arquitetura-de-Software
Exercício 1: criar um gerenciamento de vendas com 3 tabelas: Produtos, Vendas e Usuário.

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


## Observações Gerais
- O exercício está em dois commits:
    - O primeiro consta com um Mock
    - O segundo é conectado ao banco de dados