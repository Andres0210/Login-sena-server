const server = require("./src/app");
const port = process.env.PORT || 3001;
const { sequelize } = require('./src/DB_connection'); // Importa la instancia de Sequelize configurada

sequelize.sync({ alter: true }) // Sincroniza los modelos con la base de datos y permite cambios automáticos (alter: true)
    .then(async () => {
        console.log("Conexión a la base de datos establecida.");
        // Aquí puedes agregar código adicional que deba ejecutarse después de la sincronización.

        server.listen(port, () => {
            console.log("El servidor está escuchando en el puerto " + port);
        });
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    });


