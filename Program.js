//Requirements
const Discord = require('discord.js');
const config = require("./config.json");
const functions = require("./Functions.js");
const utility = require("./Utility.js");
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
});

//Schedules, updates every day at 7:00AM. Fetches JSON file from Arkea website and extracts the information. Prints corresponding information for each day.
var j = schedule.scheduleJob('0 7 * * *', function(){
 	let channel = bot.guilds.get(config.guildID).channels.get(config.menuChannelID);
	functions.SetCWeekMenuURL("79be4e48-b6ad-e711-a207-005056820ad4", function(result) {
		functions.getMenu(result, utility.returnThisDay(), channel, function(menu) {
			console.log("success");
		});
	});
});

bot.on('message', function (message) {
    let content = message.content.toLowerCase();
    if (content.substring(0, 1) == config.prefix) {
        var args = content.substring(1).split(' ');
        var cmd = args[0];
       	//List of awailable commands
      	switch(cmd) {
            //Random command, mainly for test purposes
            case 'test':
				message.channel.sendMessage("Hello!");
				break;
			
			//WIP under this line
			//-------------------------------------------
			case 'help':
				message.channel.sendMessage("Commands:");
				break;
				
			case 'menu':
				let day = args[1];

				functions.SetCWeekMenuURL("79be4e48-b6ad-e711-a207-005056820ad4", utility.ConvertToISO(day), function(result) {
					//console.log(result);
					functions.getMenu(result, day, message.channel, function(menu) {
						
					});
				});
		}
	}
});

//To "star" message when star reaction is added
bot.on('messageReactionAdd', function(reaction, user) {
	if (reaction.emoji == "⭐" && reaction.message.guild)
		functions.saveMessage(user, reaction)
});
