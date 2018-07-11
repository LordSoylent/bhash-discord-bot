
const IOException = require('../exceptions/IOException');
const ArgumentException = require('../exceptions/ArgumentException');

var fs = require('fs');
var CryptoJS = require("crypto-js");
var arguments = process.argv.slice(2);

if(arguments < 1){
    throw new ArgumentException('You must include Discord key to encrypt! Use flag \'-h\' or \'--help\' for usage!');
} else if(arguments[0].toLowerCase() === '-h' || arguments[0].toLowerCase() === '--help'){
    console.log('Usage:\tnode encrypt.js <Key> <Password>');
} else if(arguments < 2) {
    throw new ArgumentException('You must include secret string to encrypt with! Use flag \'-h\' or \'--help\' for usage!');
} else {
    var ciphertext = CryptoJS.AES.encrypt(arguments[0], arguments[1]);
    console.log('\n\n---------- Save These Somewhere Safe ----------');
    console.log(`Hashed Key: ${ciphertext}`);
    console.log(`Secret Key: ${arguments[1]}`);
    console.log('---------------------------------------------------\n');
    console.log(`Remember to store these somewhere secure! You will need your secret key to start the bot as well!\n`);
    console.log('----------');
    console.log(`Successfully completed encryption process!\nExiting...`);
    console.log('----------\n\n');
}