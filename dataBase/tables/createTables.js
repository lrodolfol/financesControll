const User = require('./users')

User.sync()
.then(function() {
    console.log('Table user has been synced')
})
.catch(function(err) {
    console.error('Erro for syncing user' + err)
})