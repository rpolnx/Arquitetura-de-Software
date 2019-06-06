const Sequelize = require('sequelize');
const db = require('../config/postgres-config');


const Suppliers = db.define('suppliers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cnpj: {
        type: Sequelize.STRING(14)
    },
    social_reason: {
        type: Sequelize.STRING(50)
    },
    telephone: {
        type: Sequelize.STRING(15)
    },
    address: {
        type: Sequelize.STRING(50)
    },
    contact: {
        type: Sequelize.STRING(50)
    }
});

module.exports = Suppliers;