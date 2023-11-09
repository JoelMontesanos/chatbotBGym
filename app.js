require('dotenv').config()
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const welcome = require('./flows/welcomeFlow')
const headcoach = require('./flows/headcoachFlow')
const sellercoach = require('./flows/sellercoachFlow')
const pagar = require('./flows/pagarFlow')
const costos = require('./flows/costosFlow')


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([
        welcome,
        headcoach,
        sellercoach,
        pagar,
        costos,
    ])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
