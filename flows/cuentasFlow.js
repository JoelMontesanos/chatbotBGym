const {addKeyword} = require("@bot-whatsapp/bot")

module.exports = addKeyword(['cuenta','Cuentas'])
.addAction(async(_,{state,flowDynamic})=>{
    const currenstate = state.getMyState()
    return flowDynamic(
        [
            'Ember Servicios Amazo',
            '*Banregio*',
            'Clabe: 058680000150385021',
            'RFC: ESA231109DH0'
        ]
    ), {delay:2000}
})