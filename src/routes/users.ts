import {
  Router,
} from 'express';
import {
  usersHandler,
  registerHandler,
  userHandler,
  updateHandler,
  loginHandler,
  logoutHandler,
} from '../handlers/users';

const router = Router();

router.get('/', usersHandler);
router.post('/', registerHandler);

router.get('/:id', userHandler);
router.put('/:id', updateHandler);

router.post('/login', loginHandler);
router.get('/logout', logoutHandler);

export default router;
