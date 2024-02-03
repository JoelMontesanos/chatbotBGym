const axios = require('axios');

const formatNumber = (number) => `$${numberWithCommas(number)}`;

const formatOperacion = (operacion) => ({
    id: operacion.id,
    Desposito: formatNumber(operacion.Depósito),
    Comision: formatNumber(operacion.Comisión),
    Dispersion: formatNumber(operacion.Dispersión),
    Transfer: formatNumber(operacion.Transfer),
    Cash: formatNumber(operacion.Cash),
    Restante: `*${formatNumber(operacion.Restante)}*`,
    Fecha: operacion.Fecha,
});

const numberWithCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const getOperacionesData = async () => {
    try {
        const response = await axios.get('https://chatbotoperaciones-default-rtdb.firebaseio.com/Operaciones.json');
        const operacionesData = response.data;

        const operacionesOrdenadas = Object.values(operacionesData).map(formatOperacion);

        const operacionesTextoFormateado = operacionesOrdenadas.map(objeto => {
            return Object.entries(objeto).map(([clave, valor]) => `${clave}: ${valor}`).join('\n');
        }).join('\n\n');

        console.log(operacionesTextoFormateado);
        return operacionesTextoFormateado;
    } catch (error) {
        console.error('Error:', error.message);
        return error.message;
    }
};

const getOperacionById = async (providedId) => {
    try {
        const response = await axios.get('https://chatbotoperaciones-default-rtdb.firebaseio.com/Operaciones.json');
        const operacionesData = response.data;

        const operacionEncontrada = Object.values(operacionesData).find(operacion => operacion.id === providedId);

        if (operacionEncontrada) {
            const operacionFormateada = Object.entries(formatOperacion(operacionEncontrada))
                .map(([clave, valor]) => `${clave}: ${valor}`)
                .join('\n');

            console.log(operacionFormateada);
            return operacionFormateada;
        } else {
            console.log(`Operación con id ${providedId} no encontrada`);
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return error.message;
    }
};

module.exports = { getOperacionesData, getOperacionById };



