const { User } = require('../../DB_connection');

const changeSessionState = (userId, session) => {

    let updatedUser = User.update({ session }, {
        where: {
            id: userId
        }
    })
    return updatedUser
}

module.exports = { changeSessionState }