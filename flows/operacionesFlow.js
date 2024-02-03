const {addKeyword, EVENTS} = require("@bot-whatsapp/bot")
const {getOperacionesData,getOperacionById} = require('../services/firebase')

var codigoOperacion;
var operacion;

module.exports = addKeyword(['operaciones','operación','ops','status','estatus','operacion'])
/*-------SOLICITUD DE CODIGO--------- */
.addAction(async(_,{flowDynamic})=>{
    return flowDynamic('¿Cual es el código de tu operación?')
})
.addAction({capture:true},async(ctx,{flowDynamic})=>{
    codigoOperacion = ctx.body
    const operacion = codigoOperacion === 'joelMontesano' ? await getOperacionesData() : await getOperacionById(codigoOperacion);
    await flowDynamic(operacion)

})


