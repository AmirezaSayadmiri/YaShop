import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const CartItem = sequelize.define(
    "CartItem",
    {
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default CartItem;
