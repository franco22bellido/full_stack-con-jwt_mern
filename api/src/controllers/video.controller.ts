import { Request, Response } from 'express'
import VideoSchema, { Video } from '../models/Video';


export const getVideos = async (req: Request, res: Response) => {
    try {
        const userId: string = req.userId;
        const videos = await VideoSchema.find({ userId });
        return res.json(videos);
    } catch (error) {
        res.json(error);
    }
}
export const getVideo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const videoFound: Video = await VideoSchema.findById(id) as Video;
        
        if (!videoFound ||videoFound.userId != userId) {
            return res.status(203).json({ message: "not found video in your videos list" })
        }
        return res.status(200).json(videoFound);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
export const createVideo = async (req: Request, res: Response) => {
    try {
        const { title, description, url } = req.body;
        const userId:string = req.userId;
        const videoFound = await VideoSchema.findOne({ url, userId });
        if (videoFound) {
            return res.status(301).json({
                message: "the url already exist in your video list"
            });
        }
        const video = new VideoSchema({ title, description, url, userId });
        
        const videoSaved = await video.save();
        return res.json(videoSaved);
    } catch (error) {
     
        res.status(500).json(error);
    }
}
export const updateVideo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
    const userId:string = req.userId;
 
    const videoFound: Video = await VideoSchema.findById(id) as Video;

    if (!videoFound || videoFound.userId != userId) return res.status(203).json({ message: "not found video in your video list" })
    const videoEdited = await VideoSchema.findByIdAndUpdate(id, req.body);
    return res.json(videoEdited);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }

}
export const deleteVideo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
    const userId = req.userId;
    const videoFound = await VideoSchema.findOneAndDelete({_id: id, userId});
    if (!videoFound) {
        return res.status(203).json({ message: "not found video in your video list" });
    }
    return res.json({
        message: "video deleted sussefull",
        videoDeleted : videoFound
        });
    } catch (error) {
        res.status(500).json(error);
    }
}