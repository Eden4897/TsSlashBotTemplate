import axios from 'axios';
import { Client, MessageEmbed, TextChannel } from 'discord.js';

export default async (bot: Client) => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setActivity('/help', { type: 'LISTENING' });

	const logChannel = <TextChannel>await bot.channels.fetch(process.env.LOG);
	logChannel?.send({
		embeds: [
			new MessageEmbed()
				.setTitle('I am now online!')
				.setDescription(
					`\`\`\`${(await axios.get('https://api.ipify.org')).data}\`\`\``
				),
		],
	});
};
