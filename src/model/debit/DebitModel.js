const Debit = require('../../../dataBase/tables/debits')

class debitModel {
    async newdebit(debit) {
        try {
            const result = await Debit.create({
                description: debit.description,
                amount: debit.amount,
                date: debit.date,
                comments: debit.comments
            })

            return 201
        } catch (error) {
            return 500
        }

    }

    async selectAll() {
        const amount = await Debit.findAll({raw: true})
        return amount
    }
}

module.exports = new debitModel