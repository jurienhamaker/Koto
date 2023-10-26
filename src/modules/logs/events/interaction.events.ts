import { getInteractionCommandName } from '@koto/util/get-interaction-command-name';
import { getUsername } from '@koto/util/get-username';
import { Injectable, Logger } from '@nestjs/common';
import { Events } from 'discord.js';
import { Context, ContextOf, On } from 'necord';
import { LogsService } from '../services/logs.service';

@Injectable()
export class LogsInteractionEvents {
	private readonly _logger = new Logger(LogsInteractionEvents.name);

	constructor(private _logs: LogsService) {}

	@On(Events.InteractionCreate)
	public onInteractionCreate(
		@Context() [interaction]: ContextOf<Events.InteractionCreate>,
	) {
		const commandName = getInteractionCommandName(interaction);
		this._logs.log(
			`Interaction **${commandName}** (${
				interaction.constructor.name
			}) used by **${getUsername(interaction.user)}** (${
				interaction.user.id
			}) in **${interaction.guild.name}** (${interaction.guildId})!`,
		);
	}
}
