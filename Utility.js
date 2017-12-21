//Utility module

module.exports = {
	returnThisDay: function() {
		var d = new Date();
		var month = d.getMonth()+1;
		var year = d.getFullYear();
		var day = d.getDate();

		var Today = (year + "-" + month + "-" + day + "T00:00:00");
		
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
		})
	}
}
