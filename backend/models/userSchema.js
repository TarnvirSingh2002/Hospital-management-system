import mongoose from "mongoose";
const {Schema}=mongoose;
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new Schema({
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
    nic:{
        type:String,
        required:true,
        minLength:[10, "NIC Must Contain Exact 10 Digits!"],
        maxLength:[10, "NIC Must Contain Exact 10 Digits!"]
    },
    dob:{
        type:Date,
        required:[true,"DOB is required"]
    },
    gender:{
        required:true,
        type:String,
        enum:["Male","Female"]
    },
    password:{
        type:String,
        minLength:[8,"password must contains at least 8 digits"],
        required:true,
        select:false //with the help of this user will not get this
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"]
    },
    doctorDepartment:{
        type:String,
    },
    docAvatar:{
        public_id:String,
        url:String
    }

});


userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});


userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    });
}


export const User = mongoose.model("User", userSchema);