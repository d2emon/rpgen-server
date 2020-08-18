import {
    Request,
    Response,
} from 'express';
import {
    HttpException,
    responseError,
} from '../errorHandlers';
import GameSession from '../models/gameSession';
import Campaign from '../models/campaign';

const findCampaign = async (slug: string) => {
    const campaign = await Campaign.bySlug(slug).populate('sessions');
    if (!campaign) {
        throw new HttpException(404, 'Campaign not found');
    }
    return campaign;
};

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
        const campaign = await findCampaign(req.params.campaignId);
        const session = new GameSession(req.body);
        await session.save();
        campaign.sessions.push(session);
        await campaign.save();
        return res.json({ session });
    } catch (error) {
        return responseError(res, error);
    }
}

const getItem = async (req: Request, res: Response) => {
    try {
        const session = await GameSession
            .findById(req.params.sessionId)
            .populate('campaigns');
        if (!session) {
            return responseError(res, new HttpException(404, 'Session not found'));
        }
        return res.json({
            session: {
                ...session.toJSON(),
                campaigns: session.campaigns,
            },
        });
    } catch (error) {
        return responseError(res, error);
    }
}

const editItem = async (req: Request, res: Response) => {
    try {
        const session = await GameSession.findByIdAndUpdate(req.params.sessionId, req.body);
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
