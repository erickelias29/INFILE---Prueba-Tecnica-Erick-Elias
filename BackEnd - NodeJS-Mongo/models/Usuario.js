const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
    nombre_usuario: {
        type: String,
        required: true
    },
    correo_electronico: {
        type: String,
        required: true
    },
    contrasena_hash: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: "basico"
    }
});

module.exports = model("Usuario", UsuarioSchema, "usuarios");