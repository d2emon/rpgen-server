import {
    Request,
    Response,
} from 'express';
import User from '../models/user';
import {
    HttpException,
    responseError,
} from '../errorHandlers';

const logoutUser = (): void => null;

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const user = await User
            .login(req.body.username, req.body.password)
            .catch((e) => { throw new HttpException(400, e.message) });
        return res.json({ user });
    } catch (error) {
        return responseError(res, error);
    }
}

export const logoutHandler = async (req: Request, res: Response) => {
    try {
        logoutUser();
        return res.json({ message: 'You have successfully been logged out.' });
    } catch (error) {
        return responseError(res, error);
    }
}

const listItems = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        return res.json({ users });
    } catch (error) {
        return responseError(res, error);
    }
}

const addItem = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user
            .validate()
            .catch((e) => { throw new HttpException(400, e.message) });
        await user.save();
        return res.json({ user });
    } catch (error) {
        return responseError(res, error);
    }
}

const getItem = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return responseError(res, new HttpException(404, 'User not found'));
        }
        await user
            .validate()
            .catch((e) => { throw new HttpException(400, e.message) });
        await user.save();
        return res.json({ user });
    } catch (error) {
        return responseError(res, error);
    }
}

const editItem = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return responseError(res, new HttpException(404, 'User not found'));
        }
        user.overwrite(req.body);
        await user.save();
        return res.json({ user });
    } catch (error) {
        return responseError(res, error);
    }
}

const delItem = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.json({ result: true });
    } catch (error) {
        return responseError(res, error);
    }
}

export default {
    listItems,
    addItem,
    getItem,
    editItem,
    delItem,
};
