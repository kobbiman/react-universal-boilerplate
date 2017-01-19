import config from './config'
export default require('./webpack/' + config.env).default
