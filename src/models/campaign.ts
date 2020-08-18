import  {
    Model,
    Schema,
    model,
} from 'mongoose';
import {ICampaign, IGameSession} from './types';

const schema: Schema = new Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    sessions: [{
        type: Schema.Types.ObjectId,
        ref: 'GameSession',
    }],
});

schema
    .statics
    .bySlug = function (slug: string): Promise<ICampaign> {
        return this.findOne({ slug });
    };


schema
    .virtual('characters')
    .get(function (): string[] {
        const characters: string[] = [];
        this.sessions.forEach((session: IGameSession) => {
            session.characters.forEach((character: string) => {
                if (characters.indexOf(character) < 0) {
                    characters.push(character);
                }
            });
        });
        return characters;
    });

schema
    .set('toJSON', {
        transform: doc => ({
            id: doc.id,
            slug: doc.slug,
            title: doc.title,
            description: doc.description,
        }),
    });

export interface ICampaignModel extends Model<ICampaign> {
    bySlug(slug: string): ICampaign;
}


export default model<ICampaign, ICampaignModel>('Campaign', schema);
