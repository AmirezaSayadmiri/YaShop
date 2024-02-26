import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";



const Category = sequelize.define(
    "Category",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default Category;
