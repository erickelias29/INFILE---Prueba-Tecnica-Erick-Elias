const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "basico"
    }
});


module.exports = model("Usuario", UsuarioSchema, "usuarios");