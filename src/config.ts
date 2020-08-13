import nconf from 'nconf';
// import path from 'path';

// const file = path.join(__dirname, '..', '..', 'config', 'config.json');

nconf
    .defaults({
        APP_NAME: 'RPGen',
        DEBUG: 'rpgen:*',
        LOG_LEVEL: 'debug',
        PORT: '8082',
    })
    // .file({ file })
    .argv()
    .env();

export default nconf;
