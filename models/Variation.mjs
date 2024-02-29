import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const Variation = sequelize.define(
    "Variation",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default Variation;
