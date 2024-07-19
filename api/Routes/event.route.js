import express from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { bookEvent, createEvent, deleteEvent, getAllEvents, getParticipants, getUserEvents, unRegisterEvent, updateEvent, updateLike } from "../Controller/event.controller.js";

const eventRouter=express.Router();

eventRouter.post('/create',createEvent);
eventRouter.get('/getEvents',getAllEvents);
eventRouter.post('/like/:id',updateLike);
eventRouter.post('/register',bookEvent);
eventRouter.get('/participants',getParticipants);
eventRouter.get('/getUserEvents',getUserEvents);
eventRouter.post('/updateEvent/:id',updateEvent);
eventRouter.delete('/unregister',unRegisterEvent);
eventRouter.delete('/deleteevent',deleteEvent);

export default eventRouter;