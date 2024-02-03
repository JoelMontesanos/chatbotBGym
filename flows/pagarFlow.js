require('dotenv').config();
const {addKeyword, EVENTS} = require("@bot-whatsapp/bot")
const {handlerStripe} = require('../services/stripe');


var nombre;
var horario;
const mapeoPlanes = {
    '5': '5 Días',
    '3': '3 Días',
    '2': 'Pareja',
};


module.exports = addKeyword(['pagar'])
.addAnswer('Perfecto! Generemos tu link de pago')
/*---------------- */
.addAction(async(_,{flowDynamic})=>{
    return flowDynamic('¿Cual es tu nombre completo? En caso de ser Plan Pareja, escribe los nombres de las 2 personas en el mismo mensaje')
})
.addAction({capture:true},async(ctx,{flowDynamic})=>{
    nombre = ctx.body
})
/*---------------- */
.addAction(async(_,{flowDynamic})=>{
    return flowDynamic('¿Cual es tu horario?')
})
.addAction({capture:true},async(ctx,{flowDynamic})=>{
    horario = ctx.body
})
/*---------------- */
.addAction(async(_,{flowDynamic})=>{
    return flowDynamic(['¿Cual es tu plan?','Escribe: ','*2* para: Plan Pareja','*3* para: Plan 3 Días','*5* para: Plan 5 Días'])
})
.addAction({capture:true},async(ctx,{flowDynamic, fallBack})=>{
    const allowedPlans = ['2', '3', '5'];
    
    const plan = ctx.body;
    const phone = ctx.from;

    if (!allowedPlans.includes(plan)) {
        return fallBack(`Debe ser *2*, *3* o *5*! *${plan}* no es correcto`);
    }
    
    const link = await handlerStripe(nombre, horario, phone, mapeoPlanes[plan],)
    await flowDynamic(`Aqui tienes el link: `)
    await flowDynamic(link.url)
    //console.log(link)
})
