import {
    Request,
    Response,
} from 'express';
import {
    HttpException,
    responseError,
} from '../errorHandlers';
import Campaign from '../models/campaign';

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
        const campaign = await Campaign.findById(req.params.campaignId);
        if (!campaign) {
            return responseError(res, new HttpException(404, 'Campaign not found'));
        }
        return res.json({ campaign });
    } catch (error) {
        return responseError(res, error);
    }
}

const editItem = async (req: Request, res: Response) => {
    try {
        const campaign = await Campaign.findById(req.params.campaignId);
        if (!campaign) {
            return responseError(res, new HttpException(404, 'Campaign not found'));
        }
        campaign.overwrite(req.body);
        await campaign.save();
        return res.json({ campaign });
    } catch (error) {
        return responseError(res, error);
    }
}

const delItem = async (req: Request, res: Response) => {
    try {
        await Campaign.findByIdAndDelete(req.params.campaignId);
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
