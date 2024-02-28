import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

const notGuestError = (res) => res.status(401).json({ message: "you've logged in already" });

const guestOnlyMiddleware = async (req, res, next) => {
    const jwtToken = req.cookies.jwt_token;
    if (jwt) {
        jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if (err) {
                return next();
            }

            const user = await User.findOne({ where: { email: decoded.email, isActive: true } });

            if (!user) {
                return next();
            }

            notGuestError(res);
        });
    } else {
        next();
    }
};

export default guestOnlyMiddleware;
