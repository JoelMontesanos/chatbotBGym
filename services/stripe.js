const { encryptData } = require("../utils/hash");

const handlerStripe = async (phone = '', email = '',plan='') => {
  
  let stripeApiBase64 = ''
  switch (plan){
    case '1':  stripeApiBase64 = process.env.DIAS5;
    console.log('5 Días');
    break;
    case '2': stripeApiBase64 = process.env.DIAS3;
    console.log('3 Días');
    break;
    case '3': stripeApiBase64 = process.env.PAREJA;
    console.log('Pareja');
    break;
    default:
      break; 
  }
  const priceId = process.env.PRODUCT_ID;
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
  urlencoded.append("success_url", `${FRONT_URL}/api/callback?p=${encryptData(`${phone}__success__${email}`)}`);
  urlencoded.append("cancel_url", `${FRONT_URL}/api/callback?p=${encryptData(`${phone}__fail__${email}`)}`);
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