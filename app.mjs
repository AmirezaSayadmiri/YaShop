import sequelize from "./database.mjs";
import "./dbRelations.mjs";
import authRouter from "./routes/authRoutes.mjs";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userProfileRouter from "./routes/userProfileRoutes.mjs";
import addressRouter from "./routes/addressRoutes.mjs";
import ticketRouter from "./routes/ticketRoutes.mjs";

dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.use(authRouter);
app.use("/profile", userProfileRouter);
app.use("/profile", addressRouter);
app.use(ticketRouter);

const runApp = async () => {
    await sequelize.sync({ force: false });
    app.listen(process.env.PORT);
};

runApp();
