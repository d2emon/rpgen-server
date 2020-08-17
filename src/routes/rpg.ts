import {
    Router,
} from 'express';
import gameSystemHandlers from '../handlers/gameSystems';
import campaignHandlers from '../handlers/campaigns';
import sessionHandlers from '../handlers/gameSessions';

const router = Router();

router.get('/systems', gameSystemHandlers.listItems);
router.post('/system', gameSystemHandlers.addItem);
router.get('/system/:gameId', gameSystemHandlers.getItem);
router.put('/system/:gameId', gameSystemHandlers.editItem);
router.delete('/system/:gameId', gameSystemHandlers.delItem);

router.get('/campaigns', campaignHandlers.listItems);
router.post('/campaign', campaignHandlers.addItem);
router.get('/campaign/:campaignId', campaignHandlers.getItem); // sessionHandlers.listItems
router.put('/campaign/:campaignId', campaignHandlers.editItem);
router.delete('/campaign/:campaignId', campaignHandlers.delItem);
router.post('/campaign/:campaignId', sessionHandlers.addItem);
router.get('/campaign/:campaignId/:sessionId', sessionHandlers.getItem);

router.get('/sessions', sessionHandlers.listItems);
router.get('/session/:sessionId', sessionHandlers.getItem);
router.put('/session/:sessionId', sessionHandlers.editItem);
router.delete('/session/:sessionId', sessionHandlers.delItem);

export default router;
