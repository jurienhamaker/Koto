export type EMOJI_COLOR = 'GREEN' | 'YELLOW' | 'GRAY' | 'WHITE';

export const GameTypeEmojiColorMap: {
	[key: string]: EMOJI_COLOR;
} = {
	CORRECT: 'GREEN',
	ALMOST: 'YELLOW',
	WRONG: 'GRAY',
	DEFAULT: 'WHITE',
};

const data = {
	GRAY: {
		blank: {
			name: 'blankgray',
			id: '1164873166028550274',
		},
		a: {
			name: 'letterAgray',
			id: '1164873194734374943',
		},
		b: {
			name: 'letterBgray',
			id: '1164873196189782068',
		},
		c: {
			name: 'letterCgray',
			id: '1164873199041912934',
		},
		d: {
			name: 'letterDgray',
			id: '1164873201332006992',
		},
		e: {
			name: 'letterEgray',
			id: '1164873202762252288',
		},
		f: {
			name: 'letterFgray',
			id: '1164873203815043163',
		},
		g: {
			name: 'letterGgray',
			id: '1164873206499397643',
		},
		h: {
			name: 'letterHgray',
			id: '1164873207690567742',
		},
		i: {
			name: 'letterIgray',
			id: '1164873210819514388',
		},
		j: {
			name: 'letterJgray',
			id: '1164873211905843240',
		},
		k: {
			name: 'letterKgray',
			id: '1164873213319331911',
		},
		l: {
			name: 'letterLgray',
			id: '1164873216360194049',
		},
		o: {
			name: 'letterOgray',
			id: '1164873219640148009',
		},
		q: {
			name: 'letterQgray',
			id: '1164873222827802624',
		},
		s: {
			name: 'letterSgray',
			id: '1164873227403792404',
		},
		u: {
			name: 'letterUgray',
			id: '1164873231354822786',
		},
		w: {
			name: 'letterWgray',
			id: '1164873235935002664',
		},
		x: {
			name: 'letterXgray',
			id: '1164873237159747584',
		},
		z: {
			name: 'letterZgray',
			id: '1164873240418721802',
		},
		m: {
			name: 'letterMgray',
			id: '1164873305573031936',
		},
		n: {
			name: 'letterNgray',
			id: '1164873308689412107',
		},
		p: {
			name: 'letterPgray',
			id: '1164873310182580265',
		},
		r: {
			name: 'letterRgray',
			id: '1164873421302288406',
		},
		t: {
			name: 'letterTgray',
			id: '1164873422422163496',
		},
		v: {
			name: 'letterVgray',
			id: '1164873424141815818',
		},
		y: {
			name: 'letterYgray',
			id: '1164873470459527168',
		},
	},
	YELLOW: {
		blank: {
			name: 'blankyellow',
			id: '1164874212268322867',
		},
		a: {
			name: 'letterAyellow',
			id: '1164874215304998923',
		},
		b: {
			name: 'letterByellow',
			id: '1164874217087586344',
		},
		c: {
			name: 'letterCyellow',
			id: '1164874218505257031',
		},
		d: {
			name: 'letterDyellow',
			id: '1164874221235740683',
		},
		e: {
			name: 'letterEyellow',
			id: '1164874224171757578',
		},
		f: {
			name: 'letterFyellow',
			id: '1164874225543303208',
		},
		g: {
			name: 'letterGyellow',
			id: '1164874226730278993',
		},
		h: {
			name: 'letterHyellow',
			id: '1164874255352205352',
		},
		i: {
			name: 'letterIyellow',
			id: '1164874257801687130',
		},
		j: {
			name: 'letterJyellow',
			id: '1164874259022225508',
		},
		k: {
			name: 'letterKyellow',
			id: '1164874260259553290',
		},
		l: {
			name: 'letterLyellow',
			id: '1164874262272819281',
		},
		m: {
			name: 'letterMyellow',
			id: '1164874264235749376',
		},
		n: {
			name: 'letterNyellow',
			id: '1164874266760716388',
		},
		o: {
			name: 'letterOyellow',
			id: '1164874292819931216',
		},
		p: {
			name: 'letterPyellow',
			id: '1164874293918826526',
		},
		q: {
			name: 'letterQyellow',
			id: '1164874296066318346',
		},
		r: {
			name: 'letterRyellow',
			id: '1164874297328799854',
		},
		s: {
			name: 'letterSyellow',
			id: '1164874300168339476',
		},
		t: {
			name: 'letterTyellow',
			id: '1164874301401468939',
		},
		u: {
			name: 'letterUyellow',
			id: '1164874302806560879',
		},
		v: {
			name: 'letterVyellow',
			id: '1164874327913672764',
		},
		w: {
			name: 'letterWyellow',
			id: '1164874329998233600',
		},
		x: {
			name: 'letterXyellow',
			id: '1164874331373969429',
		},
		y: {
			name: 'letterYyellow',
			id: '1164874333047496775',
		},
		z: {
			name: 'letterZyellow',
			id: '1164874335316627486',
		},
	},
	GREEN: {
		blank: {
			name: 'blankgreen',
			id: '1164874404937867264',
		},
		a: {
			name: 'letterAgreen',
			id: '1164874406019989514',
		},
		b: {
			name: 'letterBgreen',
			id: '1164874408830189638',
		},
		c: {
			name: 'letterCgreen',
			id: '1164874412894466099',
		},
		d: {
			name: 'letterDgreen',
			id: '1164874414458937396',
		},
		e: {
			name: 'letterEgreen',
			id: '1164874417067786340',
		},
		f: {
			name: 'letterFgreen',
			id: '1164874418212843560',
		},
		g: {
			name: 'letterGgreen',
			id: '1164874419861209089',
		},
		h: {
			name: 'letterHgreen',
			id: '1164874445907828758',
		},
		i: {
			name: 'letterIgreen',
			id: '1164874447115792415',
		},
		j: {
			name: 'letterJgreen',
			id: '1164874449552691303',
		},
		k: {
			name: 'letterKgreen',
			id: '1164874451058430073',
		},
		l: {
			name: 'letterLgreen',
			id: '1164874452920696932',
		},
		m: {
			name: 'letterMgreen',
			id: '1164874453726003213',
		},
		n: {
			name: 'letterNgreen',
			id: '1164874455525363802',
		},
		o: {
			name: 'letterOgreen',
			id: '1164874459258310736',
		},
		p: {
			name: 'letterPgreen',
			id: '1164874487968313424',
		},
		q: {
			name: 'letterQgreen',
			id: '1164874490589761536',
		},
		r: {
			name: 'letterRgreen',
			id: '1164874491843854376',
		},
		s: {
			name: 'letterSgreen',
			id: '1164874493311852594',
		},
		t: {
			name: 'letterTgreen',
			id: '1164874495555809351',
		},
		u: {
			name: 'letterUgreen',
			id: '1164874497392902154',
		},
		v: {
			name: 'letterVgreen',
			id: '1164874523296940123',
		},
		w: {
			name: 'letterWgreen',
			id: '1164874526472011797',
		},
		x: {
			name: 'letterXgreen',
			id: '1164874527784845332',
		},
		y: {
			name: 'letterYgreen',
			id: '1164874529261236244',
		},
		z: {
			name: 'letterZgreen',
			id: '1164874531475832874',
		},
	},
	WHITE: {
		blank: {
			name: 'blankwhite',
			id: '1164873611631411210',
		},
		a: {
			name: 'letterAwhite',
			id: '1164873612902273055',
		},
		b: {
			name: 'letterBwhite',
			id: '1164873615007817808',
		},
		c: {
			name: 'letterCwhite',
			id: '1164873616610041886',
		},
		d: {
			name: 'letterDwhite',
			id: '1164873618828836974',
		},
		e: {
			name: 'letterEwhite',
			id: '1164873620028407868',
		},
		f: {
			name: 'letterFwhite',
			id: '1164873620854685707',
		},
		g: {
			name: 'letterGwhite',
			id: '1164873623413194824',
		},
		h: {
			name: 'letterHwhite',
			id: '1164873624600195074',
		},
		i: {
			name: 'letterIwhite',
			id: '1164873626395357234',
		},
		k: {
			name: 'letterKwhite',
			id: '1164873668917219381',
		},
		l: {
			name: 'letterLwhite',
			id: '1164873671962263552',
		},
		j: {
			name: 'letterJwhite',
			id: '1164873731898867752',
		},
		m: {
			name: 'letterMwhite',
			id: '1164873844943761500',
		},
		n: {
			name: 'letterNwhite',
			id: '1164873846273343578',
		},
		o: {
			name: 'letterOwhite',
			id: '1164873848601194566',
		},
		p: {
			name: 'letterPwhite',
			id: '1164873849716887553',
		},
		q: {
			name: 'letterQwhite',
			id: '1164873852128591912',
		},
		r: {
			name: 'letterRwhite',
			id: '1164873853089103944',
		},
		s: {
			name: 'letterSwhite',
			id: '1164873855026860132',
		},
		t: {
			name: 'letterTwhite',
			id: '1164873881715212288',
		},
		u: {
			name: 'letterUwhite',
			id: '1164873882839302194',
		},
		v: {
			name: 'letterVwhite',
			id: '1164873885049692241',
		},
		w: {
			name: 'letterWwhite',
			id: '1164873886362521611',
		},
		x: {
			name: 'letterXwhite',
			id: '1164873888526762005',
		},
		y: {
			name: 'letterYwhite',
			id: '1164873889990594570',
		},
		z: {
			name: 'letterZwhite',
			id: '1164873892301651988',
		},
	},
};

export const getEmoji = (type: EMOJI_COLOR, letter: string) => {
	const letters = data[type];
	const emoji = letters[letter];

	if (!emoji) {
		return;
	}

	return `<:${emoji.name}:${emoji.id}>`;
};
