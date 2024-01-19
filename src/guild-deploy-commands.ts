import { REST } from '@discordjs/rest';
import { Command } from '.';
import { readdir } from 'fs/promises';
import path = require('path');
import { Routes } from 'discord.js'

require('dotenv').config();

const commands: Array<any> = [];

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
	const files = await readdir(path.join(__dirname, 'commands'));

	files.forEach((file: string) => {
		if (!file.endsWith(`.js`)) return;
		const command: Command = require(path.join(
			__dirname,
			'commands',
			file
		)).default;
		commands.push(command.data.toJSON());
	});
	await rest.put(
		Routes.applicationGuildCommands(
			process.env.CLIENT_ID,
			process.env.TEST_GUILD_ID
		),
		{
			body: commands,
		}
	);
	console.log('Successfully registered application commands in the guild.');
	process.exit();
})();
