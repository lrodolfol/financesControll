const DebitModel = require('../../model/debit/DebitModel')

class debitController {

    async new(debit) {
        if (!this.validate(debit)) {
            return 400
        }

        const result = await DebitModel.newdebit(debit)
        return result
    }

    async selectAll() {
        const amounts = await DebitModel.selectAll();
        let amount = 0
        amounts.forEach(value => {
            amount = parseFloat(amount) + parseFloat(value.amount)
        })

        return amount
    }

    validate(debit) {
        let error = []
        if(debit.amount <= 0) {
            error.push("amount must be valid")
        }
        if(debit.description.length <= 0 || typeof debit.description !== 'string') {
            error.push("description must be valid")
        }
        //VALIDATE DATE
        
        return error.length > 0 ? false: true
    }

}

module.exports = new debitController