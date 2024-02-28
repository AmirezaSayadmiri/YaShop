import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const UserProfile = sequelize.define(
    "UserProfile",
    {
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM("male", "female"),
            allowNull: true,
        },
    },
    { timestamps: true }
);

export default UserProfile;
