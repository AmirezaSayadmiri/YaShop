import * as authController from "../controllers/authController.mjs";

import express from "express";
import { postLoginValidation, postRegisterValidation } from "../validations/authValidations.mjs";

const authRouter = express.Router();

authRouter.post("/register", postRegisterValidation, authController.postRegister);
authRouter.post("/login", postLoginValidation, authController.postLogin);

export default authRouter;
