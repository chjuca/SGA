import {Router} from 'express';
import {createPost, getPosts, updatePost, deletePost, getPostsbyKeyword,getPostbyID,countPost} from '../controllers/post.controller';
import {checkToken,checkRole} from '../middleware/authentication';

const router = Router();

router.post('/', [checkToken, checkRole], createPost);
router.get('/',[checkToken, checkRole], getPosts);
router.get('/keyword/:keywordid', getPostsbyKeyword);
router.get('/:id', getPostbyID);
router.get('/count', countPost);
router.put('/:id', [checkToken, checkRole],updatePost);
router.delete('/:id',[checkToken, checkRole], deletePost);


export default router;