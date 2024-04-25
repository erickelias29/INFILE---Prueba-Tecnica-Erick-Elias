const validator = require("validator");
const Usuario = require("../models/Usuario");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const test = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una accion de prueba en Usuario controller"
    })
};



const login = async (req, res) => {
    const { username, password } = req.body;

    try {
       
        const usuario = await Usuario.findOne({ username });

        if (!usuario) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const isMatch = await bcrypt.compare(password, usuario.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Si las contraseñas coinciden, generar y devolver un token JWT
        const token = jwt.sign(
            { userId: usuario._id, username: usuario.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const crearUsuario = async (req, res) => {
    let parametros = req.body;
    console.log(parametros);

    try {
        
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(parametros.password, saltRounds);

        const usuarioExistente = await Usuario.findOne({ username: parametros.username });
        if (usuarioExistente) {
            return res.status(409).json({
                status: "Error",
                message: "El nombre de usuario ya existe"
            });
        }

        const emailExistente = await Usuario.findOne({ email: parametros.email });
        if (emailExistente) {
            return res.status(409).json({
                status: "Error",
                message: "El email ya existe"
            });
        }
        
        // Crear el nuevo usuario con la contraseña hasheada
        const usuario = new Usuario({
            username: parametros.username,
            email: parametros.email,
            password: hashedPassword
        });

        const usuariOSaved = await usuario.save();

        return res.status(200).json({
            status: "Success",
            usuario: usuariOSaved
        });

    } catch (error) {
        console.error(error); 
        return res.status(400).json({
            status: "Error",
            message: "Error al crear el usuario"
        });
    }
}


module.exports = {
    test,
    login,
    crearUsuario
}