import {
    Router,
} from 'express';
import {
    worldList,
    aliens,
} from '../handlers/worlds';

const router = Router();

router.get('/', worldList);
router.get('/aliens', aliens);

export default router;
