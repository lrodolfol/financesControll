const config = require('config');
const fs = require('fs');

class Helpers {

    author() {
        return config.get('author');
    }

    title() {
        const titles = {
            "login": "Welcome! login! =)",
            "dashboard": "Dashboard",
            "createAccount": "Create a new account"
        }

        return titles
    }

    ucFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async setDataBaseNameUser(username) {   
        try {
            fs.writeFileSync("./config/dataBaseUserName.txt", `{ "dataBaseNameUse": "finances_${username}" }`, (error) => {
                if(error){ 
                  console.log('deu erro: ' + error);
                }
                console.log('renomeado')
              })
        }catch(error) {
            console.log(error)
        }
    }

    async getDataBaseNameUser() {
        let jsonData = fs.readFileSync("./config/dataBaseUserName.txt", "utf8")
        jsonData = JSON.parse(jsonData)
        let name = jsonData.dataBaseNameUse
        return name
    }

    formatCurrency(value) {
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

       return value
    }
    

}

module.exports = new Helpers