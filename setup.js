const readline = require('readline');
const art = require('ascii-art');
var CryptoJS = require("crypto-js");

const toolName = "b-hash";
const projectVersion = "1.0.0";
const authors = "Notorious"; // If you contribute, add yourself using a ,; don't be a dick and remove any names, even if you fork

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var fs = require('fs');

JSON.minify = JSON.minify || require("node-json-minify");

// Context boilerplate file
var contextBoiler = './configs/context.boiler.json';
var setupRPCClient = false;

// Ensure we have a valid context file
if (!fs.existsSync(contextBoiler)){
    logger.warn(`Could not locate '${contextBoiler}'! Ensure the file exsits, and try again!`);
    return;
}

var context = require(contextBoiler);

function promptInput (prompt, handler)
{
    rl.question(prompt, input =>
    {
        if (handler(input) !== false)
        {
            promptInput(prompt, handler);
        } else {
            rl.close();
        }
    });
}
console.log('Welcome to the Discord bot setup tool presented by...');
art.font(toolName, 'Doom', function(rendered){
    console.log(rendered);
    console.log(`Version: ${projectVersion}`);
    console.log(`Developed By: ${authors}`);
    console.log(`Starting tool...\n`);
    setTimeout(() => {
        runSetup();
    }, 1000); // To make sure everything logged correctly
});

function runSetup() {
    console.log('I need to ask some questions to properly setup and secure your bot.');
    rl.question('What do you want to name your bot?\n', (answer) => {
        context.name = answer;
        context.logger.file = context.logger.file.replace('[placeholder]', answer).replace(' ', '_');
        rl.question('Do you want to define a version (Leave blank if you would like the default of "1.0.0")?\n', (answer) => {
            if(!answer || answer.length <= 0) {
                answer = "1.0.0";
            }
            context.version = answer;
            rl.question('What is your Discord authentication key?\n', (answer) => {
                if(!answer || answer.length <= 0) {
                    console.error('You must enter authentication key to complete setup!');
                    rl.close();
                } else {
                    context.key.value = answer;
                    rl.question('Do you want to setup a RPC client now? [y/n]\n', (answer) => {
                        if(answer && answer.toLocaleLowerCase() === 'y') {
                            rl.question('What host would you like to connect to? (Ex. 127.0.0.1)\n', (answer) => {
                                if(!answer || answer.length <= 0) {
                                    console.error('You must enter a host to continue! Ignoring RPC client setup!');
                                    continueSetup();
                                }
                                context.key.rpc.host = answer;
                                rl.question('What port would you like to use? (Ex. 17654)\n', (answer) => {
                                    if(!answer || answer.length <= 0) {
                                        console.error('You must enter a port to continue! Ignoring RPC client setup!');
                                        continueSetup();
                                    }
                                    context.key.rpc.port = answer;
                                    rl.question('What is your "rpcuser"? (Ex. somerandomname)\n', (answer) => {
                                        context.key.rpc.user = answer;
                                        rl.question('What is your "rpcpassword"? (Ex. somerandomname)\n', (answer) => {
                                            context.key.rpc.password = answer;
                                            rl.question('What protocol would you like to use for connection? (Leave blank for the default value of "http")\n', (answer) => {
                                                if(!answer || answer.length <= 0) {
                                                    answer = 'http';
                                                }
                                                context.key.rpc.protocol = answer;
                                                setupRPCClient = true;
                                                continueSetup();
                                            });
                                        });
                                    });
                                });
                            });
                        } else {
                            continueSetup();
                        }
                    });
                }
            });
        });
    });
}

function continueSetup() {
    rl.question('Do you want to encrypt your data? (Reccomended) [y/n]\n', (answer) => {
        if(answer && answer.toLocaleLowerCase() === 'y') {
            rl.question('What password would you like to encrypt your data with?\n', (answer) => {
                if(!answer || answer.length <= 0) {
                    console.error('You must enter password to encrypt with data! Ignoring encryption!');
                    finalizeSetup();
                } else {
                    context.key.encrypt = true;
                    context.key.value = CryptoJS.AES.encrypt(context.key.value, answer).toString();
                    if(setupRPCClient){
                        context.key.rpc.host = CryptoJS.AES.encrypt(context.key.rpc.host, answer).toString();
                        context.key.rpc.port = CryptoJS.AES.encrypt(context.key.rpc.port, answer).toString();
                        if(context.key.rpc.user && context.key.rpc.user.length > 0){
                            context.key.rpc.user = CryptoJS.AES.encrypt(context.key.rpc.user, answer).toString();
                        }
                        if(context.key.rpc.password && context.key.rpc.password.length > 0){
                            context.key.rpc.password = CryptoJS.AES.encrypt(context.key.rpc.password, answer).toString();
                        }
                    }
                    finalizeSetup();
                }
            });
        } else {
            finalizeSetup();
        }
    });
}

function finalizeSetup() {
    rl.close();
    if(context.key.encrypt){
        console.warn('Remember and protect your encryption password! It\'s needed to start the bot!');
    }
    console.log('That\'s all the questions I need! Let me finalize and generate everything needed for your bot!');
    console.log('Please wait...');
    setTimeout(() => {
        let dest = contextBoiler.replace('boiler.', '');
        fs.writeFile(dest, JSON.stringify(context, null, 2), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('Writing bot data to: ' + dest);
            console.log(`${context.name} is now ready to run! If you need to make changes to any of your answers, you can edit '${dest}' to apply them.`);
            console.log(`Thank you for using ${toolName} Discord bot setup tool!`);
        });
    }, 1000);
}


