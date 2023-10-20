import { PrismaService } from '@koto/modules/prisma/services';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GameStatus } from '@prisma/client';
import { startOfHour } from 'date-fns';
import { Client } from 'discord.js';
import { GameService } from './game.service';

@Injectable()
export class GameScheduleService {
	private readonly _logger = new Logger(GameScheduleService.name);

	constructor(
		private _prisma: PrismaService,
		private _client: Client,
		private _game: GameService,
	) {}

	// @Cron('0 0 * * * *')
	@Cron('* */30 * * * *')
	async check() {
		const outOfTimeGames = await this._prisma.game.findMany({
			where: {
				status: GameStatus.IN_PROGRESS,
				endingAt: startOfHour(new Date()),
			},
			select: {
				id: true,
			},
		});

		this._logger.log(
			`Checking finished game, ending ${outOfTimeGames.length} games.`,
		);
		for (let { id } of outOfTimeGames) {
			this._game.endGame(id);
		}

		const guildsWithChannelId = await this._prisma.settings.findMany({
			where: {
				channelId: { not: null },
				games: {
					none: {
						status: GameStatus.IN_PROGRESS,
					},
				},
			},
			select: {
				guildId: true,
			},
		});

		for (let { guildId } of guildsWithChannelId) {
			const guild = await this._client.guilds
				.fetch(guildId)
				.catch(() => null);
			if (guild) {
				this._game.start(guildId);
			}
		}
	}
}
