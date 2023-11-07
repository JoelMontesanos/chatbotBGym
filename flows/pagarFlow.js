const {addKeyword, EVENTS} = require("@bot-whatsapp/bot")
const {handlerStripe} = require('../services/stripe');
const {googles} = require('../services/googleshet');


module.exports = addKeyword(['pagar'])
.addAnswer('Perfecto! Generemos tu link de pago' )
.addAnswer('¿Cual es tu nombre completo?', {capture:true},async(ctx,)=>{
    const nombreCLiente = ctx.body;
    console.log(nombreCLiente)

})
.addAnswer('¿Cual es tu horario?',{capture:true},async(ctx,)=>{
    const horario= ctx.body
})
.addAnswer('¿Cual es tu email', {capture:true}, async(ctx,{fallBack,flowDynamic})=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = ctx.body;
    console.log(email)
    const phoneCliente = ctx.from
    if (!emailRegex.test(email)){
        return fallBack('Introduce un email válido')
    }
    const link = await handlerStripe(phoneCliente, email)
    await flowDynamic(`Aqui tienes el link: `)
    await flowDynamic(link.url)
    //console.log(link)

})

