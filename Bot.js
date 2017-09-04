var Discord = require('discord.io');
var auth = require('./auth.json');
var responses = require('./responses.json');
var settings = require('./settings.json');
require('isomorphic-fetch');

var schedule = require('node-schedule');

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

var monthNames = [
    "Tammikuuta", "Helmikuuta", "Maaliskuuta",
    "Huhtikuuta", "Toukokuuta", "Kesäkuuta", "Heinäkuuta",
    "Elokuuta", "Syyskuuta", "Lokakuuta",
    "Marraskuuta", "Joulukuuta"
  ];


var j = schedule.scheduleJob('15 8 * * *', function(){
	var d = new Date();
	var n = d.getDay()-1;

	fetch('https://www.arkea.fi/fi/ruokalista/43/lista')
		.then(function(response) {
			if (response.status >= 400) {
				bot.sendMessage({
					to: auth.channelID,
					message: reponses.timeout
				});
			}
			return response.json();
		})
		.then(function(menu) {  
			var month = parseInt(menu.MenusForDays[n].Date.substring(5,7));
			var day = parseInt(menu.MenusForDays[n].Date.substring(8,10));
			var date = day.toString() + '. ' + monthNames[month-1] + " \n";

			var message = "```css\n" + date + "Lounas: \n";

			if (menu.MenusForDays[n].SetMenus.hasOwnProperty("Lounas")) {

			   for (let item in menu.MenusForDays[n].SetMenus.Lounas.Components.Dish) {
					message += "   " + menu.MenusForDays[n].SetMenus.Lounas.Components.Dish[item] + "\n";
				}
			}

			if (menu.MenusForDays[n].SetMenus.hasOwnProperty("Kasvislounas")) {

			   message += " ``` ```fix\n Kasvislounas: \n"

				for (let item in menu.MenusForDays[n].SetMenus.Kasvislounas.Components.Dish) {
					message += "   " + menu.MenusForDays[n].SetMenus.Kasvislounas.Components.Dish[item] + "\n";
				} 
			}
			
			message += "```";

			bot.sendMessage({
				to: auth.channelID,
				message: message
			});
		});
		console.log('Ruokalista toimitettu');
	});
 
  
bot.on('ready', function (evt) {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    
    if (message.substring(0, 1) == settings.prefix) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
		msg = message;
       
        switch(cmd) {
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

            case 'menu':
                var number = 20;

                var argNumber = args[1];

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
                                    message += "   " + menu.MenusForDays[number].SetMenus.Lounas.Components.Dish[item] + "\n";
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