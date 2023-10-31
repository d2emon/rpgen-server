/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  
  if (port >= 0) {
    // port number
    return port;
  }
 
  return false;
}
  
const PORT = normalizePort(process.env.PORT || '8082');

const config = {
    APP_NAME: 'RPGen',
    DEBUG: 'rpgen',
    LOG_LEVEL: 'debug',
    MONGO_URI: 'mongodb://mongo/rpgen-server',
    PORT,  
};

module.exports = config;
