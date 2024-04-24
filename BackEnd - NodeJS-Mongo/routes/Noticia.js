const express = require("express");
const router = express.Router();

const NoticiaController = require("../controllers/Noticia")

router.get("/test", NoticiaController.test);





module.exports = router;