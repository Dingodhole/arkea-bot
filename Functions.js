require('isomorphic-fetch');

module.exports = {
	returnThisDay: function() {
		var d = new Date();
		var month = d.getMonth()+1;
		var year = d.getFullYear();
		var day = d.getDate();

		var Today = (year + "-" + month + "-" + day + "T00:00:00");
		
		return Today;
	},
	
	getMenu: function(UrlJSON, day, channel, callback) {
		var MainMeal = "";
		var SecondMeal = "";
		
		fetch(UrlJSON)
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then(function(data) {
				for(let i = 0, l = data.Days.length; i < l; i++) {
					if (data.Days[i].Date === day) {
						var cut = data.Days[i].Meals;
						
						//Main meal
						MainMeal += cut[0].Name + "\n";
						
						//Vegetarian
						SecondMeal += cut[1].Name + "\n";
					}
				}
							
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
							"value": MainMeal,
							"inline": true
					},
					{
					  "name": "Kasvislounas:",
					  "value": SecondMeal,
					  "inline": true
					}
					]
				  }
				});
				
			});	
	},


	//This function returns correct JSON file for corresponding week. Requires valid RestaurantId. Should be used only with scheduling to avoid unnecessary resource usage. 
	SetCWeekMenuURL: function(RestaurantID, callback) {
		//Some essential local variables to make my day easier, don't complain
		var JMenus; 				//undefined, defined after finding valid ID
		var LinkJSON; 				//undefined, defined after finding correct week
		
		//Initializing local variables for finding right week
		var Today = new Date(); 	//set today
		var Start; 					//undefined, start date
		var End; 					//undefined, end date
		
		var Error;					//undefined, error variable
		
		fetch('https://ruokalistatkoulutjapaivakodit.arkea.fi/AromiStorage/blob/main/AromiMenusJsonData')
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then(function(data) {
				//Run through array
				for(let i = 0, l = data.Restaurants.length; i < l; i++) {
					//Try to find array int for given RestaurantID for further use.
					if(data['Restaurants'][i]['RestaurantId'] === RestaurantID) {
						JMenus = data['Restaurants'][i]['JMenus'];
						
						/* //Commented out to give more freedom when checking invalid RestaurantID
						for(let i = 0, l = JMenus.length; i < l; i++) {
							Start = new Date(JMenus[i].Start);
							End = new Date(JMenus[i].End);
							if(Today > Start && Today < End === true) {
								LinkJSON = (JMenus[i]['LinkUrl']);
								//console.log(LinkJSON);
								callback(LinkJSON);
							}				 
						}
						*/
						
						break;
					}
				}

				//Check if JMenus is empty = undefined, most likely RestaurantID is invalid
				if(JMenus !== undefined && JMenus.length) {
					for(let i = 0, l = JMenus.length; i < l; i++) {
						Start = new Date(JMenus[i].Start);
						End = new Date(JMenus[i].End);
						if(Today > Start && Today < End === true) {
							LinkJSON = (JMenus[i]['LinkUrl']);
							//console.log(LinkJSON);
							callback(LinkJSON);
						}				 
					}
				}
				
				//Checks if JMenus is undefined. If it's undefined, then most likely RestaurantID is invalid.
				else if (JMenus === undefined) {
					Error = "Please enter valid ID";
					//console.log(Error);
					callback(Error);
				}
				
				//To those random unknown errors.
				else {
					Error = "Unknown error occured, please contact system administrator";
					//console.log(Error);
					callback(Error);
				}
			});
	}	
}
