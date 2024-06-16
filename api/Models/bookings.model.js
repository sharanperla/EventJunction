import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
    eventId:{
        type: String,
        required:true,
    },
    userRef:{
        type: String,
        required:true,
    },
    
},{timestamps:true});
 
const Bookings= mongoose.model('Bookings',bookingSchema);

export default Bookings; 