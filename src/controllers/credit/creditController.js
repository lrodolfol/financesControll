const CreditModel = require('../../model/credit/CreditModel')

class creditController {

    async new(credit) {
        if (!this.validate(credit)) {
            return 400
        }

        const result = await CreditModel.newCredit(credit)
        return result
    }

    async selectAll() {
        const amounts = await CreditModel.selectAll();
        let amount = 0
        amounts.forEach(value => {
            amount = parseFloat(amount) + parseFloat(value.amount)
        })

        return amount
    }

    validate(credit) {
        let error = []
        if(credit.amount <= 0) {
            error.push("amount must be valid")
        }
        if(credit.description.length <= 0 || typeof credit.description !== 'string') {
            error.push("description must be valid")
        }
        //VALIDATE DATE
        
        return error.length > 0 ? false: true
    }

}

module.exports = new creditController