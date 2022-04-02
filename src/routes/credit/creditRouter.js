const express = require('express')
const config = require('config')
const Helpers = require('../../../helpers/Helper')
const CreditController = require('../../controllers/credit/creditController')

const author = config.get('author.name')

const router = express.Router()


router.get('/', async (req, res) => {
    const UserAuth = await Helpers.getDataBaseNameUser()
    if (UserAuth.split("_")[1] === '') {
        res.redirect('../')
    }else{
        const title = "New credit"
        res.render('credit/new', { author, title })
    }
    
})
router.post('/', async (req, res) => {
    const data = req.body

    const result = await CreditController.new(data)

    res.status(result)
    res.end()
})

module.exports = router