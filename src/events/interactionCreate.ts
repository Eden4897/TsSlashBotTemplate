import { Client, Interaction } from 'discord.js';
import { handleInteraction } from '@illegalrazer/slash-commands';

export default async (_bot: Client, interaction: Interaction) => {
	handleInteraction(interaction)
};
