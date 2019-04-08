const Sequelize = require('sequelize');
const db = require('../config/postgres-config');


const Client = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(50)
    },
    registration_number: {
        type: Sequelize.STRING(14),
        allowNull: false
    },
    is_company: {
        type: Sequelize.BOOLEAN
    },
    email: {
        type: Sequelize.STRING(35),
        allowNull: false
    },
    cellphone: {
        type: Sequelize.STRING(11)
    },
    full_address: {
        type: Sequelize.STRING(50)
    },
    city: {
        type: Sequelize.STRING(30)
    },
    province: {
        type: Sequelize.STRING(2)
    },
    cep: {
        type: Sequelize.STRING(9)
    },
    created: {
        type: Sequelize.DATE
    },
    updated: {
        type: Sequelize.DATE
    }
});

module.exports = Client;