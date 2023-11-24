const auth = (req, res, next) => {
    // Verifica si el usuario tiene una sesión activa

    if (req.session.userEmail) {
        next();
    } else {
        // El usuario no tiene una sesión activa, redirige al inicio de sesión
        res.status(401).json({ logued: false })
    }

}

module.exports = auth;