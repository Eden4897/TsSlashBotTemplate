import {
	Client,
	Collection,
	CommandInteraction,
	TextChannel,
	MessageEmbed,
} from 'discord.js';
import { readdir } from 'fs';
import { SlashCommandBuilder } from '@discordjs/builders';
import path = require('path');
require('dotenv').config();

const bot: Client = new Client({
	intents: [
		'GUILD_MESSAGES',
		'DIRECT_MESSAGES',
		'GUILD_INTEGRATIONS',
		'GUILDS',
	],
	partials: ['CHANNEL'],
});

export { bot, commands };

export class Command {
	data: Pick<
		SlashCommandBuilder,
		'toJSON' | 'name' | 'description' | 'options'
	>;
	execute: (interaction: CommandInteraction) => any;
	constructor(opt: Command) {
		Object.assign(this, opt);
	}
}

let commands: Collection<string, Command> = new Collection<string, Command>();

readdir(path.join(__dirname, 'commands'), (err, files) => {
	if (err) return console.error;
	files.forEach((file: string) => {
		if (!file.endsWith(`.js`)) return;
		const command: Command = require(path.join(
			__dirname,
			'commands',
			file
		)).default;
		commands.set(command.data.name, command);
	});
});

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
			new MessageEmbed()
				.setTitle(`${e.name}: ${e.message}`)
				.setDescription(`\`${e.stack}\``),
		],
	});
});
