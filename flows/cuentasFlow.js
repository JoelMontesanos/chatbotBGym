const {addKeyword} = require("@bot-whatsapp/bot")

module.exports = addKeyword(['cuentas','Cuentas','Cuenta','cuentas'])
.addAction(async(_,{state,flowDynamic})=>{
    const currenstate = state.getMyState()
    return flowDynamic(
        [
            'Ember Servicios Amaso SA de CV *Banregio* Cuenta: _167945860016_ Clabe: _058680000150385021_ RFC: ESA231109DH0',
            '*HSBC* Cuenta: _4070457668_ Clabe: _021680040704576684_ RFC: ESA231109DH0'
        ]
    ), {delay:2000}
})

//Sigueinte empresa: Node Grupo Amazo