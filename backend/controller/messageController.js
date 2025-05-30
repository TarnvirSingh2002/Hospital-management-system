import { Message } from "../models/messageSchema.js";

import { catchAsyncErrors } from "../middlewares/catchAsynErrors.js";

import  ErrorHandler  from "../middlewares/errorMiddleware.js";

import { privatemessage } from "../models/privateMessageSchema.js";//new wala

import { io } from "../index.js";

export const sendMessage = catchAsyncErrors(async(req, res, next)=>{

    const {firstName, lastName, email, phone, message}=req.body;

    if(!firstName || !lastName || !email || !phone || !message){
    return next (new ErrorHandler("Please Fill Full Form!", 400));
    }

    await Message.create({firstName, lastName, email, phone, message});
    res.status(200).json({
        success:true,
        msg:"Message Send Successfully!"
    });
})

export const getAllMessages = catchAsyncErrors(async(req,res,next)=>{
    const message = await Message.find();
    res.status(200).json({
      success:true,
      message
    });
  });

  export const featurenew =catchAsyncErrors(async(req,res)=>{
    try {
        const {message, link} = req.body;
        if(!message){
            return res.status(400).send("send something");
        }
        const newMessage=await privatemessage.create({link,message});
        console.log(newMessage);
        // io.emit('newMessage', newMessage);
        res.status(200).send({message:"success",link});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while processing your request.");
    }});

export const allpvtmessages=catchAsyncErrors(async(req,res)=>{
    try {     
        const a= await privatemessage.find();
        res.send(a);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while processing your request.");
    }
});