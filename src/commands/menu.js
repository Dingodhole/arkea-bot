"use strict"

import config from '../../config/config.json'
import { getMenu, SetCWeekMenuURL } from '../functions';

/**
* Fetches correct menu for given restaurant at given date.
* @param {string} [id = config.restaurantID] - Restaurant ID. Defaults to guild's restaurant ID.
* @param {Date} [day = new Date()] - Sets day. Defaults to today.
*/
const cmd = async (id = config.restaurantID, day = new Date()) => {
  let result = await SetCWeekMenuURL(id, day);
  await getMenu(result, day, message.channel);
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
  name: "menu",
  category: "Arkea Essentials",
  description: "Fetches menu for given date. You can use your own restauran ID and day. Defaults to your guild's default restaurant ID and date is set for today.",
  usage: "menu [-Id <restaurantID>] [-d <day>]"
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
