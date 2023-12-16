const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

module.exports = addKeyword(EVENTS.WELCOME).addAction(async(ctx,ctxFn)=>{})
    
.addAnswer([
    'Bienvenido, en que te podemos ayudar? Escribe:',
    '*Horarios*: Para conocer horarios' ,
    '*Costos*: Si quieres conocer los planes que tenemos',
    '*Beneficios*: Si quieres saber en que puedes mejorar al ahcer Crossfit',
    '*Pagar*: Para pagar tu mensualidad',
    '*Cuenta*: Para consultar la cuenta EMBER de BanRegio'
])