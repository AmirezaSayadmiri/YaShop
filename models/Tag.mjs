import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const Tag = sequelize.define(
    "Tag",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default Tag;
