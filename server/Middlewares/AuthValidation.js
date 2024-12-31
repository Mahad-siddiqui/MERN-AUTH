import Joi from 'joi';

// Signup validation middleware
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation error', error });
    next();
};

// Login validation middleware
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    });
    const { error } = schema.validate(req.body);
    // if (error) return res.status(400).json({ message: 'Validation error', error });
    next();
};

export { loginValidation, signupValidation };

