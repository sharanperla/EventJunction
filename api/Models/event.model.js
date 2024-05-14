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
    eventLocation:{
        latitude:Number,
        longitude:Number,
      
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
},{timestamps:true});
 
const Event= mongoose.model('Event',eventSchema);

export default Event; 