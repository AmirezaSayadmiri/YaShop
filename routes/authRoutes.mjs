import * as authController from "../controllers/authController.mjs";

import express from "express";
import {
    postForgetPasswordValidation,
    postLoginByCodeValidation,
    postLoginValidation,
    postRegisterValidation,
    postResetPasswordValidation,
    postSendLoginCodeValidation,
    postVerificationCodeValidation,
} from "../validations/authValidations.mjs";

const authRouter = express.Router();

authRouter.post("/register", postRegisterValidation, authController.postRegister);
authRouter.post("/verification", postVerificationCodeValidation, authController.postVerificationCode);

authRouter.post("/login", postLoginValidation, authController.postLogin);
authRouter.post("/send-login-code", postSendLoginCodeValidation, authController.postSendLoginCode);
authRouter.post("/login-by-code", postLoginByCodeValidation, authController.postLoginByCode);

authRouter.post("/forget-password", postForgetPasswordValidation, authController.postForgetPassword);
authRouter.post("/reset-password/:token", postResetPasswordValidation, authController.postResetPassword);

export default authRouter;
