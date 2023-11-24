const { User } = require('../../DB_connection');
const bcrypt = require('bcrypt');

const cifrarPassword = async (password) => {
    const saltRounds = 10; // Número de rondas de cifrado (ajusta según sea necesario)
    return await bcrypt.hash(password, saltRounds);

}

const createUser = async (full_name, email, dni, fn, password) => {

    const existsUserDni = await User.findOne({ where: { dni: dni } });
    const existsUserEmail = await User.findOne({ where: { email: email } });
    const passwordCifrada = await cifrarPassword(password)
    if (existsUserDni) {
        throw new Error('El DNI que intenta registrar ya se encuentra en nuestra base de datos')
    }

    if (existsUserEmail) {
        throw new Error('El email ingresado ya se encuentra registrado')
    }

    if(fn==='Invalid Date' || fn===null){
        throw new Error('Por favor revise la fecha de nacimiento e ingrese una fecha válida')
    }  

    const newUser = await User.create({
        full_name: full_name,
        email: email,
        dni: dni,
        fn: fn,
        password: passwordCifrada
    });
    return newUser;

}

module.exports = { createUser }