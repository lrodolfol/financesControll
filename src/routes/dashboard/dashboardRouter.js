const express = require('express')
const config = require('config')
const Helpers = require('../../../helpers/Helper')

const CreditController = require('../../controllers/credit/creditController')
const DebitController = require('../../controllers/debit/debitController')

const author = config.get('author.name')

const router = express.Router()


router.get('/', async (req, res) => {
    const UserAuth = await Helpers.getDataBaseNameUser()
    if (UserAuth.split("_")[1] === '') {
        res.redirect('../')
    } else {
        let data = {}
        data = await amount()
        const title = Helpers.title().dashboard
        let user = await Helpers.getDataBaseNameUser()
        user = Helpers.ucFirst(user.split("_")[1])


        res.render('dashboard/', { author, title, user, data })
    }
})


async function amount() {
    const amountCredit = parseFloat(await CreditController.selectAll())
    const amountDebit = parseFloat(await DebitController.selectAll())
    const total = amountCredit - amountDebit
    const data = {
        "amount": Helpers.formatCurrency(total),
        "yield": (((amountCredit - amountDebit) / amountCredit) * 100).toFixed(2)
    }

    return data
}

module.exports = router