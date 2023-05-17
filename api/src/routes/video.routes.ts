import {Router} from 'express';
import * as videoController from '../controllers/video.controller';
import {verifyToken} from '../utils/middleware.jwt';
const router= Router();

router.get('/videos',verifyToken, videoController.getVideos);
router.get('/video/:id',verifyToken, videoController.getVideo);
router.post('/video',verifyToken, videoController.createVideo);
router.delete('/video/:id',verifyToken, videoController.deleteVideo);
router.put('/video/:id',verifyToken, videoController.updateVideo);

export default router;