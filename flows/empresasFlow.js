const {addKeyword} = require("@bot-whatsapp/bot")

module.exports = addKeyword(['empresas','empresa'])
.addAction(async(_,{state,flowDynamic})=>{
    const currenstate = state.getMyState()
    return flowDynamic(
        [
            '*Ember Servicios Amaso SA de CV* Empresa dedicada a la _construcción_, servicios _contables_, servicios _administrativos_, _fumigaciones_, _mantenimiento industrial y maquinaria_ ',
            ''
        ]
    ), {delay:2000}
})

//Sigueinte empresa: Node Grupo Amazo