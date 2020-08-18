import { Document } from 'mongoose';

export interface ICampaign extends Document {
    slug: string;
    title: string;
    description: string;
    sessions: IGameSession[];

    characters: string[];
}

export interface IGameSession extends Document {
    // campaign: ICampaign;
    title: string;
    description: string;
    // detailgen
    realDate: Date;
    campaignDate: Date;
    campaignDateText: string;
    xp: string;

    campaigns: ICampaign[];
    characters: string[];
}
