const Sequelize = require('sequelize');
const db = require('../config/postgres-config');


const Vendedor = db.define('tb_vendedores', {
    id_vendedor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cpf: {
        type: Sequelize.STRING(11)
    },
    nome: {
        type: Sequelize.STRING(35)
    },
    carteiraTrabalho: {
        type: Sequelize.STRING(20)
    },
    telefone: {
        type: Sequelize.STRING(15)
    },
    dataAdmissao: {
        type: Sequelize.DATEONLY
    },
    fg_ativo: {
        type: Sequelize.INTEGER
    }
});

module.exports = Vendedor;