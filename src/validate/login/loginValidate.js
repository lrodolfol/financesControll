module.exports = {
    
    validate(data) {
        const fields = ['username', 'password']
        const dataFilter = {}
        fields.forEach((campo) => { 
            if(data.hasOwnProperty(campo)){
                dataFilter[campo] = data[campo]
            }
        })

        return dataFilter
    }

}