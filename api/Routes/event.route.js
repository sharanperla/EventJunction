import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { createEvent, getAllEvents, updateLike } from "../Controller/event.controller.js";

const eventRouter=express.Router();

eventRouter.post('/create',createEvent);
eventRouter.get('/getEvents',getAllEvents);
eventRouter.post('/like/:id',updateLike);

export default eventRouter;