
var Pools = function() {
    if (!fs.existsSync('configs/pools.json')){
        console.log('Could not locate `pools/commands.json`! Ensure the file exsits, and try again!');
        return;
    }
    this.pools = JSON.parse(JSON.minify(fs.readFileSync('pools/commands.json', {encoding: 'utf8'})));
};

Pools.prototype.onMessage = function(message, args) {
    if(args.length > 1){
        if(args[1] === 'list') {
            
        }
    } else {
        //TODO tell user wrong args
    }
};

module.exports = Pools;