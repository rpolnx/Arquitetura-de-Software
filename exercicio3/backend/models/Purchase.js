const Sequelize = require('sequelize');
const db = require('../config/postgres-config');
const Category = require('./Category');
const Product = require('./Product');
const Supplier = require('./Supplier');

const Purchase = db.define('purchases', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supplier: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Supplier,
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
    category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    purchase_time: {
        type: Sequelize.DATE
    },
    total_value: {
        type: Sequelize.NUMBER
    },
    quantity: {
        type: Sequelize.INTEGER
    }
});

module.exports = Purchase;