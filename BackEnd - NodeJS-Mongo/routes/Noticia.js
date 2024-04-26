const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const NoticiaController = require("../controllers/Noticia")

router.get("/test", NoticiaController.test);
router.post("/crearNoticia", NoticiaController.crearNoticia);
router.get("/getNoticias", NoticiaController.getNoticias);
router.get("/getNoticiaById/:id", auth, NoticiaController.getNoticiaById);
router.get("/getNoticiasRecomendadas/:id", auth, NoticiaController.getNoticiasRecomendadas);





module.exports = router;