const Sequelize = require('sequelize');
const db = require('../config/postgres-config');
const Categoria = require('./Categoria');
const Fornecedor = require('./Fornecedor');

const Produto = db.define('tb_produtos', {
    id_produto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_categoria: {
        type: Sequelize.INTEGER,
        references: {
            model: Categoria,
            key: 'id_categoria'
        }
    },
    id_fornecedor: {
        type: Sequelize.INTEGER,
        references: {
            model: Fornecedor,
            key: 'id_fornecedor'
        }
    },
    nomeProduto: {
        type: Sequelize.STRING(30)
    },
    descricaoProduto: {
        type: Sequelize.STRING(100)
    },
    valorUnitario: {
        type: Sequelize.NUMBER
    },
    quantidade: {
        type: Sequelize.INTEGER
    },
    quantidadeMinima: {
        type: Sequelize.INTEGER
    },
    fg_ativo: {
        type: Sequelize.INTEGER
    },
});

module.exports = Produto;