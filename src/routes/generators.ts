import {
    Router,
} from 'express';
import {
    aliensHandler,
    charactersHandler,
    clothingHandler,
    namesHandler,
    realmHandler,
    worldsHandler,
} from '../handlers/generators';

const router = Router();

router.get('/', worldsHandler);
router.get('/worlds', worldsHandler);
router.get('/aliens', aliensHandler);
router.get('/names', namesHandler);
router.get('/clothing', clothingHandler);
router.get('/characters', charactersHandler);
router.get('/realm', realmHandler);

export default router;
