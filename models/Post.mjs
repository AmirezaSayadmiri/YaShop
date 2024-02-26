import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";

const Post = sequelize.define(
    "Post",
    {
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rate: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    { timestamps: true }
);

export default Post;
