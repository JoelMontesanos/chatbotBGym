const {addKeyword} = require("@bot-whatsapp/bot")

module.exports = addKeyword(['cuentas','Cuentas','Cuenta','cuentas'])
.addAction(async(_,{state,flowDynamic})=>{
    const currenstate = state.getMyState()
    return flowDynamic(
        [
            'Ember Servicios Amazo SA de CV *Banregio* Cuenta: _167945860016_ Clabe: _058680000150385021_ RFC: ESA231109DH0'
        ]
    ), {delay:2000}
})

//Sigueinte empresa: Node Grupo Amazo