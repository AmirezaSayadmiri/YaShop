import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const Order = sequelize.define(
    "Order",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderTotal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderDate: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default Order;
