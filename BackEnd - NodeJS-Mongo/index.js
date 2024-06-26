const {connection} = require("./database/connection");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

//Inicializar app
console.log("App Initialized");

//Conectar a la db
connection();

//Crear servidor Node
const app = express();
const port = 3900;

//Configurar CORS
//app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

//Convertir body a objeto JS
app.use(express.json()); // Para content-type app/JSON
app.use(express.urlencoded({extended:true}));//Para form/urlEncoded

//Crear rutas
const rutas_noticia = require("./routes/Noticia");
const rutas_usuarios = require("./routes/Usuario");
const rutas_categorias = require("./routes/Categoria");

//Cargar Rutas
app.use("/api", rutas_noticia);
app.use("/api", rutas_usuarios);
app.use("/api", rutas_categorias);


//Crear servidor y escuchar peticiones
app.listen(port, () =>{
    console.log("Server running on port " + port)
});

