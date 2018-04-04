"use strict"

import fetch from 'isomorphic-fetch'

/**
* Fetches correct menu for given restaurant at given date.
* @param {string} [sender = ""] - Sender name. Defaults to empy. Only for data collection purposes.
* @param {number} [review = 0.0] - Actual review in decimal format. Defaults to 0.0
* @param {string} [menu = "Uunimakkara"] - Menu for that review. Defaults to Uunimakkara
*/
const cmd = (sender, review, menu) => {
  fetch('/api',
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({sender, review, menu})
  })
  .then(res => console.log(res))
  .catch(res => console.log(res))
}

/**
* Command information
* Displays information about the command and how to use it.
* @prop {string} name - Command name
* @prop {string} category - Command category
* @prop {string} description - Command description
* @prop {string} usage - How to use the command. <cmd_name> (<params>)
*/
cmd.info = {
  name: "AI review",
  category: "Arkea Utils",
  description: "This command feeds info to the database for later usage with ai",
  usage: "review [-n <Number>]"
}

/**
* Command configuration
* @prop {boolean} enabled - Command is enabled/disabled
* @prop {boolean} guildOnly - Should this command be usable only from guild chat
* @prop {string} aliases - List of possible command aliases
* @prop {string} permLevel - Set command permissions level
*/
cmd.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "everyone"
}

export default cmd
