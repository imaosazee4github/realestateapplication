import express from 'express';  
import mongoose from 'mongoose';
import userRouter from "./route/user_route.js";
import authRouter from "./route/auth-route.js";
import dotenv from 'dotenv';
dotenv.config()


const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


app.listen(4000, () => {
    console.log('listening on port 4000');
    }
);

