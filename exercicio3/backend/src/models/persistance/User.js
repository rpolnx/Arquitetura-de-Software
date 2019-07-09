const Sequelize = require('sequelize');
const db = require('../../config/postgres-config');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(25),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(256),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    role: {
        type: Sequelize.STRING(25),
        allowNull: false
    },
    join_time: {
        type: Sequelize.DATE
    }
});

module.exports = User;