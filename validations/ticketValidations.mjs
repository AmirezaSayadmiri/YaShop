import { getValidationErrors, giveErrorsArray } from "../helpers/validationHelpers.mjs";

const postTicketValidation = (req, res, next) => {
    const errorsObject = getValidationErrors(req.body, {
        title: {
            presence: true,
        },
        body: {
            presence: true,
        },
    });

    errorsObject ? res.status(400).json(giveErrorsArray(errorsObject)) : next();
};

const postTicketAnswerValidation = (req, res, next) => {
    const errorsObject = getValidationErrors(req.body, {
        answer: {
            presence: true,
        },
    });

    errorsObject ? res.status(400).json(giveErrorsArray(errorsObject)) : next();
};

export { postTicketAnswerValidation, postTicketValidation };
