import { validate } from "validate.js";
import { giveErrorsArray } from "../helpers/validationHelpers.mjs";
import User from "../models/User.mjs";
import bcrypt from "bcryptjs";

validate.validators.presence.message = "is required";

const isValidationValid = (data, constraints) => {
    const errorsObject = validate(data, constraints);

    return errorsObject;
};

const firstPostRegisterValidationPhase = (req, res) => {
    return isValidationValid(req.body, {
        email: {
            presence: true,
            email: true,
        },
        username: {
            presence: true,
        },
        password: {
            presence: true,
        },
        confirmPassword: {
            presence: true,
            equality: {
                attribute: "password",
                message: "is not the same as password",
            },
        },
    });
};

const secondPostRegisterValidationPhase = async (req, res, next) => {
    const secondValidationObject = {};

    let user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
        secondValidationObject.email = ["this email already exists"];
    }

    user = await User.findOne({ where: { username: req.body.username } });

    if (user) {
        secondValidationObject.username = ["this username already exists"];
    }

    if (Object.keys(secondValidationObject).length > 0) {
        return res.send(giveErrorsArray(secondValidationObject));
    }

    next();
};

const postRegisterValidation = async (req, res, next) => {
    const errorsObject = firstPostRegisterValidationPhase(req, res);

    !errorsObject ? secondPostRegisterValidationPhase(req, res, next) : res.send(giveErrorsArray(errorsObject));
};

const firstPostLoginValidationPhase = (req) => {
    return isValidationValid(req.body, {
        email: {
            presence: true,
            email: true,
        },
        password: {
            presence: true,
        },
    });
};
const secondPostLoginValidationPhase = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.json({ message: "wrong email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    isPasswordValid ? next() : res.json({ message: "wrong email or password" });
};

const postLoginValidation = async (req, res, next) => {
    const errorsObject = firstPostLoginValidationPhase(req);

    !errorsObject ? secondPostLoginValidationPhase(req, res, next) : res.send(giveErrorsArray(errorsObject));
};

export { postRegisterValidation, postLoginValidation };
