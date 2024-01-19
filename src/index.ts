import {
	Client,
	CommandInteraction,
	TextChannel,
	GatewayIntentBits,
	Partials,
	EmbedBuilder,
	GuildMember,
	User,
} from 'discord.js';
import { readdir } from 'fs';
import { SlashCommandBuilder } from '@discordjs/builders';
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

class Access {
	has_access(user: GuildMember|User){
		return false
	}
}

class MemberAccess extends Access {
	has_access(user: GuildMember|User) {
		return true
	}
}

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
	console.log(e);
	const logChannel = <TextChannel>await bot.channels.fetch(process.env.LOG);
	logChannel?.send({
		embeds: [
			new EmbedBuilder()
				.setTitle(`${e.name}: ${e.message}`)
				.setDescription(`\`${e.stack}\``),
		],
	});
});
