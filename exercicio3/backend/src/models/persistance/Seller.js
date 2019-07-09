const Sequelize = require('sequelize');
const db = require('../../config/postgres-config');


const Seller = db.define('sellers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cpf: {
        type: Sequelize.STRING(11)
    },
    name: {
        type: Sequelize.STRING(35)
    },
    work_card: {
        type: Sequelize.STRING(20)
    },
    telephone: {
        type: Sequelize.STRING(15)
    },
    admission: {
        type: Sequelize.DATEONLY
    }
});

module.exports = Seller;