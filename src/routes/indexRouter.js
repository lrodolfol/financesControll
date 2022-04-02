const express = require('express')
const Helpers = require('../../helpers/Helper')
const loginValidate = require('../validate/login/loginValidate')
const LoginController = require('../controllers/login/LoginController')
const Helper = require('../../helpers/Helper')

const router = express.Router()
const author = Helpers.author('author.name')
let msg = {
    "error": "Oops, login or password  was invalid. Try again."
}


router.use(express.json())

/*====LOGIN FORM====*/
router.get('/', (req, res) => {
    res.render('login/', { author, msg:"" })
})
router.get('/login', loginGet)

router.post('/login', loginPost)


/*====LOGOUT====*/
router.get('/logout', logout)


module.exports = router


/*FUNCTION ROUTER*/
function logout(req, res) {
    Helper.setDataBaseNameUser("")
    loginGet(req, res)
}

function loginGet(req, res) {
    return res.render('login/', { author, msg:"" })
}

async function loginPost(req, res) {
    try {
        data = loginValidate.validate(req.body)
        let user = await LoginController.logIn(data)
        /*user = {
            email: user.email,
            username: Helpers.ucFirst(user.username),
        }*/
        
        if (user) {res.redirect('/dashboard')
            //res.status(200)
            //res.end()
        }

        res.status(401)
        return res.render('login/', { author, msg })

    } catch (err) {
        msg.error = "Oops, we have an error! do you have registration?"
        res.status(500)
        return res.render('login', { author, msg})
    }
}