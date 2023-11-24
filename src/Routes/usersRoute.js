const { Router } = require("express");
const { createUser } = require("../Controllers/Users/CreateUser");
const getAllUsers = require("../Controllers/Users/getAllUsers");
const { getUserByEmail } = require("../Controllers/Users/getUserByEmail");
const { changeSessionState } = require("../Controllers/Users/changeSessionState");
const { loginUser } = require("../Controllers/Users/loginUser");
const auth = require("../Midleware/auth");

const usersRouter = Router();

//Crear un usuario nuevo

usersRouter.post('/users', async (req, res) => {
    const { full_name, email, dni, fn, password } = req.body;
    console.log(req.body);

    try {
        const newUser = await createUser(full_name, email, dni, fn, password);
        res.status(200).json(newUser)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// inicio de sesión
usersRouter.post('/users/login', async (req, res) => {

    const { email, password } = req.body;
    try {
        let response = await loginUser(email, password);

        if (response.autenticated) {
            req.session.userID = response.usuario.id;
            req.session.userEmail = response.usuario.email;

        }
        console.log(req.session);
        res.status(200).json(response)

    } catch (error) {
        res.status(400).json({ error: error.message, access: false });
    }
})

// Logout endpoint
usersRouter.get('/logout', function (req, res) {
    try {
        req.session.destroy();
        res.status(200).json({ respuesta: "logout success!" });
    } catch (error) {
        res.send('error para desloguear')
    }

});

//Ruta para verificar si el usuario tiene sesión iniciada

usersRouter.get('/checkSession', auth, (req, res) => {

    res.status(200).json({ logued: true })
})




//Obtener todos los usuarios

usersRouter.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
});

//Obtener un usuario

usersRouter.get('/users/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await getUserByEmail(email);
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

//Editar el estado de sesión de un usuario

usersRouter.put('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const { session } = req.body;
    try {
        let response = await changeSessionState(userId, session)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




module.exports = usersRouter;