import {
    Router,
} from 'express';
import {
    clothing,
    getCharacters,
    names,
} from '../handlers/npc';

const router = Router();

router.get('/', names);
router.get('/clothing', clothing);
router.get('/random', getCharacters);

export default router;
