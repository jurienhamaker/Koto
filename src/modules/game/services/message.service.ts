import { PrismaService } from '@koto/modules/prisma/services';
import { SettingsService } from '@koto/modules/settings';
import { EMOJI_TYPE, getEmoji } from '@koto/util/get-emoji';
import { getTimestamp } from '@koto/util/get-timestamp';
import { Injectable, Logger } from '@nestjs/common';
import { Game, GameStatus, Guess } from '@prisma/client';
import { startOfHour } from 'date-fns';
import { Channel, ChannelType, Client, EmbedBuilder } from 'discord.js';
import { getEmbedFooter } from '../util/get-embed-footer';

@Injectable()
export class GameMessageService {
	private readonly _logger = new Logger(GameMessageService.name);

	constructor(
		private _prisma: PrismaService,
		private _settings: SettingsService,
		private _client: Client,
	) {}

	async create(game: Game & { guesses: Guess[] }, isNew = false) {
		const settings = await this._settings.getSettings(game.guildId);

		if (!settings.channelId) {
			return;
		}

		this._logger.verbose(
			`Creating message for game ${game.id}${isNew ? ' (new)' : ''}`,
		);

		const channel = await this._client.channels.fetch(settings.channelId);
		if (game.lastMessageId) {
			this._delete(channel, game.lastMessageId);
		}

		if (!channel || channel.type !== ChannelType.GuildText) {
			return;
		}

		const embed = await this._createEmbed(game);
		const message = await channel.send({
			content: settings.pingRoleId ? `<@&${settings.pingRoleId}>` : '',
			embeds: [embed],
			allowedMentions: {
				users: [],
			},
		});

		await this._prisma.game.update({
			where: {
				id: game.id,
			},
			data: {
				lastMessageId: message.id,
			},
		});
	}

	private async _delete(channel: Channel, messageId) {
		if (!channel || channel.type !== ChannelType.GuildText) {
			return;
		}

		const message = await channel.messages.fetch(messageId);
		if (!message) {
			return;
		}

		message.delete().catch(() => null);
	}

	private async _createEmbed(game: Game & { guesses: Guess[] }) {
		const footer = await getEmbedFooter(this._client);
		return new EmbedBuilder()
			.setTitle(
				`Koto for <t:${getTimestamp(startOfHour(game.createdAt))}:f>`,
			)
			.setColor(this._getEmbedColor(game.status))
			.setDescription(
				`${this._getMessageRows(game.guesses, game.status)}
${this._getMessageKeyboard(game)}
${this._getGameInformation(game)}`,
			)
			.setFooter(footer);
	}

	private _getEmbedColor(status: GameStatus) {
		switch (status) {
			case GameStatus.COMPLETED:
				return '#64e090';
			case GameStatus.FAILED:
			case GameStatus.OUT_OF_TIME:
				return '#e06060';
			default:
				return '#66c5d6';
		}
	}

	private _getMessageRows(
		guesses: Guess[],
		status: GameStatus = GameStatus.IN_PROGRESS,
	) {
		let rows = guesses.map((guess) => ({
			meta: guess.meta,
			userId: guess.userId,
			points: guess.points,
		}));

		const receivedBonus = [];

		if (rows.length < 9 && status === GameStatus.IN_PROGRESS) {
			for (let i = 9 - rows.length; i != 0; i--) {
				rows.push({
					meta: Array(6)
						.fill({
							letter: 'blank',
							type: EMOJI_TYPE.DEFAULT,
						})
						.reduce((obj, curr, i) => {
							obj[i] = curr;
							return obj;
						}, {}),
					userId: this._client.user.id,
					points: 0,
				});
			}
		}

		return rows.reduce((str, row, i) => {
			str +=
				`${i + 1}. ` +
				Object.keys(row.meta)
					.map((key) =>
						getEmoji(row.meta[key].type, row.meta[key].letter),
					)
					.join('') +
				`${
					row.userId !== this._client.user.id
						? ` <@${row.userId}> **+${row.points}${
								status === GameStatus.COMPLETED &&
								!receivedBonus.includes(row.userId)
									? ' (+2)'
									: ''
						  }**`
						: ''
				}` +
				'\n';

			receivedBonus.push(row.userId);
			return str;
		}, '');
	}

	private _getMessageKeyboard(game: Game) {
		const rows = [
			['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
			['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', null],
			[null, 'z', 'x', 'c', 'v', 'b', 'n', 'm', null],
		];

		return rows.reduce((str, row) => {
			str +=
				row
					.map((l) =>
						l === null
							? getEmoji(EMOJI_TYPE.WRONG, 'blank')
							: getEmoji(game.meta[l] ?? EMOJI_TYPE.DEFAULT, l),
					)
					.join('') + '\n';
			return str;
		}, '');
	}

	private _getGameInformation(game: Game & { guesses: Guess[] }) {
		const footer = `Don't know how to play? Use the /tutorial commands for detailed instructions.${
			process.env.NODE_ENV !== 'production'
				? `\nDevelopment mode: **${game.word}**`
				: ''
		}`;
		const nextKoto = `Next koto (word) in <t:${getTimestamp(
			game.endingAt,
		)}:R>`;

		switch (game.status) {
			case GameStatus.COMPLETED:
				return `
Good job! Everyone who participated gets **+2** points!
${nextKoto}

${footer}`;
			case GameStatus.FAILED:
				return `
Out of guesses, The correct word was **${game.word.toUpperCase()}**!
${nextKoto}

${footer}`;
			case GameStatus.OUT_OF_TIME:
				return `
Time's up! The correct word was **${game.word.toUpperCase()}**!

${footer}`;
			default:
				return `
${9 - game.guesses.length} guesses remaining
Time runs out <t:${getTimestamp(game.endingAt)}:R>

                    ${footer}`;
		}
	}
}
