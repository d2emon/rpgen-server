import {
    Request,
    Response,
} from 'express';
import {
    responseError,
} from '../errorHandlers';
import GameSystem, { IGameSystem } from '../models/gameSystem';

const listItems = async (req: Request, res: Response) => {
    try {
        const games: IGameSystem[] = [
            new GameSystem({
                title: 'Dungeons & Dragons',
                url: '/rpg/dnd',
            }),
            new GameSystem({
                title: 'Pathfinder',
                url: '/rpg/pathfinder',
            }),
            new GameSystem({
                title: 'GURPS',
                url: '/rpg/gurps',
            }),
            new GameSystem({
                title: 'Tunnels & Trolls',
                url: '/rpg/tnt',
            }),
            new GameSystem({
                title: 'Savage Worlds',
                url: '/rpg/sw',
            }),
        ];
        return res.json({ games });
    } catch (error) {
        return responseError(res, error);
    }
}

const addItem = async (req: Request, res: Response) => {
    try {
        const gameSystem = new GameSystem(req.body);
        await gameSystem.save();
        return res.json({ gameSystem });
    } catch (error) {
        return responseError(res, error);
    }
}

const getItem = async (req: Request, res: Response) => {
    try {
        const gameSystem = await GameSystem.findById(req.params.id);
        return res.json({ gameSystem });
    } catch (error) {
        return responseError(res, error);
    }
}

const editItem = async (req: Request, res: Response) => {
    try {
        const gameSystem = await GameSystem.findById(req.params.id);
        gameSystem.overwrite(req.body);
        await gameSystem.save();
        return res.json({ gameSystem });
    } catch (error) {
        return responseError(res, error);
    }
}

const delItem = async (req: Request, res: Response) => {
    try {
        await GameSystem.findByIdAndDelete(req.params.id);
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
