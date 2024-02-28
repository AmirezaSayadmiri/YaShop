import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const Address = sequelize.define(
    "Address",
    {
        latitude: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { timestamps: true }
);

export default Address;
