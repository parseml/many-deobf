# Manyland Deobfuscator
Keep up to date with manyland obfuscation
Get in contact with me! Parse#3645

# Usage

Importing in to your script
```js
$.getScript("http://cdn.jsdelivr.net/gh/parseml/many-deobf/deobf.js")
```

Preset variables
```js
ig.game.player // Self Object
ig.game.player.changeName // Change name function
ig.game.entities // Player Array
ig.game.equip.item // Function to equip bodies / items
```
# Example

Script that displays players in game
```js
$.getScript("http://cdn.jsdelivr.net/gh/parseml/many-deobf/deobf.js");

ig.game.entities.forEach((player) => {
	consoleref.log(player.screenName);
});
```
