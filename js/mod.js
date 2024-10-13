let modInfo = {
	name: "The Exponent Tree Rewritten",
	id: "TETRewrit",
	author: "RTLF2024",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0.0",
	name: "Release",
}

let changelog = `<h1>Changelog:</h1><br>
<b><font color="red">NOTE: Spoilers alert!</font></b><br><br>

	<h3>v1.0.0</h3><br>
		- Started working on the game.<br>
		- Absolute Tree may still receive updates but that could be delayed.
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
	return hasUpgrade("ex",11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(getBasePointGen())
	if (hasUpgrade("ex",12)) gain = gain.times(upgradeEffect("ex",12))
		if (hasUpgrade("ex",14)) gain = gain.pow(2)
	

	if (hasUpgrade("ex",23)) gain = gain.pow(2)

	if (player.points.gte(1e12)) gain = gain.root(getPointRooter())
	return gain;
}

function getBasePointGen() {

let base = new Decimal(1)
if (getBuyableAmount("ex",11).gte(1)) base = base.add(player.ex.buyables[11])
	
if (hasUpgrade("ex",17)) base = base.add(1)
	
return base;
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [`<span>Reach 7e16 Exponent Points to beat the game!</span><br><br>Tip: Hover over certain buyable or upgrade to see its formula.
	`,
() => (player.points.gte(1e12)&&(canGenPoints())) ? "<span style='color: yellow'> Due to Points overflow, your Points gain is rooted by "+format(getPointRooter())+"." : "",
() => (player.points.gte(1e20)&&(canGenPoints())) ? "<span style='color: orange'> Due to Points overflow, rooting effect is multiplied by "+format(getPointRooter2())+"." : "",
]

// Determines when the game "ends"
function isEndgame() {
	return player.ex.expPoints.gte("7e16")
}

function getPointRooter() {
	let base = player.points.max(1e12).log(1e12).max(1).pow(2)
  if (player.points.gte(1e20)) base = base.times(getPointRooter2())
	return base
}

function getPointRooter2() {
	let base = player.points.max(1e20).log(1e20).max(1).pow(2)

	return base
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