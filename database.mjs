import { Sequelize } from "sequelize";

const sequelize = new Sequelize("plogx", "root", "as84", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

export default sequelize;
