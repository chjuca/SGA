import {Router} from 'express';
import {getPostsbyKeyword, getKeywordsbyPost, createAssociations, updateAssociations, deleteAssociations} from '../controllers/PostHasKeywords.controller';

const router = Router();

router.post('/', createAssociations);
router.get('/post/:keywordid', getPostsbyKeyword);
router.get('/keyword/:postid', getKeywordsbyPost);
router.delete('/:id', deleteAssociations);
router.put('/:id', updateAssociations);


export default router;