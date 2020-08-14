import  {
    Document,
    Model,
    Schema,
    model,
} from 'mongoose';

const schema: Schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

export interface IRole extends Document {
    name: string;
    description: string;
    isAdmin: boolean;
}

export interface IRoleModel extends Model<IRole> {
    encryptPassword: (password: string) => string;
    checkPassword: (password: string) => boolean;
}


export default model<IRole, IRoleModel>('Role', schema);
