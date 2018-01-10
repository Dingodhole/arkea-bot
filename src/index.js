//Requirements
import Discord from 'discord.js';
import config from './config.json';
import {getMenu, SetCWeekMenuURL} from './Functions.js';
import {returnThisDay, ConvertToISO, saveMessage} from './Utility.js';
import responses from './responses.json';
import schedule from 'node-schedule';

// Needed for async to work
require("babel-core/register");
require("babel-polyfill");

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
let j = schedule.scheduleJob('0 7 * * *', async () => {
	// Empty config.json to gitignore plsss
 	let channel = bot.guilds.get(config.guildID).channels.get(config.menuChannelID);
	let result = await SetCWeekMenuURL(config.restaurantID);
	let day = returnThisDay();
	getMenu(result, day, channel);
});

bot.on('message', async (message) => {
	let content = message.content.toLowerCase();
	if (content.substring(0, 1) == config.prefix) {
		let args = content.substring(1).split(' ');
		let cmd = args[0];

		//List of awailable commands
		switch(cmd) {
			//Random command, mainly for test purposes
			case 'test':
				message.channel.send("Hello!");
				break;

			//WIP
			case 'help':
				message.channel.send("Commands:");
				//message.channel.send(message.channel);
				break;

			//WIP
			case 'menu':
				let day = ConvertToISO(args[1]);
				let result = await SetCWeekMenuURL(config.restaurantID, day);
				await getMenu(result, day, message.channel);
				break;
		}
	}
});

//To "star" message when star reaction is added
bot.on('messageReactionAdd', (reaction, user) => {
	if (reaction.emoji == "⭐" && reaction.message.guild)
		saveMessage(user, reaction)
});
