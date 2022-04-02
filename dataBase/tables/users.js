const conn = require('../connect.js').sequelize;
const Sequelize = require('sequelize')

const users = conn.define('users', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
},{
    freezeTableName: true
});

module.exports = users