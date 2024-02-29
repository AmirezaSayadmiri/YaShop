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
        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    { timestamps: true }
);

export default Address;
