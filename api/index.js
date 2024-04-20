import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './Routes/auth.route.js';
import cors from 'cors'
import userRouter from './Routes/user.route.js';




dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err);
});


const app=express();
app.use(express.json())
app.use(cors());


app.listen(3000,()=>{
    console.log("server Started!");
})
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })

})