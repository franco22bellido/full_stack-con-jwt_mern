import { Request, Response } from 'express'
import VideoSchema from './Video';


export const getVideos = async (req: Request, res: Response)=>{  
   try {
    const videos = await VideoSchema.find();
    return res.json(videos);
   } catch (error) {
    res.json(error);
   }
}
export const getVideo = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const videoFound = await VideoSchema.findById(id);
    if(!videoFound) return res.status(204).json({message: "not found"})
    return res.json(videoFound);
}
export const createVideo = async (req: Request, res: Response)=>{
    const {title, description, url} = req.body;

    const videoFound = await VideoSchema.findOne({url});
    if(videoFound) {
        return res.status(301).json({
            message: "the url already exist"
        });
    }
    const video = new VideoSchema({title, description, url});
    const videoSaved = await video.save();
    return res.json(videoSaved);
}
export const updateVideo = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const videoEdited = await VideoSchema.findByIdAndUpdate(id, req.body);
    return res.json(videoEdited);
    
}
export const deleteVideo = async (req: Request, res: Response)=>{
    const {id}  = req.params;
    const videoFound = await VideoSchema.findByIdAndDelete(id);
    if(!videoFound) {
        return res.status(204).json({message: "not found"});
    }
    return res.json(videoFound);
}