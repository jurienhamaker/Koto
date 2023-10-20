import { getUsername } from '@koto/util/get-username';
import { Client } from 'discord.js';
import { _getBotAuthor } from './get-bot-author';

export const getEmbedFooter = async (_client: Client, text?: string) => {
	const botAuthor = await _getBotAuthor(_client);
	return {
		iconURL: botAuthor.avatarURL(),
		text: `${text ? `${text} | ` : ''}Created by @${getUsername(
			botAuthor,
		)}`,
	};
};
