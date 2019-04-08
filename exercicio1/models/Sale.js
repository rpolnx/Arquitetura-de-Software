const Sequelize = require('sequelize');
const db = require('../config/postgres-config');
const Client = require('./Client');
const Product = require('./Product');

const Sale = db.define('sale', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Client,
            key: 'id'
        }
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    product_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total_price: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    composition_identifier: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    sale_time: {
        type: Sequelize.DATE
    },
    deliver_time: {
        type: Sequelize.DATE
    }
});

module.exports = Sale;