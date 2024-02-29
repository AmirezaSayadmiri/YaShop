import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const VariationOption = sequelize.define(
    "VariationOption",
    {
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default VariationOption;
