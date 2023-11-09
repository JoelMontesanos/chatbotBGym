const {addKeyword, EVENTS} = require("@bot-whatsapp/bot")
const {handlerStripe} = require('../services/stripe');
const pool = require('../database');

var nombre;
var horario;
var plan; 
var mail;

module.exports = addKeyword(['pagar'])
.addAnswer('Perfecto! Generemos tu link de pago',{delay:500} )
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
    return flowDynamic(['¿Cual es tu plan?','Escribe: ','*1* para: Plan 5 Días', '*2* para: Plan 3 Días','*3* para: Plan Pareja'])
})
.addAction({capture:true},async(ctx,{flowDynamic})=>{
    plan = ctx.body
})
/*---------------- */
.addAction(async(_,{flowDynamic})=>{
    return flowDynamic('¿Cual es tu email?')
})
.addAction({capture:true},async(ctx,{flowDynamic,fallBack})=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    mail = ctx.body
    const phoneCliente = ctx.from
    if (!emailRegex.test(mail)){
        return fallBack('Introduce un email válido')
    }
    const link = await handlerStripe(phoneCliente, mail,plan)

    try {
        const insert = await pool.query(`INSERT INTO pagos (id, nombre, horario, plan, pagado) VALUES ('', '${nombre}', '${horario}', '${plan}', false)`);
        console.log("Inserción exitosa");
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
    }
    await flowDynamic(`Aqui tienes el link: `)
    await flowDynamic(link.url)
    console.log(link)
})