// config/keys.js - figure out which set of credentials to return

if(process.env.NODE_ENV === 'production'){
    // production - return prod keys
    module.exports = require('./prod');
} else {
    // dev - return dev keys
    module.exports = require('./dev');
}