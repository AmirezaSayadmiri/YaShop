import sequelize from "./database.mjs";
import "./dbRelations.mjs";
import authRouter from "./routes/authRoutes.mjs";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use(authRouter);

const runApp = async () => {
    await sequelize.sync({ force: true });
    app.listen(8000);
};

runApp();
