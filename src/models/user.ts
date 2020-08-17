import crypto from 'crypto';
import  {
    Document,
    Model,
    Schema,
    model,
} from 'mongoose';
import Role, {
    IRole,
} from './role';

const disableAuth = false;

const schema: Schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        match: /^\w*$/,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

schema.statics.byUsername = function (username: string): Promise<IUser> {
    return this.findOne({ username });
};

// Password management
schema.methods.encryptPassword = function (password: string): string {
    return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
};
schema.methods.checkPassword = function (password: string): boolean {
    return (this.encryptPassword(password) === this.hashedPassword);
};
schema.virtual('password')
    .set(function (password: string) {
        this.__plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function (): string {
        return this.__plainPassword;
    });

// Properties
schema.virtual('isAdmin')
    .get(function (): boolean {
        return this.role && this.role.isAdmin;
    });
schema.virtual('afterLogin')
    .get((): string => '/');

// Other methods
schema.statics.login = async function (username: string, password: string): Promise<IUser> {
    const user: IUser = await this.byUsername(username);

    if (!user || !user.checkPassword(password)) {
        throw new Error('Invalid username or password');
    }
    if (this.disableAuth) {
        throw new Error('Authorization is disabled');
    }
    if (this.disabled) {
        throw new Error('This account is disabled');
    }

    return user;
};

schema
    .path('username')
    .validate(async function (value: string) {
        await this.model('User')
            .byUsername(value)
            .then((found: IUser) => {
                if (found) {
                    throw new Error(`User ${value} already exists`);
                }
                return true;
            });
    });

schema.set('toJSON', {
    transform: doc => ({
        id: doc.id,
        username: doc.username,
        disabled: doc.disabled,
        created: doc.created,
        role: doc.role,
        isAdmin: doc.isAdmin,
        afterLogin: doc.afterLogin,
    }),
})

export interface IUser extends Document {
    username: string;
    hashedPassword: string;
    salt: string;
    created: Date;
    role: IRole;
    disabled: boolean;

    password: string;
    isAdmin: boolean;
    afterLogin: string;

    encryptPassword(password: string): string;
    checkPassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {
    login(username: string, password: string): Promise<IUser>;
    byUsername(username: string): Promise<IUser>;
}


export default model<IUser, IUserModel>('User', schema);
