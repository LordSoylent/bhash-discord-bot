const Logger = require('../logger');
const Help = require('./help');

var context = require.main.require('./data/context');
var fs = require('fs');
var logger = new Logger(context.name, 'CLI');

JSON.minify = JSON.minify || require("node-json-minify");

var CLIHandler = function() {
    if (!fs.existsSync('configs/commands.json')){
        console.log('Could not locate `configs/commands.json`! Ensure the file exsits, and try again!');
        return;
    }
    this.commands = JSON.parse(JSON.minify(fs.readFileSync('configs/commands.json', {encoding: 'utf8'})));
    this.help = new Help(this.commands);
};

CLIHandler.prototype.onMessage = function(message) {
    var content = message.content;
    if (content.substring(0, 1) == '!') {
        var args = content.substring(1).split(' ');
        var command = this.commands[args[0]];
        if(command) {
            if(command.enabled){
                switch(command.id) {
                    case 0:
                        //TODO Ping
                        break;
                    case 1:
                        this.help.onMessage(message);
                        break;
                    default:
                        //Should never reach here
                        message.channel.send('', { embed: {
                            title: 'Well This Is Awkward',
                            description: `I'm sorry, I don't know what happened when running \`!${args[0]}\`; it may not be fully setup yet...`,
                            color: 0xffff11,
                            author: {
                              name: context.name
                            },
                            fields: [],
                            footer: {
                                text: `For a list of all commands type "${context.defaults.commands.help}", and I can list everything enabled I know!`
                            }
                        }});
                        break;

                }
            } else {
                message.channel.send('', { embed: {
                    title: 'Command Disabled',
                    description: `Sorry, the command \`!${args[0]}\` is currently disabled in my programming...`,
                    color: 0xff1111,
                    author: {
                      name: context.name
                    },
                    fields: [],
                    footer: {
                        text: `For a list of all commands type "${context.defaults.commands.help}", and I can list everything enabled I know!`
                    }
                }});
            }
        } else {
            message.channel.send('', { embed: {
                title: 'Unknown Command',
                description: `Sorry, I don't know you mean by \`!${args[0]}\``,
                color: 0xff1111,
                author: {
                  name: context.name
                },
                fields: [],
                footer: {
                    text: `For a list of all commands type "${context.defaults.commands.help}", and I can list everything I know!`
                }
            }});
        }
    }
};

module.exports = CLIHandler;
