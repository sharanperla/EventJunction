import express from 'express'
import { updateUser } from '../Controller/user.controller';

const  userRouter= express.Router(); 

userRouter.post('/update/:id',updateUser);

export default userRouter;