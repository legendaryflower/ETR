let modInfo = {
	name: "The Exponent Tree Rewritten",
	id: "TETRewrit",
	author: "RTLF2025",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js","achievements.js", "willy.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.1.1",
	name: "Release",
}

let changelog = `<h1>Changelog:</h1><br>
<b><font color="red">NOTE: Spoilers alert!</font></b><br><br>
<h3>v1.1.1</h3><br>
		- Added a discord server to the game! Join to stay up-to-date and chat about the game.<br>
		- Balanced up to unlocking Pashtocha layer.<br>
		- Fixed a bug where 'Quality of Lification' upgrade showed useless effect display.<br>
		- Fixed a bug where ext3 upgrade wasn't showing up.<br>
		- Weakened some timewalls.<br>
		<br><br>
<h3>v1.1</h3><br>
		- Added statistics and your base point gain in Achievements has been removed.<br>
		- Added a savebank for players that don't want to spend a lot of time getting into a layer.<br>
		- If you progress the game more, you will unlock new achievements.<br>
		- Added more layer content.<br>
		- Balanced up to 25 Corruptions.<br>
		<br><br>

<h3>v1.0.2</h3><br>
		- Added some new layers.<br>
	    - You can now check your base point at the Achievements layer. Will be adding savebank and statistics soon. <br>
		- Added some stuff.<br>
		- Balanced up to 1 MB (1e6 bytes) in Partition sectors.
		<br><br>
	<h3>v1.0.1</h3><br>
		- Added 3 new layers. There's 2 layers that would come in a next update.<br>
		- Added Achievements.<br>
		- Fixed "Points Multiplier-plier" upgrade lying.<br>
		- Balanced up to 127 Poachers.
		<br><br>
	<h3>v1.0.0</h3><br>
		- Started working on the game.<br>
		- Absolute Tree may still receive updates but that could be delayed.
<br><br><br>
		<a href="https://youtu.be/pa14VNsdSYM">Click here to reach endgame (Not a rickroll!)</a>
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
	return hasUpgrade("ex",11)||hasUpgrade("s",11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(getBasePointGen())


	if (hasUpgrade("ex",12)) gain = gain.times(upgradeEffect("ex",12))
		if (hasUpgrade("ex",14)) gain = gain.pow(2)
	

	if (hasUpgrade("ex",23)) gain = gain.pow(2)

	if (player.points.gte(1e12)&&!hasUpgrade("ic",13)) gain = gain.root(getPointRooter())
	
	if (hasAchievement("ach",21)) gain = gain.pow(1.2)
		if (inChallenge("ic",11)) gain = gain.sqrt()

		if (hasUpgrade("ic",22)) gain = gain.pow(1.1)

		if (player.o.unlocked) gain = gain.times(tmp.o.effect)

			if (getBuyableAmount("ic",21).gte(1)) gain = gain.times(tmp.ic.universeEffect)

			if (hasUpgrade("ic",26)) gain = gain.times(upgradeEffect("ic",26))


	if (hasUpgrade("ic",33)) gain = gain.pow(2)		
		
	if (getBuyableAmount("ic",41).gte(1)) gain = gain.pow(tmp.ic.buyables[41].effect.first)

		if (hasUpgrade("c",31)) gain = gain.pow(1.5)	

		if (hasUpgrade("s",13)) gain = gain.times(upgradeEffect("s",13))	
			if (hasUpgrade("s",21)) gain = gain.pow(1.1)
	if (hasUpgrade("wi",15)) gain = gain.times(tmp.s.corruptEffect)

	if (hasUpgrade("s",45)) gain = gain.times(upgradeEffect("s",45))
		if (hasAchievement("ach",41)) gain = gain.times(36)
			if (hasUpgrade("s",54)) gain = gain.pow(upgradeEffect("s",54))
			
if (inChallenge("s",11)) gain = gain.root(2)

	if (hasUpgrade("s",62)) gain = gain.pow(tmp.s.affinityEffect)


		if (hasUpgrade("s",65)) gain = gain.pow(upgradeEffect("s",65))
		let gainSoftcap = new Decimal(softcapCheeseburger())
		if (gain.gte(gainSoftcap)&&inChallenge("s",11)) gain = Decimal.pow(10,Decimal.log10(gain.div(gainSoftcap)).pow(3/6)).mul(gainSoftcap)

	

				if (hasUpgrade("s",91)) gain = gain.times(tmp.s.furtherEffect)

					if (hasUpgrade("s",93)&&inChallenge("s",11)) gain = gain.pow(1.5)

			if (hasUpgrade("s",101)&&inChallenge("s",11)) gain = gain.pow(1.5)
				if (hasUpgrade("s",101)&&!inChallenge("s",11)) gain = gain.pow(1.1)
					if (hasUpgrade("s",47)) gain = gain.pow(1.1)
						if (hasUpgrade("s",57)) gain = gain.pow(1.1)
							if (hasUpgrade("s",67)) gain = gain.pow(1.1)
								if (hasUpgrade("s",97)) gain = gain.pow(1.1)
									if (hasUpgrade("s",107)) gain = gain.pow(1.1)



						let gainSoftcap2 = new Decimal(softcapPoints())
			if (gain.gte(gainSoftcap2)&&!inChallenge("s",11)) gain = Decimal.pow(10,Decimal.log10(gain.div(gainSoftcap2)).pow(2/6)).mul(gainSoftcap2)
	return gain;
}

function getBasePointGen() {

let base = new Decimal(1)

if (inChallenge("s",11)) return new Decimal(1)
if (getBuyableAmount("ex",11).gte(1)) base = base.add(player.ex.buyables[11].times(tmp.ex.buyables[11].pegasus))
	
if (hasUpgrade("ex",17)) base = base.add(1)

if (hasUpgrade("c",21)) base = base.times(upgradeEffect("c",21))
	if (hasUpgrade("c",22)) base = base.times(upgradeEffect("c",22))

if (hasUpgrade("s",12)) base = base.times(10)

	if (hasUpgrade("c",53)) base = base.times(16)

	if (hasUpgrade("wi",22)) base = base.pow(1.1)

		if (hasUpgrade("wi",24)&&!inChallenge("s",11)) base = base.times(upgradeEffect("wi",24).div(100))

		
return base;
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	newsTotal: decimalZero
}}

// Display extra things at the top of the page
var displayThings = [`<span>Endgame: Unlock Pashtocha layer.</span><br><br>Tip: Hover over certain buyable or upgrade to see its formula.
	`,
	
() => ((player.points.gte(1e12)&&(canGenPoints()))&&!hasUpgrade("ic",13)) ? "<span style='color: yellow'> Due to Points overflow, your Points gain is rooted by "+format(getPointRooter())+"." : "",
() => ((player.points.gte(1e20)&&(canGenPoints()))&&!hasUpgrade("ic",13)) ? "<span style='color: orange'> Due to Points overflow, rooting effect is multiplied by "+format(getPointRooter2())+"." : "",
() => ((player.points.gte(softcapCheeseburger())&&(canGenPoints()))&&inChallenge("s",11)) ? "<span style='color: red'> After "+format(softcapCheeseburger())+" Points/sec, Points gain is softcapped!" : "",
() => ((player.points.gte(softcapPoints())&&(canGenPoints()))&&!inChallenge("s",11)) ? "<span style='color: red'> After "+format(softcapPoints())+" Points/sec, Points gain is <b>massively</b> softcapped!" : "",
]
function softcapCheeseburger() {
 let softcap = new Decimal("1e1000")
 if (hasUpgrade("s",95)) softcap = softcap.pow(upgradeEffect("s",95))
 return softcap;

}

function softcapPoints() {
	let softcap = new Decimal("1e13750")

	return softcap;
   
   }
// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade("s",97)
}

function getPointRooter() {
	let base = player.points.max(1e12).log(1e12).max(1).pow(2)
	if (hasUpgrade("s",11)) return new Decimal(1)
  if (player.points.gte(1e20)) base = base.times(getPointRooter2())

	return base
}

function getPointRooter2() {
	
	let base = player.points.max(1e20).log(1e20).max(1).pow(2)
	if (hasUpgrade("s",11)) return new Decimal(1)
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