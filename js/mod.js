let modInfo = {
	name: "The Robot Tree",
	id: "mymod",
	author: "Slime Adventure",
	pointsName: "cogs",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "The Robot Upgrade",
}

let changelog = `<h1>Changelog:</h1>
<br>
	<h3>v0.1</h3><br>
		- Changed some tree layers how they work.<br>
		- Added Supermachintruc System and Chassis`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

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
	if (hasUpgrade('p', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 21)) gain = gain.times(3)
	if (hasAchievement("a", 13)) gain = gain.times(1.1);
	if (hasUpgrade('g', 11)) gain = gain.times(5)
	if (hasUpgrade('g', 12)) gain = gain.times(upgradeEffect('g', 12))
	if (hasUpgrade('ps', 11)) gain = gain.times(2)
	if (hasUpgrade('cb', 12)) gain = gain.times(4.5)
	if (hasUpgrade('mo', 12)) gain = gain.times(8)
	if (hasUpgrade('re', 12)) gain = gain.times(upgradeEffect('re', 12))
	if (hasUpgrade('i', 12)) gain = gain.times(upgradeEffect('i', 12))
	if (hasUpgrade('p', 33)) gain = gain.times(7.5)
	if (hasUpgrade('g', 15)) gain = gain.times(upgradeEffect('g', 15))
	if (hasUpgrade("p", 15)) gain = gain.times(upgradeEffect("p", 15));
	if (inChallenge('d', 12)) gain = gain.times(0.5)
	if (hasAchievement('a', 22)) gain = gain.times(2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
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