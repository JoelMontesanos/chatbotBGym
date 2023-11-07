const {addKeyword} = require("@bot-whatsapp/bot")

module.exports = addKeyword(['costos','precio','mensualidad', 'paquetes', 'presio', 'costo','cuesta'])
.addAction(async(_,{state,flowDynamic})=>{
    const currenstate = state.getMyState()
    return flowDynamic(
        [
            'Tenemos varios planes:',
            'Plan individual 5 días: Permite venir a entrenar todos los días (incluso repetir la clase en otro horario) opr *1,300* pesos mensuales',
            'Plan individual 3 días: Permite venir 3 días a entrenar por *1,100* pesos al mes',
            'Plan Pareja: Es el paquete individual de 5 días pero para dos personas en *2,000* pesos al mes',

            'En cualquier paquete se excluyen sábados, cualquier persona incrita puede participar los sábados',
            'No cobrarmos inscripción',
            'Si gustas puedes venir a 3 clases muestra de cortesía en el horarios que prefieras'
        ]
    ), {delay:2000}
})