import { EMBED_COLOR } from '@koto/util/constants';
import { Client, CommandInteraction, EmbedBuilder } from 'discord.js';
import { getEmbedFooter } from './get-embed-footer';

export const noSettingsReply = async (
	interaction: CommandInteraction,
	_client: Client,
) => {
	const footer = await getEmbedFooter(_client);
	const embed = new EmbedBuilder()
		.setTitle('Koto Setup')
		.setDescription(
			`Koto has not yet been set up in this server! Someone with \`Manage Server\` permissions must do the following:
    
- Create a new channel where Koto games will be played
- Use the \`/settings channel\` command to configure the channel
- Start the first game using \`/game start\`!

That's it! Have fun playing!`,
		)
		.setColor(EMBED_COLOR)
		.setFooter(footer);

	return interaction.reply({
		embeds: [embed],
	});
};