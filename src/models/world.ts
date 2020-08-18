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
    image: {
        type: String,
    },
});

schema.method('dummyImage', () => `https://loremflickr.com/400/300/?${Math.random()}`);
schema.method('imagePath', function (path='/static/images/world') {
    return this.image
        ? `${path}/${this.image}`
        : this.dummyImage();
})

schema.set('toJSON', {
    transform: doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        image: doc.image,
    }),
})

export interface IWorld extends Document {
    title: string;
    description: string;
    image: string;

    dummyImage(): string;
    imagePath(path: string): string;
}

export interface IWorldModel extends Model<IWorld> {
}


export default model<IWorld, IWorldModel>('World', schema);
