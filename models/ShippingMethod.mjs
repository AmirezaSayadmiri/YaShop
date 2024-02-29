import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const ShippingMethod = sequelize.define(
    "ShippingMethod",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default ShippingMethod;
