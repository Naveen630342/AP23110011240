import mongoose from "mongoose"

const connectDB = async ()=>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connection successfull")
    }
    catch(err){
        console.log(`MongoDb Error:${err.message}`);
    }
}
export default connectDB;