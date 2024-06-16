import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs"; 
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken'


export const signup= async(req,res,next)=>{
    const {username,email,password}=req.body;  

    console.log('psd'+password)
    console.log('name'+password)
    console.log('email'+password)
    const hashPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashPassword}); 
    try {
        
        await newUser.save()
        res.status(201).json('created successfully');  
    } catch (error) {
       next(error)
    }
}
export const signin= async(req,res,next)=>{
    const {email,password}=req.body;  
    try {
        const validUser=await User.findOne({email});
        if(!validUser) return next(errorHandler(400,'user not found'));

       const validPassword=bcryptjs.compareSync(password,validUser.password);
       if(!validPassword) return next(errorHandler(400,'Wrong credentials!'))
         //crreating a token
       const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
       const {password:pass,...rest}=validUser._doc
     
       res.cookie('access_token',token,{httpOnly:true}).status(200).json({ token, user: rest });
    } catch (error) {
       next(error)
    }
}
export const addInterests= async(req,res,next)=>{
    const { userId, selectedInterests } = req.body;  // Extract userId and interests from request body

let interests=selectedInterests
let _id=userId;
    if (!Array.isArray(selectedInterests)) {
        return res.status(400).json({ error: 'Interests must be an array of strings' });
    }

    try {
        // Find the user by ID and update interests
        const user = await User.findByIdAndUpdate(
            _id,
            { interests },
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Interests updated successfully', user });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}