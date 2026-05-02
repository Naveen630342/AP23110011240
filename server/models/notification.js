import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type:{  
        type: String,
        required: true

    },
    message: {
        type: String,
        required: true
    },
    isread:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Notification', notificationSchema);
