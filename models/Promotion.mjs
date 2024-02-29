import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const Promotion = sequelize.define(
    "Promotion",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        discountRate: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default Promotion;
