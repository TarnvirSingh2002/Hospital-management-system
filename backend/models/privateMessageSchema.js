import mongoose from "mongoose";
const { Schema } = mongoose;

const user = new Schema({
    link:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true
    },
});
export const privatemessage = mongoose.model("privatemessage", user);