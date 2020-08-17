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
    website: {
        type: String,
    },
    url: {
        type: String,
    },
});

schema.set('toJSON', {
    transform: doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        website: doc.website,
        url: doc.url,
    }),
})

export interface IGameSystem extends Document {
    title: string;
    description?: string;
    website?: string;
    url?: string;
}

export interface IGameSystemModel extends Model<IGameSystem> {
}


export default model<IGameSystem, IGameSystemModel>('GameSystem', schema);
