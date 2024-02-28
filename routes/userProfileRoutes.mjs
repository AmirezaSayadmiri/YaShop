import * as userProfileController from "../controllers/userProfileController.mjs";

import express from "express";
import authOnlyMiddleware from "../middlewares/authOnlyMiddleware.mjs";
import multer from "multer";
import userProfileImageStorage from "../multer/userProfileImageStorage.mjs";
import { postUserProfileDataValidation } from "../validations/userProfileValidations.mjs";

const userProfileRouter = express.Router();

userProfileRouter.post(
    "/image",
    authOnlyMiddleware,
    multer({ storage: userProfileImageStorage }).single("image"),
    userProfileController.postUserProfileImage
);

userProfileRouter.post(
    "/",
    authOnlyMiddleware,
    postUserProfileDataValidation,
    userProfileController.postUserProfileData
);

export default userProfileRouter;
