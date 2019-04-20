const Sequelize = require('sequelize');
const db = require('../config/postgres-config');
const Categoria = require('./Categoria');
const Produto = require('./Produto');
const Vendedor = require('./Vendedor');

const Venda = db.define('tb_vendas', {
    id_venda: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_vendedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Vendedor,
            key: 'id_vendedor'
        }
    },
    id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id_categoria'
        }
    },
    id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'id_produto'
        }
    },
    dataVenda: {
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

module.exports = Venda;