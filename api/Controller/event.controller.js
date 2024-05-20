import Event from "../Models/event.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createEvent = async (req, res, next) => {
  try {
    const events = await Event.create(req.body);
    return res.status(201).json(events);
  } catch (error) {
    next(error);
  }
};
export const getAllEvents = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    let filter = { };
    if (searchTerm) {
        filter.eventName = { $regex: searchTerm, $options: "i" }; // Case-insensitive by default
      }
    if (req.query.genre) {
      const genres = req.query.genre.split(","); // Split comma-separated genres
      filter.eventGenere = { $in: genres }; // Filter by events with any of the genres
    }
    if (req.query.eventAmount) {
        const specifiedAmount = parseInt(req.query.eventAmount);
        filter.eventAmount = { $lt: specifiedAmount }; // Filter for events less than specified amount
      }

    const events = await Event.find(filter)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    console.log(events);

    return res.status(200).json(events);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
