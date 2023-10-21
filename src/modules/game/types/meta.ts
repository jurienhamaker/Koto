import { EMOJI_TYPE } from '@koto/util/get-emoji';
import { Game, Guess } from '@prisma/client';

export interface GameGuessMetaLetter {
	type: EMOJI_TYPE;
	points?: number;
	letter: string;
}

export interface GameGuessMeta {
	[key: string]: GameGuessMetaLetter;
}

export interface GameMeta {
	keyboard: {
		[key: string]: EMOJI_TYPE;
	};
	word: string[];
}

export type GameWithMeta = Game & { meta: GameMeta };
export type GameWithMetaAndGuesses = Game & { meta: GameMeta } & {
	guesses: Guess[];
};
