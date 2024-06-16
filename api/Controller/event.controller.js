import Bookings from "../Models/bookings.model.js";
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

export const updateLike = async (req, res, next) => {
  try {
    const userId =req.body.userId;
    const eventId = req.params.id;
    console.log(eventId)
 

    // Find the event to check if the user has already liked it
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json("Event not found");
    }

    const hasLiked = event.likedBy.includes(userId);

    let update;
    if (hasLiked) {
      if (event.Likes > 0) {
        update = { $pull: { likedBy: userId }, $inc: { Likes: -1 } }; // Unlike
      } else {
        return res.status(400).json("Cannot unlike. Likes count already zero.");
      }
    } else {
      update = { $addToSet: { likedBy: userId }, $inc: { Likes: 1 } }; // Like
    }
    const updatedEvent = await Event.findByIdAndUpdate(eventId, update, { new: true });

    res.status(200).json(updatedEvent);
  } catch (error) {
    next(error);
  }
};


export const bookEvent=async(req,res,next)=>{
  try {
    const { _id, userId } = req.body;
    const eventId=_id;
    const userRef=userId;
    const bookingData = { eventId, userRef };

    const events = await Bookings.create(bookingData);
    return res.status(201).json(events);
  } catch (error) {
    next(error);
  }

}
