const Sequelize = require('sequelize');
const db = require('../../config/postgres-config');
const Category = require('./Category');
const Product = require('./Product');
const Seller = require('./Seller');

const Sale = db.define('sales', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seller: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Seller,
            key: 'id'
        }
    },
    category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    product: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    sale_time: {
        type: Sequelize.DATE
    },
    total_value: {
        type: Sequelize.NUMBER
    },
    quantity: {
        type: Sequelize.INTEGER
    }
});

module.exports = Sale;