import { catchAsyncErrors } from "../middlewares/catchAsynErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import  { generatetoken } from "../folderutils/jwttokens.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async(req, res, next)=>{
    const {firstName, lastName, email, phone, password,  gender, dob, nic, role}=req.body;
    if(!firstName|| !lastName|| !email|| !phone|| !password|| !gender|| !dob|| !nic|| !role){
        return next(new ErrorHandler("Please fill full form",400));
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("user already registered",400));
    }
    user=await User.create({firstName, lastName, email, phone, password,  gender, dob, nic, role});
    res.status(200).json({
        success:true,
        message:"user Registered"
    });
});


export const login = catchAsyncErrors(async(req, res, next)=>{
    const {email, password, confirmPassword, role}=req.body;
    if(!email || !password ||!confirmPassword || !role){
        return next(new ErrorHandler("please provide all details!", 400));
    }

    if(password !== confirmPassword){
        return next(new ErrorHandler("Your Password And Confirm Password Is Not Same", 400));
    }

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler("Invalid Password Or Email", 400));
    }

    const isPassword=await user.comparePassword(password);
    if(!isPassword){
        return next(new ErrorHandler("Invalid Password Or Email",400));
    }

    if(role!==user.role){
        return next(new ErrorHandler("User with this role is not found",400));
    }

    generatetoken(user, "User Logged in successfully", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
  
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
    }
  
    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Admin",
    });
    res.status(200).json({
      success: true,
      message: "New Admin Registered",
      admin,
    });
  });


export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
  const doctors= await User.find({role:"Doctor"});
  res.status(200).json({
    success:true,
    doctors
  });
});

export const getUserDetail= catchAsyncErrors(async(req,res,next)=>{
  const user=req.User;
  res.status(200).json({
    success:true,
    user
  });
});

export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{

  res.status(200).cookie("adminToken","",{
    httpOnly:true,
    expires: new Date(Date.now()),
  }).json({
    location:true,
    message:"User Log out successfully"
  })
})

export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{

  res.status(200).cookie("patientToken","",{
    httpOnly:true,
    expires: new Date(Date.now()),
  }).json({
    location:true,
    message:"User Log out successfully"
  });
});

export const addNewDoctor = catchAsyncErrors(async(req,res,next)=>{
  if(!req.files || Object.keys(req.files).length === 0){
    return next(new ErrorHandler('Doctor Avatar Required', 400));
  }
  const {docAvatar}= req.files;
  // const allowedFormat = ['image/png', 'image/jpg'];
  // if(!allowedFormat.includes(docAvatar.minetype)){
  //   return next( new ErrorHandler('File Format not supported', 400));
  // }

  const {firstName, lastName, email, phone, password,  gender, dob, nic, doctorDepartment, }=req.body;
  if(!firstName|| !lastName|| !email|| !phone|| !password|| !gender|| !dob|| !nic|| !doctorDepartment){
    return next(new ErrorHandler('Please Provide Full details',400));
  }
  const isRegistered = await User.findOne({email});
  if(isRegistered){
    return next(new ErrorHandler(`${isRegistered.role} already registered on this email`,400));
  };

  const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempthfilePath);
  if(!cloudinaryResponse || cloudinaryResponse.error){
    console.error("Cloudinary error",cloudinaryResponse.error || "Unknown Cloudinary Error");
  }

  const doctor = await User.create({
    firstName, lastName, email, phone, password,  gender, dob, nic, doctorDepartment,role:"Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,}
  });
  res.status(200).json({
    success:true,
    message:"New doctor registered",
    doctor
  })
});