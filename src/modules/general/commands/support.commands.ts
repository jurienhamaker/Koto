import { getEmbedFooter } from '@koto/modules/game/util/get-embed-footer';
import { EMBED_COLOR } from '@koto/util/constants';
import { Injectable } from '@nestjs/common';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Client,
	EmbedBuilder,
} from 'discord.js';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class GeneralSupportCommands {
	constructor(private _client: Client) {}

	@SlashCommand({
		name: 'support',
		description:
			'Get a support discord invite to join the Koto support server!',
	})
	public async invite(@Context() [interaction]: SlashCommandContext) {
		const footer = await getEmbedFooter(this._client);
		const embed = new EmbedBuilder()
			.setTitle(`Koto Support`)
			.setDescription(
				`Found a bug? Or having issues setting up Koto?
Join our support server with the button below, we'll try to help you out the best we can!`,
			)
			.setColor(EMBED_COLOR)
			.setFooter(footer);

		return interaction.reply({
			embeds: [embed],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setURL('https://discord.gg/UttZbEd9zn')
						.setLabel('Join support server 👨‍⚕️')
						.setStyle(ButtonStyle.Link),
				),
			],
		});
	}
}
