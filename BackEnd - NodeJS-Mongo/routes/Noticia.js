const express = require("express");
const router = express.Router();

const NoticiaController = require("../controllers/Noticia")

router.get("/test", NoticiaController.test);
router.post("/crearNoticia", NoticiaController.crearNoticia);
router.get("/getNoticias", NoticiaController.getNoticias);





module.exports = router;