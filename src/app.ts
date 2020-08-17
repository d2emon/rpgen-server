import express, {NextFunction, Request, Response} from 'express';
import path from 'path';

import cors from 'cors';
import morgan from 'morgan';

import config from './config';
import connectMongo from './db/mongo';
import debug from './debug';
import defaultError, {
    error404,
} from './errorHandlers';
import logger from './log';

import indexRouter from './routes';
import encountersRouter from './encounters/routes';
import usersRouter from './routes/users';
// import mudRouter from './routes/mud';

const app =express();

// Locals setup
const publicPath = path.join(__dirname, '..', 'public');
debug(`Public path: ${publicPath}`);

// Middleware setup
app.use(cors());
/*
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
*/
app.use(express.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes setup
app.use('/', indexRouter);
app.use('/encounters', encountersRouter)
app.use('/users', usersRouter);
// app.use('/mud', mudRouter);
// app.use('/api', apiRouter); // api
// app.use('/api/world', worldApiRouter); // api
// app.use('/api/npc', npcApiRouter); // api
// app.use('', authRouter); // blueprints.auth
// app.use('/admin', adminRouter); // admin
// app.use('/rpg', rpgRouter); // blueprints.rpg
// app.use('/campaign', campaignRouter); // blueprints.campaign
// app.use('/session', sessionRouter); // blueprints.gamesession
// app.use('/world', worldRouter); // blueprints.world

// Adding commands from managers
// const rpgManager = new RpgManger(app); // blueprints.rpg
// app.use('user', authManager); // blueprints.auth.commands
// app.use('admin', adminManager); // admin.commands
// app.use('generate', generateManager); // blueprints.generate.commands

// Error handlers
app.use(error404);
app.use(defaultError);

const mongo = config.get('MONGO_URI');
connectMongo(mongo)
    .then(() => logger.info(`MongoDb connected to ${mongo}`));

export default app;
