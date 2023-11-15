const { decryptData } = require("../../utils/hash");
const pool = require('../../database');


const ctrlCallBack = async (req, res) => {
  const payload = req.query.p;
  const adapterDB = req.db;
  const adapterProvider = req.ws;
  const phoneOwner = '5214424799307';
  let redirectUrl = "https://www.instagram.com/bulletjuriquilla/";


  var today = new Date().toISOString().split('T')[0];

  if (!payload) {
    res.send({ data: "Ups algo paso con pago intenta de nuevo!" });
    return;
  }

  const data = decryptData(payload);
  const [phone, status, plan, nombre, horario] = data.split("__") ?? [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  //res.send(`phone: ${phone}, plan: ${plan}, status: ${status}`)

  if (status === "success") {
    await adapterProvider.sendText(
      `${phone}@c.us`,
      [
        "Muchas gracias por tu pago!! Te esperamos en Bullet!  🙌",
      ].join("\n")
    );
    await adapterProvider.sendText(
      `${phoneOwner}@c.us`,
      [
        `Hola! Para comentarte que el celular`, `${phone}`, `a nombre de`, `${nombre}`, `ya pagó`,
      ].join("\n")
    );
    try {
      const insert = await pool.query(`INSERT INTO pagos (id, nombre, horario, plan, telefono, fecha) VALUES ('', '${nombre}', '${horario}', '${plan}', '${phone}','${today}')`);
      if (insert) {
          console.log("Inserción exitosa");
          console.log(nombre, horario,plan,phone,today);
        } else {
            console.error("Error: No se pudo insertar en la base de datos.");
        }
          } catch (error) {
        console.error('Error al realizar la consulta:', error);
        }
        res.redirect(redirectUrl);
  }

  if (status === "fail") {
    await adapterProvider.sendText(
      `${phone}@c.us`,
      [
        "Los sentimos, algo pasó con tu pago",
        "Si tienes algun inconveniente puedes escribirme al Whatsapp: 442 123 45 67",
      ].join("\n")
    );

    await adapterProvider.sendText(
      `${phoneOwner}@c.us`,
      [
        `Hola! Para comentarte que hubo un intento de pago desde el celular,`,
        `${phone}`, `a nombre de`, `${nombre}`,
        ' pero falló'
      ].join("\n")
    );
    res.redirect(redirectUrl);
    return;
  }
  


};

module.exports = { ctrlCallBack };