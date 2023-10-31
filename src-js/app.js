const express = require('express');
const path = require('path');

// import cors from 'cors';
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// const config = require('./config');
// import connectMongo from './db/mongo';
const debug = require('./debug')('*');
const {
  defaultError,
  logError,
  error404,
} = require('./handlers/error');
// import logger from './log';

const indexRouter = require('./routes');
// import encountersRouter from './encounters/routes';
// import generatorsRouter from './routes/generators';
const nestedRouter = require('./routes/nested');
// import npcRouter from './routes/npcs';
const routesRouter = require('./routes/routes');
// import rpgRouter from './routes/rpg';
const usersRouter = require('./routes/users');
// import worldsRouter from './routes/worlds';
// // import mudRouter from './routes/mud';

const app = express();

// Locals setup
const publicPath = path.join(__dirname, '..', 'public');
debug(`Public path: ${publicPath}`);

// Middleware setup
app.use(morgan('dev'));
app.use(cookieParser());
app.use(function (req, res, next) {
  // Setup cors
  // Can use app.use(cors());
  res
    .header("Access-Control-Allow-Origin", "*")
    .header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  return next();
});
app.use(express.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));

// Routes setup
app.use('/', indexRouter);
// app.use('/encounters', encountersRouter);
// app.use('/generator', generatorsRouter);
app.use('/api/v1.1/nested', nestedRouter);
app.use('/api/v1.1/routes', routesRouter);
app.use('/users', usersRouter);
// app.use('/rpg', rpgRouter);
// app.use('/api/npc', npcRouter);
// app.use('/api/world', worldsRouter);

// app.use('/mud', mudRouter);
// app.use('/api', apiRouter); // api
// app.use('/admin', adminRouter); // admin
// app.use('/world', worldRouter); // blueprints.world

// Adding commands from managers
// const rpgManager = new RpgManger(app); // blueprints.rpg
// app.use('user', authManager); // blueprints.auth.commands
// app.use('admin', adminManager); // admin.commands
// app.use('generate', generateManager); // blueprints.generate.commands

app.use(error404);

// Error handlers
app.use(logError);
app.use(defaultError);

// Connect to DB
// const mongo = config.get('MONGO_URI');
// connectMongo(mongo)
//    .then(() => logger.info(`MongoDb connected to ${mongo}`));

module.exports = app;
