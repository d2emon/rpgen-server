import express from 'express';
import path from 'path';

// import cors from 'cors';
import logger from 'morgan';

import debug from './debug';
// import connectMongo from './db/mongo';
import defaultError, {
    error404,
} from './errorHandlers';

// import indexRouter from './routes';
// import usersRouter from './routes/users';
// import mudRouter from './routes/mud';

const app =express();

// Locals setup
const publicPath = path.join(__dirname, '..', 'public');
debug(`Public path: ${publicPath}`);

// View engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// Middleware setup
// app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Routes setup
// app.use('/', indexRouter);
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
