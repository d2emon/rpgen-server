import {
    Router,
} from 'express';
import { generateClothing } from '../handlers/clothing';

const router = Router();

router.get('/random', generateClothing);

export default router;
