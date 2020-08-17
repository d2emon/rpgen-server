import {
    Request,
    Response,
} from 'express';
import User, { IUser } from '../models/user';
import {
    HttpException,
    responseError,
} from '../errorHandlers';

const logoutUser = (): void => null;

export const usersHandler = async (req: Request, res: Response) => {
    try {
        return User.find({})
            .then((users: IUser[]) => res.json({ users }));
    } catch (error) {
        return responseError(res, error);
    }
}

export const registerHandler = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user
            .validate()
            .catch((e) => { throw new HttpException(400, e.message) });
        await user.save();
        return res.json({
            user,
        });
    } catch (error) {
        return responseError(res, error);
    }
}

export const updateHandler = async (req: Request, res: Response) => {
    try {
        return User.findById(req.params.id)
            .then(async (user: IUser) => {
                if (!user) {
                    throw new HttpException(404, 'User not found');
                }
                await user
                    .validate()
                    .catch((e) => { throw new HttpException(400, e.message) });
                await user.save();
                return res.json({
                    user,
                });
            });
    } catch (error) {
        return responseError(res, error);
    }
}

export const userHandler = async (req: Request, res: Response) => {
    try {
        return User.findById(req.params.id)
            .then(async (user: IUser) => {
                if (!user) {
                    throw new HttpException(404, 'User not found');
                }
                return res.json({
                    user,
                });
            });
    } catch (error) {
        return responseError(res, error);
    }
}

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const user = await User
            .login(req.body.username, req.body.password)
            .catch((e) => { throw new HttpException(400, e.message) });
        return res.json({
            user,
        });
    } catch (error) {
        return responseError(res, error);
    }
}

export const logoutHandler = async (req: Request, res: Response) => {
    try {
        logoutUser();
        return res.json({
            message: 'You have successfully been logged out.',
        });
    } catch (error) {
        return responseError(res, error);
    }
}
