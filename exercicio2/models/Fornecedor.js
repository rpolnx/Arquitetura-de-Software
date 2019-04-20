const Sequelize = require('sequelize');
const db = require('../config/postgres-config');


const Fornecedor = db.define('tb_fornecedores', {
    id_fornecedor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cnpj: {
        type: Sequelize.STRING(14)
    },
    razaoSocial: {
        type: Sequelize.STRING(50)
    },
    telefone: {
        type: Sequelize.STRING(15)
    },
    endereco: {
        type: Sequelize.STRING(50)
    },
    contato: {
        type: Sequelize.STRING(50)
    },
    fg_ativo: {
        type: Sequelize.INTEGER
    }
});

module.exports = Fornecedor;