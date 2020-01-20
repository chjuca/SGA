import {Router} from 'express';
import { getTitulationsbyArea, getAreas, createAreaOrTitulation } from "../controllers/titulation.controller";

const router = Router();

router.get('/', getAreas);
router.get('/:id', getTitulationsbyArea);
router.post('/', createAreaOrTitulation);


export default router;