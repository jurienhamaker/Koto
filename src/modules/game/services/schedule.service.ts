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
	@Cron('0 */30 * * * *')
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
		const endPromises = [];
		for (let { id } of outOfTimeGames) {
			endPromises.push(this._game.endGame(id));
		}
		await Promise.allSettled(endPromises);
		this._logger.log(`Ended ${outOfTimeGames.length} games.`);

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

		this._logger.log(`Starting ${guildsWithChannelId.length} games.`);
		const promises = [];
		for (let { guildId } of guildsWithChannelId) {
			const guild = await this._client.guilds
				.fetch(guildId)
				.catch(() => null);
			if (guild) {
				promises.push(this._game.start(guildId));
			}
		}

		await Promise.allSettled(promises);

		this._logger.log(`Started ${guildsWithChannelId.length} games.`);
	}
}
