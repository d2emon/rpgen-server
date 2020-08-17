import {
  Router,
} from 'express';
import userHandlers, {
  loginHandler,
  logoutHandler,
} from '../handlers/users';

const router = Router();

router.get('/', userHandlers.listItems);
router.post('/', userHandlers.addItem);

router.get('/:id', userHandlers.getItem);
router.put('/:id', userHandlers.editItem);
router.delete('/:id', userHandlers.delItem);

router.post('/login', loginHandler);
router.get('/logout', logoutHandler);

export default router;
