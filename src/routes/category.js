import {Router} from 'express';
import {getCategories, createCategory, getCategoriesbyId} from '../controllers/category.controller';


const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategoriesbyId);
router.post('/', createCategory);

export default router;