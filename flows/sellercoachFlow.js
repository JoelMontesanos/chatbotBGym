const {addKeyword} = require("@bot-whatsapp/bot")

module.exports = addKeyword(['horarios','horario','ubicados','encuentran', 'informacion', 'info'])
.addAction(async(_,{state,flowDynamic})=>{
    const currenstate = state.getMyState()
    return flowDynamic(
        [
            'Por su puesto, Los horarios del box son:',
            'Lunes a Viernes 6:00 am, 7:30am, 8:30am, 5:30pm, 6:30pm, 7:30pm, 8:30pm',
            'Los viernes no tenemos clase de 8:30pm por el momento',
            'Sábados: 9:00 am(Se avisa que sábados habrá entrenamiento previamente)',
            'Nos ubicamos en: Plaza Vida, Blvrd Privada Juriquilla 401, Privada Juriquilla, 76230 Juriquilla, Qro.'
        ]
    ), {delay:1000}
})
