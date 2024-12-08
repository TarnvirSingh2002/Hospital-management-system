import mongoose from "mongoose";
const {Schema} =mongoose; //In this we get the schema from the mongoose

import validator from "validator";

const messageSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name Contain At Least 3 Characters!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last Name Contain At Least 3 Characters!"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail, "Please Provide A Valid Email!"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10, "Phone Number Must Contain Exact 10 Digits!"],
        maxLength:[10, "Phone Number Must Contain Exact 10 Digits!"]
    },
    message:{
        type:String,
        required:true
    },
})
export const Message = mongoose.model("Message", messageSchema);