import {
    Request,
    Response,
} from 'express';
import {
    HttpException,
    responseError,
} from '../errorHandlers';
import Campaign from '../models/campaign';
import GameSession from '../models/gameSession';

const findCampaign = async (slug: string) => {
    if (!slug) {
        throw new HttpException(404, 'Campaign not found');
    }
    const campaign = await Campaign.bySlug(slug);
    if (!campaign) {
        throw new HttpException(404, 'Campaign not found');
    }
    return campaign;
};

const listItems = async (req: Request, res: Response) => {
    try {
        const campaigns = await Campaign.find({});
        return res.json({ campaigns });
    } catch (error) {
        return responseError(res, error);
    }
}

const addItem = async (req: Request, res: Response) => {
    try {
        const campaign = new Campaign(req.body);
        await campaign.save();
        return res.json({ campaign });
    } catch (error) {
        return responseError(res, error);
    }
}

const getItem = async (req: Request, res: Response) => {
    try {
        const campaign = await Campaign
            .bySlug(req.params.campaignId || '')
            .populate('sessions');
        if (!campaign) {
            return responseError(res, new HttpException(404, 'Campaign not found'));
        }
        return res.json({
            campaign: {
                ...campaign.toJSON(),
                sessions: campaign.sessions,
                characters: campaign.characters,
            },
        });
    } catch (error) {
        return responseError(res, error);
    }
}

const editItem = async (req: Request, res: Response) => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(req.params.campaignId, req.body);
        return res.json({ campaign });
    } catch (error) {
        return responseError(res, error);
    }
}

const delItem = async (req: Request, res: Response) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.campaignId);
        return res.json({ result: true, campaign });
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
