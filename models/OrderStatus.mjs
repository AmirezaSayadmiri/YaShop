import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const OrderStatus = sequelize.define(
    "OrderStatus",
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

export default OrderStatus;
