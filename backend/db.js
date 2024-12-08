import mongoose from'mongoose'// It is used to make connection with database

const dbconnection = async() => {

    await mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('DB connected successfully'))
        .catch((err) => {
            console.log('DB connection failed')
            console.log(err);
        })
};

export default dbconnection;