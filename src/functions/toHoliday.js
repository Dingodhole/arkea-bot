import fetch from 'isomorphic-fetch'

const func = (RestaurantID, ...other) => {
  let date1 = new Date();
	let kesa = new Date("2018-06-02T12:00:00+02:00");
	let vappu = new Date("2018-04-30T12:00:00+02:00");
	let helatorstai = new Date("2018-05-10T12:00:00+02:00");
	let timeDiff = 0;
	let diffDays = 0;
	return (loma) => {
		if(loma) {
			switch (loma) {
				case 'vappu':
					timeDiff = Math.abs(vappu.getTime() - date1.getTime());
					diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
					return (diffDays-1) + " vappuun"
					break;
				case 'helatorstai':
					timeDiff = Math.abs(helatorstai.getTime() - date1.getTime());
					diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
					return (diffDays-1) + " helatorstaihin"
					break;
				default:
					timeDiff = Math.abs(kesa.getTime() - date1.getTime());
					diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
					return (diffDays-1) + " kesälomaan"
			}
		} else {
			timeDiff = Math.abs(kesa.getTime() - date1.getTime());
			diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
			return (diffDays-1) + " kesälomaan"
		}
	}
}

func.info = "Gets json for current week"

export default func
