import {Router} from 'express';
import {createUser, getUsers, getOneUser, deleteUser, updateUser} from '../controllers/user.controller';
import {checkToken,checkRole} from '../middleware/authentication';

const router = Router();

// /api/users/*
router.post('/', createUser);
router.get('/', checkToken , getUsers);
router.get('/:ci', checkToken , getOneUser);
router.delete('/:ci', checkToken , deleteUser);         
router.put('/:ci', [checkToken, checkRole] , updateUser);


export default router;
