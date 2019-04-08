const Sequelize = require('sequelize');
const db = require('../config/postgres-config');


const Product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(20)
    },
    model: {
        type: Sequelize.STRING(20)
    },
    description: {
        type: Sequelize.STRING(50)
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.NUMBER
    },
    created: {
        type: Sequelize.DATE
    },
    updated: {
        type: Sequelize.DATE
    }
});

module.exports = Product;