import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

const sendAuthError = (res) => res.status(401).json({ message: "please login to the PlogX" });

const authOnlyMiddleware = (req, res, next) => {
    const jwtToken = req.cookies.jwt_token;

    if (!jwtToken) {
        return sendAuthError(res);
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return sendAuthError(res);
        }

        const user = await User.findOne({ where: { email: decoded.email, isActive: true } });

        if (!user) {
            return sendAuthError(res);
        }

        req.user = user;

        next();
    });
};

export default authOnlyMiddleware;
