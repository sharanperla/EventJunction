import express from 'express'
import {signup } from '../Controller/auth.controller.js';

const authRouter= express.Router();

authRouter.post("/signup",signup)
authRouter.post("/signin",signup)

export default authRouter;