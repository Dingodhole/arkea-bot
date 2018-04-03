import config from '../../config/config.json'
import { getMenu, SetCWeekMenuURL } from '../functions';

const cmd = async (id = config.restaurantID, day = new Date()) => {
  let result = await SetCWeekMenuURL(id, day);
	await getMenu(result, day, message.channel);
}

// Command help. This will be shown when user prompts <prefix>help <cmd_name>
cmd.help = {
    name: "menu",
    category: "Arkea Essentials",
    description: "Get menu",
    usage: "menu"
}

// Command configuration
cmd.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "everyone"
}

export default cmd
