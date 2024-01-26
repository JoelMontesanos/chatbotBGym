const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

module.exports = addKeyword(['Menú','Menu', 'Meni','menu']).addAction(async(ctx,ctxFn)=>{})
    
.addAnswer([
    'Bienvenido, en que te podemos ayudar? Escribe:',
    '*Horarios*: Si quieres conocer los horarios y días en los que laboramos',
    '*Cuentas*: Para consultar la cuenta EMBER de BanRegio',
    '*Empresas*: Para conocer las empresas y sus giros correspondientes'
])