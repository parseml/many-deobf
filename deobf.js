/*
	Hey Philipp, know you are reading this.
	Howdy cowboy ;-)
 */

// Variable Finder (Deobfuscator)

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
	}
};

// Obfuscation List (No malicious variables here Philipp!)

ig.game.player = Deobfuscator.object(ig.game, "screenName", false);
ig.game.player.changeName = Deobfuscator.function(ig.game.player, "this.screenName", false);
ig.game.players = Deobfuscator.object(ig.game, "betweenDefaultAndPlayer", false).player;
ig.game.equip = Deobfuscator.object(ig.game, "removeItemFromCollection", false);
ig.game.equip.item = Deobfuscator.function(ig.game.equip, "AnimationSheet(null,d", false);
ig.game.blocks = Deobfuscator.object(ig.game, "lastRequestTimestamps", false);
ig.game.websocket = Deobfuscator.object(ig.game, "binary", false);
ig.game.player.id = Deobfuscator.variableByLength(ig.game, 24, false);

// Functions you can use to speed up programming

const idFromScreenName = screenName => {
	const key = Deobfuscator.variableByLength(ig.game.player, 24, true);
	return new Promise((res, rej) => {
		ig.game.players.forEach(player => {
			if(ig.game.player.screenName === screenName) {
				res(player[key]);
			}
		});

		rej('Player not found!');
	});
}
