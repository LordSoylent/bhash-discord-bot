//Our bot context
const context = require('./data/context');
//Other const depends
const Discord = require('discord.js');
const client = new Discord.Client();
const Logger = require('./libs/components/logger');
const CLIHandler = require('./libs/components/cli');

//Used to secure the Discord bot key
var CryptoJS = require("crypto-js");
//Get arguments from CLI
var arguments = process.argv.slice(2);
//Root logger
var logger = new Logger(context.name, 'ROOT');
var cliHandler = new CLIHandler();

//USED FOR TESTING ONLY
var password = context.auto.login.password;

//Check to make sure the user includes a password
if(!password && arguments.length < 1) {
  logger.error('You must include password to start application! Use flag \'-h\' or \'--help\' for usage!');
} else if (arguments[0] === '-h' || arguments[0] === '--help') {
  //Define usage for user

} else {

  //Handle when bot has logged in and is ready
  client.on('ready', () => {
    logger.info(`Hello, I\'m ${context.name} v${context.version}! Ready to work when you are!`);
    logger.info(`Logged in as ${client.user.tag}!`);
  });

  //Handle on message recieve
  client.on('message', msg => {
    cliHandler.onMessage(msg);
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
  });

  //Log into the client using encrypted key and password if enabled
  var key = "";
  if(context.key.encrypt){
    var bytes = CryptoJS.AES.decrypt(context.key.value, password ? password : arguments[0]);
    key = bytes.toString(CryptoJS.enc.Utf8);
  } else {
    key = context.key.value
  }
  client.login(key);
}
