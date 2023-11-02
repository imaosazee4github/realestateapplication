import express from 'express';  
import mongoose from 'mongoose';
import userRouter from "./route/user_route.js";
import authRouter from "./route/auth-route.js";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config()


const app = express();

app.use(express.json());

app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));





app.listen(3000, () => {
    console.log('listening on port 3000');
    }
);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({ 
        success: false,
    statusCode,
    message, });
});
