import {Router} from 'express';
import * as videoController from './video.controller';
const router= Router();

router.get('/videos', videoController.getVideos);
router.get('/video/:id', videoController.getVideo);
router.post('/video', videoController.createVideo);
router.delete('/video/:id', videoController.deleteVideo);
router.put('/video/:id', videoController.updateVideo);

export default router;