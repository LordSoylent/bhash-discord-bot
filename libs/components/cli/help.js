var context = require.main.require('./data/context');

var Help = function(commands) {
    this.commands = commands;
};

Help.prototype.onMessage = function(message) {
    var embed = {
        title: 'Supported Commands',
        description: `Here is a list of commands I currently support!`,
        color: 0xffff11,
        author: {
          name: context.name
        },
        fields: [],
        footer: {
            text: `For a list of all commands type "${context.defaults.commands.help}", and I can list everything enabled I know!`
        }
    };
    for(c in this.commands) {
        var command = this.commands[c];
        if(command && command.enabled && command.public) {
            embed.fields.push({
                name: `!${c}`,
                value: command.description,
                inline: false
            });
        }
    }
    message.channel.send('', { embed: embed });
};

module.exports = Help;
