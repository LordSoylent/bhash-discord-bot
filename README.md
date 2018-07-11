# bhash-discord-bot
Open-source Discord bot designed for the b-hash channel.

## Requirements
* NodeJS 8.x.x or higher
* NPM

## Usage
We have tried our best to make this easy to setup and secure by creating a simple build file. This build file will create the needed context file for the bot, and encrypt the authentication key if specified.
### Run Setup
To run the build file simply run the following command in the root directory of the project.
`node setup`
Then answer all the prompts, once completed it will generate the context file needed to run the bot.

#### Key Authentication
During the setup process, you will be asked if you want to encrypt your Discord authenticaiton key. This will then ask for a password, which will be used to encrypt the key with. *REMEMBER AND PROTECT THIS PASSWORD!* This password will be required to run the bot!

### Start Bot
The command for the starting the bot is as follows:
`node app <encryption_password>`
If you have chose not to encrypt your authentication key, you can leave the field blank.
