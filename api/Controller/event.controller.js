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
      console.log("interests",req.query.genre.split(","))
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
    console.log(error);
    next(error);
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
    
    const { _id, userId,avatar } = req.body;
    const eventId=_id;
    const userRef=userId;
    const bookingData = { eventId, userRef ,avatar };

    const events = await Bookings.create(bookingData);
    return res.status(201).json(events);
  } catch (error) {
    next(error);
  }

}
export const getParticipants = async (req, res, next) => {
  if (req.query.id) {
      try {
          const eventsid = req.query.id;
          const userId=req.query.userid;
          // Find bookings with the specified eventId
          const bookings = await Bookings.find({eventId:eventsid}).limit(4).sort();
  

          if (!bookings || bookings.length === 0) {
              return res.status(404).json({ message: "No participants found for this event" });
          }
           console.log(bookings)
          const participants = bookings.map(booking => ({
              userId: booking.userRef,
              avatar:booking.avatar,
              register: booking.userRef.toString() === userId  ? true : false
              // Add any other user details you need from the booking
              // For example: userName: booking.userName, userEmail: booking.userEmail, etc.
          }));
          console.log(participants)
          res.status(200).json({
              status: 'success',
              data: participants
          });
      } catch (error) {
          next(error);
      }
  } else {
      res.status(400).json({ message: "Event ID is required" });
  }
};

export const getUserEvents = async (req, res, next) => {
  if (req.query.id) {
    try {
      const userId = req.query.id;
      const limit = parseInt(req.query.limit) || 10; 
      const skip= parseInt(req.query.skip) || 0; 

      // Find bookings with the specified userId
      const bookings = await Bookings.find({ userRef: userId });

      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: "No events found for this user" });
      }

      // Extract event IDs from the bookings
      const eventIds = bookings.map(booking => booking.eventId);

      // Find event details using the event IDs
      const events = await Event.find({ _id: { $in: eventIds } }).skip(skip).sort({eDate:1}).limit(limit);
      console.log(events)
      // Prepare the response data
      const responseData = events.map(event => ({
        eventId: event._id,
        eventName: event.eventName,
        eventDesc: event.eventDesc,
        place:event.place,
        EventImage:event.EventImage,
        eventAmount:event.eventAmount,
        likedBy: event.likedBy,
        eventGenere:event.eventGenere,
        eDate:event.eDate,

        

        // Add any other event details you need from the event
      }));

      res.status(200).json({
        status: 'success',
        data: responseData
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json({ message: "User ID is required" });
  }
};