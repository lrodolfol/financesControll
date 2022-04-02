const express = require('express')
const Helpers = require('../../../helpers/Helper')
const LoginController = require('../../controllers/login/LoginController')

const author = Helpers.author()
const router = express.Router()


router.get('/create-account', createAccountGet)
router.post('/create-account', createAccountPost)

module.exports = router


function createAccountGet(req, res) {
    const title = Helpers.title().createAccount
    res.render('login/create-account', {author, title })
}

async function createAccountPost(req, res) {
    try{
         data = req.body
            let result = await LoginController.createUser(data)
            if(result) {
                res.status(201)
               res.end()
            }else{
                res.status(500)
            }
    }catch(error) {
        res.status(500)
        res.end()
    }    
}