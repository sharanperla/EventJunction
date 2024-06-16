import express from 'express'
import {addInterests, signin, signup } from '../Controller/auth.controller.js';

const authRouter= express.Router();

authRouter.post("/signup",signup)
authRouter.post("/signin",signin)
authRouter.put('/interests',addInterests);

export default authRouter;