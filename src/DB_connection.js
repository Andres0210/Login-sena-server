const { Sequelize } = require("sequelize");
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const UserModel = require('./Models/User');

const sequelize = new Sequelize(
    `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    {
        logging: false,
        alter: true,
        dialect: 'mysql',
    }
);

UserModel(sequelize);
const { User } = sequelize.models

module.exports = {
    ...sequelize.models,
    sequelize
}
