import User from '../Models/User.js';

export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
