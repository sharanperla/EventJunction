import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { createEvent } from "../Controller/event.controller.js";

const eventRouter=express.Router();

eventRouter.post('/create',createEvent);

export default eventRouter;