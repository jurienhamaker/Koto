import { EMOJI_TYPE } from '@koto/util/get-emoji';

export interface GameGuessMetaLetter {
	type: EMOJI_TYPE;
	points?: number;
	letter: string;
}

export interface GameGuessMeta {
	[key: string]: GameGuessMetaLetter;
}

export interface GameMeta {
	[key: string]: EMOJI_TYPE;
}
