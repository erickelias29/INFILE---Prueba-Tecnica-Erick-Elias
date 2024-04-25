const { Schema, model } = require("mongoose");

const NoticiaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    cuerpo: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        default: "default.png"
    },
    fecha_publicacion: {
        type: Date,
        default: Date.now
    },
    categoria: [{
        type: String
    }],
    autor: {
        type: String,
        required: true
    }
});

module.exports = model("Noticias", NoticiaSchema, "noticias");