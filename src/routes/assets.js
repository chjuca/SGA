import {Router} from 'express';
import {createAssent, getAssents} from '../controllers/assets.controller';

const router = Router();

router.post('/',createAssent);
router.get('/',getAssents);

export default router;