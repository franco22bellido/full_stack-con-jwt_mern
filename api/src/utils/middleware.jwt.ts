import jwt from 'jsonwebtoken';
import  {Request, Response, NextFunction} from 'express';
import config from '../config';

interface IUserPayload{
    userId: string,
    username : string
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.header('auth-token') as string;
        const verified:IUserPayload = jwt.verify(token, config.SECRET_JWT) as IUserPayload;
        
        req.userId = verified.userId;
        return next();
    } catch (error) {
        res.json(error);
    }
}