const express = require('express')
const Helpers = require('../../../helpers/Helper')
const router = express.Router()
const DebitController = require('../../controllers/debit/debitController')

const author = Helpers.author

router.get('/', debitGet)
router.post('/', debitPost)


async function debitGet(req,res) {
    const UserAuth = await Helpers.getDataBaseNameUser()
    if (UserAuth.split("_")[1] === '') {
        res.redirect('../')
    }else{
        const title = "New debit"
        res.render('debit/new',{author, title})
    }
    
}

async function debitPost(req,res) {
    const data = req.body

    const result = await DebitController.new(data)

    res.status(result)
    res.end()
}

module.exports = router