const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

module.exports = addKeyword(EVENTS.WELCOME).addAction(async(ctx,ctxFn)=>{})
    
.addAnswer(['Bienvenido, en que te podemos ayudar?', 'Puedo ayudarte a saber *horarios*, *costos*, *benficios* de hacer corssfit o *pagar tu mensualidad* '])
