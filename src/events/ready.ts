import axios from 'axios';
import { ActivityType, Client, EmbedBuilder, TextChannel } from 'discord.js';

export default async (bot: Client) => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setActivity('/help', {type: ActivityType.Listening});

	const logChannel = <TextChannel>await bot.channels.fetch(process.env.LOG);
	logChannel?.send({
		embeds: [
			new EmbedBuilder()
				.setTitle('I am now online!')
				.setDescription(
					`\`\`\`${(await axios.get('https://api.ipify.org')).data}\`\`\``
				),
		],
	});
};
