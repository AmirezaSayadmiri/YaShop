import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const Image = sequelize.define(
    "Image",
    {
        src: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default Image;
