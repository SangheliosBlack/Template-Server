function validateData(schema) {
    return function(req, res, next) {
        if (schema) {
            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            req.validatedData = value;
        }
        next();
    };
}

module.exports =  validateData;