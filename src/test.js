require('isomorphic-fetch');

fetch(`https://discordapp.com/api/channels/390464644810276870/messages/`,
  {
    headers: {
      'Authorization': 'Bot ',
    }
  }).then(function (res) {
    return(
      res.json()
    )
  })
  .then(function(json) {
    json.map(function(item) {
      console.log(item.content);
    })
  })
