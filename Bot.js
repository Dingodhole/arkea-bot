//Requirements
var Discord = require('discord.io');
var auth = require('./auth.json');
var responses = require('./responses.json');
var settings = require('./settings.json');
require('isomorphic-fetch');

var schedule = require('node-schedule');

//Creates discord client for bot user
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

//List of month names (perhaps move to own json file)
var monthNames = [
    "Tammikuuta", "Helmikuuta", "Maaliskuuta",
    "Huhtikuuta", "Toukokuuta", "Kesäkuuta", "Heinäkuuta",
    "Elokuuta", "Syyskuuta", "Lokakuuta",
    "Marraskuuta", "Joulukuuta"
  ];


//Get the menu from arkea site
function getMenu(n) {
	fetch('https://www.arkea.fi/fi/ruokalista/43/lista')
  	.then(function(response) {
    	if (response.status >= 400) {
      	bot.sendMessage({
        	to: channelID,
          message: "Network error occured! I probably just crashed and went offline :( Fuck arkea servers"
        });
			}
       return response.json();
    })
    .then(function(menu) {  
    	var month = parseInt(menu.MenusForDays[number].Date.substring(5,7));
      var day = parseInt(menu.MenusForDays[number].Date.substring(8,10));
      var date = day.toString() + '. ' + monthNames[month-1] + " \n";

      var message = "```css\n" + date + "Lounas: \n";

      if (menu.MenusForDays[number].SetMenus.hasOwnProperty("Lounas")) {

      	for (let item in menu.MenusForDays[number].SetMenus.Lounas.Components.Dish) {
        	if (menu.MenusForDays[number].SetMenus.Lounas.Components.Dish[item] != "Uunimakkara (M, L, G, K)")
        		message += "   " + menu.MenusForDays[number].SetMenus.Lounas.Components.Dish[item] + "\n";
          else
          	message += "   UUUUUUUUUUUUUUUNIMAKKKARAAAAAAAAAAAA BOIIIIIIIIIIIIIIII YEAHHHHHHHHHHHH BOIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII \n";
        }
			}

			if (menu.MenusForDays[number].SetMenus.hasOwnProperty("Kasvislounas")) {

      	message += " ``` ```fix\n Kasvislounas: \n"

        for (let item in menu.MenusForDays[number].SetMenus.Kasvislounas.Components.Dish) {
          message += "   " + menu.MenusForDays[number].SetMenus.Kasvislounas.Components.Dish[item] + "\n";
        } 
    	}
                            
    	message += "```";

    	bot.sendMessage({
      	to: channelID,
    		message: message
  		});
	}); 
}

//Schedules, updates every day at 7:00AM. Fetches JSON file from Arkea website and extracts the information. Prints corresponding information for each day.
var j = schedule.scheduleJob('7 * * *', function(){
	var d = new Date();
	var n = d.getDay()-1;
	
  getMenu(n);
	
	});
 
//Informs successful login to the console
bot.on('ready', function (evt) {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
});

//How bot will act on incoming messages.
bot.on('message', function (user, userID, channelID, message, evt) {
    
    if (message.substring(0, 1) == settings.prefix) {
        message = message.toLowerCase();
        var args = message.substring(1).split(' ');
        var cmd = args[0];
		msg = message;
       //List of awailable commands
        switch(cmd) {
		//WIP, ables graceful shutdown of the program
		case 'shutdown':
			if (userID == auth.sysadmin) {
				var message = "Authorized as " + user + "\nLogging events\nShutting down client";
				bot.sendMessage({
					to: channelID,
					message: message
				});
			} else {
				bot.sendMessage({
					to: channelID,
					message: responses.fauth
				});
			}
			break;
		//Random command, mainly for test purposes
		case 'kek':
			if (userID == auth.sysadmin) {
				var message = "Hello, " + user + "!";
				bot.sendMessage({
					to: channelID,
					message: message
				});

			} else {
				bot.sendMessage({
					to: channelID,
					message: 'No can do'
				});
			}
			break;
		//Another command used for test purposes	
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;

            case 'GitGud':
                bot.sendMessage({
                    to: channelID,
                    message: "Can't I'm a living god tbh"
                });
                break;

            case 'ban':
                bot.sendMessage({
                    to: channelID,
                    message: 'Done (not really but you were scared right??)'
                });
                break;

            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'Write "&menu [viikonpäivä]"'
                });
                break;
	//Main command for seeking x day's menu
            case 'menu':
                var number = 20;

                var argNumber = args[1].toLowerCase();

                paiva:
                switch(argNumber) {
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
                    getMenu(number);
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: "Invalid command!"
                    });
                }

                break;
         }
     }
});
