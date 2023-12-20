const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

module.exports = addKeyword(EVENTS.WELCOME).addAction(async(ctx,ctxFn)=>{})
    
.addAnswer([
    'Bienvenido, en que te podemos ayudar? Escribe:',
    '*Horarios*: Si quieres conocer los horarios y días en los que laboramos',
    '*Cuentas*: Para consultar la cuenta EMBER de BanRegio'
])