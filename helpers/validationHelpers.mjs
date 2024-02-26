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



export { giveErrorsArray };
