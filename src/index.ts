import {
	Client,
	GatewayIntentBits,
	Partials
} from 'discord.js';
import { readdir } from 'fs';
import path = require('path');
require('dotenv').config();

const bot: Client = new Client({
	intents: [
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds
	],
	partials: [Partials.Channel]
})

export { bot };

readdir(path.join(__dirname, 'events'), (err, files) => {
	if (err) return console.error;
	files.forEach((file: string) => {
		if (!file.endsWith(`.js`)) return;
		const event: () => any = require(path.join(
			__dirname,
			'events',
			file
		)).default;
		const eventName: string = file.split(`.`)[0];
		bot.on(eventName, event.bind(null, bot));
	});
});

bot.login(process.env.TOKEN);

process.on('uncaughtException', async (e) => {
	console.error(e);
});
