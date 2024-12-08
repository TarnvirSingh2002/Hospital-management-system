import express from "express" // this is used to create routers, middleware

import cookieParser from "cookie-parser";// it is used to get cookie(it is a small data) from frontend 

import fileUpload from "express-fileupload";//it is used to upload file to cloud

import env from "dotenv";// to hide the data 
env.config();

import cors from "cors"// this is used to make connection 

import dbconnection from "./db.js"// in this we call db

import cloudinary from "cloudinary" // it is used to upload photoes on the cloud

import messagerouter from "./router/messagerouter.js";

import userrouter from "./router/userRouter.js"

import { errorhandler } from "./middlewares/errorMiddleware.js";

import appointmentRouter from "./router/appointmentRouter.js"

const app = express();

app.use(cors({
    origin:[process.env.FRONTEND_URL, process.env.DASHBOARD_URL],//only these origins are valid
    methods:["GET", "POST", "PUT", "DELETE"],//the methods that we will use
    credentials:true,
}));

app.use(cookieParser());
app.use(express.json());// Middleware, used to parse data that is in the form of json to string  
app.use(express.urlencoded({extended:true}))

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

app.use("/api/v1/message", messagerouter);
app.use("/api/v1/message", userrouter);
app.use("/api/v1/appointment", appointmentRouter);

cloudinary.v2.config({
    cloud_name:process.env.CLOUDANARY_CLOUD_NAME,
    api_key:process.env.CLOUDANARY_API_KEY,
    api_secret:process.env.CLOUDANARY_API_SECRET
});

dbconnection();

app.listen (process.env.PORT, ()=>{
    console.log(`Server listening at the port ${process.env.PORT}`);
})

app.use(errorhandler);