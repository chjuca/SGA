import {Router} from 'express';
import {createUser, getUsers, getOneUser, deleteUser, updateUser, getUserbyCI, countUsers} from '../controllers/user.controller';
import {checkToken,checkRole} from '../middleware/authentication';

const router = Router();

// /api/users/*
router.post('/', createUser);
router.get('/', getUsers);
router.get('/:ci', getUserbyCI);
router.get('/count', countUsers)
router.delete('/:ci', [checkToken, checkRole], deleteUser);         
router.put('/:ci', [checkToken, checkRole] , updateUser);


export default router;
