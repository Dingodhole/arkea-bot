//Force require
function requireF(modulePath){
    try {
		return require(modulePath);
    }
    catch (e) {
		console.log('requireF(): The file "' + modulePath + '".js could not be loaded.');
		return false;
	}
}

//Requirements
const Discord = requireF('discord.js');
const config = requireF("./config.json");
const functions = requireF("./Functions.js");
const responses = requireF('./responses.json');
const schedule = requireF('node-schedule');


const client = new Discord.Client();

//Load permissions file
const permissions = require('./permissions.json');

//Client login, errors to log
client.login(config.token)
.catch((e) => {
	console.log(e);
})

//Informs successful login to the console
client.on('ready', () => {
    console.log('Connected');
  	console.log("Bot has started. Logged in as " + client.user.username + ". Connected to " + client.guilds.size + " servers");
  	client.user.setGame(config.currentGame);
  }
);

//Schedules, updates every day at 7:00AM. Fetches JSON file from Arkea website and extracts the information. Prints corresponding information for each day.
var j = schedule.scheduleJob('0 7 * * *', function(){
 	let channel = client.guilds.get(config.guildID).channels.get(config.menuChannelID);
 	functions.getMenu(functions.returnThisDay(), channel);
});

//How bot will act on incoming messages.
client.on('message', function (message) {
    let content = message.content.toLowerCase();
    if (content.substring(0, 1) == config.prefix) {
        var args = content.substring(1).split(' ');
        var cmd = args[0];
       	//List of awailable commands
      	switch(cmd) {
            //WIP, ables graceful shutdown of the program
            case 'shutdown':
              if (message.author.id == config.sysadmin) {
                message.channel.send("Authorized as " + message.author.id + "\nLogging events\nShutting down client");
              } else {
                message.channel.send(responses.fauth);
              }
              break;
            
			//Random command, mainly for test purposes
            case 'kek':
              if (message.user.id == auth.sysadmin) {
                message.channel.send("Hello, " + message.user.username + "!");
              } else {
                message.channel.send('Nou kän du!');
              }
              break;
			
			//Other commands used for testing
            case 'ping':
                message.channel.send('Ponk');
                break;

            case 'help':
                message.channel.send("Write &menu [viikon päivä]");
                break;

            case 'aikataulu':
                message.channel.send({
                  embed: {
                    "color": 2134768,
                    "description": "[here]()",
                    "timestamp": new Date()
                  }
                });
                break;
				
			//Main command for seeking x day's menu
            case 'menu':
				try {
					var number = 20;
					try {
						var arg = args[1].toLowerCase();
					}
					
					catch(err) {
						console.log("<" + message.author.id + "> | Failed to user command");
						message.channel.send("No can do! Laitas sitä päivän nimeä sinne perään...");	
					}

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
				
				catch(err) {
					console.log("<" + message.author.id + "> | " + err);
					message.channel.send("No can do! Laitas sitä päivän nimeä sinne perään...");	
				}
         }
     }
});

//To "star" message when star reaction is added
client.on('messageReactionAdd', function(reaction, user) {
  if (reaction.emoji == "⭐" && reaction.message.guild)
    functions.saveMessage(user, reaction)
});

