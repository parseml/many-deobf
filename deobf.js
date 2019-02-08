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
	}
};

// Predefined Obfuscation List

ig.game.player = Deobfuscator.object(ig.game, "screenName", false);
ig.game.entities = Deobfuscator.object(ig.game, "betweenDefaultAndPlayer", false).player;
ig.game.equip = Deobfuscator.object(ig.game, "removeItemFromCollection", false);
ig.game.equip.item = Deobfuscator.function(ig.game.equip, "AnimationSheet(null,d", false);
