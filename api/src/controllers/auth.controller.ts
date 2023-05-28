import bcrypt from 'bcrypt';
import UserSchema from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import { Request, Response, NextFunction } from 'express';
import {IUserPayload} from '../utils/middleware.jwt';


export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        //1: find username:
        const userFound = await UserSchema.findOne({ username });
        if (userFound) throw 'user found. D=';

        //2: hashing password...
        const passwordHashed = await bcrypt.hash(password, 10);

        //3: save user
        const user = new UserSchema({ username, password: passwordHashed })
        const userSaved = await user.save();
        //4: generate token:
        const payload = { userId: user._id, username: user.username }
        const token = jwt.sign(payload, config.SECRET_JWT,
            { expiresIn: "1h" });
        res.json({
            message: "usuario registrado con éxito",
            user: user.username,
            token: token
        });
    } catch (error) {
        res.status(400).json(error);
    }

}

export const login = async (req: Request, res: Response) => {
    try {
        //1 find user
        const { username, password } = req.body;
        const userFound = await UserSchema.findOne({ username });
        if (!userFound) throw "user not found";
        //2 compare password
        const isPasswordTrue = await bcrypt.compare(password, userFound.password);
        if (!isPasswordTrue) throw "password no valid";
        
        //3 generate token:
        const payload = { userId: userFound._id, username: userFound.username };
        const token = jwt.sign(payload, config.SECRET_JWT, { expiresIn: "2h" });

        //4 response
        // res.header("auth-token", token).json({
        // });

        const data = jwt.verify(token , config.SECRET_JWT);
        res.json({
            message: "bienvenido:",
            user : data,
            auth : token
        });
        
    } catch (error) {
        res.status(500).json(error);
    }
}
export const refreshToken = async (req: Request, res: Response)=> { 
    const token: string = req.header('token') as string;
    try {
        const payload: IUserPayload = jwt.verify(token, config.SECRET_JWT) as IUserPayload;
        
        // si el token expiro en al menos dos minutos devolver uno nuevo.
        //revisar que devuelve el jwt.decode.
        //si el token no esta expirado y no esta por expirar, devolver el mismo token.

        const newToken = jwt.sign({
            userId :payload.userId,
            username : payload.username
        },config.SECRET_JWT, {expiresIn: "2h"});

        return res.status(200).json({
            auth : newToken,
            user : {
                userId: payload.userId,
                username: payload.username
            }
        });
    } catch (error) {
        res.status(401).json("access denied");
    }
}



//en el front hay que pegarle al refresh token cuando haya acciones que requieran
//hacer consultas a la api.