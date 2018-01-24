require('isomorphic-fetch');

fetch(`https://discordapp.com/api/channels/390464644810276870/messages/`,
  {
    headers: {
      'Authorization': 'Bot NDA1NjkzMjcxNjc5OTU5MDUw.DUoG1Q.T3CM6mCYlLWDIyhaGDS-XbQAsd0',
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
