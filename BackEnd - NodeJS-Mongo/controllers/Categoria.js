const validator = require("validator");
const Categoria = require("../models/Categoria");
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una accion de prueba en Categoria controller"
    })
};

const getCategorias = (req, res) => {
    let consulta = Categoria.find({}).exec();

    consulta.then((categorias) => {
        if (!categorias || categorias.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se han encontrado categorias"
            });
        }

        return res.status(200).send({
            status: "success",
            categorias
        });
    }).catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: "Ocurrió un error al buscar las categorias"
        });
    });
};

const crearCategoria = async (req, res) => {
    let parametros = req.body;

    try {        
        const categoria = new Categoria(parametros);
        const categoriaSaved = await categoria.save();

        return res.status(200).json({
            status: "Success",
            noticia: categoriaSaved
        });

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "Faltan datos por enviar"
        });
    }
};

module.exports = {
    test,
    getCategorias,
    crearCategoria
}