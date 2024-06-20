import express from 'express'
import {  getUserEvents, getUseraData, updateUser } from '../Controller/user.controller.js';


const  userRouter= express.Router(); 

userRouter.post('/update/:id',updateUser);
userRouter.get('/events/:id',getUserEvents);
userRouter.get('/getUserData/:id',getUseraData);




export default userRouter;