import { validate } from "validate.js";
import { giveErrorsArray } from "../helpers/validationHelpers.mjs";
import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import transporter from "../helpers/emailSender.mjs";

validate.validators.presence.message = "is required";

const getValidationErrors = (data, constraints) => {
    const errorsObject = validate(data, constraints);

    return errorsObject;
};

const firstPostRegisterValidationPhase = (req, res) => {
    return getValidationErrors(req.body, {
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
        return res.status(400).json(giveErrorsArray(secondValidationObject));
    }

    next();
};

const postRegisterValidation = async (req, res, next) => {
    const errorsObject = firstPostRegisterValidationPhase(req, res);

    !errorsObject
        ? secondPostRegisterValidationPhase(req, res, next)
        : res.status(400).json(giveErrorsArray(errorsObject));
};

const firstPostLoginValidationPhase = (req) => {
    return getValidationErrors(req.body, {
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

    const user = await User.findOne({ where: { email, isActive: true } });

    if (!user) {
        return res.json({ message: "wrong email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    isPasswordValid ? next() : res.status(400).json({ message: "wrong email or password" });
};

const postLoginValidation = async (req, res, next) => {
    const errorsObject = firstPostLoginValidationPhase(req);

    !errorsObject
        ? secondPostLoginValidationPhase(req, res, next)
        : res.status(400).json(giveErrorsArray(errorsObject));
};

const firstPostVerificationCodeValidationPhase = (req) => {
    return getValidationErrors(req.body, {
        verificationCode: {
            presence: true,
        },
    });
};

const secondPostVerificationCodePhase = async (req, res, next) => {
    const { verificationCode } = req.body;

    const user = await User.findOne({ where: { verificationCode } });

    user ? next() : res.status(400).json({ message: "verification code is not valid" });
};

const postVerificationCodeValidation = (req, res, next) => {
    const errorsObject = firstPostVerificationCodeValidationPhase(req);

    !errorsObject
        ? secondPostVerificationCodePhase(req, res, next)
        : res.status(400).json(giveErrorsArray(errorsObject));
};

const firstPostSendLoginCodeValidationPhase = (req) => {
    return getValidationErrors(req.body, {
        email: {
            presence: true,
        },
    });
};

const secondPostSendLoginCodeValidationPhase = async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ where: { email, isActive: true } });

    user ? next() : res.status(400).json({ message: "wrong email" });
};

const postSendLoginCodeValidation = (req, res, next) => {
    const errorsObject = firstPostSendLoginCodeValidationPhase(req);

    !errorsObject
        ? secondPostSendLoginCodeValidationPhase(req, res, next)
        : res.status(400).json(giveErrorsArray(errorsObject));
};

const firstPostLoginByCodeValidationPhase = (req) => {
    return getValidationErrors(req.body, {
        loginCode: {
            presence: true,
        },
    });
};

const secondPostLoginByCodeValidationPhase = async (req, res, next) => {
    const { loginCode } = req.body;
    const user = await User.findOne({ where: { verificationCode: loginCode, isActive: true } });

    user ? next() : res.status(400).json({ message: "wrong login code" });
};

const postLoginByCodeValidation = (req, res, next) => {
    const errorsObject = firstPostLoginByCodeValidationPhase(req);

    !errorsObject
        ? secondPostLoginByCodeValidationPhase(req, res, next)
        : res.status(400).json(giveErrorsArray(errorsObject));
};

const firstPostForgetPasswordValidationPhase = (req) => getValidationErrors(req.body, { email: { presence: true } });

const secondPostForgetPasswordValidationPhase = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email, isActive: true } });

    user ? next() : res.status(400).json({ message: "wrong email" });
};

const postForgetPasswordValidation = (req, res, next) => {
    const errorsObject = firstPostForgetPasswordValidationPhase(req);

    !errorsObject
        ? secondPostForgetPasswordValidationPhase(req, res, next)
        : res.status(400).json(giveErrorsArray(errorsObject));
};

const firstPostResetPasswordValidationPhase = (req) =>
    getValidationErrors(
        { ...req.body, ...req.params },
        {
            token: { presence: true },
            newPassword: { presence: true },
            confirmNewPassword: {
                presence: true,
                equality: {
                    attribute: "newPassword",
                    message: "is not the same as password",
                },
            },
        }
    );

const secondPostResetPasswordValidationPhase = async (req, res, next) => {
    const { token } = req.params;
    const user = await User.findOne({ where: { resetPasswordToken: token, isActive: true } });

    user ? next() : res.status(400).json({ message: "wrong token" });
};

const postResetPasswordValidation = (req, res, next) => {
    const errorsObject = firstPostResetPasswordValidationPhase(req);

    !errorsObject
        ? secondPostResetPasswordValidationPhase(req, res, next)
        : res.status(400).json(giveErrorsArray(errorsObject));
};

export {
    postRegisterValidation,
    postLoginValidation,
    postVerificationCodeValidation,
    postSendLoginCodeValidation,
    postLoginByCodeValidation,
    postForgetPasswordValidation,
    postResetPasswordValidation,
};
