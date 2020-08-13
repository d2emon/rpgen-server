import Debug from 'debug';
import config from './config';

const debug = Debug(config.get('DEBUG'));

export default debug;