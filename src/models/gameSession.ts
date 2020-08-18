import  {
    Model,
    Schema,
    model,
} from 'mongoose';
import { IGameSession } from './types';

const schema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    realDate: {
        type: Date,
        default: Date.now(),
    },
    campaignDate: Date,
    campaignDateText: String,
    xp: Number,
    characters: [String],
});

schema.virtual('campaigns', {
    ref: 'Campaign',
    localField: '_id',
    foreignField: 'sessions',
});

schema.set('toJSON', {
    transform: (doc) => ({
        id: doc.id,
        title: doc.title,
        // campaign: doc.campaign,
        realDate: doc.realDate,
        campaignDate: doc.campaignDate,
        campaignDateText: doc.campaignDateText,
        xp: doc.xp,
        characters: doc.characters,
    }),
})

export interface IGameSessionModel extends Model<IGameSession> {
}


export default model<IGameSession, IGameSessionModel>('GameSession', schema);
