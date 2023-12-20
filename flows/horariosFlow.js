const {addKeyword} = require("@bot-whatsapp/bot")

module.exports = addKeyword(['horarios','horario','ubicados','encuentran', 'informacion', 'info'])
.addAction(async(_,{state,flowDynamic})=>{
    const currenstate = state.getMyState()
    return flowDynamic(
        [
            'Nuestros horarios son los siguiente',
            'Lunes a Viernes de 10 am a 6 pm',
            'Sábados: 9:00 am(Se avisa que sábados habrá entrenamiento previamente)',
        ]
    ), {delay:1000}
})
