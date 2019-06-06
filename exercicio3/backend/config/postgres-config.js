const Sequelize = require("sequelize");

module.exports = new Sequelize("asa", "rodrigo", "asapass", {
    host: "192.168.99.100", // This IP is because I"m using docker to host the database
    dialect: "postgres",
    port: 5432,
    define: {
        freezeTableName: true,
        underscored: true,
        schema: "ex3",
        createdAt: false,
        updatedAt: false
    },
    pool: {
        max: 10,
        idle: 15000,
        acquire: 60000
    }
});