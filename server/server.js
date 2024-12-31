import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './Routes/AuthRouter.js';
import dashboardRoutes from './Routes/DashboardRouter.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',  // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  // Allow cookies to be sent
}));

// Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
