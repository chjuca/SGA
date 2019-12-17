import {Router} from 'express';
import {createAsset, getAssets, updateAsset ,deleteAssets} from '../controllers/assets.controller';

const router = Router();

router.post('/',createAsset);
router.get('/',getAssets);
router.put('/:publicId', updateAsset)
router.delete('/:publicId', deleteAssets);

export default router;