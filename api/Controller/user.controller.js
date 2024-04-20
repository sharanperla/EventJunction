import User from "../Models/user.model.js"
import { errorHandler } from "../utils/errorHandler.js"
import bcryptjs from 'bcryptjs';



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