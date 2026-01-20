let modInfo = {
	name: "The Exponent Tree Rewritten",
	id: "TETRewrit",
	author: "RTLF2026",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js","achievements.js", "willy.js", "trucker.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.3",
	name: "Release",
}

let changelog = `<h1>Changelog:</h1><br>
<b><font color="red">NOTE: Spoilers alert!</font></b><br><br>
<h3>v1.3</h3><br>
		- Added 3 new layers.<br>
		- Balanced up to completing a Skelet-Net of Sectors.<br>
        - Fixed a bug where the 'Disk error' upgrade effect showed NaN.<br>
        - Squashed even more NaN bugs.<br>
		- Fixed a bug where hotkey for resetting certain layers didn't work.<br>
		- Added Skelet-Net (mastery equivalent of ETR) and some new stuff prior to Pashtocha.<br>
		<br><br>
<h3>v1.2</h3><br>
		- Fully added Pashtocha layer.<br>
		- Balanced up to 1e20,000 points in Trucking up.<br>
        - Fixed a bug where 'Follow the Midnight Train' was impossible to purchase.<br>
		- Fixed some bugs (such as NaN errors when resetting for a Cookie when having specific upgrades) and rebalanced gameplay a little bit.<br>
		- Renamed an achievement.<br>
		- Renamed some news and added new ones.<br>
		- Updated savebank saves.<br>
		- Added AMD CPUs.<br>
		<br><br>
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


	if (hasUpgrade("ic",33)) gain = gain.pow(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?4:2)		
		
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
if (hasAchievement("ach",45)&&inChallenge("s",11)) gain = gain.pow(1.3)

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

					if (getBuyableAmount("ic",61).gte(1)&&inChallenge("s",11)) gain = gain.pow(tmp.ic.buyables[61].effect.first)

if (inChallenge("pa",11)) gain = gain.pow(0.1)


	if (getBuyableAmount("p",16).gte(1)&&inChallenge("s",11)) gain = gain.pow(tmp.p.buyables[16].effect.first)

		if (hasUpgrade("s",104)&&player.truck.inTrucking.gte(1)) gain = gain.pow(1.05)
			if (player.truck.inTrucking.gte(1)) gain = gain.pow(0.4)

if (hasUpgrade("pa",46)) gain = gain.pow(1.45)
	if (hasUpgrade("pa",51)) gain = gain.pow(upgradeEffect("pa",51))
 if (hasUpgrade("truck",25)) gain = gain.pow(3)
	
						let gainSoftcap2 = new Decimal(softcapPoints())
			if (gain.gte(gainSoftcap2)&&!inChallenge("s",11)) gain = Decimal.pow(10,Decimal.log10(gain.div(gainSoftcap2)).pow(2/6)).mul(gainSoftcap2)


let gainSoftcap3 = new Decimal(softcapCheeseburger2())
			if (gain.gte(gainSoftcap3)&&inChallenge("s",11)) gain = Decimal.pow(10,Decimal.log10(gain.div(gainSoftcap3)).pow(1/6)).mul(gainSoftcap3)

if (hasUpgrade("pa",56)) gain = gain.pow(1.01)
if (inChallenge("pa",12)) gain = gain.pow(0.08)
if (hasUpgrade("c",57)) gain = gain.pow(1.02)

if (hasAchievement("ach",64)) gain = gain.pow(tmp.ach.achievementPower2)

	if (hasUpgrade("s",82)&&inChallenge("pa",12)) gain = gain.pow(1.25)
			if (hasUpgrade("s",83)&&inChallenge("pa",12)) gain = gain.pow(upgradeEffect("s",83))
					if (hasUpgrade("s",84)&&inChallenge("pa",12)) gain = gain.pow(upgradeEffect("s",84))

							if (inChallenge("pa",13)) gain = gain.tetrate(0.01)
								if (hasUpgrade("s",87)&&inChallenge("pa",13)) gain = gain.times(upgradeEffect("s",87))


	if (hasUpgrade("truck",12)&&inChallenge("pa",13)) gain = gain.pow(upgradeEffect("truck",12))
	if (player.s.amd.gte(6)&&inChallenge("pa",13)) gain = gain.pow(tmp.s.k623Effect)
		let gainSoftcap4 = new Decimal(softcapTruckPoints())
			if (gain.gte(gainSoftcap4)&&player.truck.inTrucking.gte(1)) gain = Decimal.pow(10,Decimal.log10(gain.div(gainSoftcap4)).pow(2/6)).mul(gainSoftcap4)

				if (getBuyableAmount("s",16).gte(1)&&inChallenge("pa",13)) gain = gain.pow(tmp.s.buyables[16].effect.first)
				let gainSoftcapSquared = new Decimal(softcapPointsSquared())
		if (gain.gte(gainSoftcapSquared)) gain = Decimal.pow(10,Decimal.log10(gain.div(gainSoftcapSquared)).pow(2/6)).mul(gainSoftcapSquared)
if (getBuyableAmount("p",16).gte(1)&&player.truck.inTrucking.gte(1)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("p"):false) gain = gain.pow(tmp.p.buyables[16].effect.first)

			if (player.z.unlocked&&player.truck.inTrucking.gte(1)) gain = gain.pow(tmp.z.truckEffect)
				let gainSoftcap5 = new Decimal(softcapTruckPoints2())
			if (gain.gte(gainSoftcap5)&&player.truck.inTrucking.gte(1)) gain = Decimal.pow(10,Decimal.log10(gain.div(gainSoftcap5)).pow(2/6)).mul(gainSoftcap5)
				
	return gain;
}

function getBasePointGen() {

let base = new Decimal(getSuperBasePointGen())
	if (inChallenge("pa",12)) return new Decimal(0.05)
	if (inChallenge("pa",11)) return new Decimal(1)
if (inChallenge("s",11)&&!hasMilestone("pa",5)) return new Decimal(1)
	if (player.truck.inTrucking.gte(1)) return new Decimal(1)
if (getBuyableAmount("ex",11).gte(1)) base = base.add(player.ex.buyables[11].times(tmp.ex.buyables[11].pegasus))
	
if (hasUpgrade("ex",17)) base = base.add(1)

if (hasUpgrade("c",21)) base = base.times(upgradeEffect("c",21))
	if (hasUpgrade("c",22)) base = base.times(upgradeEffect("c",22))

if (hasUpgrade("s",12)) base = base.times(10)

	if (hasUpgrade("c",53)) base = base.times(16)

	if (hasUpgrade("wi",22)) base = base.pow(1.1)

		if ((hasUpgrade("wi",24)&&!inChallenge("s",11))&&!hasUpgrade("wi",25)) base = base.times(upgradeEffect("wi",24).div(100))
		if ((hasUpgrade("wi",24)&&!inChallenge("s",11))&&hasUpgrade("wi",25)) base = base.times(upgradeEffect("wi",24).add(1))
			if (getBuyableAmount("ic",62).gte(1)) base = base.pow(tmp.ic.buyables[62].effect.first)

	if (player.pa.unlocked&&player.s.unlocked) base = base.times(tmp.s.pentiumEffect2)
		if (hasUpgrade("pa",26)) base = base.times(upgradeEffect("pa",26))
		
		if (inChallenge("s",11)&&hasMilestone("pa",5)) base = base.root(2)

		if (hasUpgrade("wi",26)) base = base.times(upgradeEffect("wi",26))

		if (hasAchievement("ach",71)) base = base.times(player.points.add(1).log10().add(1).pow(2))



		let hardcap = new Decimal("1e1e7")
		  if (base.gte(hardcap)) return new Decimal("1e1e7")

return base;
}
function getSuperBasePointGen() {

let base = new Decimal(1)
	if (hasAchievement("ach",76)) base = base.add(1)
 if (hasUpgrade("truck",41)) base = base.times(upgradeEffect("truck",41))
		
 if (hasUpgrade("truck",42)) base = base.times(upgradeEffect("truck",42))

if (hasUpgrade("ic",42)&&((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)) base = base.pow(3)

	if (hasAchievement("ach",28)) base = base.pow(2)

	if (player.s.amd.gte(9)) base = base.times(tmp.s.athlonXPEffect)
return base;
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	newsTotal: decimalZero
}}

function preSectorSpeed() {
	let speed = new Decimal(1);
	if (player.tr.unlocked) speed = speed.times(tmp.tr.effect)
	return speed;
}
// Display extra things at the top of the page
var displayThings = [`<span>Endgame: Completed Skelet-Net of Sectors</span><br><br>Tip: Hover over certain buyable or upgrade to see its formula.
	`,
	
() => ((player.points.gte(1e12)&&(canGenPoints()))&&!hasUpgrade("ic",13)) ? "<span style='color: yellow'> Due to Points overflow, your Points gain is rooted by "+format(getPointRooter())+"." : "",
() => ((player.points.gte(1e20)&&(canGenPoints()))&&!hasUpgrade("ic",13)) ? "<span style='color: orange'> Due to Points overflow, rooting effect is multiplied by "+format(getPointRooter2())+"." : "",
() => ((player.points.gte(softcapCheeseburger())&&(canGenPoints()))&&inChallenge("s",11)) ? "<span style='color: red'> After "+format(softcapCheeseburger())+" Points/sec, Points gain is softcapped!" : "",
() => ((player.points.gte(softcapCheeseburger2())&&(canGenPoints()))&&inChallenge("s",11)) ? "<span style='color: red'> After "+format(softcapCheeseburger2())+" Points/sec, Points gain is <b>even more</b> softcapped!" : "",
() => ((player.points.gte(softcapPoints())&&(canGenPoints()))&&!inChallenge("s",11)) ? "<span style='color: red'> After "+format(softcapPoints())+" Points/sec, Points gain is <b>massively</b> softcapped!" : "",
() => ((player.points.gte(softcapTruckPoints())&&(canGenPoints()))&&!inChallenge("s",11)&&player.truck.inTrucking.gte(1)) ? "<span style='color: maroon'> After "+format(softcapTruckPoints())+" Points/sec, Points gain is <b>even more massively</b> softcapped!" : "",
() => (player.truck.inTrucking.gte(1)) ? "You are trucking up. You spent "+format(player.truck.time)+" seconds while trucking." : "",
() => ((player.points.gte(softcapPointsSquared())&&(canGenPoints()))&&!inChallenge("s",11)) ? "<span style='color: orange'> After "+format(softcapPointsSquared())+" Points/sec, Points gain is <b>massively</b> softcapped^2!" : "",
() => ((player.points.gte(softcapTruckPoints2())&&(canGenPoints()))&&!inChallenge("s",11)&&player.truck.inTrucking.gte(1)) ? "<span style='color: brown'> After "+format(softcapTruckPoints2())+" Points/sec, Points gain is <b>even more massively</b> softcapped!" : "",
() => ((player.points.gte(hardcapTruckPoints())&&(canGenPoints()))&&!inChallenge("s",11)&&player.truck.inTrucking.gte(1)) ? "<span style='color: brown'> After "+format(hardcapTruckPoints())+" Points/sec, Points gain is hardcapped!" : "",
() => ((isEndgame())) ? "<span style='color: purple'>Game might not be balanced after endgame.</span>" : "",
]
function softcapCheeseburger() {
 let softcap = new Decimal("1e1000")
 if (hasUpgrade("s",95)) softcap = softcap.pow(upgradeEffect("s",95))
 return softcap;

}

function softcapCheeseburger2() {
 let softcap = new Decimal("1e17000")
if (hasUpgrade("s",73)) softcap = softcap.times(1e100)
	if (hasUpgrade("s",86)) softcap = softcap.pow(1.05)
	if (hasUpgrade("truck",21)) softcap = softcap.pow(upgradeEffect("truck",21))
		 if (player.z.unlocked&&!hasMilestone("truck",10)) softcap = softcap.pow(tmp.z.sectorEffect)
 return softcap;


}
function softcapPoints() {
	let softcap = new Decimal("1e13750")
  if (player.s.intel.gte(3)) softcap = softcap.pow(tmp.s.celeronEffect)
	if (hasUpgrade("pa",12)) softcap = softcap.times(1e6)
			if (hasUpgrade("pa",21)) softcap = softcap.times(upgradeEffect("pa",21))

		if (getBuyableAmount("s",14).gte(1)) softcap = softcap.pow(tmp.s.buyables[14].effect.first)

			if (hasAchievement("ach",27)) softcap = softcap.pow(1.02)
					if (hasUpgrade("c",82)) softcap = softcap.pow(1.05)


	if (hasUpgrade("c",72)) softcap = softcap.pow(1.03)

			if (hasUpgrade("c",62)) softcap = softcap.pow(1.02)

				if (hasUpgrade("pa",53)&&player.truck.inTrucking.gte(1)) softcap = softcap.pow(upgradeEffect("pa",53))

					if (hasUpgrade("c",44)) softcap = softcap.pow(upgradeEffect("c",44))


	if (hasUpgrade("s",74)) softcap = softcap.pow(tmp.s.affinityEffect.div(4))

		if (hasChallenge("pa",12)) softcap = softcap.pow(1.25)

		if (hasUpgrade("truck",13)) softcap = softcap.pow(upgradeEffect("truck",13))	

	if (hasUpgrade("truck",35)) softcap = softcap.pow(2)
		if (hasUpgrade("ex",33)) softcap = softcap.pow(1.1)

	if (hasUpgrade("ic",45)&&((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("ic"):false)) softcap = softcap.pow(3)
	return softcap;
   
   }
function softcapPointsSquared() {
	let softcap = new Decimal("1e250000")
 	if (hasMilestone("truck",6)) softcap = softcap.pow(1.1)
		 	if (hasMilestone("truck",7)) softcap = softcap.pow(player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).add(1).pow(hasMilestone("truck",15) ? 0.016:0.008))
					if (hasMilestone("truck",12)) softcap = softcap.pow(1.1)

			if (hasMilestone("truck",13)) softcap = softcap.pow(tmp.ach.achievementPower2)
				if (hasMilestone("truck",14)) softcap = softcap.pow(1.5)

			if (hasMilestone("truck",16)) softcap = softcap.pow(Decimal.pow(1.01, player.truck.milestones.length))

	if (hasUpgrade("ex",32)) softcap = softcap.pow(1.1)
	if (hasUpgrade("truck",37)) softcap = softcap.pow(upgradeEffect("truck",13).div(1.5))	

		if (hasUpgrade("truck",45)) softcap = softcap.times(upgradeEffect("pa",21))

		if (hasUpgrade("ic",41)&&((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("ic"):false)) softcap = softcap.pow(1.11)

		if (hasUpgrade("ic",45)&&((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("ic"):false)) softcap = softcap.pow(1.05)

					if (hasUpgrade("ic",47)&&((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("ic"):false)) softcap = softcap.pow(1.2)

		if (hasAchievement("ach",28)) softcap = softcap.pow(1.05)

		if (getBuyableAmount("truck",12).gte(1)) softcap = softcap.pow(tmp.truck.buyables[12].effect.first)

			if (hasUpgrade("c",44)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("c"):false) softcap = softcap.pow(upgradeEffect("c",44).div(22))

			if (hasUpgrade("truck",53)&&getBuyableAmount("ic",41).gte(1)) softcap = softcap.pow(tmp.ic.buyables[41].effect.first)

				if (hasUpgrade("s",74)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("s"):false) softcap = softcap.pow(tmp.s.affinityEffect.div(6.9))
	return softcap;

   
   }
   function softcapTruckPoints() {
 let softcap = new Decimal("1e75000")
 if (hasUpgrade("truck",27)) softcap = softcap.times(upgradeEffect("truck",27))

	 if (hasUpgrade("truck",51)) softcap = softcap.times(upgradeEffect("truck",51))
 return softcap;

}
 function softcapTruckPoints2() {
 let softcap = new Decimal("1e500000")
if (getBuyableAmount("truck",11).gte(1)) softcap = softcap.times(tmp.truck.buyables[11].effect.first)
	 if (hasUpgrade("truck",44)) softcap = softcap.times(upgradeEffect("truck",27))
		 if (hasUpgrade("truck",51)) softcap = softcap.times(upgradeEffect("truck",51))
 return softcap;


}
 function hardcapTruckPoints() {
 let softcap = new Decimal("1e750000")

 return softcap;

}
// Determines when the game "ends"
function isEndgame() {
	return player.si.mastered.includes("s")
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