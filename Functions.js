require('isomorphic-fetch');

const monthNames = [
    "Tammikuuta", "Helmikuuta", "Maaliskuuta",
    "Huhtikuuta", "Toukokuuta", "Kesäkuuta", "Heinäkuuta",
    "Elokuuta", "Syyskuuta", "Lokakuuta",
    "Marraskuuta", "Joulukuuta"
  ];

module.exports  = {
  getMenu: function (n, channel) {
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
  			if (menu.MenusForDays[n].SetMenus.hasOwnProperty("Kasvislounas")){
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
  },

  returnThisDay: function() {
  	var d = new Date();
  	return d.getDay()-1;
  },

  saveMessage: function(author, reaction) {
    author.send({
      embed: {
        "color": 0x5a5a5a,
        "timestamp": new Date(),
        "fields": [
        {
          "name": reaction.message.author.username + " in " + reaction.message.guild + ", #" + reaction.message.channel.name,
          "value": reaction.message.content
        }
        ]
      }
    });
    reaction.remove(author).catch((e) => {
      reaction.message.channel.send("Can't delete reaction. " + e);
    })
  }
}
