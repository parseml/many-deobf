consoleref.log( // Please do not remove!
	'%cDeobfuscator created by Parse\nCheck it out -> github.com/parseml/many-deobf',
	'background: purple; color: white; display: block; padding: 10px;',
);

consoleref.log(
	'%cHave Discord? Join the server! -> https://discord.gg/aDdRVMzqfK',
	'background: purple; color: white; display: block; padding: 10px;',
)

/*
 * I will be updating the Deobfuscator object soon to make it more efficient.. 
 * If you get any issues feel free to open an issue with GitHub or in our Discord server.
*/
var Deobfuscator = {
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

/*
 * Predefined objects, functions & variables for Manyland
 * Feel free to use this as a reference for finding others.
*/
ig.game.player = Deobfuscator.object(ig.game, "screenName", false);
ig.game.player.changeName = Deobfuscator.function(ig.game.player, "this.screenName", false);
ig.game.players = Deobfuscator.object(ig.game, "betweenDefaultAndPlayer", false).player;
ig.game.equip = Deobfuscator.object(ig.game, "removeItemFromCollection", false);
ig.game.equip.item = Deobfuscator.function(ig.game.equip, "getItem_P", false);
ig.game.player.allowEquip = Deobfuscator.keyBetween(ig.game.init, "t=!0,ig.game.", "=!0);");
ig.game[ig.game.player.allowEquip] = true;
ig.game.blocks = Deobfuscator.object(ig.game, "lastRequestTimestamps", false);
ig.game.websocket = Deobfuscator.object(ig.game, "binary", false);
ig.game.player.id = Deobfuscator.variableByLength(ig.game.player, 24, false);
id = Deobfuscator.variableByLength(ig.game.player, 24, true);

/*
 * Function to find someones RID from their screenName in game.
*/
function idFromScreenName(screenName) {
	updatePlayers();

	return ig.game.players.filter(i =>
		i.screenName == screenName
	)[0]['id']
}

/*
 * Function to update the ig.game.player array
*/
function updatePlayers() {
	ig.game.players = Deobfuscator.object(ig.game, "betweenDefaultAndPlayer", false).player;
}
