import mongoose from "mongoose"
const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    "rollNo": {
        type: String,
        required: true,
    },
    "accessCode":{
        type: String,
        required: true
    },
    "mobileNo": {
        type:String,
        required:true
    },
    "githubUsername":{
        type:String,
        required:true
    }
},{timestamps:true})
export default mongoose.model("User", userModel)