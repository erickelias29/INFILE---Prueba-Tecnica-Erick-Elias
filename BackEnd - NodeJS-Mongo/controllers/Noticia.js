const validator = require("validator");
const Noticia = require("../models/Noticia");

const test = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una accion de prueba en Noticias controller"
    })
};

const crearNoticia = async (req, res) => {
    let parametros = req.body;

    try {        
        const noticia = new Noticia(parametros);
        const noticiaSaved = await noticia.save();

        return res.status(200).json({
            status: "Success",
            noticia: noticiaSaved
        });

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "Faltan datos por enviar"
        });
    }
}

const getNoticias = (req, res) => {
    let consulta = Noticia.find({}, 'titulo imagen descripcion').exec();

    consulta.then((noticias) => {
        if (!noticias || noticias.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se han encontrado noticias"
            });
        }

        return res.status(200).send({
            status: "success",
            noticias
        });
    }).catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: "Ocurrió un error al buscar las noticias"
        });
    });
};

const getNoticiaById = (req, res) => {
    const id = req.params.id;
    
    let consulta = Noticia.findById(id).exec();

    consulta.then((noticias) => {
        if (!noticias || noticias.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se han encontrado noticias"
            });
        }

        return res.status(200).send({
            status: "success",
            noticias
        });
    }).catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: "Ocurrió un error al buscar las noticias"
        });
    });
};

const getNoticiasRecomendadasA = (req, res) => {
    const id = req.params.id;
    
    let consulta = Noticia.findById(id).exec();

    consulta.then((noticias) => {
        if (!noticias || noticias.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se han encontrado noticias"
            });
        }

        console.log(noticias);


        return res.status(200).send({
            status: "success",
            noticias
        });
    }).catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: "Ocurrió un error al buscar las noticias"
        });
    });
};

const getNoticiasRecomendadas = (req, res) => {
    const id = req.params.id;
    
   
    Noticia.findById(id).exec()
        .then(noticia => {
            if (!noticia) {
                return res.status(404).json({
                    status: "Error",
                    message: "No se ha encontrado la noticia con el ID proporcionado"
                });
            }

            console.log(noticia.categoria);

            Noticia.aggregate([
                { $match: { _id: { $ne: noticia._id }, categoria: { $in: noticia.categoria } } },
                { $sample: { size: 5 } }
            ])
            .then(noticiasRecomendadas => {
                res.status(200).json({
                    status: "Success",
                    noticiasRecomendadas
                });
            })
            .catch(error => {
                res.status(500).json({
                    status: "Error",
                    message: "Ocurrió un error al buscar noticias recomendadas"
                });
            });

        })
        .catch(error => {
            res.status(500).json({
                status: "Error",
                message: "Ocurrió un error al buscar la noticia original"
            });
        });
};




module.exports = {
    test,
    crearNoticia,
    getNoticias,
    getNoticiaById,
    getNoticiasRecomendadas
}