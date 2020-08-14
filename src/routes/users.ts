import {
  Router,
  Request,
  Response,
} from 'express';
import User from '../models/user';

const loginUser = (user: any): void => null;
const logoutUser = (): void => null;

export interface LoginData {
  // 'Login'
  username: string; // required
  password: string; // 'Password' required
}

export interface RegisterData {
  // 'Register'
  username: string;
  password: string; // 'Password' required
  roleId: number;
}

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const form: RegisterData = req.body;
  const user = new User(form);
  return res.json({
    result: await user.save(),
    message: 'You have successfully registered! You may now login.',
  });
});
router.post('/login', async (req: Request, res: Response) => {
  const form: LoginData = req.body;
  const user = await User
      .byUsername(form.username);
  if (user && user.verifyPassword(form.password)) {
    loginUser(user);
    return res.json({
      redirect: user.afterLogin,
      result: true,
    });
  } else {
    return res.json({
      error: 'Invalid email or password',
    });
  }
});
router.get('/logout', (req: Request, res: Response) => {
  logoutUser();
  return res.json({
    message: 'You have successfully been logged out.',
  });
});

export default router;
