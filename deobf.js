/**
 * Phil, if you are reading this and want to kill it off.. just define a global variable called
 * "PhilippKillSwitch"!
 */
if(typeof PhilippKillSwitch == "undefined" && typeof id === "undefined") {
	/**
	 * Written by Parse
	 * A tool for finding minified manyland variables.
	 */
	consoleref.log(
		'%cDeobfuscator created by Parse\nCheck it out -> github.com/parseml/many-deobf',
		'background: purple; color: white; display: block; padding: 10px;',
	);

	/**
	 * I'm too lazy to document this, but gladly someone else did it for me.
	 * You can check it out here for more information.
	 * https://manylandmods.github.io/manyland-documentation/#/obfuscation?id=parses-deobfuscator
	 */
	var Deobfuscator = {
		object: function(object, string, returnKey) {
			let keys = Object.keys(object)
			let proto = Object.keys(Object.getPrototypeOf(object))

			for(let key of [ ...keys, ...proto ]) {
				if(!object[key])
					continue

				let _keys = Object.keys(object[key])
				let _proto = Object.keys(Object.getPrototypeOf(object[key]))

				if([ ..._keys, ..._proto ].includes(string))
					return returnKey ? key : object[key]
			}
		},

		function: function(object, string, returnKey) {
			let keys = Object.keys(object)
			let proto = Object.keys(Object.getPrototypeOf(object))

			for(let key of [ ...keys, ...proto ]) {
				if(!object[key])
					continue

				if(object[key].toString().includes(string))
					return returnKey ? key : object[key]
			}
		},

		variableByLength: function(object, length, returnKey) {
			let keys = Object.keys(object)
			let proto = Object.keys(Object.getPrototypeOf(object))

			for(let key of [ ...keys, ...proto ]) {
				if(!object[key])
					continue

				if(object[key].length === length)
					return returnKey ? key : object[key]
			}
		},

		keyBetween: function(func, start, stop) {
			return func.toString().substring(
				func.toString().lastIndexOf(start) + start.length,
				func.toString().lastIndexOf(stop)
			)
		}
	};

	/**
	 * Here is an example of getting minified variables.
	 * These are also pre-defined variables that you can use in your mods / scripts!
	 */
	ig.game.player = Deobfuscator.object(ig.game, 'screenName', false)
	id = Deobfuscator.variableByLength(ig.game.player, 24, true)
	ig.game.player.id = ig.game.player[id]
	ig.game.player.changeName = Deobfuscator.function(ig.game.player, 'this.screenName=', false)
	ig.game.players = Deobfuscator.object(ig.game, "betweenDefaultAndPlayer", false).player
	ig.game.equip = Deobfuscator.object(ig.game, "getCollectedItemsForPlayer", false)
	ig.game.equip.item = Deobfuscator.function(ig.game.equip, "getItem_P", false)
	ig.game.blocks = Deobfuscator.object(ig.game, "lastRequestTimestamps", false)
	ig.game.websocket = Deobfuscator.object(ig.game, "binary", false)
	ig.game.player.id = Deobfuscator.variableByLength(ig.game.player, 24, false)
	players = Deobfuscator.object(ig.game, "betweenDefaultAndPlayer", true)
	allowEquiping = Deobfuscator.keyBetween(ig.game.init, "t=!0,ig.game.", "=!0);")
	ig.game[allowEquiping] = true

	/*
	 * Function to find someones RID from their screenName in game.
	 */
	function idFromScreenName(screenName) {
		updatePlayers()

		return ig.game.players.filter(i => i.screenName == screenName)[0]
	}

	/*
	 * Function to update the ig.game.player array for new players
	 */
	function updatePlayers() {
		ig.game.players = ig.game[players].player
	}
}
