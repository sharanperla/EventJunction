import express from 'express'
import {signup } from '../Controller/auth.controller.js';

const authRouter= express.Router();

authRouter.post("/signup",signup)

export default authRouter;