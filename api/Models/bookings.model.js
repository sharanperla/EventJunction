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
    avatar:{
        type: String,
        default:"https://www.istockphoto.com/signature/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration-gm1300845620-393045799",
    }
},{timestamps:true});
 
const Bookings= mongoose.model('Bookings',bookingSchema);

export default Bookings; 