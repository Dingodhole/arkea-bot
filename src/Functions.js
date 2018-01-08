import fetch from 'isomorphic-fetch'

// Function to get menu. Async needed for await and ...other for extra args in future
async function getMenu(UrlJSON, day, channel, ...other) {

	// Fetch data and save it asynchronously to data. Await needed in order for software to write
	let data = await fetch(UrlJSON)
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.catch((e) => console.log(e))

	// Find object for right day and store it to variable cut
	let cut = data.Days.find((obj) => (obj.Date === day))

	//Main meal
	MainMeal += cut[0].Name + "\n";
	//Vegetarian
	SecondMeal += cut[1].Name + "\n";

	//Send embbed message
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
};

// This function returns correct JSON file for corresponding week. Requires valid RestaurantId. Should be used only with scheduling to avoid unnecessary resource usage.
// Async needed for await and ...other for extra args in future
async function SetCWeekMenuURL(RestaurantID, ...other) {

	// URL should be moved to config file.
	let data = await fetch('https://ruokalistatkoulutjapaivakodit.arkea.fi/AromiStorage/blob/main/AromiMenusJsonData')
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.catch((e) => console.log(e))

		// Find correct item from array. If not found will return undefined
		let restaurant = data.Restaurants.find((obj) => (obj.RestaurantId === RestaurantID));

		if(restaurant !== undefined) {
			restaurant.JMenus.map((obj) => {
				let start = new Date(obj.Start);
				let end = new Date(obj.End);
				let today = new Date();
				if(today > start && today < end) {
					let LinkJSON = obj.LinkUrl;
					return LinkJSON;
				}
			})
		} else {
			throw new Error("Invalid restaurant ID");
		}

}

// Export both functions
export {getMenu, SetCWeekMenuURL}
