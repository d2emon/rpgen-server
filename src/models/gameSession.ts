import  {
    Document,
    Model,
    Schema,
    model,
} from 'mongoose';
import {ICampaign} from "./campaign";

const schema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    campaign: {
        type: Schema.Types.ObjectId,
        ref: 'Campaign',
    },
    realDate: {
        type: Date,
        default: Date.now(),
    },
});

schema.set('toJSON', {
    transform: doc => ({
        id: doc.id,
        title: doc.title,
        campaign: doc.campaign,
        realDate: doc.realDate,
    }),
})

export interface IGameSession extends Document {
    title: string;
    description: string;
    campaign: ICampaign;
    realDate: Date;
}

export interface IGameSessionModel extends Model<IGameSession> {
}


export default model<IGameSession, IGameSessionModel>('GameSession', schema);
