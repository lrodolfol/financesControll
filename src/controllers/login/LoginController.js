const UserModel = require('../../model/user/UserModel')
const bcrypt = require('bcrypt')
const path = require('path');
const Helper = require('../../../helpers/Helper')

class LoginController {

    async logIn(data) {
        const user = await UserModel.find(data)

        if (!user) {
            return null
        }

        const renomed = Helper.setDataBaseNameUser(user.username)

        return user
    }

    async createUser(user) {

        let result = await UserModel.createUser(user)
        return result
    }      
    

}

module.exports = new LoginController
