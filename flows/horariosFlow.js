const {addKeyword} = require("@bot-whatsapp/bot")

module.exports = addKeyword(['horarios','horario','ubicados','encuentran', 'informacion', 'info'])
.addAction(async(_,{state,flowDynamic})=>{
    const currenstate = state.getMyState()
    return flowDynamic(
        [
            'Nuestros horarios son los siguiente',
            'Facturación: Lunes a Viernes de 10 am a 8 pm',
            'Transferencias: Lunes a viernes 10 am a 5:30 pm',
            'Transferencias internacionales (EURO): 9 am a 12:30 pm',
            'Transferencias internacionales (US DOLLAR): 9 am a 3:00pm'
        ]
    ), {delay:1000}
})
