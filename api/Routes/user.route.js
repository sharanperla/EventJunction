import express from 'express'
import { getUserEvents, updateUser } from '../Controller/user.controller.js';

const  userRouter= express.Router(); 

userRouter.post('/update/:id',updateUser);
userRouter.get('/events/:id',getUserEvents);


export default userRouter;