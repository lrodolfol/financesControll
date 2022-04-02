const User = require('../../../dataBase/tables/users')
const UserDB = require('../../../dataBase/CreateDataBaseUser')

class UserModel {

    async find(user) {
        const data = await User.findOne({
            where: {
                username: user.username,
                password: user.password
            },
            raw: true
        })

        if (data) {
            console.log('User has been found')
            return data
        } else {
            console.log('User not found. Login failed')
            return null
        }

    }

    async findByName(user) {
        const data = await User.findOne({
            where: {
                username: user.username
            },
            raw: true
        })

        if (data) {
            console.log('User has been found')
            return data
        } else {
            console.log('User not found')
            return false
        }
    }

    async insertUser(user) {
        const exist = await this.findByName(user)
        
        if(! exist) {
            const data = await User.create({
                username: user.username,
                password: user.password,
                email: user.email
            })
            
        }
            
    }

    async createUser(user) {
        const exist = await this.insertUser(user)

        const create = new UserDB(user)
        const result = create.UserSync()
        
        return result
    }


}

module.exports = new UserModel