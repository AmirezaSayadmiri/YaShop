import validate from "validate.js";
import { getValidationErrors, giveErrorsArray } from "../helpers/validationHelpers.mjs";

validate.validators.presence.message = "is required";

const postUserProfileDataValidation = (req, res, next) => {
    const errorsObject = getValidationErrors(req.body, {
        bio: {
            presence: true,
        },
        gender: {
            presence: true,
            inclusion: {
                within: ["male", "female"],
                message: " should be male or female",
            },
        },
        age: {
            presence: true,
            numericality: true,
        },
        country: {
            presence: true,
        },
    });

    errorsObject ? res.status(400).json(giveErrorsArray(errorsObject)) : next();
};

export { postUserProfileDataValidation };
