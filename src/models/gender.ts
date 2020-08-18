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
});

schema.set('toJSON', {
    transform: doc => ({
        id: doc.id,
        title: doc.title,
    }),
})

export interface IGender extends Document {
    title: string;
}

export interface IGenderModel extends Model<IGender> {
}


export default model<IGender, IGenderModel>('Gender', schema);
