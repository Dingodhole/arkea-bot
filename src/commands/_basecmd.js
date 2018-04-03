"use strict"

/**
* List possible params here
*/
const cmd = () => {
  // Code to be executed
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
    name: "",
    category: "",
    description: "",
    usage: ""
}

/**
* Command configuration
* @prop {boolean} enabled - Command is enabled/disabled
* @prop {boolean} guildOnly - Should this command be usable only from guild chat
* @prop {string} aliases - List of possible command aliases
* @prop {string} permLevel - Set command permissions level
*/
cmd.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: ""
}

export default cmd
