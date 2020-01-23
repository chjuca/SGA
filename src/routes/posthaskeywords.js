import {Router} from 'express';
import {getPostsbyKeyword, getKeywordsbyPost, createAssociations, updateAssociations, deleteAssociations} from '../controllers/PostHasKeywords.controller';

const router = Router();

router.post('/', createAssociations);
router.get('/keyword/:keywordid', getPostsbyKeyword);
router.get('/post/:postid', getKeywordsbyPost);
router.delete('/:id', deleteAssociations);
router.put('/:id', updateAssociations);


export default router;