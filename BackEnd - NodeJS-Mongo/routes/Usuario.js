const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const UsuarioController = require("../controllers/Usuario")

router.get("/test", UsuarioController.test);

router.post('/login', UsuarioController.login);
router.post('/crearUsuario', UsuarioController.crearUsuario);






module.exports = router;