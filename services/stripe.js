const { encryptData } = require("../utils/hash");

const handlerStripe = async (nombre = '', horario = '',phone = '', plan='') => {
  
  var today = new Date().toISOString().split('T')[0];

  let priceId = ''
  switch (plan){
    case '5 Días':  priceId = process.env.DIAS5;
    console.log(process.env.DIAS5);
    break;
    case '3 Días': priceId = process.env.DIAS3;
    console.log(process.env.DIAS3);
    break;
    case 'Pareja': priceId = process.env.PAREJA;
    console.log(process.env.PAREJA);
    break;
    default:
      break; 
  }
  const stripeApiBase64 = process.env.STRIPE_SK_BASE64
  const FRONT_URL = process.env.FRONT;

  const URL = `https://api.stripe.com/v1/checkout/sessions`;

  const headerObject = new Headers();
  headerObject.append("Content-Type", "application/x-www-form-urlencoded");
  headerObject.append("Authorization", `Basic ${stripeApiBase64}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("line_items[0][price]", priceId);
  urlencoded.append("line_items[0][quantity]", "1");
  urlencoded.append("allow_promotion_codes", "false");
  urlencoded.append("customer_creation", "always");
  urlencoded.append("success_url", `chatbotbgym-production.up.railway.app/api/callback?p=${encryptData(`${phone}__success__${plan}__${nombre}__${horario}`)}`);
  urlencoded.append("cancel_url", `chatbotbgym-production.up.railway.app/api/callback?p=${encryptData(`${phone}__fail__${plan}__${nombre}__${horario}`)}`);
  urlencoded.append("mode", "payment");

  const requestOptions = {
    method: "POST",
    headers: headerObject,
    body: urlencoded,
  };

  const stripeRequest = await fetch(URL, requestOptions);
  const response = await stripeRequest.json();
  return response
};

module.exports = { handlerStripe };