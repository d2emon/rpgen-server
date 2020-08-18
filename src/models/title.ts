import  {
    Document,
    Model,
    Schema,
    model,
} from 'mongoose';
import gender, {IGender} from "./gender";

const schema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    gender: {
        type: Schema.Types.ObjectId,
        ref: 'Gender',
    },
});

schema.set('toJSON', {
    transform: doc => ({
        id: doc.id,
        title: doc.title,
        gender,
    }),
})

export interface ITitle extends Document {
    title: string;
    gender: IGender;
}

export interface ITitleModel extends Model<ITitle> {
}


export default model<ITitle, ITitleModel>('Title', schema);
