import mongoose from "mongoose";
import validator from "validator";
const {Schema} =mongoose;
const appointmentSchema = new Schema({
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
    appointmentDate:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    doctor:{
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        }
    },
    hasvisited:{
        type:Boolean,
        default:false,
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending", "Accepted","Rejected"],
        default:"Pending",
    }
});

export const Appointment = mongoose.model("Appointment",appointmentSchema);