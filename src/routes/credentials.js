import {Router} from 'express';
import {createCredential, getCredentials, getOneCredetential,deleteCredential, updateCredential } from '../controllers/credentials.controller';

const router = Router();

// /api/credentials/*
router.post('/', createCredential);
router.get('/', getCredentials);
router.get('/:ci', getOneCredetential);
router.delete('/:ci', deleteCredential);
router.put('/:ci', updateCredential);


export default router;
