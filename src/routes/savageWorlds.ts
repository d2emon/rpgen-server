import {
    Router,
} from 'express';
import { listRaces } from '../handlers/sawage-worlds/races';

const router = Router();

router.get('/races', listRaces);

export default router;
