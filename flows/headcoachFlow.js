const {addKeyword, EVENTS} = require("@bot-whatsapp/bot")

module.exports = addKeyword(['beneficios','ventajas','ayuda','generales'])
.addAnswer([
    'Quiero comentarte de algunas ventajas de hacer crossfit',
    '1. *Ayuda a bajar peso.*',
    'La práctica de Crossfit de forma regular te permitirá reducir el porcentaje de grasa corporal, sobre todo de la denominada masa grasa, lo que te ayudará a bajar de peso. Este ejercicio de forma constante acompañado de unos hábitos alimenticios saludables o como complemento de una dieta, bajo la supervisión de un profesional, te facilitará alcanzar tu peso ideal.',

],{delay:1000})
.addAnswer([
    '2. *Aumenta tu resistencia.*',
    'La realización de los Workout Of the Day mejorará tu capacidad cardiovascular y pulmonar. Por lo que gradualmente notarás como la energía te acompaña a lo largo de todo el día y la fatiga y el cansancio tardan en aparecer. Podrás rendir mucho más en cualquier actividad.',
],{delay:1000})
.addAnswer([
    '3. *Mejora la Psicomotricidad.*',
    'Gracias a los movimientos que realizarás, tus músculos y articulaciones adquirirán mayor flexibilidad. Además, tus capacidades psicomotrices como el equilibrio y la coordinación se potenciarán y experimentarás mayor agilidad. Por ejemplo, ello supondrá una excelente forma de prevenir lesiones.'
])
.addAnswer(['Inscríbete!'])