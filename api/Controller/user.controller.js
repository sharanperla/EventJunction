import User from "../Models/user.model.js"
import Event from "../Models/event.model.js"
import { errorHandler } from "../utils/errorHandler.js"
import bcryptjs from 'bcryptjs';
import Bookings from "../Models/bookings.model.js";



export const updateUser =async (req,res,next)=>{
    try {
        // if(req.user.id !== req.params.id) return next(errorHandler(401,"you can only update your own account"))
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10)
        }
        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,  
            }     
        },{new:true})

        const {password,...rest}=updateUser._doc 

        res.status(200).json(rest);
        
    } catch (error) {
        next(error)
    }
}

export const getUserEvents = async (req,res,next)=>{
  

    if(req.params.id)
    {
        try {
            
            const listings =await Event.find({userRef:req.params.id})
            res.status(200).json(listings)

        } catch (error) {
            next(error)
        }

    }else{
        return next(errorHandler(401,'you can only update your lsiting'))
    }

}

export const getUseraData = async (req,res,next)=>{
  

    if(req.params.id)
    {
        try {
            
            const userData =await User.find({_id:req.params.id})
            res.status(200).json(userData)
         
        } catch (error) {
            next(error)
        }

    }else{
        return next(errorHandler(401,'you can only update see your details'))
    }

}
