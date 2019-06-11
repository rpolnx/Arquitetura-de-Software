const Sequelize = require('sequelize');
const db = require('../config/postgres-config');

const Category = db.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(30)
    },
    description: {
        type: Sequelize.STRING(50)
    }
});

module.exports = Category;