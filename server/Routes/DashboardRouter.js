import express from 'express';
import { getUserDetails } from '../Controllers/DashboardController.js';
import { authenticateToken } from '../Middlewares/AuthMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getUserDetails);

export default router;
