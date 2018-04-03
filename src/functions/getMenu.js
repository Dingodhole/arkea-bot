import fetch from 'isomorphic-fetch'
import toHoliday from './toHoliday'

// Function to get menu. Async needed for await and ...other for extra args in future
const func = async ( UrlJSON, day, channel, ...other ) => {
	// Fetch data and save it asynchronously to data. Await needed in order for software to write
	let data = await fetch(UrlJSON)
		.then((response) => {
		    if (response.status >= 400) {
		        throw new Error("Bad response from server")
		    }
		    return response.json()
		})
		.catch((e) => console.log(e))

	// Find object for right day and store it to variable cut.
	try {
		var cut = data.Days.find((obj) => (obj.Date === day)).Meals
	}
	catch (e) {
		console.log(e)
	}

	//Main meal
	let MainMeal = cut[0].Name.replace('Uunimakkara', 'UUUNIMAKKARAAAOUUUHHYEAAHAHABOIIIII') + "\n"

	//Vegetarian
	let SecondMeal = cut[1].Name + "\n"

	//Send embbed message
	channel.send({
		embed: {
			"color": 2134768,
			"timestamp": new Date(),
			"footer": {
				"icon_url": "https://pbs.twimg.com/profile_images/441542471760097280/9sDmsLIm_400x400.jpeg",
				"text": "© N Production. Hosted by Gaz, " + toHoliday()()
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
	})
}

func.info = "Sends menu for given params"

export default func
