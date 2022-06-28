import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { bot, Command } from '..';
import { SlashCommandBuilder } from '@discordjs/builders';

export default new Command({
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with "Pong" and the latency!'),
	async execute(interaction) {
		const pinging: Message = <Message>await interaction.reply({
			content: '🏓 Pinging...',
			fetchReply: true,
		});

		const embed: MessageEmbed = new MessageEmbed()
			.setColor(`#384c5c`)
			.setTitle(`🏓 Pong!`)
			.setDescription(
				`Bot Latency is **${Math.floor(
					pinging.createdTimestamp - interaction.createdTimestamp
				)} ms** \nAPI Latency is **${Math.round(
					interaction.client.ws.ping
				)} ms**`
			);

		await interaction.editReply({ embeds: [embed], content: null });

		const logChannel = <TextChannel>await bot.channels.fetch(process.env.LOG);
		logChannel?.send({
			embeds: [
				new MessageEmbed().setTitle('/ping').setAuthor({
					name: interaction.user.tag,
					iconURL: interaction.user.avatarURL(),
				}),
			],
		});
	},
});
