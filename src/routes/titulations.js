import {Router} from 'express';
import { getAreasAndTitulation, createAreaOrTitulation } from "../controllers/titulation.controller";

const router = Router();

router.get('/', getAreasAndTitulation);
router.post('/', createAreaOrTitulation);


export default router;