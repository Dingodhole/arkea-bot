//Utility module

module.exports = {
	returnThisDay: function() {
		let d = new Date();
		
		let day = ("0"+ d.getDate()).slice(-2);
		let month = ("0" + (d.getMonth() + 1)).slice(-2);
		let year = d.getFullYear();

		let Today = (year + "-" + month + "-" + day + "T00:00:00");
		
		return Today;
	},
	saveMessage: function(author, reaction) {
		author.send({
			embed: {
				"color": 0x5a5a5a,
				"timestamp": new Date(),
				"fields": [{
					"name": reaction.message.author.username + " in " + reaction.message.guild + ", #" + reaction.message.channel.name,
					"value": reaction.message.content
				}]
			}
		});
		reaction.remove(author).catch((e) => {
			console.log("Cannot remove reaction: " + e);
		});
	}
}
