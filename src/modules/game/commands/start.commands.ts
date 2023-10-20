import { ForbiddenExceptionFilter } from '@koto/filters';
import { GuildModeratorGuard } from '@koto/guards';
import { SettingsService } from '@koto/modules/settings';
import { noSettingsReply } from '@koto/util/no-settings-reply';
import { Injectable, UseFilters, UseGuards } from '@nestjs/common';
import { Client, CommandInteraction } from 'discord.js';
import { Context, SlashCommandContext, Subcommand } from 'necord';
import { GameCommandDecorator } from '../game.decorator';
import { GameService } from '../services/game.service';

@UseGuards(GuildModeratorGuard)
@UseFilters(ForbiddenExceptionFilter)
@GameCommandDecorator()
@Injectable()
export class GameStartCommands {
	constructor(
		private _game: GameService,
		private _settings: SettingsService,
		private _client: Client,
	) {}

	@Subcommand({
		name: 'start',
		description: 'Start a game when there is none ongoing.',
	})
	public async start(@Context() [interaction]: SlashCommandContext) {
		return this._startGame(interaction);
	}

	@Subcommand({
		name: 'reset',
		description: 'Reset the current game and any points earned.',
	})
	public async reset(@Context() [interaction]: SlashCommandContext) {
		return this._startGame(interaction, true);
	}

	private async _startGame(
		interaction: CommandInteraction,
		recreate: boolean = false,
	) {
		const settings = await this._settings.getSettings(interaction.guildId);

		if (!settings.channelId) {
			return noSettingsReply(interaction, this._client);
		}

		const started = await this._game.start(interaction.guildId, recreate);

		return interaction.reply({
			content:
				(started
					? 'A game has been started'
					: 'There is already an ongoing game') +
				`${
					settings.channelId === interaction.channelId
						? '.'
						: ` in the <#${settings.channelId}> channel.`
				}`,
			ephemeral: true,
		});
	}
}
