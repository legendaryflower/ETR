let modInfo = {
	name: "The Exponent Tree",
	id: "mymod",
	author: "RTLF2024 (Remastered The Legendary Flower2024)",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.6 Alpha Part 1",
	name: "Alpha Release",
}

let changelog = `<h1>Changelog:</h1><br>
<b><font color="red">NOTE: Spoilers alert!</font></b>
<br>
<br>
<h3>v0.0.6 Alpha Part 1</h3><br>
- Added <b>Sectors</b>, it can be unlocked by completing Smash Rhenium.<br>
- Added Superexponents, Hyperexponents and Haloexponents. <br>
- More Smash Poachers are added by reaching 7,800,000,000 Superexponents.<br>
- Added more content. <br>
- You can eat a burrito and it will redirect you to meatspin. <br>
- We may change the game's ID in the 0.0.7 Alpha update because it can interfere with other mods having the "mymod" ID. You need to backup your save and if we change it, you'll may lose your hard work!<br>
- The plans is to revamp Orbs and Poachers so they can cause less-inflaton problems.<br>
- Some of the features don't work so don't report a bug because ther Part 1 is unstable.
<img src="https://cdn.discordapp.com/emojis/875402206667477102.gif?size=48&name=bear%7E1&quality=lossless"><br>
<br>
<h3>v0.0.5.1 Alpha</h3><br>
- (Requested by many persons), Fixed a bug where you will not get Poachers. (Bug issue: Severe)<br>
<br>
<h3>v0.0.5 Alpha</h3><br>
- More <b>Poachers</b> content is added.<br>
- Added <b>Smash Rhenium</b> <br>
- Fixed a bug where pressing a key doesn't reset any layer and give the currency.<br>
- Changing stuff. <br>
- Forgot to make orbs buy max in its 4th milestone instead of 3rd milestone, Requested by M_U_G_E_N. <br>
- Added a lore for Rhenium herself, try unlocking Smash Rhenium and getting it in. <br>
- There might be bugs that may seriously damage the game, If you found any, message me in Forums or report a bug in the Google Forms.
<br>
<br>
<h3>v0.0.4 Alpha</h3><br>

<h4>v0.0.4.1 Alpha</h4><br>
- You can now report bugs with a new layer.<br><br>
<h4>v0.0.4.0 Alpha</h4><br>
- Patched a bug where you get more than 1F100 cookies in Exponent Upgrade 61, the effect was nerfed and only made to multiply its gain.<br>
- Added a new Orbic. <br>
- More content is added. <br>
- Fixing bugs that caused the production to produce more than 1F100 resources.
 <br>
<br>
<h3>v0.0.3 Alpha</h3><br>
- Added <b>Willy</b> layer, huh don't ask me ☺ <br>
- Hafnium orbic is finished and added Zirconium, Rhenium and more. <br>
- Hassium now slows your Orb gain when you reach 31 of them. <br>
- More content is added.
<br>
<br>
<h3>v0.0.2 Alpha</h3><br>
- Added more Exponent and Orb upgrades. <br>
- Added <b>Orbics</b>. <br>
- Added a spoiler note in Changelog.
<br>
<br>
	<h3>v0.0.1 Alpha</h3><br>
		- Added Exponent coins and Orbs <br>
		`

let winText = `This game is currently unfinished and the endgame may change anytime soon but congrats for beating the game!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)

var alwaysKeepTheseVariables = ["primeMiles", "auto", "autoExt", "autoBld", "autoW", "autoGhost", "autoSE", "autoNN", "keepPosNeg", "distrAll", "spellInput", "pseudoUpgs", "maxToggle"]
var doNotCallTheseFunctionsEveryTick = ["doReset", "buy", "buyMax", "onPurchase", "blowUpEverything", "castAllSpells", "completeInBulk", "startMastery", "completeMastery"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("p", 11)) gain = gain.times(upgradeEffect("p", 11));
	if (hasUpgrade("p", 12)) gain = gain.times(upgradeEffect("p", 12));
	if (hasUpgrade('p', 14)) gain = gain.times(2.5)
	
	if (player.o.unlocked) gain = gain.times(tmp.o.buyables[12].effect.first);
	if (player.o.unlocked) gain = gain.times(tmp.o.effect);
	if (hasUpgrade("o", 14)) gain = gain.times(upgradeEffect("o", 14));
	if (hasUpgrade('p', 45)) gain = gain.pow(1.05)
	if (inChallenge("o", 12)) gain = gain.div(player.o.points);
	if (hasUpgrade('o', 32)) gain = gain.times(3)
	if (hasChallenge('o', 32)) gain = gain.pow(1.08)
	if (inChallenge("o", 41)) gain = gain.div(player.w.points);
	if (hasUpgrade('po', 13)) gain = gain.pow(1.06)
	if (hasUpgrade("p", 62)) gain = gain.times(upgradeEffect("p", 62));
	if (inChallenge("po", 11)) return new Decimal(1);
	if (hasChallenge('po', 11)) gain = gain.pow(1.07)
	if (inChallenge("po", 12)) gain = gain.div(player.p.points);
	if (hasUpgrade('po', 31)) gain = gain.times(2)
	if (hasUpgrade('po', 34)) gain = gain.times(4)
	if (inChallenge("po", 21)) gain = gain.tetrate(0.001)
	if (player.s.unlocked) gain = gain.times(tmp.s.buyables[12].effect.first);
	if (player.points.gte(1e30)) new Decimal(0);
	
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [`<span>Reach 129 <b>Haloexponents</b> to beat the game!</span><br>Be sure to backup your save because we may <br>change the game's ID because it may interfere with other mobs having the "mymod" ID!`,
]

// Determines when the game "ends"
function isEndgame() {
	return player.s.points.gte(new Decimal("1e129"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
