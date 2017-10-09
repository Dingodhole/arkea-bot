//Requirements
const Discord = require('discord.js');
const config = require("./config.json");
const functions = require("./Functions.js");
const responses = require('./responses.json');
const schedule = require('node-schedule');


const bot = new Discord.Client();
bot.login(config.token)
.catch((e) => {
  console.log(e);
})

//Informs successful login to the console
bot.on('ready', () => {
    console.log('Connected');
  	console.log("Bot has started. Logged in as " + bot.user.username + ". Connected to " + bot.guilds.size + " servers");
  	bot.user.setGame(config.currentGame);
  }
);

//Schedules, updates every day at 7:00AM. Fetches JSON file from Arkea website and extracts the information. Prints corresponding information for each day.
var j = schedule.scheduleJob('0 7 * * *', function(){
 	let channel = bot.guilds.get(config.guildID).channels.get(config.menuChannelID);
 	functions.getMenu(functions.returnThisDay(), channel);
});

//How bot will act on incoming messages.
bot.on('message', function (message) {
    let content = message.content.toLowerCase();
    if (content.substring(0, 1) == config.prefix) {
        var args = content.substring(1).split(' ');
        var cmd = args[0];
       	//List of awailable commands
      	switch(cmd) {
            //WIP, ables graceful shutdown of the program
            case 'shutdown':
              if (message.author.id == config.sysadmin) {
                message.channel.sendMessage("Authorized as " + message.author.id + "\nLogging events\nShutting down client");
              } else {
                message.channel.sendMessage(responses.fauth);
              }
              break;
            //Random command, mainly for test purposes
            case 'kek':
              if (message.user.id == auth.sysadmin) {
                message.channel.sendMessage("Hello, " + message.user.username + "!");
              } else {
                message.channel.sendMessage('Nou kän du!');
              }
              break;
						//Other commands used for testing
            case 'ping':
                message.channel.sendMessage('Ponk');
                break;

            case 'GitGud':
                message.channel.sendMessage("Can't I'm living god tbh");
                break;

            case 'help':
                message.channel.sendMessage("Write &menu [viikon päivä]");
                break;

            case 'aikataulu':
                message.channel.sendMessage({
                  embed: {
                    "color": 2134768,
                    "description": "[here](http://www.kerttulinlukio.fi/sites/default/files/LIITETIEDOSTOT/Ruokailujen%20porrastus%202017-2018%20JAKSO%201.pdf)",
                    "timestamp": new Date()
                  }
                });
                break;
	//Main command for seeking x day's menu
            case 'menu':
                var number = 20;

                var arg = args[1].toLowerCase();

                paiva:
                switch(arg) {
                    case 'maanantai':
                        number = 0;
                        break paiva;

                    case 'tiistai':
                        number = 1;
                        break paiva;

                    case 'keskiviikko':
                        number = 2;
                        break paiva;

                    case 'torstai':
                        number = 3;
                        break paiva;

                    case 'perjantai':
                        number = 4;
                        break paiva;

                    default: ;
                }


                if (number < 5 && number >= 0){
                    functions.getMenu(number, message.channel);
                } else {
                    message.channel.send("Nou kän du. Try valid day")
                }

                break;
         }
     }
});

