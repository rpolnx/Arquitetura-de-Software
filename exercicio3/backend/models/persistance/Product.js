const Sequelize = require('sequelize');
const db = require('../../config/postgres-config');
const Category = require('./Category');
const Seller = require('./Seller');

const Product = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: Sequelize.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    },
    supplier: {
        type: Sequelize.INTEGER,
        references: {
            model: Seller,
            key: 'id'
        }
    },
    name: {
        type: Sequelize.STRING(30)
    },
    description: {
        type: Sequelize.STRING(100)
    },
    value: {
        type: Sequelize.NUMBER
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    minimal_quantity: {
        type: Sequelize.INTEGER
    }
});

module.exports = Product;