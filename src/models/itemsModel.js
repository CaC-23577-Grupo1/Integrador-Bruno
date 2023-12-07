const fs = require('fs');
const path = require('path');


const traerTodosLosProductos = async () => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../../public/data/products.json'));
    const datosJsonParseados =  await JSON.parse(dataDelJson);

    return datosJsonParseados;

};


module.exports = {
    traerTodosLosProductos
};