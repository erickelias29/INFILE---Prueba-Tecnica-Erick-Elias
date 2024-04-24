const validator = require("validator");
const Noticia = require("../models/Noticia");

const test = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una accion de prueba en Noticias controller"
    })
};


module.exports = {
    test
}