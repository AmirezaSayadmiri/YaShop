import validate from "validate.js";

const giveErrorsArray = (validationObject) => {
    const errors = [];

    for (const key in validationObject) {
        errors.push({
            field: key,
            errors: validationObject[key],
        });
    }

    return errors;
};

const getValidationErrors = (data, constraints) => {
    const errorsObject = validate(data, constraints);

    return errorsObject;
};

export { giveErrorsArray, getValidationErrors };
