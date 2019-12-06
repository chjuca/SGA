import {Router} from 'express';
import {createPost, getPosts, updatePost, deletePost} from '../controllers/post.controller';
import {checkToken,checkRole} from '../middleware/authentication';

const router = Router();

router.post('/', [checkToken, checkRole], createPost);
router.get('/', getPosts);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);


export default router;