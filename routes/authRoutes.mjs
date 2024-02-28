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
import guestOnlyMiddleware from "../middlewares/guestOnlyMiddleware.mjs";

const authRouter = express.Router();

authRouter.post("/register", guestOnlyMiddleware, postRegisterValidation, authController.postRegister);
authRouter.post(
    "/verification",
    guestOnlyMiddleware,
    postVerificationCodeValidation,
    authController.postVerificationCode
);

authRouter.post("/login", guestOnlyMiddleware, postLoginValidation, authController.postLogin);
authRouter.post("/send-login-code", guestOnlyMiddleware, postSendLoginCodeValidation, authController.postSendLoginCode);
authRouter.post("/login-by-code", guestOnlyMiddleware, postLoginByCodeValidation, authController.postLoginByCode);

authRouter.post("/forget-password", postForgetPasswordValidation, authController.postForgetPassword);
authRouter.post("/reset-password/:token", postResetPasswordValidation, authController.postResetPassword);

export default authRouter;
