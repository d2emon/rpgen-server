import {
    Request,
    Response,
} from 'express';
import {
    HttpException,
    responseError,
} from '../errorHandlers';
import GameSession from '../models/gameSession';
import Campaign from "../models/campaign";

const listItems = async (req: Request, res: Response) => {
    try {
        const sessions = await GameSession.find({});
        return res.json({ sessions });
    } catch (error) {
        return responseError(res, error);
    }
}

const addItem = async (req: Request, res: Response) => {
    try {
        const campaign = await Campaign.findById(req.params.campaignId);
        if (!campaign) {
            return responseError(res, new HttpException(404, 'Campaign not found'));
        }
        const session = new GameSession(req.body);
        session.campaign = campaign.id;
        await session.save();
        return res.json({ session });
    } catch (error) {
        return responseError(res, error);
    }
}

const getItem = async (req: Request, res: Response) => {
    try {
        const session = await GameSession.findById(req.params.sessionId);
        if (!session) {
            return responseError(res, new HttpException(404, 'Session not found'));
        }
        return res.json({ session });
    } catch (error) {
        return responseError(res, error);
    }
}

const editItem = async (req: Request, res: Response) => {
    try {
        const session = await GameSession.findById(req.params.sessionId);
        if (!session) {
            return responseError(res, new HttpException(404, 'Session not found'));
        }
        session.overwrite(req.body);
        await session.save();
        return res.json({ session });
    } catch (error) {
        return responseError(res, error);
    }
}

const delItem = async (req: Request, res: Response) => {
    try {
        await GameSession.findByIdAndDelete(req.params.sessionId);
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
