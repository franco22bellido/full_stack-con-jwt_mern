import {Schema, model} from 'mongoose'

const VideoSchema = new Schema({
    title : {
        type: String,
        requied: true,
        trim: true
    },
    description:{
        type: String
    },
    url: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
});

export default model('video', VideoSchema);