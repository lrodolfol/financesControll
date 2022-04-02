const Credit = require('../../../dataBase/tables/credit')

class CreditModel {
    async newCredit(credit) {
        try {
            const result = await Credit.create({
                description: credit.description,
                amount: credit.amount,
                date: credit.date,
                comments: credit.comments
            })

            return 201
        } catch (error) {
            return 500
        }

    }

    async selectAll() {
        const amount = await Credit.findAll({raw: true})
        return amount
    }
}

module.exports = new CreditModel