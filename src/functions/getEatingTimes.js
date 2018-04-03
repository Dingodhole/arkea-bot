import fetch from 'isomorphic-fetch'

const days = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai"]

const func = async ( atmClass, data ) => {
  if(atmClass === undefined) {
    return "Class needed"
  }
  let n = new Date().getDay() - 1
  if (n < 0 || n >= 5) {
    return "Invalid day"
  }
  const day = days[n]
  let times = data[day]
  for (let time in times) {
    if(times[time].toLowerCase().includes(atmClass.toLowerCase())) {
      return time
    }
  }
  return "Can't find that class for that day"
}


func.info = "Return the time for eating"

export default func
