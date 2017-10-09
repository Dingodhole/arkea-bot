//Requirements
const Discord = require('discord.js');
const config = require("./config.json");
const responses = require('./responses.json');

require('isomorphic-fetch');
const schedule = require('node-schedule');

const monthNames = [
    "Tammikuuta", "Helmikuuta", "Maaliskuuta",
    "Huhtikuuta", "Toukokuuta", "Kesäkuuta", "Heinäkuuta",
    "Elokuuta", "Syyskuuta", "Lokakuuta",
    "Marraskuuta", "Joulukuuta"
  ];
const bot = new Discord.Client();
bot.login(config.token)
.catch((e) => {
  console.log(e);
})

//Informs successful login to the console
bot.on('ready', () => {
    console.log('Connected');
  	console.log("Bot has started. Logged in as " + bot.user.username + ". Connected to " + bot.guilds.size + " servers");
  	bot.user.setGame('arkea servers');
  }
);

//Schedules, updates every day at 7:00AM. Fetches JSON file from Arkea website and extracts the information. Prints corresponding information for each day.
//   var j = schedule.scheduleJob('* * * * * *', function(){
//  	let channel = bot.quilds.get("346637688646008843").channels.get("359247891958726656");
//  	getMenu(returnThisDay(), channel);
// });

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
              if (message.user.id == config.sysadmin) {
                message.channel.sendMessage("Authorized as " + message.user.id + "\nLogging events\nShutting down client");
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
                    getMenu(number, message.channel);
                } else {
                    message.channel.send("Nou kän du. Try valid day")
                }

                break;
         }
     }
});

function getMenu(n, channel) {
	fetch('https://www.arkea.fi/fi/ruokalista/43/lista')
  	.then(function(response) {
    	if (response.status >= 400) {
      	channel.send("Network error occured! I probably just crashed and went offline :( Fuck arkea servers");
			}
       return response.json();
    })
    .then(function(menu) {
    	var month = parseInt(menu.MenusForDays[n].Date.substring(5,7));
      var day = parseInt(menu.MenusForDays[n].Date.substring(8,10));
      var date = day.toString() + '. ' + monthNames[month-1];

    	var mainMeal = "```\n"
      if (menu.MenusForDays[n].SetMenus.hasOwnProperty("Lounas")) {

      	for (let item in menu.MenusForDays[n].SetMenus.Lounas.Components.Dish) {
        	if (menu.MenusForDays[n].SetMenus.Lounas.Components.Dish[item] != "Uunimakkara (M, L, G, K)")
        		mainMeal += menu.MenusForDays[n].SetMenus.Lounas.Components.Dish[item].split('(')[0] + "  \n";
          else
          	mainMeal += "   UUUUUUUUUUUUUUUNIMAKKKARAAAAAAAAAAAA BOIIIIIIIIIIIIIIII YEAHHHHHHHHHHHH BOIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII \n";
        }
			}
			mainMeal += "```";

    	var secondMeal = " ```\n"
			if (menu.MenusForDays[n].SetMenus.hasOwnProperty("Kasvislounas")) {

        for (let item in menu.MenusForDays[n].SetMenus.Kasvislounas.Components.Dish) {
          secondMeal += menu.MenusForDays[n].SetMenus.Kasvislounas.Components.Dish[item].split('(')[0] + "  \n";
        }
    	}

    	secondMeal += "```";

    	channel.send({
        embed: {
          "color": 2134768,
          "timestamp": new Date(),
          "footer": {
          "icon_url": "https://pbs.twimg.com/profile_images/441542471760097280/9sDmsLIm_400x400.jpeg",
          "text": "© N Production. Hosted by Gaz"
          },
          "fields": [
          {
            "name": "Lounas:",
            "value": mainMeal,
            "inline": true
          },
          {
            "name": "Kasvislounas:",
            "value": secondMeal,
            "inline": true
          }
          ]
        }
      });
    });
}

function returnThisDay() {
	var d = new Date();
	return d.getDay()-1;
}
