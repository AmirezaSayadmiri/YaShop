import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const Ticket = sequelize.define(
    "Ticket",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { timestamps: true }
);

export default Ticket;
