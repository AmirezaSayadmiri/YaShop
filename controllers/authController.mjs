import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "Hellol this is my secret key";

const postRegister = async (req, res) => {
    let { email, username, password } = req.body;

    bcrypt.hash(password, 12).then(async (hashedPassword) => {
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
            verificationCode: new Date().getTime().toString().slice(-5),
        });
        res.status(201).json("welcome to PlogX");
    });
};

const postLogin = async (req, res) => {
    const { email } = req.body;

    const token = jwt.sign({ email }, SECRET_KEY);

    res.cookie("jwt_token", token, { httpOnly: true });

    res.send("logged in");
};

export { postRegister, postLogin };
