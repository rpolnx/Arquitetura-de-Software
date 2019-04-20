const Sequelize = require('sequelize');
const db = require('../config/postgres-config');


const Categoria = db.define('tb_categorias', {
    id_categoria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tituloCategoria: {
        type: Sequelize.STRING(30)
    },
    descricaoCategoria: {
        type: Sequelize.STRING(50)
    },
    fg_ativo: {
        type: Sequelize.INTEGER
    }
});

module.exports = Categoria;