
import { login, logout, signup } from '../Controllers/AuthController.js';
import { loginValidation, signupValidation } from '../Middlewares/AuthValidation.js';


import express from 'express';

const router = express.Router();

// Signup route
router.post('/signup', signupValidation, signup);

// Login route
router.post('/login', loginValidation, login);

// Logout route
router.post('/logout', logout);


export default router;
