import { Injectable, Logger } from '@nestjs/common';
import * as exists from '../assets/exists.json';
import * as words from '../assets/words.json';

@Injectable()
export class WordsService {
	private readonly _logger = new Logger(WordsService.name);

	private _wordsByLetter: Map<string, string[]>;
	private _existsByLetter: Map<string, string[]>;

	public amount: number = 0;

	constructor() {
		this._logger.log('Initializing words list.');

		this._createMaps();
		this.amount = words.length;

		this._logger.log(
			`Finished initializing words list. Loaded ${exists.length} guess words & ${words.length} game words`,
		);
	}

	exists(word: string) {
		const firstLetter = word[0];
		const set = this._existsByLetter.get(firstLetter);

		if (!set) {
			return false;
		}

		const index = set.findIndex((w) => w === word);
		return index >= 0;
	}

	getRandom(ignored: string[] = [], hard = false) {
		const letter = this._randomLetter();
		const words = (hard ? this._existsByLetter : this._wordsByLetter).get(
			letter,
		);

		const filteredWords = words.filter((w) => ignored.indexOf(w) === -1);

		const randomIndex = Math.floor(Math.random() * filteredWords.length);
		return filteredWords[randomIndex];
	}

	private _createMaps() {
		this._wordsByLetter = ((m, a) => (
			a.forEach((s) => {
				let a = m.get(s[0]) || [];
				m.set(s[0], (a.push(s), a));
			}),
			m
		))(new Map(), words);

		this._existsByLetter = ((m, a) => (
			a.forEach((s) => {
				let a = m.get(s[0]) || [];
				m.set(s[0], (a.push(s), a));
			}),
			m
		))(new Map(), [...words, ...exists]);
	}

	private _randomLetter() {
		const characters = 'abcdefghijklmnopqrstuvwyz'; // no x cause  we don't have any words that start with x
		const randomIndex = Math.floor(Math.random() * characters.length);

		return characters[randomIndex];
	}
}
