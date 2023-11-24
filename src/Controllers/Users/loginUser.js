const { User } = require('../../DB_connection');
const bcrypt = require('bcrypt');

// Función para verificar la contraseña
const verificarPassword = async (passwordPlana, passwordCifrada) => {
    return await bcrypt.compare(passwordPlana, passwordCifrada);
};

const loginUser = async (email, password) => {
    const userToLog = await User.findOne({ where: { email: email } });
    if (!userToLog) {
        throw new Error('El correo ingresado no existe en mis registros');
    }
    else {
        if (await (verificarPassword(password, userToLog.password))) {
            return {
                usuario: userToLog,
                mensaje: 'El usuario puede iniciar sesión',
                autenticated: true
            }
        }
        else {
            throw new Error('Contraseña incorrecta');
        }
    }
}

module.exports = { loginUser }