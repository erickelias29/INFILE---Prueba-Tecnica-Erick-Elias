const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const CategoriaController = require("../controllers/Categoria")

router.get("/test", CategoriaController.test);
router.get("/getCategorias", auth, CategoriaController.getCategorias);
router.post("/crearCategoria", CategoriaController.crearCategoria);


module.exports = router;