import { catchAsyncErrors } from "./catchAsynErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAdminAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin not authenticated!",400));
    }
    const decorted=jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decorted.id);
    if(req.user.role !=="Admin"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`,403));
    }
    next();
})


export const isPatientAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("patient not authenticated!",400));
    }
    const decorted=jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decorted.id);
    if(req.user.role !=="Patient"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`,403));
    }
    next();
})