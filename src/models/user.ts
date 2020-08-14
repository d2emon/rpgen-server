import crypto from 'crypto';
import  {
    Document,
    Model,
    ObjectId,
    Schema,
    model,
} from 'mongoose';
import Role, {
    IRole,
} from './role';

const banList: string[] = [];

const schema: Schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        match: /^\w*$/,
        // db.String(60),
        // index=True,
        // info={'label': "Username"}
    },
    hashedPassword: {
        type: String,
        required: true,
        // db.String(128)
    },
    salt: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    role: {
        type: ObjectId,
        ref: 'Role',
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
// __namegiv = false;
// __qnmrq = false;
// __ttyt = 0;
// __isawiz = false;
schema.virtual('isAdmin')
    .get(function (): boolean {
        return this.role && this.role.isAdmin;
    });
schema.virtual('isNew')
    .get(function (): boolean {
        return true; // !this.id;
    });
schema.virtual('noLogin')
    .get(function (): boolean {
        return false;
    });
schema.virtual('qnmrq')
    .set(function (value: boolean) {
        this.__qnmrq = value;
    })
    .get(function (): boolean {
        return this.__qnmrq;
    });
schema.virtual('ttyt')
    .set(function (value: number) {
        this.__ttyt = value;
    })
    .get(function (): number {
        return this.__ttyt;
    });
schema.virtual('host')
    .get(function (): string {
        return 'Host';
    });
schema.virtual('fullName')
    .get(function (): string {
        const username = this.username.toUpperCase();
        return this.isAdmin ? `The ${username}` : username;
    });
schema.virtual('isBanned')
    .get(function (): boolean {
        return (banList.indexOf(this.username.toLowerCase()) >= 0);
    });
schema.virtual('afterLogin')
    .get(function (): string {
        return '/';
    });

// Other methods
schema.statics.login = async function (username: string, password: string): Promise<IUser> {
    const user: IUser = await this.byUsername(username);
    if (!user || !user.checkPassword(password)) {
        return undefined;
    }
    user.validateLogin();
    return user;
};
schema.methods.register = function (): void {
    this.qnmrq = true;
    this.ttyt = 0;
};

// Validators
schema.methods.validateLogin = function (host: string): void {
    if (this.isBanned) {
        throw new Error('I\'m sorry- that userid has been banned from the Game');
    }
    if (this.host !== host) {
        throw new Error(`AberMUD is only available on ${host}, not on ${this.host}`);
    }
    if (this.noLogin) {
        throw new Error('No login');
    }
};

export interface IUser extends Document {
    username: string;
    hashedPassword: string;
    salt: string;
    created: Date;
    role: IRole;

    password: string;
    isBanned: boolean;

    encryptPassword(password: string): string;
    checkPassword(password: string): boolean;

    validateLogin(): void;
}

export interface IUserModel extends Model<IUser> {
    // encryptPassword: (password: string) => string;
    // checkPassword: (password: string) => boolean;
}


export default model<IUser, IUserModel>('User', schema);
