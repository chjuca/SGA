import {Router} from 'express';
import {getCategories, createCategory, getRoles, getKeywords} from '../controllers/category.controller';


const router = Router();

router.get('/', getCategories);
router.get('/roles', getRoles );
router.get('/keywords', getKeywords);
router.post('/', createCategory);

export default router;