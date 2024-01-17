require('dotenv').config()
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')


const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const menu = require('./flows/menuFlow')
const horarios = require('./flows/horariosFlow')
const pagar = require('./flows/pagarFlow')
const cuentas = require('./flows/cuentasFlow')
const empresas = require('./flows/empresasFlow')

const ServerAPI = require("./http");

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([
        menu,
        horarios,
        pagar,
        cuentas,
        empresas,
    ])
    const adapterProvider = createProvider(BaileysProvider)
    
    const httpServer = new ServerAPI(adapterProvider, adapterDB)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    httpServer.start()
}

main()
