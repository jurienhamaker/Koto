import { PrismaService } from '@koto/modules/prisma/services';
import { SettingsService } from '@koto/modules/settings';
import { WordsService } from '@koto/modules/words/services/words.service';
import { EMOJI_TYPE } from '@koto/util/get-emoji';
import { getTimestamp } from '@koto/util/get-timestamp';
import { Injectable, Logger } from '@nestjs/common';
import { Game, GameStatus, Guess, Settings } from '@prisma/client';
import { addHours, addMinutes, startOfHour, subMinutes } from 'date-fns';
import { Message } from 'discord.js';
import { GameGuessMeta, GameMeta } from '../types/meta';
import { GameMessageService } from './message.service';
import { GamePointsService } from './points.service';

@Injectable()
export class GameService {
	private readonly _logger = new Logger(GameService.name);

	constructor(
		private _prisma: PrismaService,
		private _settings: SettingsService,
		private _words: WordsService,
		private _message: GameMessageService,
		private _points: GamePointsService,
	) {}

	async start(guildId: string, recreate = false, word = null) {
		this._logger.log(`Trying to start a game for ${guildId}`);

		const currentGame = await this.getCurrentGame(guildId);

		if (currentGame && !recreate) {
			return;
		}

		if (currentGame && recreate) {
			await this.endGame(currentGame.id, GameStatus.FAILED);
		}

		const pastTenGames = await this._prisma.game.findMany({
			where: {
				guildId,
			},
			select: {
				word: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 10,
		});

		const ignoredWords = pastTenGames.map((g) => g.word);
		word = word ?? this._words.getRandom(ignoredWords);

		if (!word) {
			return;
		}

		const settings = await this._settings.getSettings(guildId);
		const game = await this._prisma.game.create({
			data: {
				guildId,
				word,
				endingAt: startOfHour(addHours(new Date(), settings.frequency)),
			},
			include: {
				guesses: true,
			},
		});

		await this._message.create(game, true);
		return true;
	}

	async guess(
		guildId: string,
		word: string,
		message: Message,
		settings: Settings,
	) {
		let game = await this.getCurrentGame(guildId);
		await this._points.getPlayer(guildId, message.author.id);

		if (!game) {
			return;
		}

		const alreadyGuessedIndex = game.guesses.findIndex(
			(g) => g.word === word,
		);

		if (alreadyGuessedIndex >= 0) {
			await message.react('❌');
			return;
		}

		const cooldown = await this._checkCooldown(
			message.author.id,
			game.id,
			settings.cooldown,
		);
		if (cooldown) {
			message.react('🕒');
			message.reply(
				`You're on a cooldown, you can guess again <t:${getTimestamp(
					cooldown,
				)}:R>`,
			);
			return;
		}

		const { meta, guessed, points, gameMeta } = this._checkWord(
			game.word,
			word,
			game.meta as any,
		);

		await this._prisma.guess.create({
			data: {
				game: {
					connect: { id: game.id },
				},
				points,
				userId: message.author.id,
				word,
				meta: meta as any,
			},
		});

		let status = guessed ? GameStatus.COMPLETED : game.status;
		if (game.guesses.length + 1 === 9) {
			status = GameStatus.FAILED;
		}

		game = await this._prisma.game.update({
			where: {
				id: game.id,
			},
			data: {
				status,
				meta: gameMeta as any,
			},
			include: {
				guesses: true,
			},
		});
		await message.react(guessed ? '🎉' : '✅');

		const promises = [];
		if (guessed) {
			promises.push(this._points.applyPoints(game, message.author.id));
		}

		promises.push(this._message.create(game, false));

		await Promise.allSettled(promises);
	}

	async endGame(gameId: number, status: GameStatus = GameStatus.OUT_OF_TIME) {
		const game = await this._prisma.game.update({
			where: {
				id: gameId,
			},
			data: {
				status,
			},
			include: {
				guesses: true,
			},
		});

		return this._message.create(game, false);
	}

	getCurrentGame(guildId: string): Promise<Game & { guesses: Guess[] }> {
		return this._prisma.game.findFirst({
			where: {
				guildId,
				endingAt: {
					gt: new Date(),
				},
				status: GameStatus.IN_PROGRESS,
			},
			include: {
				guesses: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	private _checkWord(correct: string, guess: string, gameMeta: GameMeta) {
		const meta: GameGuessMeta = {};

		for (let i = 0; i < guess.length; i++) {
			const guessLetter = guess[i];

			const correctLetter = correct[i];

			const data = {
				type: EMOJI_TYPE.WRONG,
				points: 0,
				letter: guessLetter,
			};

			const matches = correct.match(new RegExp(guessLetter, 'g')) || [];
			if (matches.length) {
				const alreadyMatched =
					matches.length === 1 &&
					gameMeta[guessLetter] === EMOJI_TYPE.CORRECT;
				data.type = alreadyMatched
					? EMOJI_TYPE.WRONG
					: EMOJI_TYPE.ALMOST;
				data.points =
					gameMeta[guessLetter] === EMOJI_TYPE.CORRECT ||
					gameMeta[guessLetter] === EMOJI_TYPE.ALMOST ||
					alreadyMatched
						? 0
						: 1;
			}

			if (guessLetter === correctLetter) {
				data.type = EMOJI_TYPE.CORRECT;
				data.points =
					gameMeta[guessLetter] === EMOJI_TYPE.CORRECT
						? 0
						: gameMeta[guessLetter] === EMOJI_TYPE.ALMOST
						? 1
						: 2;
			}

			meta[i] = data;
			gameMeta[guessLetter] =
				gameMeta[guessLetter] === EMOJI_TYPE.CORRECT
					? EMOJI_TYPE.CORRECT
					: data.type;
		}

		return {
			meta,
			gameMeta,
			guessed: correct === guess,
			points: Object.keys(meta).reduce(
				(pts, key) => pts + meta[key].points,
				0,
			),
		};
	}

	private async _checkCooldown(
		userId: string,
		gameId: number,
		cooldown: number,
	): Promise<Date | undefined> {
		const lastGuessWithinCooldown = await this._prisma.guess.findFirst({
			where: {
				userId,
				gameId,
				createdAt: {
					gt: subMinutes(new Date(), cooldown),
				},
			},
			select: {
				createdAt: true,
			},
		});

		if (!lastGuessWithinCooldown) {
			return;
		}

		return addMinutes(lastGuessWithinCooldown.createdAt, cooldown);
	}
}
