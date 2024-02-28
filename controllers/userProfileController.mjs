import User from "../models/User.mjs";
import UserProfile from "../models/UserProfile.mjs";
import fs from "fs";

const postUserProfileImage = async (req, res, next) => {
    const image = req.file;

    if (!req.file) {
        return res.status(400).json({ message: "no image sent" });
    }

    const userProfile = await UserProfile.findOne({ where: { userId: req.user.id } });

    if (userProfile.image) {
        fs.unlink(`E://Projects/Backend/PlogX/${userProfile.image}`, async (err) => {
            userProfile.image = image.path;
            await userProfile.save();

            res.json({ message: "uploaded" });
        });
    } else {
        userProfile.image = image.path;
        await userProfile.save();

        res.json({ message: "uploaded" });
    }
};

const postUserProfileData = async (req, res, next) => {
    const { gender, bio, country, age } = req.body;
    const userProfile = await UserProfile.findOne({ where: { userId: req.user.id } });

    userProfile.bio = bio;
    userProfile.age = age;
    userProfile.gender = gender;
    userProfile.country = country;
    await userProfile.save();

    res.json({ message: "profile updated" });
};

export { postUserProfileImage, postUserProfileData };
