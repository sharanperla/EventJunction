import Event from "../Models/event.model.js";
import { errorHandler } from "../utils/errorHandler.js";


export const createEvent= async (req,res,next)=>{
    try {
        const events=await Event.create(req.body);
        return res.status(201).json(events)
    } catch (error) {
        next(error);
    }

}