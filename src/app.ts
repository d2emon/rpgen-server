import express, {NextFunction, Request, Response} from 'express';
import path from 'path';

import cors from 'cors';
import logger from 'morgan';

import debug from './debug';
// import connectMongo from './db/mongo';
import defaultError, {
    error404,
} from './errorHandlers';

import indexRouter from './routes';
import encountersRouter from './encounters/routes';
// import usersRouter from './routes/users';
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
app.use(logger('dev'));

// Routes setup
app.use('/', indexRouter);
app.use('/encounters', encountersRouter)
// app.use('/users', usersRouter);
// app.use('/mud', mudRouter);

// Error handlers
app.use(error404);
app.use(defaultError);

/*
connectMongo(config.get('MONGO_URI'))
    .then(() => log.info(`MongoDb connected to ${config.get('MONGO_URI')}`));
 */

export default app;
