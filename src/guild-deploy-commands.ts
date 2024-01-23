import { REST } from '@discordjs/rest';
import { commands } from '@illegalrazer/slash-commands';
import { Routes } from 'discord.js';

require('dotenv').config();

const commandJSONs: Array<any> = [];

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	for (const command of commands.values()) {
		commandJSONs.push(command.data.toJSON());
	}
	await rest.put(
		Routes.applicationGuildCommands(
			process.env.CLIENT_ID,
			process.env.TEST_GUILD_ID
		),
		{
			body: commandJSONs,
		}
	);
	console.log('Successfully registered application commands in the guild.');
	process.exit();
})();
