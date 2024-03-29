import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize";

configDotenv();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

export default sequelize;
