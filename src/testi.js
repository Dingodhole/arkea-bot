let date1 = new Date();
let date2 = new Date("2018-06-02T12:00:00+02:00");
let timeDiff = Math.abs(date2.getTime() - date1.getTime());
let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
console.log(diffDays-1)