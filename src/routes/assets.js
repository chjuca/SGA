import {Router} from 'express';
import {checkToken} from '../middleware/authentication';
import {createAsset, getAssets, updateAsset ,deleteAssets} from '../controllers/assets.controller';

const router = Router();

router.post('/',checkToken,createAsset);
router.get('/',checkToken,getAssets);
router.put('/:publicId', updateAsset)
router.delete('/:publicId', deleteAssets);

export default router;