import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { createEvent, getAllEvents } from "../Controller/event.controller.js";

const eventRouter=express.Router();

eventRouter.post('/create',createEvent);
eventRouter.get('/getEvents',getAllEvents);

export default eventRouter;