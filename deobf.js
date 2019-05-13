// Variable Finder (Deobfuscator)

consoleref.log( // Please do not remove!
	'%cDeobfuscator created by Parse\nCheck it out -> github.com/parseml/many-deobf',
	'background: green; color: white; display: block; padding-left: 0px;',
);

const Deobfuscator = {
	function: (object, string, returnKey) => {
		let keyFound = null;

		Object.keys(object).forEach((i) => {
			if(!object[i]) return;

			if(object[i].toString().includes(string))
				keyFound = returnKey ? i : object[i];
		});

		Object.keys(Object.getPrototypeOf(object)).forEach((i) => {
			if(!object[i]) return;

			if(object[i].toString().includes(string))
				keyFound = returnKey ? i : object[i];
		});

		return keyFound;
	},
	object: (object, string, returnKey) => {
		let keyFound = null;

		Object.keys(object).forEach((i) => {
			if(!object[i]) return;

			if(Object.keys(object[i]).includes(string))
				keyFound = returnKey ? i : object[i];
		});

		Object.keys(Object.getPrototypeOf(object)).forEach((i) => {
			if(!object[i]) return;

			if(Object.keys(Object.getPrototypeOf(object[i])).includes(string))
				keyFound = returnKey ? i : object[i];
		});

		return keyFound;
	},
	variableByLength: (object, length, returnKey) => {
		let keyFound = null;

		Object.keys(object).forEach((i) => {
			if(!object[i]) return;

			if(object[i].length === length)
				keyFound = returnKey ? i : object[i];
		});

		Object.keys(Object.getPrototypeOf(object)).forEach((i) => {
			if(!object[i]) return;

			if(object[i].length === length)
				keyFound = returnKey ? i : object[i];
		});

		return keyFound;
	},
	keyBetween: (func, start, end) => {
		let keyFound = null;

		const str = func.toString();

		keyFound = str.substring(
    		str.lastIndexOf(start) + start.length, 
    		str.lastIndexOf(end)
		);

		return keyFound;
	},
	findByType: (object, type, returnKey) => {
		let keyFound = null;

		Object.keys(object).forEach((i) => {
			if(object[i] === null)
				return;

			if(object[i].constructor === type)
				keyFound = returnKey ? i : object[i];
		});

		return keyFound;
	}
};

// Obfuscation List

ig.game.player = Deobfuscator.object(ig.game, "screenName", false);
ig.game.player.changeName = Deobfuscator.function(ig.game.player, "this.screenName", false);
ig.game.players = Deobfuscator.object(ig.game, "betweenDefaultAndPlayer", false).player;
ig.game.equip = Deobfuscator.object(ig.game, "removeItemFromCollection", false);
ig.game.equip.item = Deobfuscator.function(ig.game.equip, "AnimationSheet(null,d", false);
ig.game.blocks = Deobfuscator.object(ig.game, "lastRequestTimestamps", false);
ig.game.websocket = Deobfuscator.object(ig.game, "binary", false);
ig.game.player.id = Deobfuscator.variableByLength(ig.game.player, 24, false);
id = Deobfuscator.variableByLength(ig.game.player, 24, true);

// Functions you can use to speed up programming

const idFromScreenName = screenName => {
	updatePlayers();
	const key = Deobfuscator.variableByLength(ig.game.player, 24, true);
	return new Promise((res, rej) => {
		ig.game.players.forEach(player => {
			if(player.screenName === screenName) {
				res(player[key]);
			}
		});

		rej('Player not found!');
	});
}

const updatePlayers = () => {
	ig.game.players = Deobfuscator.object(ig.game, "betweenDefaultAndPlayer", false).player;
}

const getPlayerChat = target => {
	updatePlayers();
	let chat = "";

	ig.game.players.forEach(player => {
		if(player[id] === target) {
			let playerChat = Deobfuscator.object(player, 'player', false);
			playerChat.object = Deobfuscator.findByType(playerChat, Array, false);

			if(playerChat.object.length != 0) {
				let index = playerChat.object.length - 1;
				chat = Deobfuscator.findByType(playerChat.object[index], String, false);
			}
		}
	});

	return chat;
}

const itemInformation = async id => {
	const api = 'http://idf.manyland.netdna-cdn.com/';
	return new Promise((res, rej) => {
		$.get(api + id, (data, code) => {
			if(code === 'success') res(data);
			else rej('Something went wrong!');
		});
	});
}
