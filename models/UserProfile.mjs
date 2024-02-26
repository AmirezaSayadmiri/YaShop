import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const UserProfile = sequelize.define(
    "UserProfile",
    {
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default UserProfile;
