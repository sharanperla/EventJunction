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
export const deleteEvent = async (req, res, next) => {
  try {
    const {userId,eventId} = req.query;
    if (!userId || !eventId) {
      return res.status(400).json({ success: false, message: 'User ID and Event ID are required' });
    }
    const result = await Event.deleteOne({ userRef: userId, _id: eventId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'No events found' });
    }
    return res.status(200).json({ success: true, message: 'Event successfully deleted' });
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
    const userRef = req.query.userRef || "";
    const maxDistance=req.query.maxDistance;
    
    let filter = {};

    if (req.query.latitude && req.query.longitude) {
      const latitude = parseFloat(req.query.latitude);
      const longitude = parseFloat(req.query.longitude);
      const maxDistance = 20 * 1000; // 20 kilometers in meters

      filter.eventLocation= {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], maxDistance / 6371000] // Convert meters to radians
          }
        }
      
    }

    if (searchTerm) {
      filter.eventName = { $regex: searchTerm, $options: "i" }; // Case-insensitive by default
    }

    if (req.query.genre) {
      const genres = req.query.genre.split(",");
      filter.eventGenere = { $in: genres };
    }
    const today = new Date();

    filter.eDate = { $gte: today };

    if (req.query.eventAmount) {
      const specifiedAmount = parseInt(req.query.eventAmount);
      filter.eventAmount = { $lt: specifiedAmount };
    }

    if (userRef) {
      filter.userRef = { $ne: userRef };
    }

    const events = await Event.find(filter)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
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
    console.log('id,uid,avatar',_id,userId,avatar)
    const eventId=_id;
    const userRef=userId;
    const bookingData = { eventId, userRef ,avatar };

    const events = await Bookings.create(bookingData);
    return res.status(201).json(events);
  } catch (error) {
    next(error);
  }

}
export const unRegisterEvent=async(req,res,next)=>{
  try {
    const {userId,eventId} = req.query;
    if (!userId || !eventId) {
      return res.status(400).json({ success: false, message: 'User ID and Event ID are required' });
    }
    const result = await Bookings.deleteOne({ userRef: userId, eventId: eventId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'No booking found for the provided user ID and event ID' });
    }
    return res.status(200).json({ success: true, message: 'Booking successfully deleted' });
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
      // 66992529a212f272f5ebecce 666ef1f7b7113418cb8dcda8
      const userId = req.query.id;
      const limit = parseInt(req.query.limit) || 10; 
      const skip= parseInt(req.query.skip) || 0; 
      const thisweek=req.query.thisweek?!!req.query.thisweek:false;
      console.log(thisweek);
      
      // Find bookings with the specified userId
      const bookings = await Bookings.find({ userRef: userId });
     

      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: "No events found for this user" });
      }

      // Extract event IDs from the bookings
      const eventIds = bookings.map(booking => booking.eventId);
      let query={
        _id: { $in: eventIds }
      }
      const today = new Date();
      console.log('start',today);
      // const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
      const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);
      console.log('end',endOfWeek);
      
      if (thisweek) {
        query.eDate = { $gte: today, $lte: endOfWeek };
      } else {
        query.eDate = { $gte: today };
      }
      // Find event details using the event IDs
      const events = await Event.find(query).skip(skip).sort({eDate:1}).limit(limit);
      console.log(events)
      // Prepare the response data
      const responseData = events.map(event => ({
        _id: event._id,
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

export const updateEvent = async (req, res, next) => {
  console.log("Update event endpoint hit");  // Confirm the endpoint is hit
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          eDate: req.body.eDate,
          eventAmount: req.body.eventAmount,
          eventDesc: req.body.eventDesc,
          eventGenere: req.body.eventGenere,
          eventName: req.body.eventName,
          place: req.body.place,
          eventLocation: req.body.eventLocation,
          EventImage: req.body.EventImage,
        },
      },
      { new: true }
    );

    if (!updatedEvent) {
      console.log("Event not found");
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const rest = updatedEvent._doc;
    console.log("Updated event:", rest);  // Log the updated event
    res.status(200).json({ success: true, data: rest });
  } catch (error) {
    console.log("Error updating event:", error);
    next(error);
  }
};
