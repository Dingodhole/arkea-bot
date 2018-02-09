let fs = require("fs");
let PDFParser = require("pdf2json");

let poikkeus = false;

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );

pdfParser.on("pdfParser_dataReady", pdfData => {
	let rawTexts = pdfData.formImage.Pages[0].Texts;

  	let info = {};
	let atmName = "";

	rawTexts.forEach(item => {
		let text = item.R[0].T.replace(/%20/g, " ").replace(/%2F/g, ", ").replace(/%3A/g, ".").replace("0-1", "0 - 1").replace(/%C3%84/g, "Ä");
		if (!poikkeus) {
			if(text.substring(0, 3) === "klo") {
				info[text] = [];
				atmName = text;
			} else if (atmName !== ""){
				info[atmName].push(text);
			}
		} else {
			if(text.substring(0, 3) === "10." || text.substring(0, 3) === "11." || text.substring(0, 3) === "12.") {
				console.log
				info[text] = [];

				atmName = text;
			} else if (atmName !== ""){
				info[atmName].push(text);
			}
		}
	})

	let days = {};
	["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai"].forEach(date => {days[date] = {}});

	for(let time in info) {
		let c = 0;
		for(let day in days) {
			//info[time][c++]
			if(poikkeus) {
				days[day][time.substring(0, 13)] = days[day][time.substring(0, 13)] === undefined ? info[time][c++] : days[day][time.substring(0, 13)] + ", " + info[time][c++];	
			} else {
				days[day][time.substring(0, 17)] = days[day][time.substring(0, 17)] === undefined ? info[time][c++] : days[day][time.substring(0, 17)] + ", " + info[time][c++];
			}
		}
	}

	if(poikkeus)
		fs.writeFile("./poikkeusTimetable.json", JSON.stringify(days, null, 2));
	else
		fs.writeFile("./timetable.json", JSON.stringify(days, null, 2));
	console.log("Done");
});

pdfParser.loadPDF("./times.pdf");
