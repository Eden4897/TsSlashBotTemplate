import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Command } from '.';
import { readdir } from 'fs/promises';
import path = require('path');

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

	rest
		.put(Routes.applicationCommands(process.env.CLIENT_ID), {
			body: commands,
		})
		.then(() => {
			console.log('Successfully registered application commands.');
			process.exit();
		})
		.catch(console.error);
})();
