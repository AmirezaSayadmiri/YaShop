import { getValidationErrors, giveErrorsArray } from "../helpers/validationHelpers.mjs";

const postUserAddressValidation = (req, res, next) => {
    const errorsObject = getValidationErrors(req.body, {
        latitude: {
            presence: true,
            numericality: true,
        },
        longitude: {
            presence: true,
            numericality: true,
        },
        description: {
            presence: true,
        },
    });

    errorsObject ? res.status(400).json(giveErrorsArray(errorsObject)) : next();
};

export { postUserAddressValidation };
