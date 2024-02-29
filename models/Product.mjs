import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const Product = sequelize.define(
    "Product",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default Product;
