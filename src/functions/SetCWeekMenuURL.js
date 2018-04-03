import fetch from 'isomorphic-fetch'

// This function returns correct JSON file for corresponding week. Requires valid RestaurantId. Should be used only with scheduling to avoid unnecessary resource usage.
// Async needed for await and ...other for extra args in future
const func = async (RestaurantID, ...other) => {
	return new Promise(async (resolve, reject) => {
  	// URL should be moved to config file.
    let data = await fetch('https://ruokalistatkoulutjapaivakodit.arkea.fi/AromiStorage/blob/main/AromiMenusJsonData')
      .then((response) => {
          if (response.status >= 400) {
              throw new Error("Bad response from server")
          }
          return response.json()
      })
      .catch((e) => console.log(e))

    // Find correct restaurant with given RestaurantID.
    let restaurant = data.Restaurants.find((obj) => (obj.RestaurantId === RestaurantID))
		let today
		let date = other.find((obj) => (typeof(Date)))
		if(date !== undefined) {
		    today = new Date(date)
		} else {
		    today = new Date()
		}

    if(restaurant !== undefined) {
        restaurant.JMenus.map((obj) => {
          let start = new Date(obj.Start)
          let end = new Date(obj.End)
          if(today >= start && today <= end) {
	          let LinkJSON = obj.LinkUrl
	          resolve(LinkJSON)
          }
      })
    } else {
      reject("Invalid restaurant ID")
    }

  })
}


func.info = "Gets json for current week"

export default func
