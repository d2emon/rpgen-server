import  {
    Document,
    Model,
    Schema,
    model,
} from 'mongoose';
import Gender, { IGender } from './gender'
import Title, { ITitle } from './title';

const schema: Schema = new Schema({
    title: {
        type: Schema.Types.ObjectId,
        ref: 'Title',
    },
    name: {
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
        fullName: `${doc.title && doc.title.title} ${doc.name}`,
        title: doc.title,
        name: doc.name,
        gender: doc.gender,
    }),
})

export interface IGameCharacter extends Document {
    title: ITitle;
    name: string;
    gender: IGender;
}

export interface IGameCharacterModel extends Model<IGameCharacter> {
}

const GameCharacter = model<IGameCharacter, IGameCharacterModel>('GameCharacter', schema);

export interface GameCharacterOptions {
    title?: string;
    name?: string;
    genderId?: string;
}

export const generate = async (options: GameCharacterOptions): Promise<IGameCharacter> => {
    const {
        title,
        name,
        genderId,
    } = options;

    const gender: IGender = genderId
        ? await Gender.findById(genderId)
        : await Gender.findOne({});

    return new GameCharacter({
        title: title || Title.findOne({ gender }), // Title.query.filter(Title.gender == sex).order_by(func.random()).first()
        name: name || '', // Name.query.filter(Name.gender == sex).order_by(func.random()).first()
        gender,
    });
};

export default GameCharacter;