import Sequelize from "sequelize";

export const sequelize = new Sequelize('FaztCode', 'adn', 'adn', {
    host: 'localhost',
    dialect: 'mysql',
});