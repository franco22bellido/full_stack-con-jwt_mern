import express from 'express' 
import config from './config';
import VideoRoutes from './routes/video.routes';
import morgan from 'morgan';
import cors from 'cors';
const app = express();

app.set('SERVER_PORT', config.SERVER_PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api',VideoRoutes);

export default app;