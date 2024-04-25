const validator = require("validator");
const Usuario = require("../models/Usuario");
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una accion de prueba en Usuario controller"
    })
};



const login= (req, res) => {
    const { username, password } = req.body;
    // Aquí deberías tener una verificación contra tu base de datos
    if (username === 'admin' && password === 'password') { // Estos valores son solo de ejemplo
        const token = jwt.sign(
            { userId: 1, username: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};


module.exports = {
    test,
    login
}