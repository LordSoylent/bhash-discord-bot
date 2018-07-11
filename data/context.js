const Logger = require.main.require('./libs/components/logger');

var context = require.main.require('./data/context');
var fs = require('fs');
var logger = new Logger('root', 'CLI');

JSON.minify = JSON.minify || require("node-json-minify");


// Ensure we have a valid context file
if (!fs.existsSync('configs/context.json')){
    console.log('Could not locate `configs/context.json`! Ensure the file exsits, and try again! Remember you need to run `node setup` prior to first launch!');
    return;
}
// Create object from json
var context = JSON.parse(JSON.minify(fs.readFileSync('configs/context.json', {encoding: 'utf8'})));

module.exports = {
    // Name of the bot
    name: context.name,
    // Current bot version
    version: context.version,
    // Discord auth key properties
    key: {
        // Determine if the authetnication key will be encrypted
        encrypt: context.key.encrypt,
        // The authentication key
        value: context.key.value
    },
    

    // Used for auto features, most not reccomended for use after deployment.
    auto: {
        // Auto-login details, do not use during/after deployment. Only for testing
        login: {
            password: context.auto.login.password //NOT RECCOMMEDED FOR PUBLIC USE! ONLY USE IN SECURE ENVIROMENTS FOR TESTING
        }
    },

    // Default values
    defaults: {
        // Default command values
        commands: {
            help: context.defaults.commands.help
        }
    },
    // Default logger properties
    logger : {
        // Default logging level
        level : context.logger.level,
        // Default log output location and name (timestamp will be added)
        file : context.logger.file
    }
};
