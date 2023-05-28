import jwt from 'jsonwebtoken';
import  {Request, Response, NextFunction} from 'express';
import config from '../config';

export interface IUserPayload{
    userId: string,
    username : string,
    iat: number,
    exp: number 
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.header('token') as string;
        const verified:IUserPayload = jwt.verify(token, config.SECRET_JWT) as IUserPayload;
        
        req.userId = verified.userId;
        return next();
    } catch (error) {
        res.json(error);
    }
}