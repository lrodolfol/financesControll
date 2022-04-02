const conn = require('../connect.js').sequelizeUser;
const Sequelize = require('sequelize')

const Extract = conn.define('extract', {
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    cod_credit: {
        type: Sequelize.DATEONLY
    },
    cod_debit: {
        type: Sequelize.DATEONLY
    }
}, {
    freezeTableName: true
});

module.exports = Extract