import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const ProductItem = sequelize.define(
    "ProductItem",
    {
        sku: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default ProductItem;
