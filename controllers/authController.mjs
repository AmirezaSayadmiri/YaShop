import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../helpers/emailSender.mjs";
import { getRandomCode } from "../helpers/helpers.mjs";
import { randomBytes } from "crypto";
import UserProfile from "../models/UserProfile.mjs";

const loginUser = (res, email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);

    res.cookie("jwt_token", token, { httpOnly: true });

    res.json({ message: "logged in" });
};

const postRegister = async (req, res) => {
    let { email, username, password } = req.body;

    bcrypt.hash(password, 12).then(async (hashedPassword) => {
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
            verificationCode: getRandomCode(),
        });

        await UserProfile.create({ userId: user.id });

        await transporter.sendMail({
            from: "PlogX",
            to: email,
            subject: "verify your PlogX account",
            text: "your verification code is " + user.verificationCode,
        });

        res.status(201).json({ messaeg: "check your email" });
    });
};

const postLogin = async (req, res) => {
    const { email } = req.body;

    loginUser(res, email);
};

const postVerificationCode = async (req, res, next) => {
    const { verificationCode } = req.body;

    const user = await User.findOne({ where: { verificationCode } });

    user.verificationCode = null;
    user.isActive = true;
    await user.save();

    loginUser(res, user.email);
};

const postSendLoginCode = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    user.verificationCode = getRandomCode();
    await user.save();

    await transporter.sendMail({
        from: "PlogX",
        to: email,
        subject: "login code PlogX",
        text: "your login code is " + user.verificationCode,
    });

    res.json({ message: "a code was sent. check your email" });
};

const postLoginByCode = async (req, res) => {
    const { loginCode } = req.body;

    const user = await User.findOne({ where: { verificationCode: loginCode } });
    user.verificationCode = null;
    await user.save();

    loginUser(res, user.email);
};

const postForgetPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    user.resetPasswordToken = randomBytes(32).toString("hex");
    await user.save();

    await transporter.sendMail({
        from: "PlogX",
        to: email,
        subject: "reset password link PlogX",
        html: `<h1>click <a href="http://localhost:3000/${user.resetPasswordToken}">here</a> to reset your password </h1>`,
    });

    res.json({ message: "the reset password link was sent. check your email" });
};

const postResetPassword = async (req, res) => {
    const { newPassword } = req.body;
    const { token } = req.params;

    const user = await User.findOne({ where: { resetPasswordToken: token } });
    bcrypt.hash(newPassword, 12).then(async (newHashedPassword) => {
        user.password = newHashedPassword;
        user.resetPasswordToken = null;
        await user.save();
        res.json({ message: "password reset. you can login now" });
    });
};

export {
    postRegister,
    postLogin,
    postVerificationCode,
    postSendLoginCode,
    postLoginByCode,
    postForgetPassword,
    postResetPassword,
};
