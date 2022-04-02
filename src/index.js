/*IMPORTS*/
const config = require('config')
const express = require('express')

const path  = require('path')

const server = express()
const port = config.get('setup.port')


/*ROUTES*/
const router = require('./routes/indexRouter.js') //INDEX
const acccountRouter = require('./routes/index/create-account') //ACCOUNT
const dashboardRouter = require('./routes/dashboard/dashboardRouter') //CREDIT
const creditRouter = require('./routes/credit/creditRouter') //CREDIT
const debitRouter = require('./routes/debit/debitRouter') //CREDIT


//JA ADICONA A PASTA VIEWS COMO PADRAO NO PROJETO INTEIRO
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')

server.use(express.urlencoded({ extended: true }))

/*===USE ROUTES===*/
server.use('/', router)
server.use('/dashboard', dashboardRouter)
server.use('/account', acccountRouter)
server.use('/credit', creditRouter)
server.use('/debit', debitRouter)

server.use(express.static("public"))


server.listen(port, () => {
    console.log('Server running. Port: ' + port)
})