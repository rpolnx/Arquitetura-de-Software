const Sequelize = require('sequelize');
const db = require('../config/postgres-config');
const Categoria = require('./Categoria');
const Produto = require('./Produto');
const Fornecedor = require('./Fornecedor');

const Compra = db.define('tb_compras', {
    id_compra: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_fornecedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Fornecedor,
            key: 'id_fornecedor'
        }
    },
    id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'id_produto',
            allow
        }
    },
    id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id_categoria',
            allow
        }
    },
    dataCompra: {
        type: Sequelize.DATEONLY
    },
    valorTotal: {
        type: Sequelize.NUMBER
    },
    quantidade: {
        type: Sequelize.INTEGER
    },
    fg_ativo: {
        type: Sequelize.INTEGER
    }
});

module.exports = Compra;