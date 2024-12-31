import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

// Signup Controller
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: 'User already exists' });

        //         // Hash the password
        //         const hashedPassword = await bcrypt.hash(password, 10);
        //         const newUser = new UserModel({ name, email, password: hashedPassword });

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Login Controller
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(403).json({ message: 'Invalid credentials' });

        // create JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
        //         // Set token in HttpOnly cookie
        //         res.cookie('token', token, {
        //             httpOnly: true,
        //             secure: process.env.NODE_ENV === 'production', // Set secure for production
        //             sameSite: 'strict',
        //             maxAge: 24 * 60 * 60 * 1000 // 1 day
        //         });

        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Logout Controller
export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};
