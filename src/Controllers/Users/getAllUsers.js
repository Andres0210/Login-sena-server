const { User } = require('../../DB_connection');

const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
}

module.exports = getAllUsers;