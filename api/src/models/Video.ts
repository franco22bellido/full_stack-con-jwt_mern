import {Schema, model} from 'mongoose'

export interface Video{
    title: string;
    description: string;
    url: string;
    userId: string;
    createdAt: number;
    updatedAt: number;
}
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
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default model('video', VideoSchema);