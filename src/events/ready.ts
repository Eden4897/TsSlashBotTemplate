import { ActivityType, Client } from 'discord.js';

export default async (bot: Client) => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setActivity('/help', {type: ActivityType.Listening});
};
