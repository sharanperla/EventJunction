import mongoose from "mongoose";

const eventSchema=new mongoose.Schema({
    eventName:{
        type: String,
        required:true,
    },
    eventDesc:{
        type: String,
        required:true,
    },
    eDate:{
        type: Date,
        required:true,
    },
    eDate:{
        type: Date,
        required:true,
    },
    // eventLocation:{
    //     latitude:Number,
    //     longitude:Number,
    // },
    eventLocation: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], index: "2dsphere" }
      },
    place:{
        type:String,
       
    },
    eventGenere:{
        type:String,
        required:true,
    },
    eventAmount:{
        type:Number,
        required:true,
    },
    userRef:{
        type:String,
        required:true,
    },
    EventImage:{
        type:String,
    },
    Likes:{
        type:Number,
        default:0,
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds for users who liked
        default: [], // Initialize likedBy as an empty array
      },
},{timestamps:true});

const Event= mongoose.model('Event',eventSchema);

export default Event; 