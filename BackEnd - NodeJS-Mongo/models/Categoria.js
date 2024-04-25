const { Schema, model } = require("mongoose");

const CategoriaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    }
});

module.exports = model("Categoria", CategoriaSchema, "categorias");