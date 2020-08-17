import  {
    Document,
    Model,
    Schema,
    model,
} from 'mongoose';

const schema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
});

schema.set('toJSON', {
    transform: doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
    }),
})

export interface ICampaign extends Document {
    title: string;
    description: string;
}

export interface ICampaignModel extends Model<ICampaign> {
}


export default model<ICampaign, ICampaignModel>('Campaign', schema);
