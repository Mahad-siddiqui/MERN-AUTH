// import mongoose from 'mongoose';

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.error('Database connection failed:', err.message);
//         process.exit(1);
//     }
// };

// export default connectDB;
import mongoose from 'mongoose';

const connectDB = async () => {

    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB connected :-)'))
        .catch((err) => console.error('MongoDB connection error:', err));
}
export default connectDB;