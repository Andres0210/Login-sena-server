const { User } = require('../../DB_connection');


const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        throw new Error('El email que ingresó no se encuentra registrado');
    }
    return user;
}

module.exports = { getUserByEmail }