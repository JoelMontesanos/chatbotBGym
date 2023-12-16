require('dotenv').config()
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')


const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const welcome = require('./flows/welcomeFlow')
const headcoach = require('./flows/headcoachFlow')
const sellercoach = require('./flows/sellercoachFlow')
const pagar = require('./flows/pagarFlow')
const costos = require('./flows/costosFlow')
const cuentas = require('./flows/cuentasFlow')

const ServerAPI = require("./http");

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([
        welcome,
        headcoach,
        sellercoach,
        pagar,
        costos,
        cuentas,
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
