import * as addressController from "../controllers/addressController.mjs";

import express from "express";
import authOnlyMiddleware from "../middlewares/authOnlyMiddleware.mjs";
import { postUserAddressValidation } from "../validations/addressValidations.mjs";

const addressRouter = express.Router();

addressRouter.get("/addresses", authOnlyMiddleware, addressController.getUserAddresses);
addressRouter.post("/addresses", authOnlyMiddleware, postUserAddressValidation, addressController.postUserAddress);
addressRouter.delete("/addresses/:id", authOnlyMiddleware, addressController.deleteUserAddress);

export default addressRouter;
