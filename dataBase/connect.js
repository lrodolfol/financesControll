const config = require('config')
const Sequelize = require('sequelize')
const Helper = require('../helpers/Helper')

const getName = async () => {
    return await Helper.getDataBaseNameUser()
}


const sequelize = new Sequelize(
    config.get('mysql_test.database'),
    config.get('mysql_test.username'),
    config.get('mysql_test.password'),
    {
        host: config.get('mysql_test.host'),
        dialect: config.get('mysql_test.dialect')
    }
)

const sequelizeUser = new Sequelize (
    'finances_rodolfo',
    config.get('mysql_test.username'),
    config.get('mysql_test.password'),
    {
        host: config.get('mysql_test.host'),
        dialect: config.get('mysql_test.dialect')
    }
)
sequelizeUser.beforeConnect(async (config) => {
    config.database = await Helper.getDataBaseNameUser()
})



module.exports = {sequelize,sequelizeUser}