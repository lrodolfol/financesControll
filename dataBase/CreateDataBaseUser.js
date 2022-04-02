const mysql = require('mysql2');
const Sequelize = require('sequelize');
const config = require('config')
const Helper = require('../helpers/Helper')

class CreateDataBaseUser {
    constructor(user) {
        this.name = user.username
        this.password = user.password
        this.email = user.email
        this.dataBaseUserName = ""
    }

    async UserSync() {
        Helper.setDataBaseNameUser(this.name)
        this.dataBaseUserName = await Helper.getDataBaseNameUser()

        const { host, port, username, password } = config.get('mysql_test');
        const user = username

        try {

            const connection = mysql.createConnection({ host, port, user, password });
            const dbCreate =  connection.query(`CREATE DATABASE IF NOT EXISTS ${this.dataBaseUserName}`);

            console.log('Database has been created')
            connection.end()

            await this.crateTables()

            return true
        } catch (error) {
            console.log(error.message)
            return false
        }
    }

    async crateTables() {
        /*
        const conn = new Sequelize(
            Helper.getDataBaseNameUser(),
            config.get('mysql_test.username'),
            config.get('mysql_test.password'),
            {
                host: config.get('mysql_test.host'),
                dialect: config.get('mysql_test.dialect')
            }
        )*/

        /*
        const Credits = conn.define('credits', {
            description: {
                type: Sequelize.STRING
            },
            amount: {
                type: Sequelize.DOUBLE
            },
            date: {
                type: Sequelize.DATEONLY
            },
            comments: {
                type: Sequelize.STRING
            }
        }, {
            freezeTableName: true
        });*/
        
       const tableCredit = require('./tables/credit')
       const tableDebit = require('./tables/debits')
       const tableExtract = require('./tables/extract')

        try {
           let result = await tableCredit.sync()
           result = await tableDebit.sync()
           result = await tableExtract.sync()
           console.log(result)
        }catch(error) {
            console.log(error.message)
        }

        return

    }

}

module.exports = CreateDataBaseUser