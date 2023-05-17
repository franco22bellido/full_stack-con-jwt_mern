import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'mern_database',
    MONGO_USER: process.env.MONGO_USER ||'ADMIN',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || "ADMIN",
    MONGO_HOST: process.env.MOGNO_HOST || '127.0.0.1:27017',
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    SECRET_JWT: process.env.SECRET_JWY || 'mipalabrasecreta'
}