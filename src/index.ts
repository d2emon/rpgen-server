import app from './app';
import config from './config';
import debug from './debug';

const port = config.get('PORT');

const onListening = () => debug(`Listening on port ${app.get('port')}`);

app.set('port', port);
app
    .listen(app.get('port'))
    .on('listening', onListening);
