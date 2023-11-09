require('dotenv').config();
const {addKeyword, EVENTS} = require("@bot-whatsapp/bot")
const {handlerStripe} = require('../services/stripe');
const pool = require('../database');

var nombre;
var phone;
var horario;
var plan; 


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
    return flowDynamic(['¿Cual es tu plan?','Escribe: ','*5* para: Plan 5 Días', '*3* para: Plan 3 Días','*PP* para: Plan Pareja'])
})
.addAction({capture:true},async(ctx,{flowDynamic})=>{
    plan = ctx.body
    phone = ctx.from;

    switch(plan){
        case '5': plan = '5 Días';
        break;
        case '3': plan = '3 Días';
        break;
        case 'PP': plan = 'Pareja';
        break;
        default:
        break;
    }
    
    const link = await handlerStripe(plan)
    await flowDynamic(`Aqui tienes el link: `)
    await flowDynamic(link.url)
    console.log(link)

    var today = new Date().toISOString().split('T')[0];

    try {
        const insert = await pool.query(`INSERT INTO pagos (id, nombre, horario, plan, telefono, fecha) VALUES ('', '${nombre}', '${horario}', '${plan}', '${phone}','${today}')`);
        if (insert) {
            console.log("Inserción exitosa");
            console.log(nombre, horario,plan,phone,today);
        } else {
            console.error("Error: No se pudo insertar en la base de datos.");
        }
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
    }

})
