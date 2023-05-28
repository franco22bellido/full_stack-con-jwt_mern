import {Router} from 'express'
import {login, refreshToken, register} from '../controllers/auth.controller'
const router = Router();


router.post('/login', login);
router.post('/register', register);
router.post('/refreshtoken', refreshToken);



export default router;