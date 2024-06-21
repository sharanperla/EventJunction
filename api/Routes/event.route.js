import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { bookEvent, createEvent, getAllEvents, getParticipants, getUserEvents, updateLike } from "../Controller/event.controller.js";

const eventRouter=express.Router();

eventRouter.post('/create',createEvent);
eventRouter.get('/getEvents',getAllEvents);
eventRouter.post('/like/:id',updateLike);
eventRouter.post('/register',bookEvent);
eventRouter.get('/participants',getParticipants);
eventRouter.get('/getUserEvents',getUserEvents);

export default eventRouter;