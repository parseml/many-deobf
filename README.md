# Manyland Deobfuscator
Keep up to date with manyland obfuscation

# Usage

Importing in to your script
```js
$.getScript("https://cdn.jsdelivr.net/gh/parseml/many-deobf@latest/deobf.js")
```

Preset variables
```js
ig.game.player // Self Object
ig.game.player.changeName // Change name function
ig.game.players // Player Array
ig.game.equip.item // Function to equip bodies / items
ig.game.blocks // Object that holds block ids and such
ig.game.websocket // WebSocket object
ig.game.player.id // Your player ID

async idFromScreenName(string screenName) // Screenname to player id
const getPlayerChat(string targetID) // Returns players chat
async itemInformation(string itemID) // Returns item information
const updatePlayers() // Updates the player array (For when new players join and such)
```
# Example

Script that displays players in game
```js
(async () => {
	await $.getScript("http://cdn.jsdelivr.net/gh/parseml/many-deobf/deobf.js");
	
	ig.game.players.forEach(player => {
		consoleref.log(player.screenName);
	});
})();
```
