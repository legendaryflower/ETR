function softcapStaticGain(gain, row) {
	for (let scale=0;scale<STATIC_SCALE_DATA.length;scale++) {
		let start = getStaticScaleStart(scale, row+1)
		let exp = getStaticScaleExp(scale, row+1)
		if (gain.gte(start)) gain = gain.times(start.pow(exp.sub(1))).root(exp);
	}
	return gain;
}

function getStaticScaleStart(scale, r) {
	let adjData = STATIC_SCALE_DATA[scale].start_adj;
	if (adjData) return adjData[String(r)]?adjData[String(r)]():STATIC_SCALE_DATA[scale].start;
	else return STATIC_SCALE_DATA[scale].start;
}

function getStaticScaleExp(scale, r) {
	let adjData = STATIC_SCALE_DATA[scale].exp_adj;
	if (adjData) return adjData[String(r)]?adjData[String(r)]():STATIC_SCALE_DATA[scale].exp;
	else return STATIC_SCALE_DATA[scale].exp;
}

function scaleStaticCost(gain, row) {
	for (let scale=STATIC_SCALE_DATA.length-1;scale>=0;scale--) {
		let start = getStaticScaleStart(scale, row+1)
		let exp = getStaticScaleExp(scale, row+1)
		if (gain.gte(start)) gain = gain.pow(exp).div(start.pow(exp.sub(1)));
	}
	return gain;
}
function cookiesHardcap() {
    let hardcap = new Decimal("1e100000")
    if (hasUpgrade("truck",36)) hardcap = hardcap.times("1e100")
    return hardcap;
}
const STATIC_SCALE_DATA = [
	{
		start: new Decimal(35000),
		start_adj: {
			"0": function() { 
				let start = new Decimal(35000);
				
				return start;
			},
			
		},
		exp: new Decimal(2),
	},
    {
		start: new Decimal("1e6"),
		start_adj: {
			"1": function() { 
				let start = new Decimal(1e6);
				
				return start;
			},
			
		},
		exp: new Decimal(10),
	},
	
]
addLayer("ex", {
    name: "exponent", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EX", // This appears on the layer's node. Default is the id with the first letter capitalized
 image() { if (player.si.mastered.includes("ex")) return "images/Skelet-Exponent.png"},
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
  expPoints: new Decimal(0),
    }},
    color: "#4BDC13",
    color2: "#2d9e00",
     color3: "#1d6600",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "exponent coins", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {let base = new Decimal(2) 
        if (inChallenge("pa",11)) return new Decimal(2)
 if (hasUpgrade("ic",37)) base = base.sub(0.5)
    if (hasUpgrade("s",52)&&(inChallenge("s",11))) base = base.sub(0.3)
        if (hasUpgrade("s",52)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("s"):false) base = base.sub(0.3)
          if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.05)
            if (player.s.intel.gte(12)) base = base.sub(tmp.s.atomEffect)
                if (hasUpgrade("ex",37)) base = base.sub(0.065)
        return base;
    }, // Prestige currency exponent
    base() {let base = new Decimal(4)
           	if (inChallenge("pa",12)) return new Decimal(10)
if (getBuyableAmount("p",12).gte(1)) base = base.sub(tmp.p.buyables[12].effect)
        return base;
    },
    autoUpgrade() {return player.z.unlocked&&player.si.current==null},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
   
  if (inChallenge("ic",12)) return new Decimal(0)


 
        if (hasUpgrade("ex",14)) mult = mult.div(5)

        if (hasUpgrade("ex",16)) mult = mult.div(upgradeEffect("ex",16))

            if (getBuyableAmount("ic",11).gte(1)) mult = mult.div(tmp.ic.buyables[11].effect.first)

                if (hasUpgrade("ic",16)) mult = mult.div(upgradeEffect("ic",16))
                  
     
    
       if (hasUpgrade("ic",17)) mult = mult.div(upgradeEffect("ic",17))

        if (player.o.unlocked) mult = mult.div(tmp.o.effect)

          if (hasChallenge("ic",13)) mult = mult.pow(0.9)
        
            if (hasUpgrade("ic",24)) mult = mult.pow(9)

                if (hasUpgrade("ic",25)) mult = mult.div(tmp.ic.eleEffect)

      if (hasUpgrade("ex",34)) mult = mult.div(upgradeEffect("ex",34))
            if (hasUpgrade("ex",35)) mult = mult.div(upgradeEffect("ex",35))
                  if (hasUpgrade("ex",36)) mult = mult.div("1e1e7")
                          if (hasUpgrade("ic",43)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) mult = mult.div("1e1e7")

            if (getBuyableAmount("truck",21).gte(1)) mult = mult.div(tmp.truck.buyables[21].effect.first)
        return mult
    },

   
 canBuyMax() {return hasUpgrade("ic",25)||player.si.current=='ic'},    
	effectDescription() {
        return "which are generating "+format(tmp.ex.effect)+" Exponent Points/sec"+(tmp.ex.effect.gte(tmp.ex.effSoftcap)&&!tmp.ex.effect.gte(tmp.ex.effSoftcap2)?" (SOFTCAPPED)":"")+(tmp.ex.effect.gte(tmp.ex.effSoftcap2)?" (SOFTCAPPED^2)":"")
    },

    update(diff) {
        if (hasUpgrade("ex",11)) player.ex.expPoints = player.ex.expPoints.plus(tmp.ex.effect.times(diff));
        if (hasChallenge("ic",11)&&player.si.current!='ex') layers.ex.buyables[11].buyMax();
        if (hasChallenge("ic",12)&&player.si.current!='ex') layers.ex.buyables[12].buyMax();
        if (hasAchievement("ach",32)&&player.si.current!='ex') layers.ex.buyables[13].buyMax();
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

   

        return exp
    },
    onPrestige() {
      if ((!hasUpgrade("ic",14)||!hasUpgrade("s",11)||player.si.unlocked))  player.ex.expPoints = new Decimal(0);

    },
    autoPrestige() {return (hasUpgrade("ic",12)||player.si.unlocked)&&player.si.current!='ex'},
    resetsNothing() {return (hasUpgrade("ic",12)||player.si.unlocked)&&player.si.current!='ex'},
    doReset(resettingLayer) {

        let keep = [];
   
     
      if (hasUpgrade("ic",11)||player.si.unlocked) keep.push("upgrades")
        if (hasAchievement("ach",14)&&resettingLayer=="o") keep.push("buyables")
           if (hasAchievement("ach",14)&&resettingLayer=="r") keep.push("buyables")
           if (hasAchievement("ach",14)&&resettingLayer=="ic") keep.push("buyables")
     
        
        if (layers[resettingLayer].row > this.row) layerDataReset("ex", keep)

   
    },
  baseEff() {
return new Decimal(1.05)
  },
    effect() {
 if (!player.ex.unlocked) return new Decimal(0)
        let eff = Decimal.pow(this.baseEff(), player.ex.points.plus()).sub(1).max(0);
 if (inChallenge("ic",12)) eff = eff.add(1)
 if (hasUpgrade("ex",12)) eff = eff.times(upgradeEffect("ex",12))
    
    if (hasUpgrade("ex",13)) eff = eff.times(upgradeEffect("ex",13))
if (getBuyableAmount("ex",12).gte(1)) eff = eff.times(tmp.ex.buyables[12].effect.first)

    if (hasUpgrade("ex",22)) eff = eff.pow(upgradeEffect("ex",22))

      if (hasUpgrade("ex",24)) eff = eff.pow(1.05)
     
        if (hasUpgrade("ex",25)) eff = eff.pow(1.03)
        if (hasUpgrade("ex",26)) eff = eff.pow(1.015)

            
    if (hasUpgrade("ex",27)) eff = eff.times(upgradeEffect("ex",27))

    if (getBuyableAmount("ic",11).gte(3)) eff = eff.times(16)

     if (hasUpgrade("ic",15)) eff = eff.times(upgradeEffect("ic",15))
        if (inChallenge("ic",12)) eff = eff.sqrt()

            if (hasChallenge("ic",13)) eff = eff.pow(1.2)

     if (hasUpgrade("ic",32)) eff = eff.times(upgradeEffect("ic",32))

    if (getBuyableAmount("p",11).gte(1)) eff=  eff.pow(tmp.p.buyables[11].effect.first)

        if (hasAchievement("ach",41)) eff = eff.times(36)
            if (hasUpgrade("s",44)&&inChallenge("s",11)) eff =eff.times(1e12)
        let effSoftcap = new Decimal(tmp.ex.effSoftcap)
    if (eff.gte(effSoftcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(effSoftcap)).pow(3/6)).mul(effSoftcap)
if (hasUpgrade("c",56)) eff = eff.pow(1.02)

    if (hasUpgrade("truck",26)&&inChallenge("pa",13)) eff = eff.pow(2)

         let effSoftcap2 = new Decimal(tmp.ex.effSoftcap2)
    if (eff.gte(effSoftcap2)) eff = Decimal.pow(10,Decimal.log10(eff.div(effSoftcap2)).pow(3/6)).mul(effSoftcap2)

          let effSoftcap3 = new Decimal(tmp.ex.effSoftcap3)
    if (eff.gte(effSoftcap3)) eff = Decimal.pow(10,Decimal.log10(eff.div(effSoftcap3)).pow(2/6)).mul(effSoftcap3)
        return eff;
    },

    effSoftcap() {
        let cap = new Decimal("1e4100")
     if (hasUpgrade("s",37)) cap = cap.times(upgradeEffect("s",37))
        if (hasUpgrade("pa",45)) cap = cap.pow(upgradeEffect("pa",45))
            if (player.z.unlocked) cap = cap.pow(tmp.z.expEffect)
        return cap;
    },
     effSoftcap2() {
        let cap = new Decimal("e1e7")
       if (player.s.amd.gte(8)) cap = cap.pow(tmp.s.duronEffect)
   if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) cap = cap.pow(5);
       if (hasUpgrade("ex",32)) cap = cap.pow(1.1)
        return cap;
    },
      effSoftcap3() {
        let cap = new Decimal("e2.5e8")
        if (getBuyableAmount("truck",22)) cap = cap.pow(tmp.truck.buyables[22].effect.first)
        return cap;
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key:"x", description: "X: Reset for exponent coins", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],

  
    buyables: {
      
        11: {
            title: "Base Point Adder",
            costBase() {
                let base = new Decimal(2);
            
              if (hasChallenge("ic",11)) base = base.sub(0.5)
                if (hasUpgrade("ic",35)) base = base.sub(0.35)

                    if (hasUpgrade("c",36)) base = base.div(1.1)
                if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) base = base.div(1.01);
                return base;
            },
            pegasus() {
                let pegasus = new Decimal(1)
          if (hasUpgrade("s",66)) pegasus = pegasus.times(upgradeEffect("s",66))
         if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) pegasus = pegasus.add(1).pow(10);
                return pegasus;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Exponent Points"+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Adds "+format(data.pegasus)+" to base point gain."
                return display;
            },
         
            canAfford() {
                return player.ex.expPoints.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
               player.ex.expPoints = player.ex.expPoints.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ex.expPoints.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'222px'},
            unlocked() {return hasUpgrade("ex",15)},
            tooltip() {return "1*x"} ,
            
        },
        12: {
            title: "Exponent Point Buffer",
            costBase() {
                let base = new Decimal(3);
            
                if (hasChallenge("ic",12)) base = base.sub(0.5)
                    if (hasUpgrade("ic",35)) base = base.sub(1)
                                     if (hasUpgrade("c",36)) base = base.div(1.25)
                                                        if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) base = base.div(1.01);
      
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Exponent Points"+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Multiplies Exponent Point gain. <br>Currently: "+format(data.effect.first)+"x."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}

              
                if (x.gte(0)) eff.first = Decimal.pow(3, x.pow(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?3.75:1.1))

                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))

           
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
            canAfford() {
                return player.ex.expPoints.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ex.expPoints = player.ex.expPoints.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ex.expPoints.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'222px'},
            unlocked() {return hasUpgrade("ex",21)},
            tooltip() {return "3<sup>x<sup>1.1</sup></sup>"} ,
        },
        13: {
            title: "Dubnium",
            costBase() {
                let base = new Decimal(5);
            
            if (hasAchievement("ach",32)) base = base.sub(1.75)
                  if (hasUpgrade("pa",43)) base = base.sub(1.5)
                                 if (hasUpgrade("c",36)) base = base.div(1.5)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Exponent Points"+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Boosts Night Adder's effect. <br>Currently: "+format(data.effect.first)+"x."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.5, x.pow(1.15))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
            canAfford() {
                return player.ex.expPoints.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ex.expPoints = player.ex.expPoints.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ex.expPoints.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'222px'},
            unlocked() {return hasUpgrade("ic",11)},
            tooltip() {return "1.5<sup>x<sup>1.15</sup></sup>"} ,
        },
    },
	tabFormat: ["main-display",
        "prestige-button",
        "blank",
        ["display-text",
            function() {return 'You have ' + format(player.ex.expPoints) + ' Exponent Points' },
                {}],
      "blank",
  
        "buyables", "blank", "blank", "upgrades"],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "Beginning of The Exponent Tree Rewritten",
            description: "Start gaining Points.",
            cost: new Decimal(1),
            
            
        },
			
        12: {
            title: "Points Multiplier",
            description: "Exponent Points multiply Point gain.",
            cost() { return new Decimal(player.si.current=='ex' ? "1e200000" : 2.75) },
           softcapStart() {let start = new Decimal(1e17)
          if (hasUpgrade("c",11)) start = start.times(upgradeEffect("c",11))

            if (hasUpgrade("c",32)) start = start.pow(1.5)
                if (hasUpgrade("s",75)) start = start.pow(4)

          if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) start = start.pow(2500);
            return start;
           },
            effect() {
              
             if (inChallenge("ic",13)) return new Decimal(1)
                let eff = player.ex.expPoints.plus(1).pow(0.3).pow(hasUpgrade("ex",31) ? 1.2 : 1)
             if (inChallenge("s",11)) eff = eff.root(2)
                if (player.truck.inTrucking.gte(1)) eff = eff.root(3)
              let softcap = new Decimal(tmp.ex.upgrades[this.id].softcapStart)
              if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(3/6)).mul(softcap)
                return eff;
            },
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
            effectDisplay() { return format(tmp.ex.upgrades[12].effect)+"x"+(tmp.ex.upgrades[12].effect.gte(tmp.ex.upgrades[this.id].softcapStart)?" (SOFTCAPPED)":"") },
            unlocked() {return hasUpgrade("ex",11)},
            tooltip() {return "ExpPoint+1<sup>0.3</sup>"+(hasUpgrade("ex",31) ? "^1.2" : "")} ,
        },

        13: {
            title: "Exponent Points Multiplier",
            description: "Exponent Points multiply their own gen.",
              cost() { return new Decimal(player.si.current=='ex' ? "1e5834311" : 5) },
            softcapStart() {let start = new Decimal(2e71)
          
            if (hasUpgrade("c",32)) start = start.pow(1.5)
                      if (hasUpgrade("s",75)) start = start.pow(4)
                        if (hasChallenge("s",11)||player.si.unlocked) start = start.pow(7.5)
                                      if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) start = start.pow(2500);
                  return start;
                 },
            effect() {
                
                if (inChallenge("ic",13)) return new Decimal(1)
                let eff = player.ex.expPoints.plus(1).pow(0.15);
                if (inChallenge("s",11)) eff = eff.root(2)
                let softcap = new Decimal(tmp.ex.upgrades[this.id].softcapStart)
                if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(3/6)).mul(softcap)
                 if (getBuyableAmount("ic",12).gte(1)) eff = eff.times(tmp.ic.buyables[12].effect.first)
             
                return eff;
            },
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
            effectDisplay() { return format(tmp.ex.upgrades[13].effect)+"x"+(tmp.ex.upgrades[13].effect.gte(tmp.ex.upgrades[this.id].softcapStart)?" (SOFTCAPPED)":"") },
            unlocked() {return hasUpgrade("ex",12)},
            tooltip() {return "ExpPoint+1<sup>0.15</sup>"} ,
        },
        14: {
            title: "Raisers",
            description: "Square Points gain, and Exponent Coins req is divided by 5.",
                    cost() { return new Decimal(player.si.current=='ex' ? "1e50016529" : 15) },
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
      
            unlocked() {return hasUpgrade("ex",13)},
            
        },
        15: {
            title: "Buyable I",
            description: "Unlock a new Buyable.",
               cost() { return new Decimal(player.si.current=='ex' ? "2e50016529" : 60) },
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
      
            unlocked() {return hasUpgrade("ex",14)},
            
        },
        16: {
            title: "Night Adder",
            description: "Each upgrade purchased divides Exponent Coin's req.",
               cost() { return new Decimal(player.si.current=='ex' ? "1e454961" : 20000) },
            currencyDisplayName: "points",
            currencyInternalName: "points",
            effect() {
                let eff = Decimal.pow(1.4, player.ex.upgrades.length);
                if (getBuyableAmount("ex",13).gte(1)) eff = eff.times(tmp.ex.buyables[13].effect.first)
                if (hasUpgrade("c",24)) eff = eff.times(3.5)
             if (getBuyableAmount("ic",45).gte(1)) eff = eff.pow(tmp.ic.buyables[45].effect.first)
                if (hasAchievement("ach",41)) eff = eff.pow(2)
                    if (hasUpgrade("pa",14)) eff = eff.times(upgradeEffect("pa",14))

                 if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(25)
                    if (hasUpgrade("c",24)&&((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)) eff = eff.pow(1.2)
                return eff;
            },
            effectDisplay() { return "/"+format(tmp.ex.upgrades[16].effect) },
            unlocked() {return hasUpgrade("ex",15)},
            tooltip() {return "ExpUpgradePurchased<sup>1.4</sup>"} ,
        },
        17: {
            title: "Exponential Function",
            description: "Add 1 to base point gain.",
            cost: new Decimal(100000),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            
            unlocked() {return hasUpgrade("ex",16)},
            
        },
        21: {
            title: "Buyable II",
            description: "Unlock another buyable.",
           cost() { return new Decimal(player.si.current=='ex' ? "1e454961" : 20000) },
            currencyDisplayName: "points",
            currencyInternalName: "points",
            
            unlocked() {return hasUpgrade("ex",17)},
            
        },
        22: {
            title: "Nightadding Booster",
            description: "Each upgrade purchased raises Exponent Points gain.",
                cost() { return new Decimal(player.si.current=='ex' ? "e50025106" : 2500) },
            cap() { let cap = new Decimal(2500)
 if (hasUpgrade("pa",13)) cap = cap.add(500)
              if (hasUpgrade("pa",35)) cap = cap.pow(2)
                  if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) cap = cap.pow(1.75)
                               return cap; },
                           
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
            effect() {
                let eff = Decimal.pow(1.05, player.ex.upgrades.length).min(tmp.ex.upgrades[this.id].cap);;
                if (player.truck.inTrucking.gte(1)) eff = eff.root(3)
                if (player.s.unlocked) eff =eff.times(2)
                if (inChallenge("s",11)) eff = eff.root(2)

                            if (hasUpgrade("pa",55)) eff =eff.times(2)

                                	if (hasAchievement("ach",64)) eff = eff.times(2)

                        if (hasUpgrade("s",81)) eff = eff.times(upgradeEffect("s",81))

             if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(4)
                return eff;
            },
            effectDisplay() { return "^"+format(tmp.ex.upgrades[22].effect)+(tmp.ex.upgrades[22].effect.gte(tmp.ex.upgrades[this.id].cap)?" (HARDCAPPED)":"") },
            unlocked() {return hasUpgrade("ex",21)},
            tooltip() {return "ExpUpgradePurchased<sup>1.05</sup>"} ,
        },
        23: {
            title: "Squared Points",
            description: "Square points gain.",
            cost: new Decimal(1e6),
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
           
            unlocked() {return getBuyableAmount("ex",11).gte(5)},
           
        },
        24: {
            title: "Squared Exp Points",
            description: "Raise Exponent Points gain by 1.05.",
            cost: new Decimal(7e12),
            currencyDisplayName: "points",
            currencyInternalName: "points",
        
           
            unlocked() {return hasUpgrade("ex",23)},
           
        },
        25: {
            title: "Weaker Rooters",
            description: "Raise Exponent Points gain by 1.03.",
            cost: new Decimal(2.5e13),
            currencyDisplayName: "points",
            currencyInternalName: "points",
        
           
            unlocked() {return hasUpgrade("ex",24)},
           
        },
        26: {
            title: "Weakerer Rooters",
            description: "Raise Exponent Points gain by 1.015.",
            cost: new Decimal(3e13),
            currencyDisplayName: "points",
            currencyInternalName: "points",
        
           
            unlocked() {return hasUpgrade("ex",25)},
           
        },
        27: {
            title: "Extension",
            description: "Each upgrade purchased boosts Exponent Point gain.",
            cost: new Decimal(5e9),
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
            effect() {
                let eff = Decimal.pow(1.08, player.ex.upgrades.length);
                if (player.truck.inTrucking.gte(1)) eff = eff.root(3)
                if (inChallenge("s",11)) eff = eff.root(2)
                       if (hasUpgrade("pa",14)) eff = eff.times(upgradeEffect("pa",14))

           if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(5)
                return eff;
            },
            effectDisplay() { return format(tmp.ex.upgrades[27].effect)+"x" },
            unlocked() {return hasUpgrade("ex",26)},
            tooltip() {return "ExpUpgradePurchased<sup>1.08</sup>"} ,
        },
        31: {
            title: "Points Multiplier-plier",
            description: "Raise Points Multiplier's effect base by 1.2.",
            cost: new Decimal(1e17),
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
       
            unlocked() {return hasUpgrade("ex",27)},
          
        },
          32: {
            title: "Points Uncapper",
            description: "Points Softcap<sup>2</sup> and Exponent Points Generation Softcap<sup>2</sup> start ^1.1 later.",
            cost: new Decimal(55849),
          
          
       
            unlocked() {return hasUpgrade("ex",22)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
          
        },
          33: {
            title: "Demonic Scales",
            description: "Points Softcap start ^1.1 later.",
            cost: new Decimal(57666),
          
          
       
            unlocked() {return hasUpgrade("ex",32)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
          
        },
          34: {
            title: "Exponented Requirements",
            description: "Exponent Coins divide their own req.",
            cost: new Decimal(58247), 
             effect() {
                let eff = player.ex.points.add(1).pow(25000)
                return eff;
            },
            effectDisplay() { return "/"+format(tmp.ex.upgrades[34].effect) },
          
       
            unlocked() {return hasUpgrade("ex",33)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
              tooltip() {return "ExpCoins<sup>25000</sup>+1"} ,
          
        },
            35: {
            title: "Squared Exponented Requirements",
            description: "Points divide their Exponent Coin's req.",
            cost: new Decimal(58778),
             effect() {
                let eff = player.points.add(1).pow(0.25)
                return eff;
            },
            effectDisplay() { return "/"+format(tmp.ex.upgrades[35].effect) },
          
       
            unlocked() {return hasUpgrade("ex",34)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
              tooltip() {return "Points<sup>0.25</sup>+1"} ,
          
        },
          36: {
            title: "Exotic Exponent Decreaser",
            description: "Exponent Coins req is divided by e1e7.",
            cost: new Decimal(59404),
          
          
       
            unlocked() {return hasUpgrade("ex",35)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
         
          
        },
          37: {
            title: "Grand Finale",
            description: "Exponent cost exponenet is subtracted by 0.065.",
            cost: new Decimal(75683),
          
          
       
            unlocked() {return hasUpgrade("ex",36)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
         
          
        },
    },
})
addLayer("ic", {
    name: "incremental", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "IC", // This appears on the layer's node. Default is the id with the first letter capitalized
     image() { if (player.si.mastered.includes("ic")) return "images/Skelet-Incremental.png"},
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
  energy: new Decimal(0),
  uniDimILvl: new Decimal(0),
  uniDimIILvl: new Decimal(0),
    uniDimIIILvl: new Decimal(0),
  elements: new Decimal(0),
  elementsDimILvl: new Decimal(0),
  elementsDimIILvl: new Decimal(0),
  elementsDimIIILvl: new Decimal(0),
    }},
    color: "#8DDC13",
    requires: new Decimal(1e20), // Can be a function that takes requirement increases into account
    resource: "incremental coins", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
          if (inChallenge("pa",11)) return new Decimal(1)
        if (inChallenge("s",11)) return new Decimal(1).times(tmp.s.cheeseburgerEff) 
        if (player.o.unlocked) mult = mult.times(tmp.o.effect)
        
            if (hasUpgrade("ic",24)) mult = mult.times(upgradeEffect("ic",24))
        if (hasUpgrade("ic",26)) mult = mult.pow(5)

            if (hasUpgrade("c",23)) mult = mult.times(upgradeEffect("c",23))
                if (hasAchievement("ach",41)) mult = mult.times(36)
                    if (player.pa.unlocked) mult = mult.times(1e6)

                                if (hasMilestone("truck",10)) mult = mult.times(tmp.s.cheeseburgerEff) 
                            if (hasUpgrade("ic",31)) mult = mult.pow(1.3)          
                                     
        return mult
    },

       autoUpgrade() {return player.z.unlocked&&player.si.current==null},
 

elementPower() {
    return new Decimal(100).add(player.ic.elements.add(1).log10())
},
    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

   	if (hasUpgrade("s",82)&&inChallenge("pa",12)) exp = exp.times(1.5)
if (player.s.furtherLayers.gte(1)) exp = exp.add(tmp.s.furtherICEff)
    if (hasUpgrade("truck",52)) exp = exp.add(0.5)
            if (hasUpgrade("truck",53)) exp = exp.add(tmp.ach.achievementPower3)
 
        if (getBuyableAmount("ic",66).gte(1)) exp = exp.add(tmp.ic.buyables[66].effect)
        return exp
    },
   
    softcap() { let softcap = new Decimal("1e1500")

if (hasUpgrade("ic",46)&&((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("ic"):false)) return new Decimal("1e1000000")
        return softcap;},
    softcapPower() { let power = new Decimal(0.5)
if (hasUpgrade("ic",47)&&((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("ic"):false)) return new Decimal(0.995)

        return power;
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["ex"],
    hotkeys: [
        {
            key:"i", description: "I: Reset for incremental coins", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],

    doReset(resettingLayer) {
        let keep = [];
    
 
        if (resettingLayer=="s") player.ic.upgrades.push(13)
            if (resettingLayer=="s") player.ic.upgrades.push(14)
        if (hasUpgrade("s",12)||player.si.unlocked) keep.push("upgrades")
        if (hasUpgrade("s",14)||player.si.unlocked) keep.push("challenges")
            if (hasMilestone("pa",0)||player.si.unlocked) keep.push("challenges")

          if (hasMilestone("pa",1)) keep.push("upgrades")
             
        if (layers[resettingLayer].row > this.row) layerDataReset("ic", keep)
    },
onPrestige() {
    if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) player.o.points = new Decimal(4)
},
update(diff) {
if (getBuyableAmount("ic",21).gte(1)) player.ic.energy = player.ic.energy.add(getBuyableAmount("ic",21).times(diff)).add(player.ic.uniDimILvl.pow(hasAchievement("ach",41) ? 1.05 : 1))
    if (getBuyableAmount("ic",22).gte(1)) player.ic.uniDimILvl = player.ic.uniDimILvl.add(getBuyableAmount("ic",22).times(diff)).add(player.ic.uniDimIILvl.add(1).pow(5).pow(hasAchievement("ach",41) ? 1.05 : 1))

if (getBuyableAmount("ic",23).gte(1)) player.ic.uniDimIILvl = player.ic.uniDimIILvl.add(getBuyableAmount("ic",23).times(diff)).add(player.ic.uniDimIIILvl.add(1).pow(5))

    
if (getBuyableAmount("ic",24).gte(1)) player.ic.uniDimIIILvl = player.ic.uniDimIIILvl.add(getBuyableAmount("ic",24).times(diff))
        if (getBuyableAmount("ic",31).gte(1)) player.ic.elements = player.ic.elements.add(getBuyableAmount("ic",31).times(diff)).add(player.ic.elementsDimILvl.pow(tmp.ic.buyables[42].effect.first).pow(hasAchievement("ach",41) ? 1.05 : 1))

            if (getBuyableAmount("ic",32).gte(1)) player.ic.elementsDimILvl = player.ic.elementsDimILvl.add(getBuyableAmount("ic",32).times(diff)).add(player.ic.elementsDimIILvl.add(1).pow(5).pow(hasAchievement("ach",41) ? 1.05 : 1))
                if (getBuyableAmount("ic",33).gte(1)) player.ic.elementsDimIILvl = player.ic.elementsDimIILvl.add(getBuyableAmount("ic",33).times(diff).pow(hasAchievement("ach",41) ? 1.05 : 1)).add(player.ic.elementsDimIIILvl.add(1).pow(2))
                      if (getBuyableAmount("ic",34).gte(1)) player.ic.elementsDimIIILvl = player.ic.elementsDimIIILvl.add(getBuyableAmount("ic",34).times(diff).pow(hasAchievement("ach",41) ? 1.05 : 1))
                if (hasUpgrade("c",24)) layers.ic.buyables[21].buyMax();
                if (hasUpgrade("c",24)) layers.ic.buyables[22].buyMax();
                if (hasUpgrade("c",24)) layers.ic.buyables[23].buyMax();
                if (hasUpgrade("c",24)) layers.ic.buyables[31].buyMax();
                if (hasUpgrade("c",24)) layers.ic.buyables[32].buyMax();
                if (hasUpgrade("s",31)) layers.ic.buyables[33].buyMax();

                if (hasUpgrade("c",24)) layers.ic.buyables[51].buyMax();
                if (hasUpgrade("s",14)) layers.ic.buyables[11].buyMax();
                if (hasUpgrade("s",14)) layers.ic.buyables[12].buyMax();
                if (hasUpgrade("s",14)) layers.ic.buyables[13].buyMax();
                if (hasAchievement("ach",34)) layers.ic.buyables[41].buyMax();
                if (hasAchievement("ach",34)) layers.ic.buyables[42].buyMax();
                if (hasAchievement("ach",34)) layers.ic.buyables[43].buyMax();
                if (hasUpgrade("s",41)) layers.ic.buyables[44].buyMax();
                if (hasUpgrade("s",41)) layers.ic.buyables[45].buyMax();
                if (hasUpgrade("s",36)) layers.ic.buyables[46].buyMax();
                if (hasUpgrade("s",63)) layers.ic.buyables[47].buyMax();
                if (player.pa.unlocked) layers.ic.buyables[61].buyMax();
                if (player.pa.unlocked) layers.ic.buyables[62].buyMax();
                if (player.pa.unlocked) layers.ic.buyables[63].buyMax();

             if (hasUpgrade("pa",52)) layers.ic.buyables[24].buyMax();


                     if (hasUpgrade("pa",54)) layers.ic.buyables[52].buyMax();

                            if (hasUpgrade("wi",26)) layers.ic.buyables[64].buyMax();

               if (hasMilestone("truck",13)) layers.ic.buyables[65].buyMax();

                  if (player.si.mastered.includes("ic")) layers.ic.buyables[66].buyMax();
                  
                  if (player.si.mastered.includes("ic")) layers.ic.buyables[67].buyMax();

                    if (hasUpgrade("truck",54)) layers.ic.buyables[34].buyMax();
        if (player.ic.elements.gte(tmp.ic.elementHardcap)) player.ic.elements = new Decimal(tmp.ic.elementHardcap)
         
},

elementHardcap() {
let cap = new Decimal(1e80)
if (hasUpgrade("truck",11)) cap = cap.pow(1.1)
    if (player.s.intel.gte(5)) cap = cap.pow(tmp.s.pentiumIIIEffect)

    if (hasUpgrade("c",46)) cap = cap.pow(1.05)

     
        let effSoftcap = new Decimal("1e5000")
    if (cap.gte(effSoftcap)) cap = Decimal.pow(10,Decimal.log10(cap.div(effSoftcap)).pow(2/7)).mul(effSoftcap)
return cap;
},
    buyables: {
      
        11: {
            title: "Night Remover",
            costBase() {
                let base = new Decimal(1.5);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Incremental Coins"+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Divides Exponent Coin req. <br>Currently: /"+format(data.effect.first)+"\n\
                On 3 purchases, multiply Exponent Points gain by 16!"
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.8, x.pow(1.3)).pow(hasUpgrade("c",35) ? 8 : 1)
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.ic.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.points = player.ic.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'175px'},
            unlocked() {return player.ic.unlocked},
            tooltip() {return "1.8<sup>x<sup>1.3</sup></sup>"} ,
        },
        12: {
            title: "Night-nightadder",
            costBase() {
                let base = new Decimal(1.25);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Incremental Coins"+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Multiply Exponent Points Multiplier. <br>Currently: "+format(data.effect.first)+"x."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.5, x.pow(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?4:1.2)).pow(hasUpgrade("c",35) ? 8 : 1)
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.ic.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.points = player.ic.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("ic",21)},
            tooltip() {return "1.5<sup>x<sup>1.2</sup></sup>"} ,
        },
        13: {
            title: "Orb Points",
            costBase() {
                let base = new Decimal(10);
              if (hasUpgrade("c",34)) base = base.div(5)
              if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) base = base.div(1.2);
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Incremental Coins"+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Divide Orbs req. <br>Currently: /"+format(data.effect.first)+"."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(5, x.pow(2)).pow(hasUpgrade("c",34) ? 10 : 1)
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.ic.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.points = player.ic.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("ic",25)},
            tooltip() {return "5<sup>x<sup>2</sup></sup>"} ,
        },
        21: {
            title: "Universe Dimension",
            costBase() {
                let base = new Decimal(10);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(10, x.add(10));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Incremental Coins"+"\n\
                Generate " + formatWhole(player[this.layer].buyables[this.id])+" Universe Energy every second."
                return display;
            },
            
         
            canAfford() {
                return player.ic.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.points = player.ic.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.ic.points.max(1).log(10);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasChallenge("ic",21)},
          
        },
        22: {
            title: "Universe Dimension II",
            costBase() {
                let base = new Decimal(100);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(100, x.add(6));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Incremental Coins"+"\n\
                Generate " + formatWhole(player[this.layer].buyables[this.id])+" Universe Dimensions every second."
                return display;
            },
            
         
            canAfford() {
                return player.ic.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.points = player.ic.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.ic.points.max(1).log(10);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasChallenge("ic",21)},
          
        },
        23: {
            title: "Universe Dimension III",
            costBase() {
                let base = new Decimal(100);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(1e4, x.add(17.25));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Incremental Coins"+"\n\
                Generate " + formatWhole(player[this.layer].buyables[this.id])+" Universe Dimensions II every second."
                return display;
            },
            
         
            canAfford() {
                return player.ic.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.points = player.ic.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.ic.points.max(1).log(10);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("ic",34)},
          
        },
         24: {
            title: "Universe Dimension IV",
            costBase() {
                let base = new Decimal(100);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow("1e1940", x.add(17.25));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Incremental Coins"+"\n\
                Generate " + formatWhole(player[this.layer].buyables[this.id])+" Universe Dimensions III every second."
                return display;
            },
            
         
            canAfford() {
                return player.ic.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.points = player.ic.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.ic.points.max(1).log(10);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("pa",52)},
          
        },
        31: {
            title: "NINENINE secret Baldi",
            costBase() {
                let base = new Decimal(1000);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(1000, x.add(3));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Incremental Coins"+"\n\
                Generate " + formatWhole(player[this.layer].buyables[this.id])+" Elements per second."
                return display;
            },
            
         
            canAfford() {
                return player.ic.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.points = player.ic.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.ic.points.max(1).log(1000);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("ic",25)},
          
        },
        32: {
            title: "Linux",
            costBase() {
                let base = new Decimal(1000);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(1e6, x.add(4.5));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Incremental Coins"+"\n\
                Generate " + formatWhole(player[this.layer].buyables[this.id])+" NINENINE secret Baldi per second."
                return display;
            },
            
         
            canAfford() {
                return player.ic.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.points = player.ic.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.ic.points.max(1).log(1000);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("ic",27)},
          
        },
        33: {
            title: "Systemparted",
            costBase() {
                let base = new Decimal(1000);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(1e9, x.add(6));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Incremental Coins"+"\n\
                Generate " + formatWhole(player[this.layer].buyables[this.id])+" Linux per second."
                return display;
            },
            
         
            canAfford() {
                return player.ic.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.points = player.ic.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.ic.points.max(1).log(1000);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("s",31)},
          
        },
          34: {
            title: "Apache",
            costBase() {
                let base = new Decimal(1e6);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(1e15, x.add(9));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Incremental Coins"+"\n\
                Generate " + formatWhole(player[this.layer].buyables[this.id])+" Systemparted per second."
                return display;
            },
            
         
            canAfford() {
                return player.ic.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.points = player.ic.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.ic.points.max(1).log(1e6);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("truck",54)},
          
        },
        41: {
            title: "Hydrogen",
            costBase() {
                let base = new Decimal(1.85);
           	if (inChallenge("pa",12)) return new Decimal(5)
              if (player.s.intel.gte(6)) base = base.sub(tmp.s.pentiumIVEffect)
                if (hasUpgrade("c",55)) base = base.sub(0.2)
                         if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.05)

                   if (getBuyableAmount("ic",67).gte(1)) base = base.sub(tmp.ic.buyables[67].effect)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Raise Points. <br>Currently: ^"+format(data.effect.first)+"."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.009, x.pow(1.005))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("ic",34)},
            tooltip() {return "1.009<sup>x<sup>1.005</sup></sup>"} ,
        },
        42: {
            title: "Helium",
            costBase() {
                let base = new Decimal(1.9);
               	if (inChallenge("pa",12)) return new Decimal(5)
                     if (hasUpgrade("c",55)) base = base.sub(0.2)
                          if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.05)
                                               if (getBuyableAmount("ic",67).gte(1)) base = base.sub(tmp.ic.buyables[67].effect)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Raise Elements gain. <br>Currently: ^"+format(data.effect.first)+"."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.1, x.pow(1.05))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("ic",36)},
            tooltip() {return "1.1<sup>x<sup>1.05</sup></sup>"} ,
        },
        43: {
            title: "Lithium",
            costBase() {
                let base = new Decimal(1.95);
               	if (inChallenge("pa",12)) return new Decimal(5)
                     if (hasUpgrade("c",55)) base = base.sub(0.2)
                          if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.05)
                                               if (getBuyableAmount("ic",67).gte(1)) base = base.sub(tmp.ic.buyables[67].effect)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Raise Poachers gain. <br>Currently: ^"+format(data.effect.first)+"."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.06, x.pow(1.08))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("c",12)},
            tooltip() {return "1.06<sup>x<sup>1.08</sup></sup>"} ,
        },
        44: {
            title: "Beryllium",
            costBase() {
                let base = new Decimal(2.3);
               	if (inChallenge("pa",12)) return new Decimal(5)
                if (getBuyableAmount("ic",47).gte(1)) base = base.sub(tmp.ic.buyables[47].effect)
                             if (hasUpgrade("c",55)) base = base.sub(0.2)
                                  if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.05)
                                                       if (getBuyableAmount("ic",67).gte(1)) base = base.sub(tmp.ic.buyables[67].effect)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Multiply Willy gain. <br>Currently: "+format(data.effect.first)+"x."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.03, x.pow(1.09))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("wi",13)},
            tooltip() {return "1.03<sup>x<sup>1.09</sup></sup>"} ,
        },
        45: {
            title: "Boron",
            costBase() {
                let base = new Decimal(2.5);
               	if (inChallenge("pa",12)) return new Decimal(5)
                if (getBuyableAmount("ic",63).gte(1)) base = base.sub(tmp.ic.buyables[63].effect)
                             if (hasUpgrade("c",55)) base = base.sub(0.2)
                                  if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.05)
                                                       if (getBuyableAmount("ic",67).gte(1)) base = base.sub(tmp.ic.buyables[67].effect)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Night Adder is boosted <br>Currently: ^"+format(data.effect.first)+"."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.01, x.pow(1.04))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("wi",13)},
            tooltip() {return "1.01<sup>x<sup>1.04</sup></sup>"} ,
        },
        46: {
            title: "Carbon",
            costBase() {
                let base = new Decimal(2);
               	if (inChallenge("pa",12)) return new Decimal(5)
                if (getBuyableAmount("ic",63).gte(1)) base = base.sub(tmp.ic.buyables[63].effect)
                             if (hasUpgrade("c",55)) base = base.sub(0.2)
                                  if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.05)
                                                       if (getBuyableAmount("ic",67).gte(1)) base = base.sub(tmp.ic.buyables[67].effect)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Multiply Affinity gain.<br>Currently: "+format(data.effect.first)+"x."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.06, x.pow(1.03))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("s",36)},
            tooltip() {return "1.06<sup>x<sup>1.03</sup></sup>"} ,
        },
        47: {
            title: "Nitrogen",
            costBase() {
                let base = new Decimal(2.5);
               	if (inChallenge("pa",12)) return new Decimal(5)
                     if (hasUpgrade("c",55)) base = base.sub(0.2)
                          if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.05)
                                               if (getBuyableAmount("ic",67).gte(1)) base = base.sub(tmp.ic.buyables[67].effect)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Reduces base of the 4th element.<br>Currently: -"+format(data.effect)+"."
                return display;
            },
            effect() { // Effects of owning x of the items, x is a decimal
                x=player[this.layer].buyables[this.id]
    
                    if (!x.gte(1)) return new Decimal(0)
                    let eff = Decimal.plus(0.01, x.times(0.01))
    
            
                    return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("s",63)},
            tooltip() {return "0.01+x*0.01"} ,
        },

        51: {
            title: "Universal Shifts",
            costBase() {
                let base = new Decimal(5);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Poachers."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Multiply Orbs effect. <br>Currently: "+format(data.effect.first)+"x."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.11, x.pow(1.05)).pow(tmp.s.am286Effect)
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.p.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.p.points = player.p.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.p.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'222px','height':'222px'},
            unlocked() {return hasAchievement("ach",31)},
            tooltip() {return "1.11<sup>x<sup>1.05</sup></sup>"} ,
        },
         52: {
            title: "Universal Galaxies",
            costBase() {
                let base = new Decimal(25);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Poachers."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Multiply Pashtocha gain. <br>Currently: "+format(data.effect.first)+"x."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.5, x.pow(1.3))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.p.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.p.points = player.p.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.p.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'222px','height':'222px'},
            unlocked() {return hasUpgrade("pa",54)},
            tooltip() {return "1.5<sup>x<sup>1.3</sup></sup>"} ,
        },
        61: {
            title: "Oxygen",
            costBase() {
                let base = new Decimal(2.8);
               	if (inChallenge("pa",12)) return new Decimal(5)
                     if (hasUpgrade("c",55)) base = base.sub(0.2)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Raises Points while on TMT's Mighty Cheeseburger.<br>Currently: ^"+format(data.effect.first)+"."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)&&!hasUpgrade("s",86)) eff.first = Decimal.pow(1.01, x.pow(1.01))
                       else  if (x.gte(0)&&hasUpgrade("s",86)) eff.first = Decimal.pow(1.03, x.pow(1.03))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            tooltip() {return "1.01<sup>x<sup>1.01</sup></sup>"} ,
            unlocked() {return player.pa.unlocked},
            style: {'width':'135px','height':'135px'},
           
        },
        62: {
            title: "Fluorine",
            costBase() {
                let base = new Decimal(3);
               	if (inChallenge("pa",12)) return new Decimal(5)
                     if (hasUpgrade("c",55)) base = base.sub(0.2)

                    if (getBuyableAmount("ic",64).gte(1)) base = base.sub(tmp.ic.buyables[64].effect)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Raises Base Points.<br>Currently: ^"+format(data.effect.first)+"."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.02, x.pow(1.04))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            tooltip() {return "1.02<sup>x<sup>1.04</sup></sup>"} ,
            unlocked() {return player.pa.unlocked},
            style: {'width':'135px','height':'135px'},
           
        },
        63: {
            title: "Neon",
            costBase() {
                let base = new Decimal(2.5);
               	if (inChallenge("pa",12)) return new Decimal(5)
                     if (hasUpgrade("c",55)) base = base.sub(0.2)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Reduces base of the both 5th and 6th element.<br>Currently: -"+format(data.effect)+"."
                return display;
            },
            effect() { // Effects of owning x of the items, x is a decimal
                x=player[this.layer].buyables[this.id]
    
                    if (!x.gte(1)) return new Decimal(0)
                    let eff = Decimal.plus(0.02, x.times(0.02))
    
            
                    return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return player.pa.unlocked},
            tooltip() {return "0.02+x*0.02"} ,
           
        },
         64: {
            title: "Sodium",
            costBase() {
                let base = new Decimal(3);
               	if (inChallenge("pa",12)) return new Decimal(5)
              
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Reduces base of the 9th element.<br>Currently: -"+format(data.effect)+"."
                return display;
            },
            effect() { // Effects of owning x of the items, x is a decimal
                x=player[this.layer].buyables[this.id]
    
                    if (!x.gte(1)) return new Decimal(0)
                    let eff = Decimal.plus(0.025, x.times(0.025))
    
            
                    return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("wi",26)},
            tooltip() {return "0.025+x*0.025"} ,
           
        },
           65: {
            title: "Magnesium",
            costBase() {
                let base = new Decimal(5);
            
              
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Increases Bifurther-Exponent Coins generation.<br>Currently: +"+format(data.effect)+"."
                return display;
            },
            effect() { // Effects of owning x of the items, x is a decimal
                x=player[this.layer].buyables[this.id]
    
                    if (!x.gte(1)) return new Decimal(0)
                    let eff = Decimal.plus(0.025, x.times(0.025))
    
            
                    return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasMilestone("truck",13)},
            tooltip() {return "0.04+x*0.04"} ,
           
        },
          66: {
            title: "Aluminum",
            costBase() {
                let base = new Decimal(7);
            
              
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Increases IC exp.<br>Currently: +"+format(data.effect)+"."
                return display;
            },
            effect() { // Effects of owning x of the items, x is a decimal
                x=player[this.layer].buyables[this.id]
    
                    if (!x.gte(1)) return new Decimal(0)
                    let eff = Decimal.plus(0.04, x.times(0.06))
                  if (hasUpgrade("ic",43)) eff = eff.times(tmp.ic.elementPower.div(100))
            
                    return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return (Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
            tooltip() {return "0.04+x*0.06"} ,
           
        },
          67: {
            title: "Silicon",
            costBase() {
                let base = new Decimal(9);
            
              
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Elements."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Reduces bases for all Elements prior to Oxygen.<br>Currently: -"+format(data.effect)+"."
                return display;
            },
            effect() { // Effects of owning x of the items, x is a decimal
                x=player[this.layer].buyables[this.id]
    
                    if (!x.gte(1)) return new Decimal(0)
                    let eff = Decimal.plus(0.045, x.times(0.05))

            
                    return eff;
            },
         
            canAfford() {
                return player.ic.elements.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.ic.elements = player.ic.elements.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.ic.elements.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return (Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
            tooltip() {return "0.045+x*0.05"} ,
           
        },
    },
    tabFormat: {
        "Main": {
         
            content: ["main-display",
            "prestige-button",
            "resource-display", "blank",
           
            ["row", [["buyable",11],["buyable",12],["buyable",13]]],           
            "blank",
            "blank",
            "upgrades",  
        ]},
        "Challenges": {
     unlocked() {return hasUpgrade("ic",16)},
            content: ["main-display",
            "prestige-button",
            "resource-display", "blank",
           
            "challenges",
           
            
            
        ]},
        "Universal": {
            buttonStyle() { return {'border-color': 'purple'} },
            unlocked() {return hasChallenge("ic",21)},
                   content: ["main-display",
                   "prestige-button",
                   "resource-display", "blank",
                  "blank",
                  ["display-text", function() { return "You have <h3>"+format(player.ic.energy)+"</h3> Universe Energy, which are multiplying Points gain by "+format(tmp.ic.universeEffect)+"." }],
                  "blank",
                  ["display-text", function() { return "You have <h3>"+format(player.ic.elements)+"</h3> Elements, which are dividing Exponent Coins and Orbs req by "+format(tmp.ic.eleEffect)+"."+(tmp.ic.eleEffect.gte(tmp.ic.eleSoftcap)?" (SOFTCAPPED)":"") }],
                  "blank",
                   ["row", [
                    ["column", [
                        ["row", [["buyable", 21],["buyable", 22],["buyable", 23],["buyable", 24],["buyable", 25]]],
                    ], {width: "15em"}],
                    ["column", [
                        ["row", [["buyable", 31],["buyable", 32],["buyable", 33],["buyable", 34]]],
                    ], {width: "15em"}],
                    ["column", [
                        ["row", [["buyable", 51],["buyable", 52]]],
                    ], {width: "15em"}],
                    ["tall-display-text", "<div class='vl2'></div>", {height: "223.667px"}],
                "blank",	"blank",	"blank",	"blank",	"blank",	"blank",	"blank",	"blank",	"blank",
                   ,
                ], function() { return {display: hasChallenge("ic",21)?"":"none"} }], "blank", "blank",
              
    
                  
                   
                   
               ]},
               "Elements": {
                buttonStyle() { return {'border-color': 'purple'} },
                unlocked() {return hasUpgrade("ic",34)},
                       content: ["main-display",
                       "prestige-button",
                       "resource-display", "blank",
                      "blank",
                        ["display-text", function() { return (hasUpgrade("ic",43)&&((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?"Elemental Power: <h3>"+format(tmp.ic.elementPower)+"</h3>%":"") }],
                      ["display-text", function() { return "You have <h3>"+format(player.ic.elements)+"</h3> Elements, which are dividing Exponent Coins and Orbs req by "+format(tmp.ic.eleEffect)+"."+(tmp.ic.eleEffect.gte("1e645")?" (SOFTCAPPED)":"") }],
                      "blank",
                      ["row", [["buyable", 41],["buyable", 42],["buyable", 43],["buyable", 44],["buyable", 45],["buyable", 46],["buyable", 47]]],
                      ["row", [["buyable", 61],["buyable", 62],["buyable", 63],["buyable", 64],["buyable", 65],["buyable", 66],["buyable", 67]]],
                    "blank",	"blank",	"blank",	"blank",	"blank",	"blank",	"blank",	"blank",	"blank",
                       ,
                    ],
                  
        
                      
                       
                       
                   },
    
    },
    layerShown(){return hasUpgrade("ex",31)||player.ic.unlocked},
universeEffect() {
    if (inChallenge("pa",12)) return new Decimal(1)
    let eff= Decimal.pow(player.ic.energy.plus(1),1.05)

 if (hasUpgrade("ic",23)) eff = eff.pow(1.7)
    if (getBuyableAmount("s",21)) eff = eff.pow(tmp.s.affinityEffect)
        if (hasUpgrade("truck",11)) eff = eff.pow(2)

        if (hasUpgrade("ic",44)) eff = eff.pow(5)
    return eff;
},
eleEffect() {
       if (inChallenge("pa",12)) return new Decimal(1)
    let eff= Decimal.pow(player.ic.elements.plus(1),1.1)

    
    if (player.ex.points.gte(21)||hasUpgrade("ic",33)) eff = eff.pow(9)
        if (getBuyableAmount("s",21)) eff = eff.pow(tmp.s.affinityEffect)
        let softcap = new Decimal(tmp.ic.eleSoftcap)
    if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(3/6)).mul(softcap)
    return eff;
},

eleSoftcap() {
    let cap = new Decimal("1e645")
if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) return new Decimal("1e20000")
    return cap;
},
upgrades: {
    11: {
        title: "Break It Down",
        description: "Unlock a new Exponent Buyable. Keep Exponent Upgrades on reset.",
        cost: new Decimal(1),
       
   
        unlocked() {return getBuyableAmount("ic",11).gte(3)},
      
    },
    12: {
        title: "Exponentpurchaser",
        description: "Automatically gain Exponent Coins and they reset nothing.",
        cost: new Decimal(10),
       
   
        unlocked() {return hasAchievement("ach",14)},
      
    },
    13: {
        title: "Root Remover",
        description: "Removes the Point rooter but forces a Row 2 reset.",
        cost: new Decimal(15),
       onPurchase() {
        doReset("ic",true)
       },
   
        unlocked() {return hasUpgrade("ic",12)},
      
    },
    14: {
        title: "Exponent Point Reset Remover",
        description: "Removes the Exponent Point resetting on Exponent coin reset but forces a Row 2 reset.",
        cost: new Decimal(25e6),
       onPurchase() {
        doReset("ic",true)
       },
   
        unlocked() {return hasUpgrade("ic",13)},
      
    },
    15: {
        title: "Exponent Pointed Multipliers",
        description: "Points multiply Exponent Points gain.",
           cost() { return new Decimal(player.si.current=='ic' ? "e1484395" : 1e8) },
   
   
    
        effect() {
                
             
            let eff = player.points.plus(1).pow(0.005)
            if (player.truck.inTrucking.gte(1)) eff = eff.root(3)
            if (inChallenge("s",11)) eff = eff.root(2)

                if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(3.25)
            return eff;
        },
        effectDisplay() { return format(tmp.ic.upgrades[15].effect)+"x" },
        unlocked() {return hasUpgrade("ic",14)},
        tooltip() {return "Points+1<sup>0.005</sup>"},
    },
    16: {
        title: "New Challenges",
        description: "Unlock Challenges. Also, divide exponent coins req by their own amount.",
          cost() { return new Decimal(player.si.current=='ic' ? "e1484433" : 1.5e8) },
   formula() {
    let formula = new Decimal(0.5)
    if (hasUpgrade("pa",27)) formula = formula.add(1.5)
    return formula;
   },
   
    
        effect() {
                
             
            let eff = player.ex.points.plus(1).pow(tmp.ic.upgrades[16].formula)
       
            if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(17.5)
            return eff;
        },
        effectDisplay() { return "/"+format(tmp.ic.upgrades[16].effect) },
        unlocked() {return hasUpgrade("ic",15)},
        tooltip() {return "ExpCoins+1<sup>0.5</sup>"},
    },
    17: {
        title: "The First Glance",
        description: "Points divide exponent coins req.",
               cost() { return new Decimal(player.si.current=='ic' ? "e1579567" : 3e8) },
   
        softcapStart() {let start = new Decimal(1e150)
                      if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) start = start.pow(50)
            return start;
           },
    
        effect() {
                
             
            let eff = player.points.plus(1).pow(0.03)
        if (hasUpgrade("ic",27)) eff = eff.pow(2)
            if (hasUpgrade("ic",37)) eff = eff.pow(2)
                let softcap = new Decimal(tmp.ic.upgrades[this.id].softcapStart)
                if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(3/6)).mul(softcap)
            
            return eff;
        },
        effectDisplay() { return "/"+format(tmp.ic.upgrades[17].effect)+(tmp.ic.upgrades[17].effect.gte(tmp.ic.upgrades[this.id].softcapStart)?" (SOFTCAPPED)":"") },
        unlocked() {return hasUpgrade("ic",16)},
        tooltip() {return "Points+1<sup>0.03</sup>"},
    },
    21: {
        title: "Magnificent Ability",
        description: "Unlock a new buyable.",
       cost() { return new Decimal(player.si.current=='ic' ? "e1579599" : 1e9) },
   
   
    
       
        unlocked() {return hasUpgrade("ic",17)},
       
    },
    22: {
        title: "Minificent Ability",
        description: "Points gain is raised 1.1.",
        cost() { return new Decimal(player.si.current=='ic' ? "e1905750" : 1.5e9) },
   
   
    
       
        unlocked() {return hasUpgrade("ic",21)},
       
    },
    23: {
        title: "A Great Adventure",
        description: "Universe Energy's effect is raised 1.7.",
      cost() { return new Decimal(player.si.current=='ic' ? "e1905770" : 1e12) },
   
   
    
       
        unlocked() {return hasUpgrade("ic",22)&&player.o.points.gte(4)},
       
    },
    24: {
        title: "Incremented Roots",
        description: "Mostly reduce Exponent Coins req. Also, incremental coins multiplies their own gain.",
          cost() { return new Decimal(player.si.current=='ic' ? "e1905790" : 1e13) },
        softcapStart() {
            let softcap = new Decimal("1e140")
           if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) softcap = softcap.pow(300)
            return softcap;
        },
   
    
        effect() {
                
             
            let eff = player.ic.points.plus(1).pow(0.1)
       
            let softcap = new Decimal(tmp.ic.upgrades[this.id].softcapStart)
            if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(3/6)).mul(softcap)
            return eff;
        },
        effectDisplay() { return format(tmp.ic.upgrades[24].effect)+"x"+(tmp.ic.upgrades[24].effect.gte(tmp.ic.upgrades[this.id].softcapStart)?" (SOFTCAPPED)":"") },
        unlocked() {return hasUpgrade("ic",23)},
        tooltip() {return "IncrementCoins+1<sup>0.1</sup>"},
    },
    25: {
        title: "Buymaking Max",
        description: "Buy max Exponent Coins and unlock another layer of Dimensions.",
           cost() { return new Decimal(player.si.current=='ic' ? "e1947989" : 1e14) },
   
   
    
  
        unlocked() {return hasUpgrade("ic",24)},
       
    },
    26: {
        title: "Incremental Thingy",
        description: "Raise Incremental Coins gain by 5. Incremental Coins multiply Points gain.",
           cost() { return new Decimal(player.si.current=='ic' ? "e1948000" : 1e14) },
   
        softcapStart() {let start = new Decimal(1e40)
            if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) start = start.pow(900)
            return start;
           },
    
  
         
        effect() {
                
             
            let eff = player.ic.points.plus(1).pow(0.07)
            if (inChallenge("s",11)) eff = eff.root(2)
                if (player.truck.inTrucking.gte(1)) eff = eff.root(3)
                let softcap = new Decimal(tmp.ic.upgrades[this.id].softcapStart)
                if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(5/6)).mul(softcap)
            return eff;
        },
        effectDisplay() { return format(tmp.ic.upgrades[26].effect)+"x"+(tmp.ic.upgrades[26].effect.gte(tmp.ic.upgrades[this.id].softcapStart)?" (SOFTCAPPED)":"") },
        unlocked() {return hasUpgrade("ic",25)},
        tooltip() {return "IncrementCoins+1<sup>0.07</sup>"},
       
    },
     27: {
        title: "The Second Glance",
        description: "Square the upgrade aboves effect.",
          cost() { return new Decimal(player.si.current=='ic' ? "e2200515" : 1e27) },
   
    
  
         
      
        unlocked() {return hasUpgrade("ic",26)},
    
       
    },
    31: {
        title: "QoL Incremental",
        description: "Gain 100% of Incremental Coins per second, automate Orbs and divide its req by 1e125.",
          cost() { return new Decimal(player.si.current=='ic' ? "e2200516" : 1e29) },
   
   
    
  
         
      
        unlocked() {return hasUpgrade("ic",27)},
    
       
    },
    32: {
        title: "Arsenal Incremental",
        description: "Points multiply Exponent Points gain.",
             cost() { return new Decimal(player.si.current=='ic' ? "e2814987" : 3e31) },
        softcapStart() {
            let softcap = new Decimal("1e1300")
                        if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) softcap = softcap.pow(10000)
            return softcap;
        },
   
   
    
  
         
      
        effect() {
                
             
            let eff = player.points.plus(1).pow(0.3)
            if (player.truck.inTrucking.gte(1)) eff = eff.root(3)
            if (inChallenge("s",11)) eff = eff.root(2)
                let softcap = new Decimal(tmp.ic.upgrades[this.id].softcapStart)
            if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(3/6)).mul(softcap)
            return eff;
        },
        effectDisplay() { return format(tmp.ic.upgrades[32].effect)+"x"+(tmp.ic.upgrades[32].effect.gte(tmp.ic.upgrades[this.id].softcapStart)?" (SOFTCAPPED)":"") },
        unlocked() {return hasUpgrade("ic",31)},
        tooltip() {return "Points+1<sup>0.3</sup>"},
    
       
    },
    33: {
        title: "Bombard",
        description() {return (((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)? "Tesseract":"Square")+" points gain."},
      cost() { return new Decimal(player.si.current=='ic' ? "e2814987" : 1e35) },
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",32)},
       
    
       
    },
    34: {
        title: "Not Nice",
        description: "Unlock Universe Dimension III.",
        cost() { return new Decimal(player.si.current=='ic' ? "e2814987" : 1e69) },
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",33)},
       
    
       
    },
    35: {
        title: "Scaled to the Brim",
        description: "Cost scalings for the first 2 Exponent Buyables are reduced.",
           cost() { return new Decimal(player.si.current=='ic' ? "e3227976" : 1e89) },
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",34)},
       
    
       
    },
    36: {
        title: "Unorbbed",
        description: "Orbs cost base exp is reduced by 1 and it resets nothing.",
         cost() { return new Decimal(player.si.current=='ic' ? "e3227976" : 1e89) },
        unlocked() {return hasUpgrade("ic",35)},
    },
    37: {
        title: "The Final Glance",
        description: "Square 'The First Glance' upgrade again, and buy max Orbs. Exponent base exponent is subtracted by 0.5.",
           cost() { return new Decimal(player.si.current=='ic' ? "e3227976" : 1e105) },
        unlocked() {return hasUpgrade("ic",36)},
    },
     41: {
        title: "Trapez Diesel",
        description: "Points Softcap<sup>2</sup> starts ^1.11 later.",
           cost: new Decimal("e3227978"),
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",37)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
       
    
       
    },
      42: {
        title: "Hyperbolic Bases",
        description: "Cube Superbase Points.",
           cost: new Decimal("4e3249164"),
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",41)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
       
    
       
    },
     43: {
        title: "Utoniumic Power?",
        description: "Unlock Elemental Power and Exponent Coin req is divided by e1e7.",
           cost: new Decimal("4e3249164"),
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",42)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
       
    
       
    },
     44: {
        title: "Pillaged Incrementals",
        description: "Raise Universal Energy's Effect by 5.",
           cost: new Decimal("e3449250"),
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",43)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
       
    
       
    },
       45: {
        title: "Softcap In The Middle",
        description: "Points Softcap starts ^3 later and Points Softcap<sup>2</sup> starts ^1.05 later.",
           cost: new Decimal("e3449750"),
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",44)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
       
    
       
    },
      46: {
        title: "Softcap In The Middle",
        description: "Incremental Coins softcap gain starts until 1e1,000,000.",
           cost: new Decimal("e3461375"),
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",45)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
       
    
       
    },
     47: {
        title: "Grand Finale II",
        description: "Incremental Coins softcap power is increased to 0.995 and Points Softcap<sup>2</sup> starts an extra ^1.2 later.",
           cost: new Decimal("e3961165"),
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",46)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false},
       
    
       
    },
},
passiveGeneration() { return (hasUpgrade("ic", 31)?1:0) },
challenges: {
11: {
    name: 'Squarerooted',
    challengeDescription: "Square root Points gain.",
   
  goal(){
   return new Decimal(1e42);
        
    
    },
   
    rewardDescription: "Automate Base Point Adder, and its cost scaling is reduced by 0.5.",
 
},
12: {
    name: 'No Exponent Coins',
    challengeDescription: "You cannot obtain Exponent Coins. Additionally, Exponent Points gain is added by 1 but square rooted.",
   
  goal(){
   return new Decimal(1e26);
        
      
    },
   
    rewardDescription: "Automate Exponent Point Buffer, and its cost scaling is reduced by 0.5.",
 
},
13: {
    name: "No Exponent Upgrade 12/13",
    challengeDescription: "Exponent Upgrade 12 and 13 do nothing.",
   
  goal(){
   return new Decimal(1e9);
        
      
    },
   
    rewardDescription: "Raise Exponent Coins req by 0.9.",
 unlocked() {return hasChallenge("ic",12)}
},
21: {
    name: "Expression Excepted",
    challengeDescription: "All previous challenges are applied to once.",
   countsAs: [11,12,13],
  goal(){
   return new Decimal(2.5e5);
        
      
    },
   
    rewardDescription: "Unlock Universal Coins.",
 unlocked() {return hasChallenge("ic",13)}
},
},
})
addLayer("o", {
    name: "orbs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
        image() { if (player.si.mastered.includes("o")) return "images/Skelet-Orb.png"},
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
 
    }},
    color: "red",
    requires: new Decimal(1e100), // Can be a function that takes requirement increases into account
    resource: "orbs", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {let base = new Decimal(3)
               if (inChallenge("pa",11)) return new Decimal(4)
  if (hasUpgrade("ic",36)) base = base.sub(1)
    if (hasUpgrade("s",25)) base = base.sub(0.5)
             if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.05)
                   if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) base = base.sub(0.05)

                    
        return base;
    }, // Prestige currency exponent
    base: 5,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.truck.inTrucking.gte(1)) return new Decimal(0)
       if (player.si.current=="ic") return new Decimal(0)
     if (getBuyableAmount("ic",13).gte(1)) mult = mult.div(tmp.ic.buyables[13].effect.first)
        if (hasUpgrade("ic",25)) mult = mult.div(tmp.ic.eleEffect)
        if (hasUpgrade("ic",31)) mult = mult.div(1e125)
        if (hasUpgrade("s",16)) mult = mult.div(upgradeEffect("s",16))

              if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) mult = mult.div(tmp.o.effect)
        return mult
    },
resetsNothing() {return hasUpgrade("ic",36)},
    baseEff() {
        let eff = new Decimal(1.2)

 if (getBuyableAmount("p",13).gte(1)) eff = eff.add(tmp.p.buyables[13].effect)
    if (player.s.furtherLayers.gte(2)) eff = eff.add(tmp.s.furtherOrbEff)
        return eff;
          },
            effect() {
         if (!player.o.unlocked) return new Decimal(1)
                let eff = Decimal.pow(this.baseEff(), player.o.points.plus()).max(0);
         if (getBuyableAmount("ic",51).gte(1)) eff = eff.times(tmp.ic.buyables[51].effect.first)

            if (hasUpgrade("pa",44)) eff = eff.pow(upgradeEffect("pa",44))
  if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(10)
                return eff;
            },
 
            effectDescription() {
                return "which are multiplying Points and Incremental Coins gain, dividing Exponent Coins "+(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?" and itself ":"")+"req by "+format(tmp.o.effect)+"."+(hasChallenge("ic",13)? "<br><br>Due to an Incremental Challenge 13 completion, your Exponent Point gain is raised 1.3.":"")
            },
    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

   

        return exp
    },
   
   

    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["ic","ex"],
    hotkeys: [
        {
            key:"o", description: "O: Reset for orbs", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],

    doReset(resettingLayer) {
        let keep = [];
    
 
    
        if (layers[resettingLayer].row > this.row) layerDataReset("o", keep)
    },
    canBuyMax() {return hasUpgrade("ic",37)},  
    layerShown(){return player.ic.unlocked},
    autoPrestige() { return hasUpgrade("ic", 31) },
  
})

addLayer("p", {
    name: "poachers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
        image() { if (player.si.mastered.includes("p")) return "images/Skelet-Poacher.png"},
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
 
    }},
    color: "aquamarine",
    requires: new Decimal("1e420"), // Can be a function that takes requirement increases into account
    resource: "poachers", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
             if (inChallenge("pa",11)) return new Decimal(1)
        if (inChallenge("s",11)) return new Decimal(1).times(tmp.s.cheeseburgerEff) 
                                  
     if (getBuyableAmount("ic",43).gte(1)) mult = mult.add(1).pow(tmp.ic.buyables[43].effect.first)
        if (hasAchievement("ach",41)) mult = mult.times(600)
            if (hasUpgrade("s",103)) mult = mult.times(upgradeEffect("s",103))
                     if (hasMilestone("truck",10)) mult = mult.times(tmp.s.cheeseburgerEff) 
        return mult
    },
    passiveGeneration() { return (hasUpgrade("s", 14)||player.si.unlocked?1:0) },
   
 
   
    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

    if (getBuyableAmount("p",14).gte(1)) exp = exp.add(tmp.p.buyables[14].effect)
if (player.s.amd.gte(4)) exp = exp.add(tmp.s.k5Effect)

    if (player.s.furtherLayers.gte(3)) exp = exp.add(tmp.s.furtherPoachEff)
        return exp
    },
   
    doReset(resettingLayer) {

        let keep = [];

        if (hasUpgrade("s",31)) keep.push("buyables")
     
        if (layers[resettingLayer].row > this.row) layerDataReset("p", keep)
    },
  
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["ic","ex"],
    position: 1,
    hotkeys: [
        {
            key:"p", description: "P: Reset for poachers", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
    update(diff) {
        if (hasMilestone("pa", 3)) {
            layers.p.buyables[11].buyMax();
            layers.p.buyables[12].buyMax();
            layers.p.buyables[13].buyMax();
            layers.p.buyables[14].buyMax();
            layers.p.buyables[15].buyMax();
        }
        if (hasUpgrade("s",103)) {
              layers.p.buyables[16].buyMax();
        }
 if (hasUpgrade("wi",26)) {
              layers.p.buyables[21].buyMax();
        }
        },
   buyables: {
    11: {
        title: "Poached Exponent",
        costBase() {
            let base = new Decimal(2);
            if (getBuyableAmount("s",12).gte(1)) base = base.sub(tmp.s.buyables[12].effect)
             if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.25)
            return base;
        },
        cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
            let base = this.costBase();
            let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
            return cost.floor()
        },
        display() { // Everything else displayed in the buyable button after the title
            let data = tmp[this.layer].buyables[this.id]
            let display = "Cost: " + formatWhole(data.cost) + " Poachers."+"\n\
            Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
            Raise Exponent Points gain. <br>Currently: ^"+format(data.effect.first)+"."
            return display;
        },
        effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
             if (inChallenge("pa",12)) return new Decimal(1)
            let eff = {}
            if (x.gte(0)) eff.first = Decimal.pow(1.11, x.pow(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?1.13:1.03))
            else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
       
        
            if (x.gte(0)) eff.second = x.pow(0.8)
            else eff.second = x.times(-1).pow(0.8).times(-1)
        
            return eff;
        },
     
        canAfford() {
            return player.p.points.gte(tmp[this.layer].buyables[this.id].cost)},
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player.p.points =  player.p.points.sub(cost)	
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
        },
        buyMax() {
            if (!this.unlocked || !this.canAfford()) return;
            let base = this.costBase();
            let target = player.p.points.max(1).log(base).plus(1).log(base);
            target = target.plus(1).floor();
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
        },
        style: {'width':'135px','height':'135px'},
        unlocked() {return player.p.unlocked},
        tooltip() {return "1.11<sup>x<sup>1.03</sup></sup>"} ,
    },12: {
        title: "Poached Exponent Base",
        costBase() {
            let base = new Decimal(2.5);
            if (getBuyableAmount("s",12).gte(1)) base = base.sub(tmp.s.buyables[12].effect)
           if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.25)
            return base;
        },
        cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
            let base = this.costBase();
            let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
            return cost.floor()
        },
        display() { // Everything else displayed in the buyable button after the title
            let data = tmp[this.layer].buyables[this.id]
            let display = "Cost: " + formatWhole(data.cost) + " Poachers."+"\n\
            Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
            Subtract Exponent Coin's base. <br>Currently: -"+format(data.effect)+"."
            return display;
        },
        effect() { // Effects of owning x of the items, x is a decimal
            x=player[this.layer].buyables[this.id]
   if (inChallenge("pa",12)) return new Decimal(0)
                if (!x.gte(1)) return new Decimal(0)
                let eff = Decimal.plus(0.02, x.times(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?0.065:0.02))

        
                return eff;
        },
     
        canAfford() {
            return player.p.points.gte(tmp[this.layer].buyables[this.id].cost)},
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player.p.points =  player.p.points.sub(cost)	
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
        },
        buyMax() {
            if (!this.unlocked || !this.canAfford()) return;
            let base = this.costBase();
            let target = player.p.points.max(1).log(base).plus(1).log(base);
            target = target.plus(1).floor();
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
        },
        style: {'width':'135px','height':'135px'},
        unlocked() {return getBuyableAmount("p",11).gte(4)},
        tooltip() {return "0.02+x*0.02"} ,
    },
    13: {
        title: "Poached Orbs",
        costBase() {
            let base = new Decimal(3);
            if (getBuyableAmount("s",12).gte(1)) base = base.sub(tmp.s.buyables[12].effect)
           if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.25)
            return base;
        },
        cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
            let base = this.costBase();
            let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
            return cost.floor()
        },
        display() { // Everything else displayed in the buyable button after the title
            let data = tmp[this.layer].buyables[this.id]
            let display = "Cost: " + formatWhole(data.cost) + " Poachers."+"\n\
            Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
            Add to Orbs effect exp. <br>Currently: +"+format(data.effect)+"."
            return display;
        },
        effect() { // Effects of owning x of the items, x is a decimal
            x=player[this.layer].buyables[this.id]
   if (inChallenge("pa",12)) return new Decimal(0)
                if (!x.gte(1)) return new Decimal(0)
                let eff = Decimal.plus(0.015, x.times(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?0.13:0.015))

        
                return eff;
        },
     
        canAfford() {
            return player.p.points.gte(tmp[this.layer].buyables[this.id].cost)},
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player.p.points =  player.p.points.sub(cost)	
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
        },
        buyMax() {
            if (!this.unlocked || !this.canAfford()) return;
            let base = this.costBase();
            let target = player.p.points.max(1).log(base).plus(1).log(base);
            target = target.plus(1).floor();
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
        },
        style: {'width':'135px','height':'135px'},
        unlocked() {return hasUpgrade("c",24)},
        tooltip() {return "0.015+x*0.015"} ,
    },
    14: {
        title: "Poached Poachers",
        costBase() {
            let base = new Decimal(3.5);
            if (getBuyableAmount("s",12).gte(1)) base = base.sub(tmp.s.buyables[12].effect)
           if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.25)
            return base;
        },
        cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
            let base = this.costBase();
            let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
            return cost.floor()
        },
        display() { // Everything else displayed in the buyable button after the title
            let data = tmp[this.layer].buyables[this.id]
            let display = "Cost: " + formatWhole(data.cost) + " Poachers."+"\n\
            Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
            Add to Poachers exp. <br>Currently: +"+format(data.effect)+"."
            return display;
        },
        effect() { // Effects of owning x of the items, x is a decimal
            x=player[this.layer].buyables[this.id]
   if (inChallenge("pa",12)) return new Decimal(0)
                if (!x.gte(1)) return new Decimal(0)
                let eff = Decimal.plus(0.072, x.times(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?0.4:0.072))

        
                return eff;
        },
     
        canAfford() {
            return player.p.points.gte(tmp[this.layer].buyables[this.id].cost)},
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player.p.points =  player.p.points.sub(cost)	
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
        },
        buyMax() {
            if (!this.unlocked || !this.canAfford()) return;
            let base = this.costBase();
            let target = player.p.points.max(1).log(base).plus(1).log(base);
            target = target.plus(1).floor();
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
        },
        style: {'width':'135px','height':'135px'},
        unlocked() {return getBuyableAmount("p",13).gte(3)},
        tooltip() {return "0.072+x*0.072"} ,
    },
    15: {
        title: "Poached Computing",
        costBase() {
            let base = new Decimal(4);
            if (getBuyableAmount("s",12).gte(1)) base = base.sub(tmp.s.buyables[12].effect)
           if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.25)
            return base;
        },
        cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
            let base = this.costBase();
            let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
            return cost.floor()
        },
        display() { // Everything else displayed in the buyable button after the title
            let data = tmp[this.layer].buyables[this.id]
            let display = "Cost: " + formatWhole(data.cost) + " Poachers."+"\n\
            Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
            Partition multiplier. <br>Currently: "+format(data.effect.first)+"x."
            return display;
        },
        effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
             if (inChallenge("pa",12)) return new Decimal(1)
            let eff = {}
            if (x.gte(0)) eff.first = Decimal.pow(1.4, x.pow(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?5:1.1))
            else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
       
        
            if (x.gte(0)) eff.second = x.pow(0.8)
            else eff.second = x.times(-1).pow(0.8).times(-1)
        
            return eff;
        },
     
        canAfford() {
            return player.p.points.gte(tmp[this.layer].buyables[this.id].cost)},
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player.p.points =  player.p.points.sub(cost)	
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
        },
        buyMax() {
            if (!this.unlocked || !this.canAfford()) return;
            let base = this.costBase();
            let target = player.p.points.max(1).log(base).plus(1).log(base);
            target = target.plus(1).floor();
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
        },
        style: {'width':'135px','height':'135px'},
        unlocked() {return hasUpgrade("s",24)},
        tooltip() {return "1.4<sup>x<sup>1.1</sup></sup>"} ,
    },
     16: {
        title: "Fast Fooder",
        costBase() {
            let base = new Decimal(5);
   if (hasChallenge("s",11)||player.si.unlocked) base = base.sub(0.25)
        
            return base;
        },
       cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
            let base = this.costBase();
            let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
            return cost.floor()
        },
        display() { // Everything else displayed in the buyable button after the title
            let data = tmp[this.layer].buyables[this.id]
            let display = "Cost: " + formatWhole(data.cost) + " Poachers."+"\n\
            Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
            Raise Points gain in TMT's Mighty Cheeseburger. <br>Currently: ^"+format(data.effect.first)+"."
            return display;
        },
        effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
             if (inChallenge("pa",12)) return new Decimal(1)
            let eff = {}
            if (x.gte(0)) eff.first = Decimal.pow(1.05, x.pow(1.03))
            else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
       
        
            if (x.gte(0)) eff.second = x.pow(0.8)
            else eff.second = x.times(-1).pow(0.8).times(-1)
        
            return eff;
        },
     
        canAfford() {
            return player.p.points.gte(tmp[this.layer].buyables[this.id].cost)},
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player.p.points =  player.p.points.sub(cost)	
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
        },
        buyMax() {
            if (!this.unlocked || !this.canAfford()) return;
            let base = this.costBase();
            let target = player.p.points.max(1).log(base).plus(1).log(base);
            target = target.plus(1).floor();
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
        },
        style: {'width':'135px','height':'135px'},
        unlocked() {return hasUpgrade("s",103)},
        tooltip() {return "1.05<sup>x<sup>1.03</sup></sup>"} ,
    },
     21: {
        title: "Poached Knights",
        costBase() {
            let base = new Decimal(6);

        
            return base;
        },
       cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
            let base = this.costBase();
            let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
            return cost.floor()
        },
        display() { // Everything else displayed in the buyable button after the title
            let data = tmp[this.layer].buyables[this.id]
            let display = "Cost: " + formatWhole(data.cost) + " Poachers."+"\n\
            Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
            Raise incrementing of all Partitions. <br>Currently: ^"+format(data.effect.first)+"."
            return display;
        },
        effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
             if (inChallenge("pa",12)) return new Decimal(1)
            let eff = {}
            if (x.gte(0)) eff.first = Decimal.pow(1.06, x.pow(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?1.32:1.06))
            else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
       
        
            if (x.gte(0)) eff.second = x.pow(0.8)
            else eff.second = x.times(-1).pow(0.8).times(-1)
        
            return eff;
        },
     
        canAfford() {
            return player.p.points.gte(tmp[this.layer].buyables[this.id].cost)},
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player.p.points =  player.p.points.sub(cost)	
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
        },
        buyMax() {
            if (!this.unlocked || !this.canAfford()) return;
            let base = this.costBase();
            let target = player.p.points.max(1).log(base).plus(1).log(base);
            target = target.plus(1).floor();
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
        },
        style: {'width':'135px','height':'135px'},
        unlocked() {return hasUpgrade("wi",26)},
        tooltip() {return "1.06<sup>x<sup>1.06</sup></sup>"} ,
    },
   },
   
    layerShown(){return player.ic.unlocked},

  
})

addLayer("s", {
    name: "sectors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
         image() { if (player.si.mastered.includes("s")) return "images/Skelet-Sector.png"},
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        expansion: new Decimal(0),
        corruption: new Decimal(0),
        cheeseburgers: new Decimal(0),
        cheeseDuration: new Decimal(0),
        time: new Decimal(0),
        catchedBurgers: new Decimal(0),
        pointsInCheeseburger: new Decimal(0),
        affinityPoints: new Decimal(0),
        cheeseburgerCostPur: new Decimal(0),
        affinityIAmount: new Decimal(0),
        affinityIIAmount: new Decimal(0),
        affinityIIIAmount: new Decimal(0),
      affinityIVAmount: new Decimal(0),
        expansionII: new Decimal(0),
        cheeseburgerCostPur2: new Decimal(0),
        cheeseburgerCostPur3: new Decimal(0),
        furtherPoints: new Decimal(0),
        furtherCoins: new Decimal(0),
        intel: new Decimal(0),
        amd: new Decimal(0),
                expansionIII: new Decimal(0),
                        expansionIV: new Decimal(0),

        furtherIncCoins: new Decimal(0),
        furtherLayers: new Decimal(0),

        bifurtherPoints: new Decimal(0),
        bifurtherCoins: new Decimal(0),
    
        partitionTable: "MBR",
    }},

    color: "lime",
		
    requires: new Decimal("1e990"), // Can be a function that takes requirement increases into account
    resource: "sectors", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {let base = new Decimal(0.005)

        return base;
    }, // Prestige currency exponent
    autoUpgrade() {return player.z.unlocked&&player.si.current==null},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
          if (player.truck.inTrucking.gte(1)) return new Decimal(0)
       if (hasAchievement("ach",42)) mult = mult.times(2)
        if (hasUpgrade("s",26)) mult = mult.times(upgradeEffect("s",26))
            if (hasAchievement("ach",44)) mult = mult.times(8)


                if (hasUpgrade("s",71)) mult = mult.times(upgradeEffect("s",71))

        if (getBuyableAmount("s",13).gte(1)) mult = mult.times(tmp.s.buyables[13].effect.first)

        if (hasUpgrade("c",47)) mult = mult.times(upgradeEffect("c",47 ))

        
            		 if (player.z.unlocked&&hasMilestone("truck",10)) mult = mult.times(tmp.z.sectorEffect)

   
        return mult

    },

    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade("s",33)) exp = exp.add(0.5)
        if (hasUpgrade("s",42)) exp = exp.add(0.5)
            if (getBuyableAmount("s",15)) exp = exp.add(tmp.s.buyables[15].effect)
                if (hasUpgrade("c",92)) exp = exp.add(0.1)
                               if (hasUpgrade("c",82)) exp = exp.add(0.05)
                                           if (hasUpgrade("c",72)) exp = exp.add(0.03)
                                                    if (hasUpgrade("c",62)) exp = exp.add(0.03)

     if (hasUpgrade("c",45)) exp = exp.add(0.12)
            if (player.s.amd.gte(3)) exp = exp.add(tmp.s.am486Effect)

        if (hasUpgrade("truck",35)) exp = exp.add(0.2)
        return exp
    },
   
   

    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["o","ex","p"],
    hotkeys: [
        {
            key:"s", description: "S: Reset for sectors", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],

    doReset(resettingLayer) {
        let keep = [];
    
        player.s.cheeseburgers = new Decimal(0);
     if (!player.si.unlocked)   player.s.catchedBurgers = new Decimal(0);
        player.s.time = new Decimal(0);
        player.s.cheeseDuration = new Decimal(0);
        if(player.si.unlocked) player.s.catchedBurgers = new Decimal(10)

        if (layers[resettingLayer].row > this.row) layerDataReset("s", keep)
          
    },
cheeseBurgerDuration() {
  let duration = new Decimal(0.5)

if (hasUpgrade("s",43)&&!hasMilestone("truck",10)) duration = duration.add(0.33)
    if (hasUpgrade("wi",21)&&!hasMilestone("truck",10)) duration = duration.add(upgradeEffect("wi",21))
        if (player.s.cheeseburgerCostPur2.gte(10)&&!hasMilestone("truck",10)) duration = duration.add(tmp.s.clickables[32].effect)
            if (player.pa.unlocked&&!hasMilestone("truck",10)) duration = duration.add(1)

        if (hasMilestone("truck",16)) duration = duration.div(2)
            if (hasUpgrade("wi",21)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("c"):false) duration = duration.div(upgradeEffect("wi",21))
  return duration;
},

cheeseburgerEff() {
    
 if (!hasMilestone("truck",10))  eff = new Decimal(10).add(tmp.s.clickables[33].effect).div(player.s.cheeseburgers.add(1))
     if (hasMilestone("truck",10))  eff = new Decimal(10).add(tmp.s.clickables[33].effect).add(player.s.cheeseburgers.add(1))
if (player.pa.unlocked) eff = eff.times(100)
 return eff;

},
  softcap: new Decimal("1e9000"), 
    softcapPower: new Decimal(0.1), 
passiveGeneration() { 
    let passive = new Decimal(0)

    if (hasUpgrade("s",94)||player.si.unlocked) passive = passive.add(1)
    return passive; },
    layerShown(){return player.p.unlocked},
    tabFormat: {
        "Main": {
         
            content: ["main-display",
            "prestige-button",
            "resource-display", "blank",
            ["display-text", () =>    (inChallenge("s",11)) ? "You have <h2>"+format(player.s.cheeseburgers)+"</h2> Cheeseburgers, translating to your layer multis being multiplied (doesn't affect static layers) by <h2>"+format(tmp.s.cheeseburgerEff)+"</h2>.":""],
            
            "blank",
            "blank",
     
            ["row", [["upgrade", 11],["upgrade", 12],["upgrade", 13],["upgrade", 14],["upgrade", 15],["upgrade", 16],["upgrade", 17]]],
            ["row", [["upgrade", 21],["upgrade", 22],["upgrade", 23],["upgrade", 24],["upgrade", 25],["upgrade", 26],["upgrade", 27]]],
            ["row", [["upgrade", 31],["upgrade", 32],["upgrade", 33],["upgrade", 34],["upgrade", 35],["upgrade", 36],["upgrade", 37]]],
            ["row", [["upgrade", 71],["upgrade", 72],["upgrade", 73],["upgrade", 74],["upgrade", 75],["upgrade", 76],["upgrade", 77]]],
            ["row", [["upgrade", 81],["upgrade", 82],["upgrade", 83],["upgrade", 84],["upgrade", 85],["upgrade", 86],["upgrade", 87]]],
        ]},
      
        "Disk Drives": {
            buttonStyle() { return {'border-color': 'navy'} },
            unlocked() {return player.s.unlocked},
                   content: ["main-display",
                   "prestige-button",
                   "resource-display", 
                   ["display-text", () =>    (inChallenge("s",11)) ? "You have <h2>"+format(player.s.cheeseburgers)+"</h2> Cheeseburgers, translating to your layer multis being multiplied (doesn't affect static layers) by <h2>"+format(tmp.s.cheeseburgerEff)+"</h2>.":""],
                   "blank",
                  "blank",
                  ["microtabs", "disk"],
            ]
    
        },
        "Buyables": {
          
            unlocked() {return hasUpgrade("s",27)},
                   content: ["main-display",
                   "prestige-button",
                   "resource-display", 
                         ["display-text", () =>    (inChallenge("s",11)) ? "You have <h2>"+format(player.s.cheeseburgers)+"</h2> Cheeseburgers, translating to your layer multis being multiplied (doesn't affect static layers) by <h2>"+format(tmp.s.cheeseburgerEff)+"</h2>.":""],"blank",
                  "blank",
                  ["row", [["buyable", 11],["buyable", 12],["buyable", 13],["buyable", 14],["buyable", 15],["buyable", 16]]],
            ]
    
        },
        "Steal TMT's Cheeseburger": {
          
            unlocked() {return hasUpgrade("s",35)},
                   content: ["main-display",
                   "prestige-button",
                   "resource-display", "blank",
                  "blank",
                  ["display-text", () =>    (inChallenge("s",11)||hasMilestone("truck",10)) ? "You have <h2>"+format(player.s.cheeseburgers)+"</h2> Cheeseburgers, translating to your layer multis being multiplied (doesn't affect static layers) by <h2>"+format(tmp.s.cheeseburgerEff)+"</h2>.":""],
                  ["display-image", "TMT.png"],

                  ["display-text", function() { return "Oh no! He has a cheeseburger! He is laughing at you and eating his cheeseburger." }],
                  "blank","blank",
                  ["display-text", function() { return "You must stop him from earning his mighty cheeseburger. Enter the challenge but watch out for errors!" }],
                  "blank","blank",
                  ["row", [["clickable", 21]]],
                  ["row", [["clickable", 31],["clickable", 32],["clickable", 33]]],
                  "challenges",
                  "blank","blank",
                  ["row", [["upgrade", 41],["upgrade", 42],["upgrade", 43],["upgrade", 44],["upgrade", 45],["upgrade", 46],["upgrade", 47]]],
                  ["row", [["upgrade", 51],["upgrade", 52],["upgrade", 53],["upgrade", 54],["upgrade", 55],["upgrade", 56],["upgrade", 57]]],
                  ["row", [["upgrade", 61],["upgrade", 62],["upgrade", 63],["upgrade", 64],["upgrade", 65],["upgrade", 66],["upgrade", 67]]],
                  ["row", [["upgrade", 91],["upgrade", 92],["upgrade", 93],["upgrade", 94],["upgrade", 95],["upgrade", 96],["upgrade", 97]]],
                  ["row", [["upgrade", 101],["upgrade", 102],["upgrade", 103],["upgrade", 104],["upgrade", 105],["upgrade", 106],["upgrade", 107]]],

            ]
    
        },
        "Challenge Penalties": {
    
            unlocked() {return inChallenge("s",11)},
                   content: [
                  "blank",
                 

                  ["display-text", function() { return "All layer multipliers are at 1, but exponents are unaffected.<br>There is a layer effect that starts based on Cheeseburgers. With no cheeseburgers, the effect is at 10, but you earn TMT's Cheeseburgers Eaten every 0.5 seconds, which negates the effect (can be nerfed via features).<br>You can catch cheeseburgers, with a cost that exponentially increases over time.<br>Base points gain is disabled.<br>Upgrades related to boosting points and exponent points gain is square rooted.<br>Points is square rooted." }],
                  "blank","blank",
                
            ]
    
        },
        "Affinity" : {
            buttonStyle() { return {'border-color': '#ff00b7'} },
            unlocked() {return hasUpgrade("s",53)},
                   content: [
                  "blank",
                 
              
                  ["raw-html", function() {return "<span style='animation: affinity 9s infinite;'>You have <h2>"+format(player.s.affinityPoints)+"</h2> Affinity Points, which are providing a ^"+format(tmp.s.affinityEffect)+" boost to both Universal Energy and Element effects but are dividing Affinity Generation by "+format(tmp.s.affinityEffect2)+"."}], "blank",
                  ["display-text", () =>    (player.s.affinityPoints.gte(375)) ? "After 375 Affinity Points, Affinity Effect 2 is raised "+format(tmp.s.affEffect2Power)+"!":""],
                  "blank","blank",
                  ["raw-html", function() {return "<small style='animation: affinity 9s infinite;'>Affinity Point generation: +"+format(tmp.s.affinityGeneration)+"/s </small>"}], "blank",
                  ["row", [["buyable", 21],["buyable", 22],["buyable", 23],["buyable",24]]],
            ]
    
        },
        "Further-Exponent" : {
            buttonStyle() { return {'border-color': '#2d9e00'} },
            unlocked() {return hasUpgrade("s",91)},
                   content: [
                  "blank",
                  ["raw-html", function() {return "<span style='animation: further 4s infinite;'>You have <h2>"+format(player.s.furtherCoins)+"</h2> Further-Exponent Coins, which are generating "+format(tmp.s.furtherPointGen)+" Further-Exponent Points/sec.</span>"}], "blank",
                  "blank",
                  "blank",
                  ["row", [["buyable", 31]]],
                  ["raw-html", function() {return "<span style='animation: further 4s infinite;'>You have <h2>"+format(player.s.furtherPoints)+"</h2> Further-Exponent Points, which are providing a x"+format(tmp.s.furtherEffect)+" boost to Points gain.</span>"}], "blank",
              
               
            ]
    
        },
        "CPU": {
            buttonStyle() { return {'border-color': 'green'} },
            unlocked() {return player.pa.unlocked},
                   content: ["main-display",
                   "prestige-button",
                   "resource-display", 
                 
                  "blank",
                  ["row", [["clickable", 51],["clickable", 52]]],
                  "blank",
                  "blank",
                  "blank",
              
            ]
    
        },
        "CPU Rewards": {
            buttonStyle() { return {'border-color': 'green'} },
            unlocked() {return player.pa.unlocked},
                   content: ["main-display",
                   "prestige-button",
                   "resource-display", 
                   "blank",
                        ["display-text", function() { return "<h2>Intel:</h2>" }],
                   ["display-text", function() { return "<b>Pentium Rewards:</b>" }],
                   "blank",
                   ["display-text", function() { return "Corruption cost is rooted by "+format(tmp.s.pentiumEffect)+"." }],
                  "blank",
                  ["display-text", function() { return "Multiply Base Points by "+format(tmp.s.pentiumEffect2)+"x (effect increased based on Points, formula is √^8(Points<sup>0.05</sup>)+1." }],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(1)) ? "<b>Pentium Pro Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(1)) ? "Corruption's effect is multiplied by "+format(tmp.s.pentiumProEffect)+"x.":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(1)) ? "Add the first Pentium's effect by +"+format(tmp.s.pentiumPro2Effect)+".":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(2)) ? "<b>Pentium II Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(2)) ? "Multiplies Pentium Pro's first effect by "+format(tmp.s.pentiumIIEffect)+"x (effect increased based on Points, formula is √^32(Points<sup>0.01</sup>)+1.":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(3)) ? "<b>Celeron Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(3)) ? "Points softcap starts ^"+format(tmp.s.celeronEffect)+" later.":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(4)) ? "<b>Xeon Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(4)) ? "Adds +"+format(tmp.s.xeonEffect)+" to Pentium Pro's effect. (effect increased based on Base Points, formula is √^32(BasePoints<sup>0.002</sup>)":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(5)) ? "<b>Pentium III Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(5)) ? "Raises elements softcap by ^"+format(tmp.s.pentiumIIIEffect)+". (effect increased based on Points, formula is √^96(log10(Points<sup>0.002</sup>))":""],
             "blank",
                  ["display-text", () =>    (player.s.intel.gte(6)) ? "<b>Pentium IV Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(6)) ? "Reduces base of Hydrogen by -"+format(tmp.s.pentiumIVEffect)+". ":""],
                    "blank",
                  ["display-text", () =>    (player.s.intel.gte(7)) ? "<b>Itanium Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(7)) ? "Increases Further-Exponent Coin gain (effect increased based on Affinity Points, formula is AffinityPoints<sup>0.2</sup>+1 "+format(tmp.s.itaniumEffect)+"x. ":""],
                     "blank",
                  ["display-text", () =>    (player.s.intel.gte(8)) ? "<b>Pentium M Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(8)) ? "Increases Ascension gain (effect increased based on Cookies, formula is log10(Cookies<sup>0.75</sup>)+1 "+format(tmp.s.pentiumMEffect)+"x. ":""],
                    "blank",
                  ["display-text", () =>    (player.s.intel.gte(9)) ? "<b>Pentium D Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(9)) ? "Am486 is increased by +"+format(tmp.s.pentiumDEffect)+". ":""],
                                    "blank",
                  ["display-text", () =>    (player.s.intel.gte(9)) ? "Am9080 is increased by "+format(tmp.s.pentiumDEffect2)+"x. ":""],
                      "blank",
                  ["display-text", () =>    (player.s.intel.gte(10)) ? "<b>Core Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(10)) ? "Buff all previous Intel rewards by "+format(tmp.s.coreEffect)+"x. ":""],
                       "blank",
                  ["display-text", () =>    (player.s.intel.gte(11)) ? "<b>Core 2 Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(11)) ? "Raise Pentium I's effect by ^"+format(tmp.s.core2Effect)+". ":""],
                    "blank",
                  ["display-text", () =>    (player.s.intel.gte(12)) ? "<b>Atom Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(12)) ? "Reduces cost exponent of Exponent Coins by -"+format(tmp.s.atomEffect)+". ":""],
                    "blank",
                  ["display-text", () =>    (player.s.intel.gte(13)) ? "<b>Core i Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(13)) ? "Reduces cost exponent of Zombies by -"+format(tmp.s.coreiEffect)+". ":""],
                   "blank",
                  ["display-text", () =>    (player.s.intel.gte(14)) ? "<b>Core i3 Rewards:</b>":""],
                  "blank",
                  ["display-text", () =>    (player.s.intel.gte(14)) ? "Increases assortment count of Zombie Fragments by "+format(tmp.s.corei3Effect)+"x. ":""],
   
                  "blank",
                   ["display-text", function() { return "<h2>AMD:</h2>" }],
                  ["display-text", () =>    (player.s.amd.gte(1)) ? "<b>Am9080 Rewards:</b>":""],
                   "blank",
                    ["display-text", () =>    (player.s.amd.gte(1)) ? "Further-Exponent Points generation is boosted by "+format(tmp.s.am9080Effect)+"x.":""],
                     "blank",
                               ["display-text", () =>    (player.s.amd.gte(2)) ? "<b>Am286 Rewards:</b>":""],
                               "blank",
                    ["display-text", () =>    (player.s.amd.gte(2)) ? "Universal Shift's effect is raised by ^"+format(tmp.s.am286Effect)+".":""],
                    "blank",
                     ["display-text", () =>    (player.s.amd.gte(3)) ? "<b>Am486 Rewards:</b>":""],
                               "blank",
                    ["display-text", () =>    (player.s.amd.gte(3)) ? "Sector exp is added by +"+format(tmp.s.am486Effect)+".":""],
                    "blank",
                     ["display-text", () =>    (player.s.amd.gte(4)) ? "<b>K5 Rewards:</b>":""],
                               "blank",
                    ["display-text", () =>    (player.s.amd.gte(4)) ? "Poacher exp is added by +"+format(tmp.s.k5Effect)+".":""],
                     "blank",
                     ["display-text", () =>    (player.s.amd.gte(5)) ? "<b>K6 Rewards:</b>":""],
                               "blank",
                    ["display-text", () =>    (player.s.amd.gte(5)) ? "Raise incrementing on all partitions by ^"+format(tmp.s.k6Effect)+".":""],
                        "blank",
                     ["display-text", () =>    (player.s.amd.gte(6)) ? "<b>K6-2/3 Rewards:</b>":""],
                               "blank",
                    ["display-text", () =>    (player.s.amd.gte(6)) ? "Raise Points in The Wrath of Black Screen with White Non-Blinking Underscore by ^"+format(tmp.s.k623Effect)+".":""],
                       "blank",
                     ["display-text", () =>    (player.s.amd.gte(7)) ? "<b>Athlon (K7) Rewards:</b>":""],
                               "blank",
                    ["display-text", () =>    (player.s.amd.gte(7)) ? "Zombie cost base is reduced by /"+format(tmp.s.athlonEffect)+".":""],
                     "blank",
                     ["display-text", () =>    (player.s.amd.gte(8)) ? "<b>Duron Rewards:</b>":""],
                               "blank",
                    ["display-text", () =>    (player.s.amd.gte(8)) ? "Exponent Points Softcap<sup>2</sup> starts ^"+format(tmp.s.duronEffect)+" later.":""],
                     "blank",
                     ["display-text", () =>    (player.s.amd.gte(9)) ? "<b>Athlon XP Rewards:</b>":""],
                               "blank",
                    ["display-text", () =>    (player.s.amd.gte(9)) ? "Superbase Points are multiplied by "+format(tmp.s.athlonXPEffect)+"x. (effect increased based on Ant Fragments), formula is 1000<sup>Ant+1</sup>":""],
                ]
    
        },
         "Further-Layers" : {
            buttonStyle() { return {'border-color': 'black'} },
            unlocked() {return hasChallenge("pa",12)},
                   content: [
                  "blank",
                  ["raw-html", function() {return "You have unlocked <h2>"+formatWhole(player.s.furtherLayers)+"</h2> Layers.</span>"}], "blank",
                 "blank",
                  ["row", [["clickable", 61]]],

                  "blank",

         [ "row", [
				["column", [
					["display-text", "<h3>Further-IC</h3>"],
					["display-text", function() { return "IC exponent gain+"+(format(tmp.s.furtherICEff)) }], "blank",
					 "blank",
					"blank", ["buyable", 41],
				], function() { return {width: "12em", visibility: player.s.furtherLayers.gte(1)?"visible":"hidden"}}],
                 ["column", [
					["display-text", "<h3>Further-Orbs</h3>"],
					["display-text", function() { return "Orbs base effect+"+(format(tmp.s.furtherOrbEff)) }], "blank",
					 "blank",
					"blank", ["buyable", 42],
				], function() { return {width: "12em", visibility: player.s.furtherLayers.gte(2)?"visible":"hidden"}}],
                  ["column", [
					["display-text", "<h3>Further-Poachers</h3>"],
					["display-text", function() { return "Poachers exponent gain+"+(format(tmp.s.furtherPoachEff)) }], "blank",
					 "blank",
					"blank", ["buyable", 43],
				], function() { return {width: "12em", visibility: player.s.furtherLayers.gte(3)?"visible":"hidden"}}],
              
               
            ]
        ]
    ]
        },
         "Post-Further Content" : {
            buttonStyle() { return {'border-color': '#1d6600'} },
            unlocked() {return hasChallenge("s",11)||player.si.unlocked},
                   content: [
                 "main-display",
                   "prestige-button",
                   "resource-display", 

                   "blank",
                  "blank",
                  ["microtabs", "postFurther"],
               
            ]
    
        },
    },

    furtherICEff() {
        let x = new Decimal(1.1)
        let eff = new Decimal(0.1).times(x.times(player.s.buyables[41]))
        return eff;
    },
     furtherOrbEff() {
        let x = new Decimal(1)
        let eff = new Decimal(0.1).times(x.times(player.s.buyables[42]))
        return eff;
    },
        furtherPoachEff() {
        let x = new Decimal(1.08)
        let eff = new Decimal(0.1).times(x.times(player.s.buyables[43]))
        return eff;
    },
   pentiumEffect() {
     if (!player.pa.unlocked) return new Decimal(1)
     let eff = new Decimal(2)
     if (player.s.intel.gte(1)) eff = eff.add(tmp.s.pentiumPro2Effect)
        if (hasUpgrade("pa",11)) eff = eff.times(1.5)
            if (hasUpgrade("pa",41)) eff = eff.times(2)

        if (player.s.intel.gte(11)) eff = eff.pow(tmp.s.core2Effect)
     return eff;
   },
    am9080Effect() {
     if (!hasChallenge("pa",11)) return new Decimal(1)
     let eff = new Decimal(1.8)
    if (player.s.intel.gte(9)) eff = eff.times(tmp.s.pentiumDEffect2)
     return eff;
   },
    am286Effect() {
     if (!hasChallenge("pa",11)) return new Decimal(1)
     let eff = new Decimal(3125)
     return eff;
   },
    am486Effect() {
     if (!hasChallenge("pa",11)) return new Decimal(0)
     let eff = new Decimal(0.1)
        if (player.s.intel.gte(9)) eff = eff.add(tmp.s.pentiumDEffect)
     return eff;
   },
     k5Effect() {
     if (!hasChallenge("pa",11)) return new Decimal(0)
     let eff = new Decimal(0.5)
      
     return eff;
   },
    k6Effect() {
     if (!hasChallenge("pa",11)) return new Decimal(0)
     let eff = new Decimal(1.5)
      
     return eff;
   },
    k623Effect() {
     if (!hasChallenge("pa",11)) return new Decimal(0)
     let eff = new Decimal(1.3)
      
     return eff;
   },
     athlonEffect() {
     if (!hasChallenge("pa",11)) return new Decimal(0)
     let eff = new Decimal(2)
      
     return eff;
   },
     duronEffect() {
     if (!hasChallenge("pa",11)) return new Decimal(0)
     let eff = new Decimal(1.05)
      
     return eff;
   },
    athlonXPEffect() {
     if (!hasChallenge("pa",11)) return new Decimal(0)
     let eff = new Decimal(1000).pow(player.truck.ant.add(1))
      
     return eff;
   },
   pentiumEffect2() {
     if (!player.pa.unlocked) return new Decimal(1)
    let eff = new Decimal(1).times(player.points.pow(0.05).root(8).add(1))
  if (player.s.intel.gte(10)) eff = eff.times(1.1)
    return eff;
  },
  pentiumProEffect() {
    if (!player.pa.unlocked) return new Decimal(1)
    let eff = new Decimal(16)
    if (player.s.intel.gte(2)) eff = eff.times(tmp.s.pentiumIIEffect)
    if (player.s.intel.gte(10)) eff = eff.times(1.1)
    return eff;
  },
  pentiumPro2Effect() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(0.1)
    if (player.s.intel.gte(4)) eff = eff.add(tmp.s.xeonEffect)
          if (player.s.intel.gte(10)) eff = eff.times(1.1)
    return eff;
  },
  pentiumIIEffect() {
     if (!player.pa.unlocked) return new Decimal(1)
    let eff = new Decimal(4).times(player.points.pow(0.01).root(32).add(1))
  if (player.s.intel.gte(10)) eff = eff.times(1.1)
    return eff;
  },
  celeronEffect() {
     if (!player.pa.unlocked) return new Decimal(1)
    let eff = new Decimal(1.0002)
  if (hasUpgrade("pa",16)) eff = eff.add(0.0018)
    if (hasUpgrade("pa",35)) eff= eff.add(0.0982)
          if (player.s.intel.gte(10)) eff = eff.times(1.1)
    return eff;
  },
  xeonEffect() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(0.1).add(getBasePointGen().pow(0.002).root(32))
  if (player.s.intel.gte(10)) eff = eff.times(1.1)
    return eff;
  },
  pentiumIIIEffect() {
     if (!player.pa.unlocked) return new Decimal(1)
    let eff = new Decimal(1).add(player.points.add(1).pow(0.002).root(96).log10())
  if (player.s.intel.gte(10)) eff = eff.times(1.1)
    return eff;
  },
   pentiumIVEffect() {
     if (!player.pa.unlocked) return new Decimal(0)
  let eff = new Decimal(0.1)
 
   if (hasUpgrade("pa",41)) eff = eff.times(1.5)
      if (player.s.intel.gte(10)) eff = eff.times(1.1)
    return eff;
  },
    itaniumEffect() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(1).times(player.s.affinityPoints.pow(0.2).add(1))
 
  if (player.s.intel.gte(10)) eff = eff.times(1.1)
    return eff;
  },
     pentiumMEffect() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(1).times(player.c.points.add(1).log10().pow(0.75).add(1))
   if (player.s.intel.gte(10)) eff = eff.times(1.1)

    return eff;
  },
     pentiumDEffect() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(0.5)
   if (player.s.intel.gte(10)) eff = eff.times(1.1)

    return eff;
  },
   pentiumDEffect2() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(1.75)
 
  if (player.s.intel.gte(10)) eff = eff.times(1.1)
    return eff;
  },
    coreEffect() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(1.1)
 

    return eff;
  },
   core2Effect() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(2.25)
 

    return eff;
  },
   atomEffect() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(0.05)
 

    return eff;
  },
    coreiEffect() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(0.25)
 

    return eff;
  },
     corei3Effect() {
     if (!player.s.intel.gte(14)) return new Decimal(1)
    let eff = new Decimal(5)
 

    return eff;
  },
    affEffect2Power() {
        let eff = player.s.affinityPoints.log10().sub(1.57).times(1.05)
      if (player.s.affinityPoints.gte(1616)) eff = eff.pow(1.2)
        return eff;
    },
    furtherEffect() {
        let eff = player.s.furtherPoints.pow(7).add(1)
        if (hasUpgrade("pa",17)) eff = eff.pow(2)
            if (hasUpgrade("truck",15)) eff = eff.pow(3)
                if (hasChallenge("s",11)||player.si.unlocked) eff = eff.times(tmp.s.bifurtherEffect)
        return eff;

    },
    furtherPointGen() {
        let eff = player.s.furtherCoins.div(10)
        if (player.s.amd.gte(1)) eff = eff.times(tmp.s.am9080Effect)
            if (hasUpgrade("pa",37)) eff = eff.times(500)
            if (player.s.intel.gte(7)) eff = eff.times(tmp.s.itaniumEffect)

        if (hasUpgrade("truck",14)) eff = eff.pow(2)

                if (hasUpgrade("truck",17)) eff = eff.times(upgradeEffect("truck",17))
        return eff; 
    },
     bifurtherEffect() {
        let eff = player.s.bifurtherPoints.pow(30).add(1)
 
        return eff;

    },
    bifurtherPointGen() {
        let eff = player.s.bifurtherCoins.div(10)
        if (hasMilestone("truck",13)) eff = eff.add(tmp.ic.buyables[65].effect)
            if (hasUpgrade("truck",43)) eff = eff.times(upgradeEffect("truck",43))
        return eff; 
    },
    challenges: {
        11: {
            name: "TMT's Mighty Cheeseburger",
            challengeDescription: "TMT is eating his cheeseburger and laughs you as you try to fix the errors shown in Console. See another tab to view penalties.",
           
          goal(){
           return new Decimal("1e100000");
                
            
            },
           
            rewardDescription: "Unlock Bifurther-Exponents. Gives a boost to pre-Pashtocha layers.",
      
          unlocked() {return !hasMilestone("truck",10)},
        },
       
     
    },
    affinityGeneration() {
    return new Decimal(player.s.affinityIAmount.times(player.s.affinityIIAmount.add(1).times(player.s.affinityIIIAmount.add(1).times(player.s.affinityIVAmount.add(1))))).div(tmp.s.affinityEffect2).times(tmp.s.affinityGenMult)
    },
affinityGenMult() {

let gen = new Decimal(1)

if (getBuyableAmount("ic",46).gte(1)) gen = gen.times(tmp.ic.buyables[46].effect.first)

    if (hasUpgrade("s",85)) gen = gen.times(100)

        
    if (hasUpgrade("truck",24)) gen = gen.times(2)

        if (hasUpgrade("truck",31)) gen = gen.times(upgradeEffect("truck",31))
    return gen;
},
    bulkBurger() {
        let bulk = new Decimal(1)
        if (hasUpgrade("s",43)&&(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) bulk = bulk.times(3)
        return bulk;
    },
    update(diff, resettingLayer) {
        
        if (player.s.cheeseDuration.gte(tmp.s.cheeseBurgerDuration)&&inChallenge("s",11)) {
            player.s.cheeseDuration = new Decimal(0);
            player.s.cheeseburgers = player.s.cheeseburgers.add(1)
        }
        if (inChallenge("s",11)) {
            player.s.cheeseDuration = player.s.cheeseDuration.add(diff);
            player.s.time = player.s.time.add(diff);
            console.error("Uncaught TypeError: Cannot read properties of undefined (reading 'cheeseburger')");
           player.s.pointsInCheeseburger = player.s.pointsInCheeseburger.max(player.points)
           if (hasUpgrade("s",51)&&layers.s.clickables[21].canClick()) layers.s.clickables[21].onClick();
            /* throw function freezes the game, so console.error is used instead*/
        }
          if (hasMilestone("truck",1)) player.s.pointsInCheeseburger = player.s.pointsInCheeseburger.max(player.points.add(1).root(hasUpgrade("truck",47) ? 5:7.5).add(1))
        if (hasUpgrade("s", 33)) {
         
            if (layers.s.clickables[11].canClick()) layers.s.clickables[11].onClick();
     
     
        }
        if (hasUpgrade("s", 56)) {
        if (layers.s.clickables[31].canClick()) layers.s.clickables[31].onClick();
    }

    if (hasUpgrade("s", 91)) {
         
        if (layers.s.clickables[41].canClick()) layers.s.clickables[41].onClick();
 
 
    }
    if (hasAchievement("ach", 54)) {
         
        if (layers.s.clickables[12].canClick()) layers.s.clickables[12].onClick();
 
 
    }
   if (hasUpgrade("pa", 47)) {
         
        if (layers.s.clickables[42].canClick()) layers.s.clickables[42].onClick();
 
 
    }
       if (inChallenge("s", 11)) tmp.s.cheeseBurgerDuration = tmp.s.cheeseBurgerDuration.sub(diff).max(0)
   if (!player.si.unlocked||(Array.isArray(tmp.si.mastered)?tmp.si.mastered.includes("s"):false)) {   
    
    player.s.affinityPoints = player.s.affinityPoints.plus(tmp.s.affinityGeneration.div(20))

   }
       player.s.furtherPoints = player.s.furtherPoints.plus(tmp.s.furtherPointGen.div(20))
              player.s.bifurtherPoints = player.s.bifurtherPoints.plus(tmp.s.bifurtherPointGen.div(20))
   if (hasUpgrade("pa", 37)) {
         
      layers.s.buyables[21].buyMax();
   layers.s.buyables[22].buyMax();
     layers.s.buyables[23].buyMax();
       layers.s.buyables[24].buyMax();
 
    }
   if (hasUpgrade("truck", 16)) {
         
      layers.s.buyables[31].buyMax();
  
 
    }
     if (hasUpgrade("truck", 34)) {
         
      layers.s.buyables[11].buyMax();
   layers.s.buyables[12].buyMax();
    layers.s.buyables[13].buyMax();
     layers.s.buyables[14].buyMax();
      layers.s.buyables[15].buyMax();
       layers.s.buyables[16].buyMax();
 
    }
      if (player.s.cheeseDuration.gte(tmp.s.cheeseBurgerDuration)&&hasMilestone("truck",10)) {
          player.s.cheeseburgers = player.s.cheeseburgers.add(tmp.s.bulkBurger)
                        player.s.cheeseDuration = new Decimal(0);
          
        }

          if (hasMilestone("truck",10)) {
            player.s.cheeseDuration = player.s.cheeseDuration.add(diff);
                    if (layers.s.clickables[33].canClick()) layers.s.clickables[33].onClick();
        }

   if (hasUpgrade("truck", 46)) {
         
        if (layers.s.clickables[43].canClick()) layers.s.clickables[43].onClick();
 
 
    }
      if (hasUpgrade("truck", 53)) {
         
        if (layers.s.clickables[51].canClick()) layers.s.clickables[51].onClick();
   if (layers.s.clickables[52].canClick()) layers.s.clickables[52].onClick();
   layers.s.buyables[51].buyMax();
    }

    if (player.si.mastered.includes("p"))  {
            if (layers.s.clickables[61].canClick()) layers.s.clickables[61].onClick();
             layers.s.buyables[41].buyMax();
                layers.s.buyables[42].buyMax();
                   layers.s.buyables[43].buyMax();
    }
    },
    buyables: {
        11: {
            title: "Random Access Memory",
            costBase() {
                let base = new Decimal(1.4);
                     if (hasUpgrade("truck",34)) base = base.div(1.1)
             if (hasUpgrade("truck",33)) base = base.div(1.1)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Sectors."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Multiplies corruption effect. <br>Currently: "+format(data.effect.first)+"x."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.14, x.pow(1.06))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.s.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.s.points =  player.s.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.s.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("s",27)},
            tooltip() {return "1.14<sup>x<sup>1.036/sup>"} ,
        },
        12: {
            title: "DDRx Level (Double Data Rate)",
            costBase() {
                let base = new Decimal(2);
                     if (hasUpgrade("truck",34)) base = base.div(1.1)
            if (hasUpgrade("truck",33)) base = base.div(1.1)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Sectors."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Scalings for the first 5 Poacher buyables are reduced. <br>Currently: -"+format(data.effect)+"."
                return display;
            },
            effect() { // Effects of owning x of the items, x is a decimal
                x=player[this.layer].buyables[this.id]
    
                    if (!x.gte(1)) return new Decimal(0)
                    let eff = Decimal.plus(0.02, x.times(0.02))
    
            
                    return eff;
            },
         
            canAfford() {
                return player.s.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.s.points =  player.s.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.s.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("s",44)},
            tooltip() {return "0.02+x*0.02"} ,
        },
        13: {
            title: "CPU (Central Processing Unit) Cores",
            costBase() {
                let base = new Decimal(2.2);
                     if (hasUpgrade("truck",34)) base = base.div(1.1)
            if (hasUpgrade("truck",33)) base = base.div(1.1)
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Sectors."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Multiply Sectors gain. <br>Currently: "+format(data.effect.first)+"x."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.5, x.pow(1.2))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
            canAfford() {
                return player.s.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.s.points =  player.s.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.s.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("s",64)},
            tooltip() {return "1.5<sup>x<sup>1.2/sup></sup>"} ,
        },
          14: {
            title: "CPU (Central Processing Unit) Threads",
            costBase() {
                let base = new Decimal(2.15);
                     if (hasUpgrade("truck",34)) base = base.div(1.1)
            if (hasUpgrade("truck",33)) base = base.div(1.1)
                return base;
            },
            freelevel() {
                let free = new Decimal(0)
                if (hasUpgrade("truck",32)) free = free.add(1)
                return free
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Sectors."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+""+(hasUpgrade("truck",32)?"+"+tmp.s.buyables[this.id].freelevel:"")+"\n\
                Points softcap starts later. <br>Currently: ^"+format(data.effect.first)+"."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.01, x.add(tmp.s.buyables[this.id].freelevel).pow(1.01))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
            canAfford() {
                return player.s.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.s.points =  player.s.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.s.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("pa",31)},
            tooltip() {return "1.01<sup>x<sup>1.01</sup>"} ,
        },
        15: {
            title: "Sector Intercept",
            costBase() {
                let base = new Decimal(2.2);
            
            if (hasUpgrade("truck",33)) base = base.div(1.1)
                           if (hasUpgrade("truck",34)) base = base.div(1.1)
                return base;
            },
           cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Sectors."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Add sector gain exp <br>Currently: +"+format(data.effect)+"."
                return display;
            },
            effect() { // Effects of owning x of the items, x is a decimal
                x=player[this.layer].buyables[this.id]
    
                    if (!x.gte(1)) return new Decimal(0)
                    let eff = Decimal.plus(0.01, x.times(0.015))
    
            
                    return eff;
            },
         
            canAfford() {
                return player.s.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.s.points =  player.s.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.s.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("c",91)},
       tooltip() {return "0.01+x*0.015"} ,
        },
          16: {
            title: "Linear Hammering",
            costBase() {
                let base = new Decimal(5);
            
                if (hasUpgrade("truck",34)) base = base.div(1.1)
                return base;
            },
           cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Sectors."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Raise Points in The Wrath of Black Screen with White Non-Blinking Underscore. <br>Currently: ^"+format(data.effect.first)+"."
                return display;
            },
           effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.02, x.pow(1.02))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
           
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
         
            canAfford() {
                return player.s.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.s.points =  player.s.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.s.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasUpgrade("truck",33)},
          
                tooltip() {return "1.02<sup>x<sup>1.02</sup>"} ,
        },
        21: {
            title: "Affinity Dimension I",
          
          costBase() {
                let base = new Decimal("1e53");
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow("1e40", x.add(10.75));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Points"+"\n\
                Generates Affinity Points (see gain above)<br>Only buyable when in TMT's Mighty Cheeseburger."
                return display;
            },
            
         
            canAfford() {
                return player.points.gte(tmp[this.layer].buyables[this.id].cost)&&(inChallenge("s",11)||hasMilestone("pa",4))},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.points = player.points.sub(cost)	
                player.s.affinityIAmount = player.s.affinityIAmount.add(1)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.points.max(1).log("1e33");
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
                     player.s.affinityIAmount = player.s.affinityIAmount.max(target)
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("s",53)},
          
        },
        22: {
            title: "Affinity Dimension II",
          
          costBase() {
                let base = new Decimal("1e535");
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow("1e45", x.add(10.75));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Points"+"\n\
                Multiplies the effect of Affinity Dimension I adding effect.<br>Only buyable when in TMT's Mighty Cheeseburger."
                return display;
            },
            
         
            canAfford() {
                return player.points.gte(tmp[this.layer].buyables[this.id].cost)&&(inChallenge("s",11)||hasMilestone("pa",4))},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.points = player.points.sub(cost)	
                player.s.affinityIIAmount = player.s.affinityIIAmount.add(1)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.points.max(1).log("1e33");
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
                     player.s.affinityIIAmount = player.s.affinityIIAmount.max(target)
            },
            style: {'height':'135px'},
            unlocked() {return hasAchievement("ach",52)},
          
        },
        23: {
            title: "Affinity Dimension III",
          
          costBase() {
                let base = new Decimal("1e535");
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow("1e50", x.add(10.75));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Points"+"\n\
                Multiplies the effect of a previous dimension. <br>Only buyable when in TMT's Mighty Cheeseburger."
                return display;
            },
            
         
            canAfford() {
                return player.points.gte(tmp[this.layer].buyables[this.id].cost)&&(inChallenge("s",11)||hasMilestone("pa",4))},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.points = player.points.sub(cost)	
                player.s.affinityIIIAmount = player.s.affinityIIIAmount.add(1)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.points.max(1).log("1e33");
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
                      player.s.affinityIIIAmount = player.s.affinityIIIAmount.max(target)
            },
            style: {'height':'135px'},
            unlocked() {return hasAchievement("ach",52)},
          
        },
        24: {
            title: "Affinity Dimension IV",
          
          costBase() {
                let base = new Decimal("1e800");
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow("1e100", x.add(10.75));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Points"+"\n\
                Multiplies the effect of a previous dimension."
                return display;
            },
            
         
            canAfford() {
                return player.points.gte(tmp[this.layer].buyables[this.id].cost)&&(inChallenge("s",11)||hasMilestone("pa",4))},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.points = player.points.sub(cost)	
                player.s.affinityIVAmount = player.s.affinityIVAmount.add(1)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.points.max(1).log("1e33");
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
                      player.s.affinityIVAmount = player.s.affinityIVAmount.max(target)
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("pa",32)},
          
        },
        31: {
            title: "Further-Exponent Coin Generation",
          
            costBase() {
                let base = new Decimal(1024);
            
         if (hasUpgrade("s",94)) base = base.div(upgradeEffect("s",94))
            if (hasUpgrade("pa",36)) base = base.div(18)
                  if (hasUpgrade("truck",16)) base = base.div(2.5)
                return base;
            },
           
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Points"+"\n\
                Generate 0.1 Further-Exponent Points per second."
                return display;
            },
            
         
            canAfford() {
                return player.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.points = player.points.sub(cost)	
                player.s.furtherCoins = player.s.furtherCoins.add(1)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
                    player.s.furtherCoins =  player.s.furtherCoins.max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("s",91)},
          
        },
         41: {
          
            costBase() {
                let base = new Decimal(10);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Sectors."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Buff Further-IC's effect by 10% per upgrade."
                return display;
            },
         
            canAfford() {
                return player.s.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.s.points =  player.s.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.s.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasChallenge("pa",12)},
       
        },
           42: {
          
            costBase() {
                let base = new Decimal(15);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Sectors."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Buff Further-Orb's effect by 10% per upgrade."
                return display;
            },
         
            canAfford() {
                return player.s.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.s.points =  player.s.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.s.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasChallenge("pa",12)&&player.s.furtherLayers.gte(2)},
       
        },
           43: {
          
            costBase() {
                let base = new Decimal(19.5);
            
            
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Sectors."+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Buff Further-Poacher's effect by 10% per upgrade."
                return display;
            },
         
            canAfford() {
                return player.s.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.s.points =  player.s.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.s.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'width':'135px','height':'135px'},
            unlocked() {return hasChallenge("pa",12)&&player.s.furtherLayers.gte(3)},
       
        },
         51: {
            title: "Bifurther-Exponent Coin Generation",
          
            costBase() {
                let base = new Decimal(1024);
            
   
                return base;
            },
           
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Points"+"\n\
                Generate 0.1 Bifurther-Exponent Points per second."
                return display;
            },
            
         
            canAfford() {
                return player.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.points = player.points.sub(cost)	
                player.s.bifurtherCoins = player.s.bifurtherCoins.add(1)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
                    player.s.bifurtherCoins =  player.s.bifurtherCoins.max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasChallenge("s",11)||player.si.unlocked},
          
        },
    },
    microtabs: {
        disk: {
            "Partitions": {
                buttonStyle() {return {'border-color': 'navy'}},
                content: [
           
                   "resource-display",

                   "blank",
                   ["display-text",
                    function() {return "Expanding sector capacity by spending Sectors increases Partition size by x2.5." },
                        {}],
                    ["row", [["clickable", 101]]],
                        ["row", [["clickable", 11],["clickable", 41],["clickable", 42],["clickable", 43]]],
                    "blank",
                  
                ]
            },
            "Corruption": {
                buttonStyle() {return {'border-color': 'red'}},
                unlocked: () => 	(hasUpgrade("s",15)),
                content: [
              
                   "resource-display",
                   "blank", "blank",
                   ["display-text", function() { return "You have <h1 style='color: red; text-shadow: red 0px 0px 10px;'>"+formatWhole(player.s.corruption)+"</h1> Corruptions, which are multiplying Willy Cookies by "+format(tmp.s.corruptEffect)+"x." }],
                   "blank", "blank",
                   ["row", [["clickable", 12]]],
                  "blank",
                ]
            },
           
           
        
        },
        postFurther: {
                 
            "Bifurther-Exponent": {
                  buttonStyle() {return {'border-color': '#1d6600'}},
                   content: [
                  "blank",
                  ["raw-html", function() {return "<span style='animation: bifurther 4s infinite;'>You have <h2>"+format(player.s.bifurtherCoins)+"</h2> Bifurther-Exponent Coins, which are generating "+format(tmp.s.bifurtherPointGen)+" Bifurther-Exponent Points/sec.</span>"}], "blank",
                  "blank",
                  "blank",
                  ["row", [["buyable", 51]]],
                  ["raw-html", function() {return "<span style='animation: bifurther 4s infinite;'>You have <h2>"+format(player.s.bifurtherPoints)+"</h2> Bifurther-Exponent Points, which are providing a x"+format(tmp.s.bifurtherEffect)+" boost to Further-Exponent Point's effect.</span>"}], "blank",
                   ],
            }
        },
    },

    baseEff() {
        let eff = new Decimal(1.2)
        return eff;
          },
            corruptEffect() {
         if (!hasAchievement("ach",26)) return new Decimal(1)
                let eff = Decimal.pow(this.baseEff(), player.s.corruption.plus()).max(0);
              if (getBuyableAmount("s",11).gte(1)) eff = eff.times(tmp.s.buyables[11].effect.first)
                if (player.s.intel.gte(1)) eff = eff.times(tmp.s.pentiumProEffect)
                return eff;
            },

    affinityEffect() {
              if (inChallenge("pa",12)) return new Decimal(1)
                       let eff = Decimal.pow(1.001, player.s.affinityPoints.plus()).max(0);
                 
                    if (hasUpgrade("c",81)) eff = eff.pow(1.05)
                         if (eff.gte(tmp.s.affinityHardcap)) eff = new Decimal(tmp.s.affinityHardcap)
                       return eff;
                   },

                   
    affinityEffect2() {
    
        let eff = Decimal.pow(1.05, player.s.affinityPoints.plus()).max(0);
 if (hasUpgrade("s",61)) eff = eff.root(2)
 if (player.s.affinityPoints.gte(375)) eff = eff.pow(tmp.s.affEffect2Power)
   if (hasUpgrade("pa",32)) eff = eff.root(2)

    
        return eff;
    },

  affinityHardcap() {
    let hardcap = new Decimal(10)
    return hardcap;
  },
  upgrades: {
    11: {
        title: "Massive Start",
        description: "Completely remove the point rooting, exponent coins resetting exponent points, and you will ALWAYS gain points, regardless if you purchased 'Beginning'.",
                   cost() { return new Decimal(player.si.current=='s' ? "1e12570" : 1) },
        unlocked() {return player.s.unlocked},
       
        style: {'height':'256px','width':'256px'},
       
    },
    12: {
        title: "Inefficient Sectors",
        description: "Keep Incremental Coins upgrade on reset, and base points gain is multiplied by 10.",
          cost() { return new Decimal(player.si.current=='s' ? "1e12571" : 5) },
        unlocked() {return player.s.total.gte(5)},
       
    
       
    },
    13: {
        title: "Partition Spacers",
        description: "Points gain is multiplied based on Willy Cookies, and Cookies gain exponent is added by 0.05.",
              cost() { return new Decimal(player.si.current=='s' ? "2e12572" : 5) },
        unlocked() {return hasUpgrade("s",12)},
        effect() {
                
             
            let eff = player.wi.cookies.plus(1).pow(0.6)
       
                if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(10)
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[13].effect)+"x" },
      
        tooltip() {return "WillyCookies+1<sup>0.6</sup>"},
    
       
    },
    14: {
        title: "Quality of Lification",
        description: "Generate 100% of Poachers, autobuy 'Night Remover', 'Night-night Adder' and 'Orb Points' and Incremental Challenges",
                      cost() { return new Decimal(player.si.current=='s' ? "1e12574" : 10) },
        unlocked() {return hasUpgrade("s",13)},
        
    
       
    },
    15: {
        title: "Decimated",
        description: "Unlock Corruption.",
                    cost() { return new Decimal(player.si.current=='s' ? "1e12577" : 20) },
        unlocked() {return hasUpgrade("s",14)},
       
      
   
    
       
    },
    16: {
        title: "NTFS",
        description: "Partition space now boosts Orbs req decreaser.",
                     cost() { return new Decimal(player.si.current=='s' ? "1e12578" : 20) },
        unlocked() {return hasUpgrade("s",15)},
        effect() {
                
             
            let eff = tmp.s.clickables[11].capacity.plus(1).pow(0.6)
       
                         if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(12.5)
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[16].effect)+"x" },
      
        tooltip() {return "Partition+1<sup>0.6</sup>"},
    },
    21: {
        title: "FAT32",
        description: "Partition space is boosted based on its capacity. Points gain is raised 1.1.",
                cost() { return new Decimal(player.si.current=='s' ? "1e12579" : 25) },
        unlocked() {return hasUpgrade("s",16)},
        effect() {
                
             
            let eff = tmp.s.clickables[11].capacity.plus(1).pow(0.1)
       
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[21].effect)+"x" },
      
        tooltip() {return "Partition+1<sup>0.1</sup>"},
    },
    22: {
        title: "exFAT",
        description: "Cookies mult is now raised 10.",
                      cost() { return new Decimal(player.si.current=='s' ? "1e12581" : 35) },
        unlocked() {return hasUpgrade("s",21)},
  
    },
    23: {
        title: "FAT16",
        description: "Keep Cookie upgrades and unlock new upgrades.",
                      cost() { return new Decimal(player.si.current=='s' ? "2e12581" : 40) },
        unlocked() {return hasUpgrade("s",22)},
  
    },
    24: {
        title: "APFS",
        description: "Unlock a new Poacher buyable.",
              cost() { return new Decimal(player.si.current=='s' ? "5e12581" : 60) },
        unlocked() {return hasUpgrade("s",23)},
  
    },
    25: {
        title: "HFS+",
        description: "Drops the Orbs req exponent by -0.5.",
           cost() { return new Decimal(player.si.current=='s' ? "1e12582" : 80) },
        unlocked() {return hasUpgrade("s",24)},
  
    },
    26: {
        title: "ext4",
        description: "Multiply Sectors gain based on Exponent Coins.",
              cost() { return new Decimal(player.si.current=='s' ? "5e12582" : 240) },
        effect() {
                
             
       let eff = player.ex.points.plus(1).pow(tmp.s.upgrades[26].formula)
           if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(4)
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[26].effect)+"x" },
      formula(){ 
        let formula = new Decimal(0.2)
        if (hasUpgrade("pa",24)) formula = formula.times(10)
            return formula;
      },
        tooltip() {return "ExpCoins+1<sup>0.2</sup>"},
        unlocked() {return hasUpgrade("s",25)},
  
    },
    27: {
        title: "ext3",
        description: "Unlock Sector Buyables.",
            cost() { return new Decimal(player.si.current=='s' ? "1e12607" : 2500) },
       
        unlocked() {return hasUpgrade("s",26)},
  
    },
    31: {
        title: "ext2",
        description: "Keep Poacher buyables on reset and unlock a new Elemental Dimension.",
         cost() { return new Decimal(player.si.current=='s' ? "1e12609" : 6000) },
       
        unlocked() {return hasUpgrade("s",27)},
  
    },
    32: {
        title: "XFS",
        description: "Corruption's effect now boosts Partition space, and base points multiplies Partition space.",
             cost() { return new Decimal(player.si.current=='s' ? "1e13299" : 25000) },
        effect() {
                
             
            let eff = getBasePointGen().plus(1).pow(0.08)
           if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(2)
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[32].effect)+"x" },
      
        tooltip() {return "BasePoint+1<sup>0.08</sup>"},
        unlocked() {return hasUpgrade("s",31)},
  
    },
    33: {
        title: "Btrfs",
        description: "Autobuy Partitions and they cost nothing and Sector exp+0.5",
                 cost() { return new Decimal(player.si.current=='s' ? "1e13302" : 60000) },
      
        unlocked() {return hasUpgrade("s",32)},
  
    },
    34: {
        title: "ReiserFS",
        description: "Willy Cookies now multiply their own gain.",
               cost() { return new Decimal(player.si.current=='s' ? "1e14382" : 1e8) },
        effect() {
                
             
            let eff = player.wi.cookies.plus(1).pow(0.1)
                  if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(2)
         let effSoftcap = new Decimal("1e10000")
    if (eff.gte(effSoftcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(effSoftcap)).pow(2/6)).mul(effSoftcap)
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[34].effect)+"x" },
      
        tooltip() {return "Willy+1<sup>0.1</sup>"},
        unlocked() {return hasUpgrade("s",33)},
  
    },
    35: {
        title: "ISO 9660",
        description: "Unlock Steal TMT's Cheeseburger",
                 cost() { return new Decimal(player.si.current=='s' ? "1e14390" : 7e8) },
   
       
        unlocked() {return hasUpgrade("s",34)}
  
    },
    36: {
        title: "UDF",
        description: "Unlocks a new element and is automated.",
              cost() { return new Decimal(player.si.current=='s' ? "1e15453" : 5e16) },
       
        unlocked() {return hasUpgrade("s",53)}
  
    },
    37: {
        title: "VFAT",
        description: "Exponent Coin generation softcap starts later based on Points.",
           cost() { return new Decimal(player.si.current=='s' ? "1e15454" : 1e17) },
        effect() {
                
             
            if (!hasUpgrade("pa",42)) eff = player.points.add(1).log10().root(3).plus(1)
         if (hasUpgrade("pa",42)) eff = player.points.add(1).log10().plus(1)
          if (hasUpgrade("pa",34)) eff = eff.pow(5)
                       if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(75000)
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[37].effect)+"x" },
      
        tooltip() {return "log10(∛Points)+1"},
       
        unlocked() {return hasUpgrade("s",36)}
  
    },
     41: {
        title: "Cheeseburger Addiction",
        description: "Autobuy Beryllium and Boron",
        cost: new Decimal("1e319"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return inChallenge("s",11)||hasMilestone("truck",10)}
  
    },
   42: {
        title: "Hamburgers",
        description: "Sectors exp+0.5",
       cost() { return new Decimal(player.z.unlocked ? 0 : 2) },
        currencyDisplayName: "catched cheeseburgers",
        currencyInternalName: "catchedBurgers",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",41)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
      43: {
        title: "Hold Big Tide",
        description() { return ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?"Gain thrice as many Cheeseburgers.":"Cheeseburger interval is increased by 0.33 seconds." },
         cost() { return new Decimal(player.z.unlocked ? 0 : 2) },
        currencyDisplayName: "catched cheeseburgers",
        currencyInternalName: "catchedBurgers",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",42)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    44: {
        title: "Big Mac",
        description: "Unlock a new Sector buyable and Exponent Coins gain is increased by x1e12 but only in the challenge.",
        cost: new Decimal("1e330"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",43)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    45: {
        title: "Undisclosure",
        description: "Gain more points based on Exponent Coins but only in the challenge.",
        cost: new Decimal("1e350"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        effect() {
                
             
            let eff = player.ex.points.add(1).pow(5)
            if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) return player.ex.points.add(1).pow(100000)
            if (!inChallenge("s",11)) return new Decimal(1)
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[45].effect)+"x" },
        unlocked() {return hasUpgrade("s",44)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    46: {
        title: "Cheeseburger Nirval",
        description: "Catching Cheeseburger cost increase^^0.8, and unlocks Replicated Cheeseburgers",
        cost: new Decimal("1e354"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",

        unlocked() {return hasUpgrade("s",45)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    51: {
        title: "Autocatcher",
        description: "You will automatically catch TMT's Cheeseburger, and multiply Partition bulk buy by 100.",
        cost: new Decimal("1e355"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",

        unlocked() {return hasUpgrade("s",46)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    52: {
        title: "Genius Sheep",
        description: "While in TMT's Mighty Cheeseburger, Exponent Coins req is reduced even more.",
        cost: new Decimal("1e358"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",

        unlocked() {return hasUpgrade("s",51)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    53: {
        title: "Follow the Midnight Train",
        description: "Unlock Affinity Dimensions.",
        cost: new Decimal("1e370"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",

        unlocked() {return hasUpgrade("s",52)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    54: {
        title: "Exponential Corruption",
        description: "Each Sector upgrade purchased raises Points gain.",
        cost: new Decimal("1e500"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        effectBase() {
            let eff = new Decimal(1.0015)
            if (hasUpgrade("s",96)) eff = eff.add(0.002)
                  if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.add(0.01)
            return eff;
        },
        effect() {
            let eff = Decimal.pow(tmp.s.upgrades[54].effectBase, player.s.upgrades.length);
       
            return eff;
        },
        effectDisplay() { return "^"+format(tmp.s.upgrades[54].effect) },
     
        tooltip() {return "SectorPurchased<sup>1.0015</sup>"} ,
        unlocked() {return hasUpgrade("s",72)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    55: {
        title: "Willy Rootfile",
        description: "Willy Cookies gain is multiplied based on your Base Points.",
        cost: new Decimal("1e530"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        effect() {
                 
            let eff = getBasePointGen().add(1).pow(5e-4)
            if (inChallenge("s",11)) return new Decimal(1)
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[55].effect)+"x" },
     
        tooltip() {return "BasePoints<sup>5e-4</sup>+1"} ,
        unlocked() {return hasUpgrade("s",54)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    56: {
        title: "Cheeseburger Breakdown",
        description: "Cheeseburger Cost is automated, and unlock a new set of Cheeseburger Buyables.",
        cost: new Decimal("1e530"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
      
        unlocked() {return hasUpgrade("s",55)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    61: {
        title: "Affinity Stronger",
        description: "Weakens the second Affinity effect slightly.",
        cost: new Decimal("1e530"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
      
        unlocked() {return hasUpgrade("s",56)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    62: {
        title: "Blue Screen of Death",
        description: "Points gain is also boosted by Affinity's effect.",
        cost: new Decimal("1e540"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
      
        unlocked() {return hasUpgrade("s",61)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    63: {
        title: "Your PC/Device needs to be repaired",
        description: "Unlock Nitrogen.",
        cost: new Decimal("1e1000"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
      
        unlocked() {return hasUpgrade("s",62)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    64: {
        title: "A disk read error occurred",
        description: "Unlock a new Sector buyable.",
        cost: new Decimal("1e1013"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
      
        unlocked() {return hasUpgrade("s",63)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    65: {
        title: "BOOTMGR is missing",
        description: "Points raise their own gain.",
        cost: new Decimal("1e1015"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        effect() {
                 
            let eff = player.points.max(1).add(1).log10().log10().root(32).add(1)
        
          if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.times(5)
            return eff;
        },
        effectDisplay() { return "^"+format(tmp.s.upgrades[65].effect) },
     
        tooltip() {return "log10(log10(√^32 Points))"} ,
        unlocked() {return hasUpgrade("s",64)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    66: {
        title: "BOOTMGR is compressed",
        description: "Base Point Adder's effect is now increased based on Sectors.",
        cost: new Decimal("1e1015"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        effect() {
                 
            let eff = player.s.points.add(1).pow(0.1)
        
                   if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(100)
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[66].effect)+"x" },
     
        tooltip() {return "Sectors<sup>0.1</sup>+1"} ,
        unlocked() {return hasUpgrade("s",65)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    71: {
        title: "NFS",
        description: "Boost Sectors gain based on points in TMT's Cheeseburger.",
                  cost() { return new Decimal(player.si.current=='s' ? "1e15455" : 1e17) },
        effect() {
                
             
            let eff = player.s.pointsInCheeseburger.add(1).log10().add(1)
                if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(500)
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[71].effect)+"x" },
      
        tooltip() {return "log10(PointsIn🍔)+1"},
       
        unlocked() {return hasUpgrade("s",37)}
  
    },
    72: {
        title: "SMB",
        description: "Unlock second Partition.",
                          cost() { return new Decimal(player.si.current=='s' ? "1e16426" : 1e19) },
      
       
        unlocked() {return hasUpgrade("s",71)}
  
    },
     73: {
        title: "CIFS",
        description: "Raise the powerful softcap in TMT's Mighty Cheeseburger by 1e100x.",
        cost: new Decimal("1e370"),
      
       
        unlocked() {return hasUpgrade("c",56)}
  
    },
      74: {
        title: "AFS",
        description: " Affinity's effect now starts Points softcap later at a reduced rate.",
        cost: new Decimal("1e370"),
      
       
        unlocked() {return hasUpgrade("s",73)}
  
    },
       75: {
        title: "F2FS",
        description: "Tesseract softcaps for Points Multiplier and Exponent Points Multiplier.",
        cost: new Decimal("1e423"),
      
       
        unlocked() {return hasUpgrade("s",74)}
  
    },
       76: {
        title: "YAFFS",
        description: "Points Multiplier now boosts the first 4 Cookie Upgrades that increase Ascension gain.",
        cost: new Decimal("1e424"),
      
         effect() {
                
             
            let eff = tmp.ex.upgrades[12].effect.add(1).log10().add(1)
               if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(1.1)
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[76].effect)+"x" },
      
        tooltip() {return "log10(PointsMulti)+1"},
        unlocked() {return hasUpgrade("s",75)}
  
    },
     77: {
        title: "JFFS2",
        description: "Remove all cost scalings of Corruption except for the cost scaling on 23th Corruption.",
        cost: new Decimal("1e504"),
      
        unlocked() {return hasUpgrade("s",76)}
  
    },
     81: {
        title: "UBIFS",
        description: "Nightadding Booster's effect is multiplied by Exponent Coins.",
        cost: new Decimal("1e507"),
       effect() {
                
             
            let eff = player.ex.points.add(1).log(35)
       
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[81].effect)+"x" },
      
        tooltip() {return "log35(ExpCoins)+1"},
        unlocked() {return hasUpgrade("s",77)}
  
    },
     82: {
        title: "ZFS",
        description: "While on The Wrath of Motherboard Speaker challenge, raise points by 1.25 and increase exponents of Incremental Coins by 50%.",
        cost: new Decimal("1e507"),
     
      
 
        unlocked() {return hasUpgrade("s",81)}
  
    },
     83: {
        title: "ReFS",
        description: "While on The Wrath of Motherboard Speaker challenge, raise points based on Points.",
        cost: new Decimal("1e507"),
     
        effect() {
                
             
            let eff = player.points.add(1).log10().pow(0.25).add(1)
       
         
            return eff;
        },
        effectDisplay() { return "^"+format(tmp.s.upgrades[83].effect)+(inChallenge("pa",12)?"":" (DISABLED)") },
      
        tooltip() {return "log10(Points<sup>0.25</sup>)+1"},

        unlocked() {return hasUpgrade("s",82)}
  
    },
      84: {
        title: "IBM GPFS",
        description: "While on The Wrath of Motherboard Speaker challenge, raise points based on Poachers.",
        cost: new Decimal("1e507"),
     
        effect() {
                
             
            let eff = player.p.points.add(1).log10().pow(0.11).add(1)
       
         
            return eff;
        },
        effectDisplay() { return "^"+format(tmp.s.upgrades[84].effect)+(inChallenge("pa",12)?"":" (DISABLED)") },
      
        tooltip() {return "log10(Poachers<sup>0.11</sup>)+1"},

        unlocked() {return hasUpgrade("s",83)}
  
    },
      85: {
        title: "HFS",
        description: "Increase Affinity gain by 100.",
        cost: new Decimal("1e612"),
     

        unlocked() {return hasUpgrade("s",84)}
  
    },
      86: {
        title: "MS-DOS FAT12",
        description: "Oxygen's formula is better, and points softcap in TMT's Mighty Cheeseburger starts ^1.05 later.",
        cost: new Decimal("1e722"),
     
        tooltip() {return "1.01<sup>x</sup><sup>1.01</sup> --> 1.03<sup>x</sup><sup>1.03</sup>"},
        unlocked() {return hasUpgrade("s",85)}
  
    },
       87: {
        title: "BeFS",
        description: "Pashtocha Points multiply Points gain in TWoBSwWNBU.",
        cost: new Decimal("1e723"),
       effect() {
                
             
            let eff = player.pa.points.add(1).log10().add(1).pow(0.5).add(1)
       
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[87].effect)+"x" },
        tooltip() {return "log10(PashtochaPoints<sup>0.5</sup>+1)+1"},
        unlocked() {return hasUpgrade("s",86)}
  
    },
    91: {
        title: "NTLDR is missing",
        description: "Unlock Further-Exponent, and autobuy Partition II and its incrementing is increased based on your Sectors.",
        cost: new Decimal("1e1019"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        effect() {
                 
            let eff = player.s.points.add(1).pow(0.3)
        
            if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(10)
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[91].effect)+"x" },
     
        tooltip() {return "Sectors<sup>0.3</sup>+1"} ,
        unlocked() {return hasUpgrade("s",66)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    92: {
        title: "NTLDR is compressed",
        description: "Catched cheeeseburger bulk is increased to 10.",
        cost: new Decimal("1e1027"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
    
        unlocked() {return hasUpgrade("s",91)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    93: {
        title: "An operating system wasn't found",
        description: "Points is raised 1.5 in Steal TMT's Cheeseburger.",
        cost: new Decimal("1e1030"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
    
        unlocked() {return hasUpgrade("s",92)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    94: {
        title: "Non-System disk or disk error",
        description: "Cost base for Further-Exponent Points gen is reduced based on Points in Cheeseburger, and generate 100% of Sectors per second.",
        cost: new Decimal("1e1547"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        cap() {let cap = new Decimal(4.76)
      if (!hasUpgrade("pa",43)) return cap = new Decimal(10e9)
        return cap;},
        effect() {
                 
            let eff = player.s.pointsInCheeseburger.log10().root(8).add(1).min(tmp.s.upgrades[this.id].cap);
        
           if (hasUpgrade("pa",43)) eff = eff.pow(2)
            return eff;
        },
        effectDisplay() { return "/"+format(tmp.s.upgrades[94].effect)+(tmp.s.upgrades[94].effect.gte(tmp.s.upgrades[this.id].cap)?" (HARDCAPPED)":"") },
        tooltip() {return "log10(√^8(PointsInCheeseburger))+1"} ,
        unlocked() {return hasUpgrade("s",93)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    95: {
        title: "Invalid partition table",
        description: "Cheeseburger Points softcap starts later based on Points in Cheeseburger.",
        cost: new Decimal("1e1550"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
  
        effect() {
                 
            let eff = player.s.pointsInCheeseburger.add(1).log10().add(1).pow(0.02).add(1)
        
         
            return eff;
        },
        effectDisplay() { return "^"+format(tmp.s.upgrades[95].effect) },
        tooltip() {return "log10(PointsInCheeseburger<sup>0.02</sup>)"} ,
        unlocked() {return hasUpgrade("s",94)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    96: {
        title: "Error loading operating system",
        description: "Add 0.002 to 'Exponential Corruption' base effect.",
        cost: new Decimal("1e1791"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",95)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    101: {
        title: "Missing operating system",
        description: "Points gain is raised by another 1.5 in Steal TMT's Cheeseburger, but 1.1 outside.",
        cost: new Decimal("1e1799"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",96)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    102: {
        title: "Operating System not found",
        description: "Unlock a new row of Cheeseburger upgrades.",
        cost: new Decimal("1e2725"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",101)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
     103: {
        title: "Disk error",
        description: "Unlock a new Poacher buyable, is automated and Poachers multiply their own gain.",
        cost: new Decimal("1e4500"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
         effect() {
                 
            let eff = player.p.points.add(1).pow(0.02)
        
            if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(1.4333)
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[103].effect)+"x" },
        tooltip() {return "Poachers<sup>0.02</sup>+1"} ,
        unlocked() {return hasMilestone("pa",7)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
     104: {
        title: "Remove disks or other media",
        description: "Raise points by 1.05 while trucking up.",
        cost: new Decimal("1e5100"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        
        unlocked() {return hasMilestone("pa",7)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
      105: {
        title: "Reboot and Select Proper Boot Device",
        description: "Triple Pashtocha gains and unlock a new set of Cookie upgrades.",
        cost: new Decimal("1e5700"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        
        unlocked() {return hasMilestone("pa",7)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
     106: {
        title: "DISK BOOT FAILURE - INSERT SYSTEM DISK AND PRESS ENTER",
        description: "Orbs multiply Pashtocha gain.",
        cost: new Decimal("1e6900"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
                 effect() {
                 
            let eff = player.o.points.pow(0.5).add(1)
        
                 
            if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(10)
            return eff;
        },
        effectDisplay() { return +format(tmp.s.upgrades[106].effect)+"x" },
        tooltip() {return "Orbs<sup>0.5</sup>+1"} ,
        unlocked() {return hasMilestone("pa",7)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    47: {
        title: "Intel",
        description: "Raise Points by 1.1.",
        cost: new Decimal("1e2727"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",102)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    57: {
        title: "AMD",
        description: "Raise Points by another 1.1.",
        cost: new Decimal("1e3007"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",102)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    67: {
        title: "Nvidia",
        description: "Raise Points by yet another 1.1.",
        cost: new Decimal("1e3320"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",102)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    97: {
        title: "Qualcomm",
        description: "Raise Points by fourth another 1.1 and unlock Pashtocha.",
        cost: new Decimal("1e3667"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",102)&&(inChallenge("s",11)||hasMilestone("truck",10))}
  
    },
    /*
    
     99999: {
        title: "T H E  W R A T H  O F  S A G I T T A R I U S",
        description: "I T ' S  T H E  W R A T H  O F  S A G I T T A R I U S . X 9 9 9 9 9  S E C T O R S  G A I N  B U T  T H E R E  I S  A  S O F T C A P  A T E 9 9 9 9 9 9 9 9 9 .",
        cost: new Decimal(-1),
        unlocked() {return cheeseburger},
  
    },
    */
  },
  clickables: {
    11: {
        title() {return "Partition"},
        baseCost() {
            return new Decimal(1)
        },
        cost() {
              let cost = this.baseCost()
              if (player.s.expansion.gte(1)) cost = cost.times(player.s.expansion).max(1).add(1)
              return cost.times(player.s.expansion.add(1));

        },
        canClick() {
            return player.s.points.gte(this.cost())
        },
 increments() {
    let increment = new Decimal(1)
  if (hasUpgrade("wi",22)) increment = increment.times(100)
    if (hasUpgrade("s",51)) increment = increment.times(100)
        if (hasUpgrade("s",72)) increment = increment.times(tmp.s.clickables[41].effect)
             if (hasUpgrade("wi",26)) increment = increment.pow(tmp.p.buyables[21].effect.first)
                if (player.s.amd.gte(5)) increment = increment.pow(tmp.s.k6Effect)
    return increment
 },
        onClick() {
      if (!hasUpgrade("s",33))  player.s.points = player.s.points.sub(this.cost())
       
        player.s.expansion = player.s.expansion.add(tmp.s.clickables[11].increments)
        },

       
        display() {return "Cost: "+format(this.cost())+" sectors<br>Current capacity: "+format(tmp.s.clickables[11].capacity)+" bytes.<br>Amount of expansion: "+format(player.s.expansion)+"."},
        capacity() {
           let partition = new Decimal(10).times(player.s.expansion.times(2.5)).add(1).max(1)
           if (hasUpgrade("c",51)) partition = partition.add(upgradeEffect("c",51))

        if (hasUpgrade("s",21)) partition = partition.times(upgradeEffect("s",21))

            if (hasUpgrade("c",71)) partition = partition.times(8)
                if (hasUpgrade("s",32)) partition = partition.times(upgradeEffect("s",32))
                    
                    
            if (hasUpgrade("s",32)) partition = partition.times(tmp.s.corruptEffect)

        if (getBuyableAmount("p",15).gte(1)) partition = partition.times(tmp.p.buyables[15].effect.first)

            if (hasUpgrade("s",72)) partition = partition.times(tmp.s.clickables[41].effect)
                  if (hasUpgrade("pa",47)) partition = partition.times(tmp.s.clickables[42].effect)
                  if (hasUpgrade("truck",46)) partition = partition.times(tmp.s.clickables[43].effect)

                                     if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) partition = partition.pow(2.5)
           return partition;

        },
       
    },
    12: {
        title() {return "Corrupt Data"},
        baseCost() {
            let base = new Decimal(75)
       if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) base = base.sub(10)
            return base;
        },
        cost() {
              let cost = this.baseCost()
              if (player.s.corruption.gte(1)) cost = cost.times(player.s.corruption).max(1).add(1)
            if (player.s.corruption.gte(4)&&!hasUpgrade("s",77)) cost = cost.times(player.s.corruption.pow(1.5)).max(1).add(1)

            if (player.s.corruption.gte(10)&&!hasUpgrade("s",77)) cost = cost.times(player.s.corruption.pow(player.s.corruption.div(10).max(1))).max(1).add(1)
                
            if (player.s.corruption.gte(18)&&!hasUpgrade("s",77)) cost = cost.times(player.s.corruption.pow(player.s.corruption.div(5).max(1).pow(player.s.corruption.sub(17).div(20)))).max(1).add(1)
                if (player.s.corruption.gte(23)) cost = cost.times(player.s.corruption.pow(player.s.corruption.div(5).max(1).pow(player.s.corruption.sub(22).div(5)))).max(1).add(1)
            if (player.pa.unlocked) cost = cost.root(tmp.s.pentiumEffect)
                    return cost.times(player.s.corruption.add(1));

        },
        canClick() {
            return tmp[this.layer].clickables[11].capacity.gte(this.cost())
        },
        increment() {
            let increment = new Decimal(1)
            if (hasMilestone("truck",9)) increment = increment.times(3)
                return increment;
        },
        onClick() {
        player.s.expansion = new Decimal(0)
       
        player.s.corruption = player.s.corruption.add(tmp.s.clickables[12].increment)
       if (!hasAchievement("ach",54)) doReset("s",true)
        },

        style: {'height':'196px','width':'196px'},
        display() {return "Cost: "+format(this.cost())+" bytes in partition sectors <br>Current capacity: "+format(tmp.s.clickables[11].capacity)+" bytes.<br>Amount of corruption: "+player.s.corruption+".<br>(forces a row 3 reset)"},
        
       
    },
    21: {
        title() {return "Catch Cheeseburger"},
        baseCost() {
            return new Decimal(1).add(1).pow(player.s.time.add(1).times(player.s.time.add(1)))
        },
        cost() {
              let cost = this.baseCost()
              if (hasUpgrade("s",46)) cost = cost.tetrate(0.8)
                if (hasUpgrade("s",46)) cost = cost.tetrate(tmp.s.clickables[31].effect)
              return cost.tetrate(player.s.catchedBurgers.div(5).add(1));

        },
        canClick() {
            return player.points.gte(this.cost())
        },
        increment() { 
            let increment = new Decimal(1)
           if (hasUpgrade("s",92)) increment = increment.times(10)
            return increment;
        },
        onClick() {
  
       
        player.s.catchedBurgers = player.s.catchedBurgers.add(this.increment())
       
        },
        unlocked() {return inChallenge("s",11)},
        style: {'height':'196px','width':'196px'},
        display() {return "Req: "+format(this.cost())+" points.<br><br>When catching a cheeseburger, the cost needed to catch another cheeseburger tetrates."},
        
       
    },
    31: {
        title() {return "Cheeseburger Cost"},
        cost() {
              let cost = new Decimal("1e350")
              if (player.s.cheeseburgerCostPur.gte(80)) cost = cost.pow(player.s.cheeseburgerCostPur.add(1).div(50).times(player.s.cheeseburgerCostPur.sub(79)))
              return cost.times(player.s.cheeseburgerCostPur.pow(100).add(1));

        },
       
        canClick() {
            return player.points.gte(this.cost())
        },

        onClick() {
  
       
        player.s.cheeseburgerCostPur = player.s.cheeseburgerCostPur.add(1)
       
        },
        effect() {
            let eff = new Decimal(1).div(player.s.cheeseburgerCostPur.div(5).add(1))
            if (player.s.cheeseburgerCostPur.gte(80)) eff = eff.div(player.s.cheeseburgerCostPur.sub(79).times(2))
            return eff;
        },
        unlocked() {return inChallenge("s",11)&&hasUpgrade("s",46)},
        style: {'height':'64px','width':'185px'},
        display() {return "Req: "+format(this.cost())+" points.<br><br>Reduces catching cheeseburger req.<br>Effect: ^^"+format(tmp.s.clickables[this.id].effect)+"."},
        
       
    },
    32: {
        title() {return "Cheeseburger Interval"},
        cost() {
              let cost = new Decimal("1e580")
              if (player.s.cheeseburgerCostPur2.gte(20)) cost = cost.pow(player.s.cheeseburgerCostPur2.add(1).div(50).times(player.s.cheeseburgerCostPur2.sub(19)))
              return cost.times(player.s.cheeseburgerCostPur2.pow(25).add(1));

        },
       
        canClick() {
            return player.points.gte(this.cost())
        },

        onClick() {
  
       
        player.s.cheeseburgerCostPur2 = player.s.cheeseburgerCostPur2.add(1)
       
        },
        effect() {
            let eff = new Decimal(0).add(player.s.cheeseburgerCostPur2.div(3))
          
            return eff;
        },
        unlocked() {return inChallenge("s",11)&&hasUpgrade("s",56)},
        style: {'height':'64px','width':'185px'},
        display() {return "Req: "+format(this.cost())+" points.<br><br>Increases Cheeseburger interval<br>Effect: +"+format(tmp.s.clickables[this.id].effect)+"s."},
        
       
    },
    33: {
        title() {return "Cheeseburger Start"},
        cost() {
              let cost = new Decimal("1e580")
              if (player.s.cheeseburgerCostPur3.gte(20)) cost = cost.pow(player.s.cheeseburgerCostPur3.add(1).div(50).times(player.s.cheeseburgerCostPur3.sub(19)))
              return cost.times(player.s.cheeseburgerCostPur3.pow(35).add(1));

        },
       
        canClick() {
            return player.points.gte(this.cost())
        },

        onClick() {
  
       
        player.s.cheeseburgerCostPur3 = player.s.cheeseburgerCostPur3.add(1)
       
        },
        effect() {
            if (!hasMilestone("truck",11)) eff = new Decimal(0).add(player.s.cheeseburgerCostPur3.times(2))
                      if (hasMilestone("truck",11)) eff = new Decimal(0).add(player.s.cheeseburgerCostPur3.pow(5).times(tmp[this.layer].clickables[this.id].baseEffectFormula.add(player.s.cheeseburgers.add(1).div(100))))
            return eff;
        },
        baseEffectFormula() {return new Decimal(2.25)},
        unlocked() {return (inChallenge("s",11)||hasMilestone("truck",10))&&hasUpgrade("s",56)},
        style: {'height':'64px','width':'185px'},
        display() {return "Req: "+format(this.cost())+" points.<br><br>Add Cheeseburger's effect<br>Effect: +"+format(tmp.s.clickables[this.id].effect)+"."},
        
       
    },
    41: {
        title() {return "Partition II"},
        baseCost() {
            return new Decimal(1e18)
        },
        cost() {
              let cost = this.baseCost()
              if (player.s.expansionII.gte(15)) cost = cost.times(player.s.expansionII).max(1).add(1)
              return cost.times(player.s.expansionII.times(1e10).add(1));

        },
        canClick() {
            return player.s.points.gte(this.cost())
        },
 increments() {
    let increment = new Decimal(1)
    if (hasUpgrade("s",91)) increment = increment.times(upgradeEffect("s",91))
         if (hasUpgrade("wi",26)) increment = increment.pow(tmp.p.buyables[21].effect.first)
                    if (player.s.amd.gte(5)) increment = increment.pow(tmp.s.k6Effect)
    return increment
 },
        onClick() {
     player.s.points = player.s.points.sub(this.cost())
       
        player.s.expansionII = player.s.expansionII.add(tmp.s.clickables[41].increments)
        },
   unlocked() {return hasUpgrade("s",72)},
       
        display() {return "Cost: "+format(this.cost())+" sectors<br>Increases capacity and increment of previous partition by x"+format(tmp.s.clickables[41].effect)+" bytes.<br>Amount of expansion: "+format(player.s.expansionII)+"."},
       effect() {
           let partition = new Decimal(100).times(player.s.expansionII.times(15)).add(1).max(1)
         if (hasUpgrade("pa",47)) partition = partition.times(tmp.s.clickables[42].effect)
           return partition;

        },
       
    },
    42: {
        title() {return "Partition III"},
        baseCost() {
            return new Decimal(1e240)
        },
        cost() {
              let cost = this.baseCost()
          
              return cost.times(player.s.expansionIII.times(1e10).add(1));

        },
        canClick() {
            return player.s.points.gte(this.cost())
        },
 increments() {
    let increment = new Decimal(2)
 if (hasUpgrade("wi",26)) increment = increment.pow(tmp.p.buyables[21].effect.first)
            if (player.s.amd.gte(5)) increment = increment.pow(tmp.s.k6Effect)

                    if (hasUpgrade("truck",46)) increment = increment.times(tmp.s.clickables[43].effect)
    return increment
 },
        onClick() {
     player.s.points = player.s.points.sub(this.cost())
       
        player.s.expansionIII = player.s.expansionIII.add(tmp.s.clickables[42].increments)
        },
   unlocked() {return hasUpgrade("pa",47)},
       
        display() {return "Cost: "+format(this.cost())+" sectors<br>Increases capacity and increment of previous partitions by x"+format(tmp.s.clickables[42].effect)+" bytes.<br>Amount of expansion: "+format(player.s.expansionIII)+"."},
       effect() {
           let partition = new Decimal(1e10).times(player.s.expansionIII.times(145)).add(1).max(1)
            if (hasUpgrade("truck",46)) partition = partition.times(tmp.s.clickables[43].effect)
           return partition;

        },
       
    },
     43: {
        title() {return "Partition IV"+(player.s.partitionTable =="MBR"?" (Extended Partition)":"")},
        baseCost() {
            return new Decimal("1e14800")
        },
        cost() {
              let cost = this.baseCost()
          
              return cost.times(player.s.expansionIV.times(1e25).add(1));

        },
        canClick() {
            return player.s.points.gte(this.cost())
        },
 increments() {
    let increment = new Decimal(2)
    return increment
 },
        onClick() {
     player.s.points = player.s.points.sub(this.cost())
       
        player.s.expansionIV = player.s.expansionIV.add(tmp.s.clickables[43].increments)
        },
   unlocked() {return hasUpgrade("truck",46)},
       
        display() {return "Cost: "+format(this.cost())+" sectors<br>Increases capacity and increment of previous partitions by x"+format(tmp.s.clickables[43].effect)+" bytes.<br>Amount of expansion: "+format(player.s.expansionIV)+"."},
       effect() {
           let partition = new Decimal("1e3000").times(player.s.expansionIV.times(1e15)).add(1).max(1)
        
           return partition;

        },
       
    },
    51: {
        title() {return "Upgrade Intel CPU Type"},
        
        cost() {
              let cost = [10000,1e16,1e60,1e100,1e115,1e165,1e199,1e264,"1.80e308","1e800","1e1200","1e1700","1e6003","1e30003","1e84000","1e311000","1e1.6e6","1e2.7e8","1e3.1e10"]
              let x = new Decimal(player.s.intel)
              return new Decimal(cost[x])

        },
        canClick() {
            return player.s.points.gte(this.cost())
        },
         type() {
            let type = ["Pentium","Pentium Pro","Pentium II","Celeron","Xeon","Pentium III","Pentium 4","Itanium","Pentium M","Pentium D","Core","Core 2","Atom","Core i","Core i3","Core i5","Core i7","Core i9","Core Ultra"]
            let x = new Decimal(player.s.intel)
              return type[x]
         },
        onClick() {
     player.s.points = player.s.points.sub(this.cost())
       
        player.s.intel = player.s.intel.add(1)
        },

       
        display() {return "Cost: "+format(this.cost())+" sectors<br>Upgrades CPU type to improve/add benefits.<br><br>Current Intel CPU type: "+tmp.s.clickables[51].type+""},
    
       
    },
      52: {
        title() {return "Upgrade AMD CPU Type"},
        
        cost() {
              let cost = [1e141,1e170,1e250,"1e400","1e800","1e1500","1e5000","1e9000","1e30003","1e54000","1e262000","1e2.2e6","1e3.14e6","1e1.85e7","1e1.3e8","1e6.5e8","1e1e11","1e1e13","1e1e16","1e1e19","1e1e25","1e1e30","1e1e35","1e1e44","1e1e57","1e1e123","1e1e303"]
              let x = new Decimal(player.s.amd)
              return new Decimal(cost[x])

        },
        canClick() {
            return player.s.points.gte(this.cost())
        },
         type() {
            let type = ["Am9080","Am286","Am386","Am486","K5","K6","K6-2/3","Athlon (K7)","Duron","Athlon XP","Athlon 64","Opteron","Sempron","Athlon 64 X2","Phenom","Phenom II","Bulldozer (FX-Series)","Piledriver","Steamroller","Excavator","Ryzen (Zen)","Threadripper","EPYC","Zen+","Zen 2","Zen 3","Zen 4","Zen 5"]
            let x = new Decimal(player.s.amd)
              return type[x]
         },
        onClick() {
     player.s.points = player.s.points.sub(this.cost())
       
        player.s.amd = player.s.amd.add(1)
        },
  unlocked() {return hasChallenge("pa",11)},
       
        display() {return "Cost: "+format(this.cost())+" sectors<br>Upgrades CPU type to improve/add benefits.<br><br>Current AMD CPU type: "+tmp.s.clickables[52].type+""},
    
       
    },
    61: {
        title() {return "Unlock New Further-Layer"},
        
        cost() {
              let cost = ["1e607","1e2100","1e16400","1e109350","e1.6e6","e4e20","e5.1e20"]
              let x = new Decimal(player.s.furtherLayers)
              return new Decimal(cost[x])

        },
        canClick() {
            return player.s.points.gte(this.cost())
        },
         type() {
            let type = ["N/A","Further-Incremental Coins","Further-Orbs","Further-Poachers","Further-Cookies","Further-Sectors","Further-Willy Cookies","Further-Pashtocha","Further-Time Rider","Further-Zombie","Further-Skull Internet"]
            let x = new Decimal(player.s.furtherLayers)
              return type[x]
         },
        onClick() {
     player.s.points = player.s.points.sub(this.cost())
       
        player.s.furtherLayers = player.s.furtherLayers.add(1)
        },

       
        display() {return "Cost: "+format(this.cost())+" sectors<br>Unlocks a new Further layer.<br><br>Latest layer unlocked: "+tmp.s.clickables[61].type+""},
    
       
    },
       101: {
        title() {return "Upgrade Partition Table"},
        baseCost() {
            return new Decimal("1e50000")
        },
        cost() {
              let cost = this.baseCost()
          
              return cost;

        },
        canClick() {
            return player.s.points.gte(this.cost())
        },

        onClick() {
     player.s.points = player.s.points.sub(this.cost())
       
    player.s.partitionTable == "GPT"
        },
   unlocked() {return hasUpgrade("truck",46)},
       
        display() {return "Cost: "+format(this.cost())+" sectors<br>Upgrades partition table to GPT and unlocks Further-Partitions. Partition IV is no longer an extended partition and incrementing is increased by its own effect."},
       
       
    },
}
})

addLayer("c", {
    name: "cookie", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
            image() { if (player.si.mastered.includes("c")) return "images/Skelet-Cookies.png"},
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        prestigeLevel: new Decimal(0),
        heavenlyChips: new Decimal(0),
    }},
    color: "yellow",
    requires: new Decimal(165), // Can be a function that takes requirement increases into account
    resource: "cookies", // Name of prestige currency
    baseResource: "exponent coins", // Name of resource prestige is based on
    baseAmount() {return player.ex.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 100,// Prestige currency exponent
   
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
           	if (inChallenge("pa",12)) return new Decimal(0)
             if (inChallenge("pa",11)) return new Decimal(1)
        if (player.truck.inTrucking.gte(1)) return new Decimal(0)
        if (inChallenge("s",11)) return new Decimal(1).times(tmp.s.cheeseburgerEff) 
       if (hasUpgrade("c",52)) mult = mult.times(upgradeEffect("c",52))
        if (hasUpgrade("s",22)) mult = mult.pow(10)
            if (hasUpgrade("c",54)) mult = mult.times(upgradeEffect("c",54))
                if (hasAchievement("ach",41)) mult = mult.times(100)

                    if (player.c.prestigeLevel.gte(1)) mult = mult.times(tmp.c.effect)
        return mult
    },

    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade("s",13)) exp = exp.add(0.05)

        return exp
    },
       autoUpgrade() {return player.z.unlocked&&player.si.current==null},
    directMult() {
        mult = new Decimal(1)
        if (hasUpgrade("c",51)) mult = mult.add(tmp.s.clickables[11].capacity)
        return mult
    },
   onPrestige() {
 player.ex.points = new Decimal(0)
 player.ex.expPoints = new Decimal(0)

   },
   passiveGeneration() { 
    let passive = new Decimal(0)

    if (hasUpgrade("wi",12)||player.si.unlocked) passive = passive.add(upgradeEffect("wi",12).div(100))
    return passive; },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    branches: [["ex",2]],
    hotkeys: [
        {
            key:"c", description: "C: Reset for cookies", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
    baseEff() {
        let eff = new Decimal(1.2)


        return eff;
          },
            effect() {
         if (!player.c.prestigeLevel.gte(1)) return new Decimal(1)
                let eff = Decimal.pow(this.baseEff(), player.c.prestigeLevel.plus()).max(0);
     let softcap = new Decimal(tmp.c.cookieSoftcap)
    if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(3/6)).mul(softcap)

          let softcap2 = new Decimal(tmp.c.cookieSoftcap2)
    if (eff.gte(softcap2)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap2)).pow(2/6)).mul(softcap2)

           let softcap3 = new Decimal(tmp.c.cookieSoftcap3)
    if (eff.gte(softcap3)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap3)).pow(2/6)).mul(softcap3)
            let softcap4 = new Decimal(tmp.c.cookieSoftcap4)
    if (eff.gte(softcap4)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap4)).pow(2/6)).mul(softcap4)
                return eff;
            },
 
     cookieSoftcap() {
        let softcap = new Decimal(Number.MAX_VALUE);
        return softcap;
     },

   cookieSoftcap2() {
        let softcap = new Decimal("1e700");
        return softcap;
     },
       cookieSoftcap3() {
        let softcap = new Decimal("1e1200");
        return softcap;
     },
         cookieSoftcap4() {
        let softcap = new Decimal("1e4600");
        return softcap;
     },
    generation() {
        let gen = new Decimal(0.05)

        return gen;
    },
     update(diff) {
        if (hasUpgrade("c",17)||player.si.unlocked) { 
        player.c.heavenlyChips = player.c.heavenlyChips.add(tmp.c.clickables[11].gain.times(tmp.c.generation))
 player.c.prestigeLevel = player.c.prestigeLevel.add(tmp.c.clickables[11].gain.times(tmp.c.generation))
        }
     },
    doReset(resettingLayer) {
        let keep = [];
    
 
        if (resettingLayer=="o")   keep.push("points")
            if (resettingLayer=="o")    keep.push("upgrades")
                if (resettingLayer=="ic")   keep.push("points")
                    if (resettingLayer=="ic")    keep.push("upgrades")
                        if (resettingLayer=="p")   keep.push("points")
                            if (resettingLayer=="p")    keep.push("upgrades")

          if (hasUpgrade("s",23)) keep.push("upgrades")

            if (hasMilestone("pa",2)) keep.push("upgrades")

                if (player.si.unlocked) keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("c", keep)
    },

    layerShown(){return player.p.unlocked},
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "blank", 
        ["display-text", function() { return "Your Prestige Level is <h2>"+format(player.c.prestigeLevel)+"</h2>, which multiplies Cookie gain by "+format(tmp.c.effect)+".</h2>"+(tmp.c.effect.gte(Number.MAX_VALUE)?" (SOFTCAPPED":"")+(tmp.c.effect.gte("1e700")&&!tmp.c.effect.gte("1e1200")?"^2":"")+(tmp.c.effect.gte("1e1200")&&!tmp.c.effect.gte("1e4600")?"^3":"")+(tmp.c.effect.gte("1e4600")?"^4":"")+(tmp.c.effect.gte(Number.MAX_VALUE)?")":"") }],
 "clickables",
  ["display-text", function() { return "You have "+format(player.c.heavenlyChips)+" Heavenly Chips." }],
 "upgrades",

    ],
    upgrades: {
        11: {
            title: "Cookie Cursor",
            description: "'Points Multiplier' softcap starts later based on your Exponent Points.",
       cost() { return new Decimal(player.si.current=='c' ? "1e672" : 10) },
            unlocked() {return player.c.unlocked},
               softcapStart() {let start = new Decimal("1e12000")
 if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) start = start.pow(25)
            return start;
           },
            effect() {
                

                let eff = player.ex.expPoints.plus(1).pow(0.001);
                if (hasUpgrade("c",61)) eff = eff.times(upgradeEffect("c",61))
              if (hasUpgrade("c",25)) eff = eff.times(upgradeEffect("c",25))
                     let softcap = new Decimal(tmp.c.upgrades[this.id].softcapStart)
              if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(4/6)).mul(softcap)
                return eff;
            },
            tooltip() {return "ExpPoint+1^0.001"} ,
            effectDisplay() { return format(tmp.c.upgrades[11].effect)+"x"+(tmp.c.upgrades[11].effect.gte(tmp.c.upgrades[this.id].softcapStart)?" (SOFTCAPPED)":"") },
        },
        21: {
            title: "Cookie Grandma",
            description: "Multiply base point gain based on Points.",
       cost() { return new Decimal(player.si.current=='c' ? "1e673" : 200) },
            unlocked() {return hasUpgrade("c",12)},
            softcapStart() {return new Decimal("1e4e6")},
            effect() {
                
if (inChallenge("s",11)) return new Decimal(1)
                let eff = player.points.plus(1).pow(0.001);
                if (hasUpgrade("wi",11)) eff = eff.times(upgradeEffect("wi",11))   
                         if (hasUpgrade("c",26)) eff = eff.times(upgradeEffect("c",26))
                             if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(10)
                  let softcap = new Decimal(tmp.c.upgrades[this.id].softcapStart)
              if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(2/6)).mul(softcap)
                                
                return eff;
            },
                   tooltip() {return "Points+1^0.001"},
            effectDisplay() { return format(tmp.c.upgrades[21].effect)+"x"+(tmp.c.upgrades[21].effect.gte("1e4e6") ? " (SOFTCAPPED)":"") },
          
        },
       22: {
            title: "Cookie Farm",
            description: "Multiply base point gain based on Exponent Points.",
              cost() { return new Decimal(player.si.current=='c' ? "1e673" : 750) },
            unlocked() {return hasUpgrade("c",12)},
                    softcapStart() {return new Decimal("1e4e6")},
            effect() {
                
                if (inChallenge("s",11)) return new Decimal(1)
                let eff = player.ex.expPoints.plus(1).pow(0.005);
                            if (hasUpgrade("c",27)) eff = eff.times(upgradeEffect("c",27))
                        if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(2)
                                  let softcap = new Decimal(tmp.c.upgrades[this.id].softcapStart)
              if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(2/6)).mul(softcap)
                return eff;
            },
                   tooltip() {return "ExpPoints+1^0.005"},
            effectDisplay() { return format(tmp.c.upgrades[22].effect)+"x"+(tmp.c.upgrades[22].effect.gte("1e4e6") ? " (SOFTCAPPED)":"") },
          
        },
        23: {
            title: "Cookie Mine",
            description: "Incremental Coin gain is multiplied by your current Base Point.",
                 cost() { return new Decimal(player.si.current=='c' ? "1e673" : 15e3) },
            unlocked() {return hasUpgrade("c",12)},
            softcapStart() {return new Decimal("1e2500000")},
         softcapSquaredStart() {return new Decimal("1e3200000")},
                       effect() {
                

                let eff = getBasePointGen().plus(1)
                
                         if (hasUpgrade("c",32)) eff = eff.times(upgradeEffect("c",32))

                              let softcap = new Decimal(tmp.c.upgrades[this.id].softcapStart)
              if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(3/6)).mul(softcap)
                                        if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(1.25)

                                                            let softcap2 = new Decimal(tmp.c.upgrades[this.id].softcapSquaredStart)
              if (eff.gte(softcap2)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(2/6)).mul(softcap2)
                return eff;
            },
                   tooltip() {return "BasePoint+1"},
            effectDisplay() { return format(tmp.c.upgrades[23].effect)+"x"+(tmp.c.upgrades[23].effect.gte("e2500000") ? " (SOFTCAPPED)":"") },
       
        },
        24: {
            title: "Cookie Factory",
            description() { return "Autobuy Universe ane Elements buyables every tick. Also, "+(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?"raise 'Night Adder' by 1.25.":"multiply 'Night Adder' by 3.5.")},
                      cost() { return new Decimal(player.si.current=='c' ? "1e673" : 1e5) },
            unlocked() {return hasUpgrade("c",12)},
          
           
        },
        31: {
            title: "A Great Discovery",
            description: "You have discovered a new way to inflate your currencies and turn into powerful machines! For this points gain is raised 1.5, and when you unlock Sectors, you unlock Disk Drives.",
            cost: new Decimal("1e607"),
            unlocked() {return hasUpgrade("c",24)},
            currencyDisplayName: "points",
            currencyInternalName: "points",
            style: {'height':'256px','width':'256px'},
           
        },
        41: {
            title: "Cookie Bank",
            description: "Unlock Willy.",
                 cost() { return new Decimal(player.si.current=='c' ? "1e673" : 1e22) },
            unlocked() {return player.s.unlocked},
           
        },
        51: {
            title: "Cookie Temple",
            description: "Cookies add to the first Partition capacity and your first partition now adds to Cookie's direct multi.",
             cost() { return new Decimal(player.si.current=='c' ? "1e673" : 5e22) },
            unlocked() {return player.s.unlocked},
            effect() {
                

                let eff = player.c.points.add(1).pow(0.04).add(1)
            
             
                return eff;
            },
                   tooltip() {return "Cookies<sup>0.04</sup>+1"},
            effectDisplay() { return "+"+format(tmp.c.upgrades[51].effect) },
           
        },
        52: {
            title: "Cookie Wizard Tower",
            description: "Partition space now boosts Cookie gain.",
                       cost() { return new Decimal(player.si.current=='c' ? "1e26000" : 1.2e23) },
            unlocked() {return player.s.unlocked},
            effect() {
                

                let eff = tmp.s.clickables[11].capacity.add(1).pow(0.1)
                
                              if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(1.5)
                return eff;
            },
                   tooltip() {return "FirstSpace<sup>0.1</sup>+1"},
            effectDisplay() { return format(tmp.c.upgrades[52].effect)+"x." },
           
        },
        53: {
            title: "Cookie Shipment",
            description: "Multiply points base gain by 16.",
                      cost() { return new Decimal(player.si.current=='c' ? "1e30454" : 1e24) },
            unlocked() {return player.s.unlocked},
           
        },
        54: {
            title: "Cookie Alchemy Lab",
            description: "Cookies now multiplies itself.",
            cost: new Decimal("1e33"),
            effect() {
                

                let eff = player.c.points.pow(0.05).add(1)
                
             
                return eff;
            },
                   tooltip() {return "Cookies<sup>0.05</sup>+1"},
            effectDisplay() { return format(tmp.c.upgrades[54].effect)+"x." },
            unlocked() {return hasUpgrade("s",23)},
           
        },
        61: {
            title: "Cookie Portal",
            description: "'Cookie Cursor' effect is now boosted based on Sectors.",
            cost: new Decimal("1e35"),
            
            effect() {
                

                let eff = player.s.points.pow(0.2).add(1)
                
             
                return eff;
            },
                   tooltip() {return "Sectors<sup>0.2</sup>+1"},
            effectDisplay() { return format(tmp.c.upgrades[61].effect)+"x." },
            unlocked() {return hasUpgrade("s",23)},
           
        },
        71: {
            title: "Cookie Time Machine",
            description: "Multiply the partition storage by 8.",
            cost: new Decimal("1e37"),
          
            unlocked() {return hasUpgrade("s",23)},
           
        },
         81: {
            title: "Cookie Antimatter Condenser",
            description: "Affinity's effect is raised 1.05.",
            cost: new Decimal("1e455"),
          
            unlocked() {return hasUpgrade("s",105)},
           
        },
         91: {
            title: "Cookie Prism",
            description: "Unlocks a new Sector buyable.",
            cost: new Decimal("1e490"),
          
            unlocked() {return hasUpgrade("c",81)},
           
        },
          92: {
            title: "Cookie Chancemaker",
            description: "Sectors gain exp+0.1.",
            cost: new Decimal("1e494"),
          
            unlocked() {return hasUpgrade("c",91)},
           
        },
         82: {
            title: "Cookie Fractal Engine",
            description: "Sectors gain exp+0.05 and Points softcap starts ^1.05 later.",
            cost: new Decimal("1e520"),
          
            unlocked() {return hasUpgrade("c",92)},
           
        },
          72: {
            title: "Cookie Javascript Console",
            description: "Sectors gain exp+0.05, Points softcap starts ^1.03 later.",
            cost: new Decimal("1e540"),
          
            unlocked() {return hasUpgrade("c",82)},
           
        },
          62: {
            title: "Cookie Idleverse",
            description: "Sectors gain exp+0.03, Points softcap starts ^1.02 later.",
            cost: new Decimal("1e565"),
          
            unlocked() {return hasUpgrade("c",72)},
           
        },
         63: {
            title: "Cookie Cortex Baker",
            description: "Unlock Cookie Ascension.",
            cost: new Decimal("1e800"),
          
            unlocked() {return hasUpgrade("pa",56)},
           
        },
          73: {
            title: "You",
            description() {return "Ascension gain is now affected by Affinity's effect"+(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?"":" at a reduced rate.") },
            cost: new Decimal("1e2400"),
          
            unlocked() {return hasUpgrade("pa",56)},
           
        },
        12: {
            title: "Grimoire",
            description: "Unlock Lithium.",
            cost: new Decimal(150),
            unlocked() {return hasUpgrade("c",12)||player.c.points.gte(150)},
            
 
        },
        13: {
            title: "Frenzy",
            description: "Multiply Ascension gain by 2.",
            cost: new Decimal(100),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",
            unlocked() {return hasUpgrade("pa",56)},
           
        },
         14: {
            title: "Lucky",
            description: "Multiply Ascension gain based on Heavenly Level.",
            cost: new Decimal(200),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

           effect() {
                

                let eff = player.c.prestigeLevel.pow(0.06).add(1)
                if (hasUpgrade("s",76)) eff = eff.times(upgradeEffect("s",76))
             
                return eff;
            },
                   tooltip() {return "HeavenlyLevel<sup>0.06</sup>+1"},
            effectDisplay() { return format(tmp.c.upgrades[14].effect)+"x." },
            unlocked() {return hasUpgrade("pa",56)},
           
        },
          15: {
            title: "Click frenzy",
            description: "Multiply Ascension gain based on Points.",
            cost: new Decimal(1000),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

           effect() {
                

                let eff = player.points.add(1).log10().pow(0.05).add(1)
                
              if (hasUpgrade("s",76)) eff = eff.times(upgradeEffect("s",76))
                return eff;
            },
                   tooltip() {return "log10(Points<sup>0.05</sup>)+1"},
            effectDisplay() { return format(tmp.c.upgrades[15].effect)+"x." },
            unlocked() {return hasUpgrade("pa",56)},
           
        },
         16: {
            title: "Cookie chain",
            description: "Multiply Ascension gain based on Exponent Points.",
            cost: new Decimal(1800),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

           effect() {
                

                let eff = player.ex.expPoints.add(1).log10().pow(0.2).add(1)
                
             if (hasUpgrade("c",42)) eff = eff.pow(3)
                 if (hasUpgrade("c",43)) eff = eff.pow(3)
                     if (hasUpgrade("s",76)) eff = eff.times(upgradeEffect("s",76))
                return eff; 
            },
                   tooltip() {return "log10(ExpPoints<sup>0.2</sup>)+1"},
            effectDisplay() { return format(tmp.c.upgrades[16].effect)+"x." },
            unlocked() {return hasUpgrade("pa",56)},
           
        },
         17: {
            title: "Cookie storm",
            description: "Multiply Ascension gain based on Orbs and generate 5% of Ascensions per second.",
            cost: new Decimal(10000),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

           effect() {
                

                let eff = player.o.points.pow(0.03).add(1)
                     if (hasUpgrade("c",42)) eff = eff.pow(3)
              if (hasUpgrade("c",43)) eff = eff.pow(3)
                 if (hasUpgrade("s",76)) eff = eff.times(upgradeEffect("s",76))
                return eff;
            },
                   tooltip() {return "Orbs<sup>0.03</sup>+1"},
            effectDisplay() { return format(tmp.c.upgrades[17].effect)+"x." },
            unlocked() {return hasUpgrade("pa",56)},
           
        },
          25: {
            title: "High-five",
            description: "'Cookie Cursor' multiplies their own effect",
            cost: new Decimal(10000),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

           effect() {
                

                let eff = tmp.c.upgrades[11].effect.pow(0.1).add(1)
                
             
                return eff;
            },
                   tooltip() {return "CookieCursor<sup>0.1</sup>+1"},
            effectDisplay() { return format(tmp.c.upgrades[25].effect)+"x." },
            unlocked() {return hasUpgrade("c",17)},
           
        },
           26: {
            title: "Congregation",
            description: "'Cookie Grandma' multiplies their own effect",
            cost: new Decimal(15000),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

           effect() {
                

                let eff = tmp.c.upgrades[21].effect.pow(0.15).add(1)
                
             
                return eff;
            },
                   tooltip() {return "CookieGrandma<sup>0.15</sup>+1"},
            effectDisplay() { return format(tmp.c.upgrades[26].effect)+"x." },
            unlocked() {return hasUpgrade("c",25)},
           
        },
           27: {
            title: "Luxuriant harvest",
            description: "'Cookie Farm' multiplies their own effect",
            cost: new Decimal(15000),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

           effect() {
                

                let eff = tmp.c.upgrades[22].effect.pow(0.1314).add(1)
                
             
                return eff;
            },
                   tooltip() {return "CookieFarm<sup>0.1314</sup>+1"},
            effectDisplay() { return format(tmp.c.upgrades[27].effect)+"x." },
            unlocked() {return hasUpgrade("c",26)},
           
        },
          32: {
            title: "Ore vein",
            description: "'Cookie Mine' multiplies their own effect and both Points Multiplier and Exponent Points Multiplier effect softcap starts ^1.5 later.",
            cost: new Decimal(15000),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",
      softcapStart() {return new Decimal("1e250000")},
           effect() {
                

                let eff = tmp.c.upgrades[23].effect.pow(0.1314).add(1)
                       let softcap = new Decimal(tmp.c.upgrades[this.id].softcapStart)
                              if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(3/6)).mul(softcap)
                                        
             
                return eff;
            },
                   tooltip() {return "CookieMine<sup>0.1314</sup>+1"},
            effectDisplay() { return format(tmp.c.upgrades[32].effect)+"x." },
            unlocked() {return hasUpgrade("c",27)},
           
        },
          33: {
            title: "Oiled-up",
            description: "'Points Multiplier' now affects Ascension gain at a reduced rate.",
            cost: new Decimal(15000),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

        
    
            unlocked() {return hasUpgrade("c",32)},
           
        },
           34: {
            title: "Juicy profits",
            description: "Orb Points effect is raised ^10 and its base is divided by 5.",
            cost: new Decimal(1.5e6),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

        
    
            unlocked() {return hasUpgrade("c",33)},
           
        },
        35: {
            title: "Fervent adoration",
            description: "Both Night Remover and Night-nightadder effects are raised ^8.",
            cost: new Decimal(2e6),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

        
    
            unlocked() {return hasUpgrade("c",34)},
           
        },
         36: {
            title: "Manabloom",
            description: "Base Point Adder. Exponent Point Buffer and Dubnium cost bases are divided by 1.1, 1.25 and 1.5 respectively.",
            cost: new Decimal(2e6),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

        
    
            unlocked() {return hasUpgrade("c",35)},
           
        },
         42: {
            title: "Delicious lifeforms",
            description: "Both Cookie chain and Cookie storm's effects are cubed.",
            cost: new Decimal(3e6),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

        
    
            unlocked() {return hasUpgrade("c",36)},
           
        },
          43: {
            title: "Breakthrough",
            description: "Cube Cookie chain and Cookie storm's effects again.",
            cost: new Decimal(1e9),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

        
    
            unlocked() {return hasUpgrade("c",42)},
           
        },
         44: {
            title: "Righteous cataclysm",
            description: "Points softcap starts later based on Prestige Level.",
            cost: new Decimal(5e15),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

           effect() {
                

                let eff = player.c.prestigeLevel.add(1).pow(0.001)
                
             
                return eff;
            },
                   tooltip() {return "HeavenlyLevel<sup>0.001</sup>+1"},
            effectDisplay() { return "^"+format(tmp.c.upgrades[44].effect) },
    
            unlocked() {return hasUpgrade("c",43)},
           
        },
           45: {
            title: "Golden ages",
            description: "Sector exp+0.12.",
            cost: new Decimal(1e18),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

    
            unlocked() {return hasUpgrade("c",44)},
           
        },
          46: {
            title: "Extra cycles",
            description: "Elements hardcap is raised 1.05.",
            cost: new Decimal(3e18),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",

    
            unlocked() {return hasUpgrade("c",45)},
           
        },
           47: {
            title: "Solar flare",
            description: "Sectors gain is multiplied based on Prestige Level.",
            cost: new Decimal(4e18),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",
   effect() {
                

                let eff = player.c.prestigeLevel.add(1).pow(0.5)
                
                  if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false) eff = eff.pow(4)
                return eff;
            },
                   tooltip() {return "PrestigeLevel<sup>0.5</sup>+1"},
            effectDisplay() { return format(tmp.c.upgrades[47].effect)+"x" },
    
            unlocked() {return hasUpgrade("c",46)},
           
        },
          55: {
            title: "Winning streak",
            description: "All cost bases for Elements are reduced by 0.2.",
            cost: new Decimal(4e18),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",
  
    
            unlocked() {return hasUpgrade("c",47)},
           
        },
           56: {
            title: "Macrocosm",
            description: "Raise Exponent Points gain by 1.02 after softcap",
            cost: new Decimal(5e18),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",
  
    
            unlocked() {return hasUpgrade("c",55)},
           
        },
         57: {
            title: "Refactoring",
            description: "Raise Points gain by 1.02 after softcap",
            cost: new Decimal(2e21),
           currencyDisplayName: "heavenly chips",
           currencyInternalName: "heavenlyChips",
           currencyLayer: "c",
  
    
            unlocked() {return hasUpgrade("c",56)},
           
        },
    },
     clickables: {
        11: {
            gain() { 
                let n = player.c.points.add(1).max(1)
                if (n.lt("1e800")) return new Decimal(0)
                n = Decimal.pow(1,n.log10().div(15).sub(1)).max(1).mul(tmp.c.clickables[11].gainmult)
                return n.floor()
            },
            next() {
                let gain = tmp.c.clickables[11].gain.add(1).max(1)
                let next = Decimal.pow(3,gain.div(tmp.c.clickables[11].gainmult).log10().add(1).max(1).mul(30))
                return next
            },
            gainmult() {
                let mult = new Decimal(1)
             if (hasUpgrade("c",13)) mult = mult.times(2)
                   if (hasUpgrade("c",14)) mult = mult.times(upgradeEffect("c",14))
                         if (hasUpgrade("c",15)) mult = mult.times(upgradeEffect("c",15))
                                 if (hasUpgrade("c",16)) mult = mult.times(upgradeEffect("c",16))

                    if (hasUpgrade("c",17)) mult = mult.times(upgradeEffect("c",17))

                if (hasUpgrade("c",33)) mult = mult.times(upgradeEffect("ex",12).add(1).log10().add(1))

                    if (player.s.intel.gte(8)) mult = mult.times(tmp.s.pentiumMEffect)

                        if (hasUpgrade("c",73)) mult = mult.pow(tmp.s.affinityEffect.div(((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes(this.layer):false)?1:3.5))
      
                if (player.si.unlocked) mult = mult.times(50)
                return mult;
            },
            display() {
                let dis = "Reset all of your Cookies in an exchange for +<h3>" + formatWhole(tmp.c.clickables[11].gain) + "</h3> Heavenly Chips and Prestige Level<br><br>(forces a Row 2 reset)" 

           
                return dis
            },
            canClick() {
                return player.c.points.gte("1e800")
            },
            onClick() {
         
              player.c.points = new Decimal(0)
              player.c.heavenlyChips = player.c.heavenlyChips.add(tmp.c.clickables[11].gain)
         player.c.prestigeLevel = player.c.prestigeLevel.add(tmp.c.clickables[11].gain)
                },
                style: {'height':'130px', 'width':'175px', 'font-size':'13px',
               
            
            },
        },
    },
  
})

addLayer("pa", {
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
  
    }},
    color: "#AAAAAA",
    row: 4,
    layerShown() {return hasUpgrade("s",97)||player.pa.unlocked}, 
   name: "pashtocha",
    branches: ["s","tr"],
   symbol: "PA",
   resource: "pashtocha points",
   baseResource: "points",                 // The name of the resource your prestige gain is based on.
   baseAmount() { return player.points },  // A function to return the current amount of baseResource.

   requires: new Decimal("1e13750"),              // The amount of the base needed to  gain 1 of the prestige currency.
   gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
    let mult = new Decimal(1)       
      if (player.truck.inTrucking.gte(1)) return new Decimal(0)
      if (hasUpgrade("pa",15)) mult = mult.times(upgradeEffect("pa",15))
         if (hasUpgrade("pa",22)) mult = mult.times(4)
               if (hasUpgrade("pa",25)) mult = mult.times(upgradeEffect("pa",25))

    if (hasUpgrade("pa",31)) mult = mult.times(upgradeEffect("pa",31))

        if (hasUpgrade("s",105)) mult = mult.times(3)

          if (hasUpgrade("pa",46)) mult = mult.times(upgradeEffect("pa",46))

             if (hasUpgrade("pa",106)) mult = mult.times(upgradeEffect("pa",106))
              
            if (hasAchievement("ach",57)) mult = mult.times(tmp.ach.achievementPower)
 if (hasUpgrade("truck",35)&&!hasMilestone("truck",5)) mult = mult.times(1e6)
    if (hasAchievement("ach",72)) mult = mult.pow(tmp.tr.effect2)
    return mult;// Factor in any bonuses multiplying gain here.
},
gainExp() {                             // Returns the exponent to your gain of the prestige resource.
    return new Decimal(1)
},                                 // Also the amount required to unlock the layer.
    autoUpgrade() {return player.z.unlocked&&player.si.current==null},
softcap() {
    let softcap = new Decimal(1e200)
    if (hasMilestone("truck",6)) softcap = softcap.times(1e10)
return softcap;
},
softcapPower: 0.5,

 hotkeys: [
        {
            key:"P", description: "Shift+P: Reset for Pashtocha", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
 onPrestige() {
  player.points = new Decimal("1");
    },
   type: "normal",                         // Determines the formula used for calculating prestige currency.
   exponent: 0.002,   
   prestigeButtonText() { 
  return "Ascend to reset previous progress, including Sectors, but gain "+formatWhole(tmp[this.layer].resetGain)+" Pashtocha Points.<br><br> Next at " + formatWhole(tmp[this.layer].nextAt) + " points"
   },
   tabFormat: {
    "Main": {
     
        content: ["main-display",
        "prestige-button",
        "resource-display", "blank",
       
        "milestones",        
        "blank",
        "blank",
 
    ]},

     "Upgrades": {
         unlocked() {return hasMilestone("pa",7)},
        content: ["main-display",
        "prestige-button",
        "resource-display", "blank",
      
        "blank",
        "blank",
        "upgrades",  
    ]},
     "Challenges": {
          
            unlocked() {return hasMilestone("pa",8)},
                   content: ["main-display",
                   "prestige-button",
                   "resource-display", "blank",
                  "blank",
               
                  "challenges",
                  "blank","blank",
                

            ]
    
        },

     
},

 doReset(resettingLayer) {
        let keep = [];
    
 
        
        if (player.si.unlocked) keep.push("upgrades")
        if (player.si.unlocked) keep.push("challenges")
        
        if (layers[resettingLayer].row > this.row) layerDataReset("pa", keep)
    },
resetsNothing() {return hasMilestone("pa",6)},

passiveGeneration() { 
    let passive = new Decimal(0)

    if (hasMilestone("pa",7)||player.si.unlocked) passive = passive.add(1)
    return passive; },
milestones: {
    0: {
        requirementDescription: "1 Total Pashtocha Point",
        done() {return player[this.layer].total.gte(1)}, // Used to determine when to give the milestone
        effectDescription: "Keeps Incremental challenges on reset.",
        unlocked() {return player.pa.unlocked},
    },
     1: {
        requirementDescription: "2 Total Pashtocha Points",
        done() {return player[this.layer].total.gte(2)}, // Used to determine when to give the milestone
        effectDescription: "Keeps both Exponent Coins and Incremental Coin upgrades on reset.",
        unlocked() {return hasMilestone("pa",0)},
    },
     2: {
        requirementDescription: "3 Total Pashtocha Points",
        done() {return player[this.layer].total.gte(3)}, // Used to determine when to give the milestone
        effectDescription: "Keeps Cookies upgrades on reset.",
         unlocked() {return hasMilestone("pa",1)},
    },
      3: {
        requirementDescription: "4 Total Pashtocha Points",
        done() {return player[this.layer].total.gte(4)}, // Used to determine when to give the milestone
        effectDescription: "Automate Poacher buyables.",
          unlocked() {return hasMilestone("pa",2)},
    },
   
      4: {
        requirementDescription: "6 Total Pashtocha Points",
        done() {return player[this.layer].total.gte(6)}, // Used to determine when to give the milestone
        effectDescription: "Affinity Dimensions can now be purchased outside of Steal TMT's Cheeseburger.",
         unlocked() {return hasMilestone("pa",3)},
    },
      5: {
        requirementDescription: "10 Total Pashtocha Points",
        done() {return player[this.layer].total.gte(10)}, // Used to determine when to give the milestone
        effectDescription: "Base Points are now gained in Steal TMT's Cheeseburger but are square rooted.",
         unlocked() {return hasMilestone("pa",4)},
    },
    6: {
        requirementDescription: "13 Total Pashtocha Points",
        done() {return player[this.layer].total.gte(13)}, // Used to determine when to give the milestone
        effectDescription: "Pashtocha no longer resets anything (except for Points).",
         unlocked() {return hasMilestone("pa",5)},
    },
    7: {
        requirementDescription: "21 Total Pashtocha Points",
        done() {return player[this.layer].total.gte(21)}, // Used to determine when to give the milestone
        effectDescription: "Unlocks new content.",
         unlocked() {return hasMilestone("pa",6)},
    },
     8: {
        requirementDescription: "100,000 Total Pashtocha Points",
        done() {return player[this.layer].total.gte(1e5)}, // Used to determine when to give the milestone
        effectDescription: "Unlocks the first Pashtocha challenge.",
         unlocked() {return hasMilestone("pa",7)},
    },
     9: {
        requirementDescription: "1e38 Total Pashtocha Points",
       done() {return player[this.layer].total.gte(1e38)}, // Used to determine when to give the milestone


    
        effectDescription: "Unlocks the second Pashtocha challenge.",
         unlocked() {return hasMilestone("pa",8)},
    },
     10: {
        requirementDescription: "1e71 Total Pashtocha Points",
        done() {return player[this.layer].total.gte(1e71)}, // Used to determine when to give the milestone
        effectDescription: "Unlocks the third and final Pashtocha challenge.",
         unlocked() {return hasMilestone("pa",9)},
    },
},
   upgrades: {
        11: {
            title: "Pentium+",
            description: "Pentium's first effect is better.",
            cost: new Decimal(100),
            
            
        },
         12: {
            title: "Pentium Advanced",
            description: "Points softcap starts x1e6 later.",
            cost: new Decimal(200),
            unlocked() {return hasUpgrade("pa",11)},
            
        },
         13: {
            title: "Celeron Elements",
            description: "'Nightadding Booster' hardcap is increased to 3,000.",
            cost: new Decimal(200),
            unlocked() {return hasUpgrade("pa",12)},
            
        },
          14: {
            title: "Full Adder",
            description: "Boost 'Night Adder' and 'Extension' upgrades based on your Pashtocha points.",
            cost: new Decimal(100),

              effect() {
                

                let eff = player.pa.points.add(1).pow(2)
                if (hasUpgrade("pa",23)) eff = eff.times(upgradeEffect("pa",23))
             
                return eff;
            },
                   tooltip() {return "Pashtocha<sup>2</sup>+1"},
            effectDisplay() { return format(tmp.pa.upgrades[14].effect)+"x" },
            unlocked() {return hasUpgrade("pa",13)},
            
        },
          15: {
            title: "Pashtocha Booster I",
            description: "Pashtocha multiplies its own gain",
            cost: new Decimal(100),

              effect() {
                

                let eff = player.pa.points.add(1).pow(0.2)
                
             
                return eff;
            },
                   tooltip() {return "Pashtocha<sup>0.2</sup>+1"},
            effectDisplay() { return format(tmp.pa.upgrades[15].effect)+"x" },
            unlocked() {return hasUpgrade("pa",14)},
            
        },
         16: {
            title: "Celeron Boost",
            description: "Celeron's effect is increased from 1.0002 to 1.002.",
            cost: new Decimal(350),


            unlocked() {return hasUpgrade("pa",15)},
            
        },
          17: {
            title: "Furtherer",
            description: "Further-Exponent Point's effect is squared.",
            cost: new Decimal(500),


            unlocked() {return hasUpgrade("pa",16)},
            
        },
         21: {
            title: "Exponent Starter",
            description: "Points softcap starts later based on Exponent Points.",
            cost: new Decimal(1000),

  effect() {
                

                let eff = player.ex.expPoints.add(1).root(1024)
                
             
                return eff;
            },
                   tooltip() {return "(ExponentPoints√^1024)+1"},
            effectDisplay() { return format(tmp.pa.upgrades[21].effect)+"x" },
            unlocked() {return hasUpgrade("pa",17)},
            
        },
         22: {
            title: "Pashtocha Expanders",
            description: "Quadruple Pashtocha gain.",
            cost: new Decimal(1500),

 
            unlocked() {return hasUpgrade("pa",21)},
            
        },
         23: {
            title: "Half Adder",
            description: "'Full Adder' effect is boosted based on Exponent Points.",
            cost: new Decimal(5000),
 effect() {
                

                let eff = player.ex.expPoints.add(1).root(1536)
                
             
                return eff;
            },
                   tooltip() {return "(ExponentPoints√^1536)+1"},
            effectDisplay() { return format(tmp.pa.upgrades[23].effect)+"x" },
 
            unlocked() {return hasUpgrade("pa",22)},
            
        },
           24: {
            title: "Quarter Adder",
            description: "'ext4' formula is better.",
            cost: new Decimal(5000),
 
                   tooltip() {return "ExpCoins+1<sup>0.2</sup><br>|<br>V<br>ExpCoins+1<sup>2</sup>"},
          
 
            unlocked() {return hasUpgrade("pa",23)},
            
        },
         25: {
            title: "Blessed Pashtochas",
            description: "Each Pashtocha upgrade purchased boosts Pashtocha gain.",
            cost: new Decimal(5000),
   effect() {
                let eff = Decimal.pow(1.5, player.pa.upgrades.length);
              
                return eff;
            },
            effectDisplay() { return format(tmp.pa.upgrades[25].effect)+"x" },
                   tooltip() {return "PashUpgradePurchased<sup>1.5</sup>"} ,
          
 
            unlocked() {return hasUpgrade("pa",24)},
            
        },
          26: {
            title: "Anti-Piracy",
            description: "Base Points gain is multiplied by your Elements.",
            cost: new Decimal(1e6),
   effect() {
                  let eff = player.ic.elements.add(1).root(3)
                
             
                return eff;
            },
            effectDisplay() { return format(tmp.pa.upgrades[26].effect)+"x" },
                   tooltip() {return "√^3(Elements)+1"} ,
          
 
            unlocked() {return hasUpgrade("pa",25)},
            
        },
         27: {
            title: "Original Challenges",
            description: "'New Challenges' formula is better.",
            cost: new Decimal(10e6),
 
                tooltip() {return "ExpCoins+1<sup>0.5</sup><br>|<br>V<br>ExpCoins+1<sup>2</sup>"},
          
 
            unlocked() {return hasUpgrade("pa",26)},
            
        },
          31: {
            title: "Pashtocha Booster II",
            description: "Partition bytes boost Pashtocha gain and Unlock CPU Threads.",
            cost: new Decimal(15e6),
 
                effect() {
                

                let eff = tmp.s.clickables[11].capacity.add(1).pow(0.02)
                
             
                return eff;
            },
                   tooltip() {return "Data<sup>0.02</sup>+1"},
            effectDisplay() { return format(tmp.pa.upgrades[31].effect)+"x" },
          
 
            unlocked() {return hasUpgrade("pa",27)},
            
        },
         32: {
            title: "Affinity Photo",
            description: "Unlock Affinity Dimension IV and square root Affinity's negative effect.",
            cost: new Decimal(7.5e13),
 
              
          
 
            unlocked() {return hasUpgrade("pa",31)},
            
        },
        33: {
            title: "Affinity Designer",
            description: "'Cookie Garden' cap is extended to 100,000.",
            cost: new Decimal(3e14),
 
              
          
 
            unlocked() {return hasUpgrade("pa",32)},
            
        },
         34: {
            title: "Slowhorn",
            description: "'VFAT' effect is raised ^5.",
            cost: new Decimal(4e14),
 
              
          
 
            unlocked() {return hasUpgrade("pa",33)},
            
        },
          35: {
            title: "Continuous Resultant",
            description: "Celeron's effect is raised to 1.1 and square the hardcap of 'Nightadding Booster'.",
            cost: new Decimal(1e15),
 
              
          
 
            unlocked() {return hasUpgrade("pa",34)},
            
        },
          36: {
            title: "1 short beep",
            description: "Further-Exponent coin cost is lowered.",
            cost: new Decimal(5e19),
 
              
          
 
            unlocked() {return hasUpgrade("pa",35)},
            
        },
         37: {
            title: "2 short beeps",
            description: "Automate Affinity Dimensions and multiply generation of Further-Exponent Points by 500.",
            cost: new Decimal(1e20),
 
              
          
 
            unlocked() {return hasUpgrade("pa",36)},
            
        },
         41: {
            title: "3 short beeps",
            description: "Pentium I's effect is doubled and Pentium IV's effect is increased by 50%.",
            cost: new Decimal(2e20),
 
              
          
 
            unlocked() {return hasUpgrade("pa",37)},
            
        },
          42: {
            title: "4 short beeps",
            description: "VFAT's formula is better",
            cost: new Decimal(5e20),
 
              
          
 
            unlocked() {return hasUpgrade("pa",41)},
                 tooltip() {return "log10(∛Points)+1<br>|<br>V<br>log10(Points)+1"},
        },
         43: {
            title: "5 short beeps",
            description: "'Non-System disk or disk error' effect is squared and reduce the scaling of Dubnium by -1.5.",
            cost: new Decimal(1e21),
 
              
          
 
            unlocked() {return hasUpgrade("pa",42)},
             
        },
         44: {
            title: "6 short beeps",
            description: "Orb's effect is raised based on Pashtocha upgrades bought.",
            cost: new Decimal(1e27),
 
                effect() {
                

                 let eff = Decimal.pow(1.1, player.pa.upgrades.length);
                
             
                return eff;
            },
                   tooltip() {return "PashtochaUpgrades<sup>1.1</sup>"},
            effectDisplay() { return "^"+format(tmp.pa.upgrades[44].effect) },
              
          
 
            unlocked() {return hasUpgrade("pa",43)},
             
        },
         45: {
            title: "7 short beeps",
            description: "Exponent Coin effect softcap starts later based on Pashtocha upgrades bought.",
            cost: new Decimal(1.5e27),
 
                effect() {
                

                 let eff = Decimal.pow(1.01, player.pa.upgrades.length);
                
             
                return eff;
            },
                   tooltip() {return "PashtochaUpgrades<sup>1.01</sup>"},
            effectDisplay() { return "^"+format(tmp.pa.upgrades[45].effect) },
              
          
 
            unlocked() {return hasUpgrade("pa",44)},
             
        },
          46: {
            title: "8 short beeps",
            description: "Pashtocha gain is multiplied based on best Points reached in Trucking and raise Points by 1.45.",
            cost: new Decimal(2e27),
 
                effect() {
                

                 let eff = player.truck.pointsinTrucking.pow(0.00015).add(1)
                
             
                return eff;
            },
                   tooltip() {return "PointsInTruck<sup>0.00015</sup>+1"},
            effectDisplay() { return format(tmp.pa.upgrades[46].effect)+"x" },
              
          
 
            unlocked() {return hasUpgrade("pa",45)},
             
        },
          47: {
            title: "9 short beeps",
            description: "Unlock a new Partition and is automated.",
            cost: new Decimal(3.2e29),
 
              
              
          
 
            unlocked() {return hasUpgrade("pa",46)},
             
        },
        51: {
            title: "10 short beeps",
            description: "Raise points gain for each Pashtocha upgrade purchased.",
            cost: new Decimal(1e32),
 
              
               effect() {
                

                 let eff = Decimal.pow(1.05, player.pa.upgrades.length);
                
             
                return eff;
            },
                   tooltip() {return "PashtochaUpgrades<sup>1.05</sup>"},
            effectDisplay() { return "^"+format(tmp.pa.upgrades[51].effect) },
          
 
            unlocked() {return hasUpgrade("pa",47)},
             
        },
          52: {
            title: "11 short beeps",
            description: "Unlock Universal Dimension IV.",
            cost: new Decimal(1e33),
 
              
           
          
 
            unlocked() {return hasUpgrade("pa",51)},
             
        },
         53: {
            title: "1 long 2 short beeps",
            description: "While Trucking up, points softcap starts later based on best points in Trucking.",
            cost: new Decimal(2e33),
 
              
           
                          effect() {
                

                 let eff = player.truck.pointsinTrucking.add(1).log10().add(1).pow(0.01)
                
             
                return eff;
            },
                   tooltip() {return "log10(PointsInTruck<sup>0.01</sup>)+1"},
            effectDisplay() { return "^"+format(tmp.pa.upgrades[53].effect)},
              
 
            unlocked() {return hasUpgrade("pa",52)},
             
        },
          54: {
            title: "1 long 3 short beeps",
            description: "Unlock Universal Galaxies.",
            cost: new Decimal(1e34),
 
              
           
           
              
 
            unlocked() {return hasUpgrade("pa",53)},
             
        },
          55: {
            title: "1 long 8 short beeps",
            description: "Nightadding Booster's effect is doubled.",
            cost: new Decimal(1e35),
 
              
           
           
              
 
            unlocked() {return hasUpgrade("pa",54)},
             
        },
          56: {
           title: "Continuous beeps",
            description: "Unlock new content and Raise Points after softcap by 1.01.",
            cost: new Decimal(3e35),
 
              
           
           
              
 
            unlocked() {return hasUpgrade("pa",55)},
             
        },
    },
     challenges: {
        11: {
            name: "The Wrath of Blue Screen of Death",
            challengeDescription: "Normal layers multis are set to 1 and for Exponent Coins and Orbs respectively, their base is set to 2 and 4. You also can't get base points, and Points gain is raised ^0.1. Entering this forces a Sector reset.",
           onEnter() {
            doReset("s",true)
           },
          goal(){
           return new Decimal("1e13750");
                
            
            },
           
            rewardDescription: "Unlock AMD CPU.",
                style: {'width':'622px','height':'222px'},
        },
         12: {
            name: "The Wrath of Motherboard Speaker",
            challengeDescription: "Cookies are disabled and all Elements have a harsh cost scaling. Base Points are now set to 0.05 and Exponent Coins have an extremely harsh requirement base. Points gain is raised ^0.08 and Universe Energy, Elements, Affinity and Poacher Buyables do nothing.",
           onEnter() {
            doReset("s",true)
           },
          goal(){
           return new Decimal("1e13750");
                
            
            },
           unlocked() {return hasMilestone("pa",9)},
            rewardDescription: "Raise Points softcap by 1.25 and unlock Further-Incremental Coins.",
                style: {'width':'622px','height':'222px'},
        },
         13: {
            name: "The Wrath of Black Screen with White Non-Blinking Underscore.",
            challengeDescription: "Points is tetrated ^^0.01 and every previous challenge is applied once.",
           onEnter() {
            doReset("s",true)
           },
          goal(){
           return new Decimal(Number.MAX_VALUE);
                
            
            },
               countsAs: [11,12],
           unlocked() {return hasMilestone("pa",10)},
            rewardDescription: "Unlock a new layer and unlock Truck Corruption.",
                style: {'width':'622px','height':'222px'},
        },
    }
})

addLayer("tr", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        best: new Decimal(0),
        total: new Decimal(0),
    }},

    color: "#0080ff",                       // The color for this layer, which affects many elements.
    resource: "time riders",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).
symbol: "TR",
    baseResource: "willy cookies",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.wi.cookies},  // A function to return the current amount of baseResource.

    requires: new Decimal("1e370"),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.
branches: ["c","ic"],
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent() {let exp = new Decimal(2)
 if (hasAchievement("ach",72)) exp = exp.sub(0.2)
        return exp;
    },                         // "normal" prestige gain is (currency^exponent).
 base: 1e10,
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    resetsNothing() {return hasAchievement("ach",72)},
     autoPrestige() {return hasAchievement("ach",72)},
baseEff() {
return new Decimal(3)
  },
   hotkeys: [
        {
            key:"T", description: "Shift+T: Reset for Time Rider", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
    effect() {
 if (!player.tr.unlocked) return new Decimal(1)
        let eff = Decimal.pow(this.baseEff(), player.tr.points.plus()).max(1);
    if (hasAchievement("ach",67)) eff = eff.times(3)
    return eff;
},
 effect2() {
 if (!hasAchievement("ach",72)) return new Decimal(1)
        let eff = Decimal.pow(1.001, player.tr.points.plus()).max(1);
 
    return eff;
},
    layerShown() { return hasUpgrade("wi",27) },            // Returns a bool for if this layer's node should be visible in the tree.
    effectDescription() {
        return "which are increasing speed of Pre-Sector layers by "+format(tmp.tr.effect)+"x"+(hasAchievement("ach",72)?", and is raising Pashtocha gain by "+format(tmp.tr.effect2)+".":".")
    },
})
addLayer("si", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        best: new Decimal(0),
        total: new Decimal(0),
      	mastered: [],
		selectionActive: false,
	    current: null,
        auto: false,
        time: new Decimal(0),
        bestAffinityPoints: new Decimal(0),
        capture: new Decimal(0),
    }},
   
    color: "#616161",                       // The color for this layer, which affects many elements.
    resource: "skull internet sector",            // The name of this layer's main prestige resource.
    row: 5,                                 // The row this layer is on (0 is the first row).
symbol: "SI",
    baseResource: "incremental coins",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.ic.points},  // A function to return the current amount of baseResource.
nodeStyle() {return {
			"background-color": ((player.si.unlocked||canReset("si"))?"#616161":"#bf8f8f"),
        }},
    requires: new Decimal("1e855940"),              // The amount of the base needed to  gain 1 of the prestige currency.
                    position: 1,                        // Also the amount required to unlock the layer.
branches: ["pa","s"],
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent() {
        let exp = new Decimal(2.5)
      if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes('ex'):false) exp = exp.times(2.243)
            return exp;
    },                          // "normal" prestige gain is (currency^exponent).
 base() {let base = new Decimal("1e570")

    return base;
 },
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
  update(diff) {
      if (!(Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("s"):false) player.si.bestAffinityPoints = player.si.bestAffinityPoints.max(player.s.affinityPoints)
      if (player.si.unlocked) player.s.affinityPoints = new Decimal(2162)
   
     
 },
  
    layerShown() { return hasMilestone("truck",17
    )||player.si.unlocked },            // Returns a bool for if this layer's node should be visible in the tree.
 



      	tabFormat: {
			"Main": {
				content: ["main-display",
            "prestige-button",
            "resource-display", "blank",
          
            
            "blank",
            "blank",
             "clickables",
				],
			}, 

			"Skelet-Net Rewards": {
			
				content: ["blank", "blank", "blank", ["raw-html", function() { return tmp.si.rewardDesc }]],
			},
		},
    tooltip() {return "Skull Internet<br><small><i>Skull Internet Sectors: "+player.si.points+".<br>Skeletified Layers: "+formatWhole(tmp.si.amtMastered)+".</i>"},
 hotkeys: [
        {
            key:"S", description: "Shift+S: Reset for skull internet sector", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
   



  doReset(resettingLayer) {
        let keep = [];
    
    
        player.si.time = new Decimal(0);
        player.si.capture = player.si.capture.max(player.s.affinityPoints)
        if (layers[resettingLayer].row > this.row) layerDataReset("si", keep)
    },

    		rewardDesc() {
			let desc = "";
			if (player.si.mastered.includes("ex")) desc += "<h2>Exponent Coins</h2><br><br><ul><li>Exponent Points Softcap<sup>2</sup> starts ^5 later<li><li>Cost base for Base Point Adder is divided by 1.01, and its effect base is raised ^10.<li<liCost base for Exponent Point Buffer is divided by 1.01. and the exponent increase on effect is buffed to 3.75.<li><li>Points Multiplier and Exponent Points Multiplier softcap starts ^2500 later.<li><li>Night Adder's effect is raised ^25.<li><li>Nightadding Booster's effect is raised ^4 and its hardcap starts ^1.75 later<li><li>Extension's effect is raised ^5.<li><li>There are 6 new Exponent Upgrades.<li><li>Unlocks new Trucker upgrades.</li></ul><br><br>";
            if (player.si.mastered.includes("ic")) desc += "<h2>Incremental Coins</h2><br><br><ul><li>Night-nightadder's increase effect is buffed to ^4.<li><li>Unlocks 2 new Elements.<li><li>Exponent Pointed Multiplier's effect is raised ^3.25<li><li>New Challenges softcap is raised ^17.5.<li><li>The First Glance's softcap is raised ^50</li><li>Incremented Roots softcap starts ^300 later.<li><li>Incremental Thingy softcap starts ^900 later.<li><li>Arsenal Incremental softcap starts ^10000 later.<li><li>Bombard now tesseracts your gain instead of squaring it.</li><li>Unlocks 7 new Incremental upgrades..</li><li>Unlocks Ant Fragments.</li></ul><br><br>";
               if (player.si.mastered.includes("o")) desc += "<h2>Orbs</h2><br><br><ul><li>Its cost exponent is subtracted by 0.05.<li><li>Its effect also affects its req.<li><li>Orbs effect is raised ^10.</li></ul><br><br>";
                 if (player.si.mastered.includes("p")) desc += "<h2>Poachers</h2><br><br><ul><li>Poached Exponent's effect base increase is buffed to ^1.13.</li><li>Poached Exponent Base's effect base increase is buffed to *0.065.</li><li>Poached Orbs's effect base increase is buffed to *0.13.</li><li>Poached Poachers's effect base increase is buffed to *0.4.</li><li>Poached Computing's effect base increase is buffed to ^5.</li><li>Fast Fooder now affects Points in Trucking.</li><li>Poached Knights's effect base increase is buffed to ^1.32.</li><li>Further-Layers are fully automated.</li><li>Unlock Penguin Building II.</li></ul><br><br>";
                    if (player.si.mastered.includes("c")) desc += "<h2>Cookies and Willy Cookies</h2><br><br><ul><li>Cookie Cursor's softcap starts ^25 later.</li><li>Cookie Grandma's, Cookie Farm's and Cookie Mine's effects are raised ^10, ^2 and ^1.25 respectively.</li><li>Cookie Factory now raises Night Adder by 1.25 instead of multiplying it by 3.5.</li><li>Cookie Wizard Tower's effect is raised ^1.5.</li><li>You now makes Ascension gain fully affected by Affinity's effect instead of being a reduced rate.</li><li>Solar flare's effect is raised ^4.</li><li>Willy gain is squared.</li><li>Grandmapocalypse's and Cookieville's effect is raised ^8 and ^2 respectively.</li><li>Cybercookie now divides Cheeseburger interval instead of increasing it and its formula is changed log10(log10(log10(Points))) --> Points<sup>1e-7</sup>+1</li><li>Williest of Cookie's effect is raised ^2000</li><li>Willy God's effect is raised ^10</li><li>Unlock Ant Building II and more Trucker upgrades.</li></ul><br><br>";
                       if (player.si.mastered.includes("s")) desc += "<h2>Sectors</h2><br><br><ul><li>Partition Spacers are raised ^10.</li><li>NTFS is raised ^12.5.</li><li>ext4's effect is raised ^4</li><li>XFS's effect is squared.</li><li>ReiserFS's effect is squared.</li><li>VFAT's effect is raised ^75000.</li><li>Hold Big Tide now triples the amount of Cheeseburgers you gain instead of increasing interval by 1/3.</li><li>Undisclosure's effect is raised ^100000.</li><li>Exponential Corruption's effect is added by 0.01.</li><li>BOOTMGR is missing's effect is multiplied by 5.</li><li>BOOTMGR is compressed's effect is raised ^100</li><li>NFS's effect is raised ^500</li><li>YAFFS's effect is raised ^1.1</li><li>NTLDR is missing's effect is raised ^10</li><li>Disk error's effect is raised ^1.4333</li><li>DISK BOOT FAILURE's effect is raised ^10</li><li>Partition I's capacity is raised ^2.5.</li><li>Genius Sheep now affects outside TMT's Mighty Cheeseburger</li><li>AFS also affects Points Softcap<sup>2</sup></li><li><s>Unlocks Windows XP Fragments</s> - Reserved for next update.</li></ul><br><br>";
			return desc;
		},
clickables: {
		
			11: {
				title: "Skeleton",
				cap: 9,
				display() {
					if (player.si.current!==null) return "Currently Skeletified: "+tmp[player.si.current].name+". Click to exit the run.";
					else return player.si.selectionActive?"You are in a Skelet-Net Search. Click the node of the layer you wish to attempt to Skeletize. Click to exit this search.":("Begin a  Skelet-Net Search.<br><br>"+((tmp.si.amtMastered>=this.cap)?"MAXED":("Req: "+formatWhole(tmp[this.layer].clickables[this.id].req)+" Skull Internet Sectors.")));
				},
				unlocked() { return player.si.unlocked },
				req() { return [2,6,8,11,14,17,35,60,111,167,(1e300)][tmp.si.amtMastered||0] },
				canClick() { return player.si.unlocked && (player.si.selectionActive?true:(tmp.si.amtMastered<this.cap&&player.si.points.gte(tmp[this.layer].clickables[this.id].req))) },
				onClick() { 
					if (player.si.current !== null) {
						if (!confirm("Are you sure you want to exit this Skelet-Net run?")) return;
						player.si.selectionActive = false;
						player.si.current = null;
					
               
                        	doReset("si", true);
					} else player.si.selectionActive = !player.si.selectionActive;
				},
				style: {"height": "200px", "width": "200px"},
			},
		},
 
   
        
   


amtMastered() {
			let amt = tmp.si.mastered.length;
			if (player.si.current!==null) if (player.si.mastered.includes(player.si.current)) amt--;
			return amt;
		},
		mastered() {
			if (player.si.current!==null) return player.si.mastered.concat(player.si.current);
			return player.si.mastered;
		},
		canBeMastered() {
			if (!player.si.selectionActive) return [];
			if (player.si.mastered.length==0) return ["ex"];
			let rows = player.si.mastered.map(x => tmp[x].row)
			let realRows = rows.filter(y => Object.keys(ROW_LAYERS[y]).every(z => player.si.mastered.includes(z) || tmp.si.masteryGoal[z]===undefined));
			let furthestRow = Math.max(0, ...realRows)+((player.si.current !== null)?0:1);
			let m = Object.keys(layers).filter(x => (tmp[x].row<=furthestRow&&tmp.si.masteryGoal[x]!==undefined&&(tmp.si.specialReqs[x]?tmp.si.specialReqs[x].every(y => player.si.mastered.includes(y)):true))||player.si.mastered.includes(x));
			if (player.si.current !== null) m.push(player.si.current);
			
			return m;
		},
		startMastery(layer) {
			if (!confirm("Are you sure you want to start Skeletifying "+tmp[layer].name+"? This will force a pure Zombie reset and put you in a run where only Skeletified Layers & this layer can be entered!")) return;
			player.si.current = layer;
			
			if (player[layer].upgrades) player[layer].upgrades = [];
			if (player[layer].challenges) for (let n in player[layer].challenges) player[layer].challenges[n] = null;
			if (player.subtabs[layer]) player.subtabs[layer].mainTabs = "Main";
		
			doReset("si", true);
		},
		completeMastery(layer) {
			let data = tmp.si;
			if (player[layer].points.lt(data.masteryGoal[layer])) return;
			if (!player.si.mastered.includes(layer)) player.si.mastered.push(layer);
			player.si.selectionActive = false;
			player.si.current = null;
        
			doReset("si", true);
		},
		specialReqs: {
            ic: ["ex"],
			o: ["ic"],
            p: ["o"],
            c: ["ic","o","p"],
            
			
		},
		masteryGoal: {
		ex: new Decimal(100000),
	    ic: new Decimal("e7e6"),
         o: new Decimal(3439),
             p: new Decimal("1e187882"),
             c: new Decimal("1e100435"),

         s: new Decimal("1e40000"),
		},
		rowLimit: 5,


})
addLayer("z", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        best: new Decimal(0),
        total: new Decimal(0),
        zombifiedExponent: new Decimal(0),
        zombifiedSector: new Decimal(0),
        zombifiedTruck: new Decimal(0),
        auto: false,
    }},

    color: "#00850b",                       // The color for this layer, which affects many elements.
    resource: "zombies",            // The name of this layer's main prestige resource.
    row: 5,                                 // The row this layer is on (0 is the first row).
symbol: "Z",
    baseResource: "pashtocha points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.pa.points},  // A function to return the current amount of baseResource.
nodeStyle() {return {
			"background-color": ((player.z.unlocked||canReset("z"))?"#00850b":"#bf8f8f"),
        }},
    requires: new Decimal("1e490"),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.
branches: ["pa"],
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent() {
        let exp = new Decimal(2)
        if (player.s.intel.gte(13)) exp = exp.sub(tmp.s.coreiEffect)
            return exp;
    },                          // "normal" prestige gain is (currency^exponent).
 base() {let base = new Decimal(10)
 if (player.s.amd.gte(7)) base = base.div(tmp.s.athlonEffect)
    return base;
 },
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    update(diff) {
        if (hasMilestone("truck",8)) {
        	let spendEach = player.z.points.div(3).floor()
					player.z.zombifiedExponent = player.z.zombifiedExponent.plus(spendEach);
					player.z.zombifiedSector = player.z.zombifiedSector.plus(spendEach);
					player.z.zombifiedTruck = player.z.zombifiedTruck.plus(spendEach);
				
					    if (!hasMilestone("truck",13))player.z.points = player.z.points.sub(spendEach.times(3)).max(0);
        }
    },
  autoPrestige() {return hasMilestone("truck",8)&&player.z.auto},
    layerShown() { return hasChallenge("pa",13
    )||player.z.unlocked },            // Returns a bool for if this layer's node should be visible in the tree.
 

      tabFormat: [
   "main-display",
            "prestige-button",
            "resource-display", "blank",
          
            
            "blank",
            "blank",
             ["row", [["clickable",31]]],
                 ["row", [["clickable",21],["clickable",22]]],
                             ["display-image", "zombie.png"],
                               ["display-text", function() { return "You have <h1>"+formatWhole(player.z.zombifiedExponent)+"</h1> Zombified Exponents, which are making the Exponent Points gen softcap start ^"+format(tmp.z.expEffect)+" later."+(tmp.z.expEffect.gte(1000)?" (SOFTCAPPED)":"") }],
                               ["clickable",11],
                                         "blank",
                                            ["display-text", function() { return "You have <h1>"+formatWhole(player.z.zombifiedSector)+"</h1> Zombified Sectors, which are "+(!hasMilestone("truck",10)?"making the Points gen softcap in TMT's Mighty Cheeseburger start ^"+format(tmp.z.sectorEffect)+" later.":"increasing Sector gain by "+format(tmp.z.sectorEffect)+"x." )+(tmp.z.sectorEffect.gte("1e10000")?" (SOFTCAPPED)":"")}],
                               ["clickable",12],
                                         "blank",
                                            ["display-text", function() { return "You have <h1>"+formatWhole(player.z.zombifiedTruck)+"</h1> Zombified Trucks, which are raising Points in Trucking by ^"+format(tmp.z.truckEffect)+" (after softcap)."+(tmp.z.truckEffect.gte(3.3)&&!tmp.z.truckEffect.gte(1.2e11)?" (SOFTCAPPED)":"")+(tmp.z.truckEffect.gte(1.2e11)?" (HARDCAPPED)":"") }],
                               ["clickable",13],
                                         "blank",
                                      
     
       
      ],
    tooltipLocked() {return "You will definitely not kill me!"},
 hotkeys: [
        {
            key:"z", description: "Z: Reset for zombies", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],


      prestigeButtonText() { 
        if (!this.canBuyMax())  return "Kill this zombie, but transcends everything by resetting everything, but you will kill "+formatWhole(tmp[this.layer].resetGain)+" Zombies.<br><br> Req: " + formatWhole(tmp[this.layer].nextAt) + " PA points"
        if (this.canBuyMax())  return "Kill this zombie, but transcends everything by resetting everything, but you will kill "+formatWhole(tmp[this.layer].resetGain)+" Zombies.<br><br> Next zombie at " + formatWhole(tmp[this.layer].nextAtDisp) + " PA points"
    },
        getResetGain() {
        return getResetGain(this.layer, useType = "static")
    },
    getNextAt(canMax=false) { //  
        return getNextAt(this.layer, canMax, useType = "static")
    },
    canReset() {
        return tmp[this.layer].baseAmount.gte(tmp[this.layer].nextAt)
    },
    clickables: {
        11: {
        title() {return "Assort 1 zombie into a Zombified Exponent"},
   
        canClick() {
            return player.z.points.gte(1)
        },
     
        onClick() {
  
       
        if (!hasMilestone("truck",13))    player.z.points = player.z.points.sub(1)
        player.z.zombifiedExponent = player.z.zombifiedExponent.add(1).times(tmp.s.corei3Effect)
       
        },
     
        style: {'height':'64px','width':'185px'},
    
        
       
    },
     12: {
        title() {return "Assort 1 zombie into a Zombified Sector"},
   
        canClick() {
            return player.z.points.gte(1)
        },
     
        onClick() {
  
       
           if (!hasMilestone("truck",13)) player.z.points = player.z.points.sub(1)
        player.z.zombifiedSector = player.z.zombifiedSector.add(1).times(tmp.s.corei3Effect)
       
        },
     
        style: {'height':'64px','width':'185px'},
    
        
       
    },
     13: {
        title() {return "Assort 1 zombie into a Zombified Truck"},
   
        canClick() {
            return player.z.points.gte(1)
        },
     
        onClick() {
  
       
          if (!hasMilestone("truck",13))  player.z.points = player.z.points.sub(1)
        player.z.zombifiedTruck = player.z.zombifiedTruck.add(1).times(tmp.s.corei3Effect)
       
        },
     
        style: {'height':'64px','width':'185px'},
    
        
       
    },
      21: {
        title() {return "Reset Assortments"},
   
        canClick() {
            return player.z.zombifiedSector.gte(1)||player.z.zombifiedExponent.gte(1)||player.z.zombifiedTruck.gte(1)
        },
     
        onClick() {
      if (!confirm("Are you sure you want to reset your current Zombie Assortments? Your Zombies will NOT get refunded.")) return;
       
  if (!hasMilestone("truck",15))player.points = new Decimal(0)
         if (!hasMilestone("truck",17))   player.ex.points = new Decimal(0)
           if (!hasMilestone("truck",17))     player.ic.points = new Decimal(0)
              if (!hasMilestone("truck",17))      player.o.points = new Decimal(0)
                if (!hasMilestone("truck",17))        player.p.points = new Decimal(0)

           if (!hasMilestone("truck",17))     player.s.points = new Decimal(0)
           if (!hasMilestone("truck",17))      player.ic.energy = new Decimal(0)
           if (!hasMilestone("truck",17))             player.ic.element = new Decimal(0)
          if (!hasMilestone("truck",17))       player.s.affinity = new Decimal(0)
          if (!hasMilestone("truck",17))       player.s.furtherPoints = new Decimal(0)
             
           if (!hasMilestone("truck",17))      player.c.points = new Decimal(0)
            if (!hasMilestone("truck",17))     player.wi.cookies = new Decimal(0)
            if (!hasMilestone("truck",17))     player.ic.elements = new Decimal(0)
       if (!hasMilestone("truck",8)) player.tr.points = new Decimal(0)
    if (!hasMilestone("truck",12))  player.ex.upgrades = [11,15,21]
   if (!hasMilestone("truck",0)) player.ic.upgrades = [11,12,13,14,16,21]
    if (!hasMilestone("truck",3))   player.s.upgrades = [11,24,27]
    if (!hasMilestone("truck",5))  player.pa.upgrades = [31,32,47,52]
   if (!hasMilestone("truck",2))    player.c.upgrades = [12,41]
      if (!hasMilestone("truck",4))  player.wi.upgrades = []
     if (!hasMilestone("truck",8))  player.truck.upgrades = []
          if (!hasMilestone("truck",17)) player.pa.points = new Decimal(0)

        if (!hasMilestone("truck",17))   player.s.pointsInCheeseburger = new Decimal(0)
	      if (!hasMilestone("truck",17)) for (let i=11;i<=16;i++) player.s.buyables[i] = new Decimal(0);
         if (!hasMilestone("truck",17))  	for (let i=21;i<=24;i++) player.s.buyables[i] = new Decimal(0);
          if (!hasMilestone("truck",17))     player.s.affinityIAmount = new Decimal(0);
           if (!hasMilestone("truck",17))      player.s.affinityIIAmount = new Decimal(0);
            if (!hasMilestone("truck",17))       player.s.affinityIIIAmount = new Decimal(0);
       if (!hasMilestone("truck",8))   player.truck.pointsinTrucking = new Decimal(0)
          if (!hasMilestone("truck",17)) 	for (let i=21;i<=33;i++) player.ic.buyables[i] = new Decimal(0);
           if (!hasMilestone("truck",17))    player.ic.uniDimILvl = new Decimal(0)
             if (!hasMilestone("truck",17))    player.ic.uniDimIILvl = new Decimal(0)
             if (!hasMilestone("truck",17))      player.ic.uniDimIIILvl = new Decimal(0)

              if (!hasMilestone("truck",17))     player.ic.elementsDimILvl = new Decimal(0)
                if (!hasMilestone("truck",17))     player.ic.elementsDimIILvl = new Decimal(0)
              if (!hasMilestone("truck",17))           	for (let i=41;i<=69;i++) player.ic.buyables[i] = new Decimal(0);
                if (!hasMilestone("truck",17))              	for (let i=11;i<=99;i++) player.p.buyables[i] = new Decimal(0);

           if (!hasMilestone("truck",17))    player.s.expansion = new Decimal(0);
              if (!hasMilestone("truck",17))       player.s.expansionII = new Decimal(0);
              if (!hasMilestone("truck",17))             player.s.expansionIII = new Decimal(0);
                   if (!hasMilestone("truck",17))              player.s.expansionIV = new Decimal(0);

                if (!hasMilestone("truck",17))       player.s.corruption = new Decimal(0);
       doReset("z",true);
       
        },
     
        style: {'height':'64px','width':'185px'},
    
        
       
    },
     31: {
        display() {return "Force a Zombie reset (useful when you are stuck)"},
     tooltip() {return "Before trucking up, check if you have everything purchased (like all Sector upgrades, even the Cheeseburger ones, Willy upgrades, etc)."},
        canClick() {
            return player.z.unlocked
        },
     
        onClick() {
      if (!confirm("Are you sure you want to do this? It forces a Zombie reset but you get no Zombies at all.")) return;
       
      
   if (!hasMilestone("truck",15))player.points = new Decimal(0)
         if (!hasMilestone("truck",17))   player.ex.points = new Decimal(0)
           if (!hasMilestone("truck",17))     player.ic.points = new Decimal(0)
              if (!hasMilestone("truck",17))      player.o.points = new Decimal(0)
                if (!hasMilestone("truck",17))        player.p.points = new Decimal(0)

           if (!hasMilestone("truck",17))     player.s.points = new Decimal(0)
           if (!hasMilestone("truck",17))      player.ic.energy = new Decimal(0)
           if (!hasMilestone("truck",17))             player.ic.element = new Decimal(0)
          if (!hasMilestone("truck",17))       player.s.affinity = new Decimal(0)
          if (!hasMilestone("truck",17))       player.s.furtherPoints = new Decimal(0)
             
           if (!hasMilestone("truck",17))      player.c.points = new Decimal(0)
            if (!hasMilestone("truck",17))     player.wi.cookies = new Decimal(0)
            if (!hasMilestone("truck",17))     player.ic.elements = new Decimal(0)
       if (!hasMilestone("truck",8)) player.tr.points = new Decimal(0)
    if (!hasMilestone("truck",12))  player.ex.upgrades = [11,15,21]
   if (!hasMilestone("truck",0)) player.ic.upgrades = [11,12,13,14,16,21]
    if (!hasMilestone("truck",3))   player.s.upgrades = [11,24,27]
    if (!hasMilestone("truck",5))  player.pa.upgrades = [31,32,47,52]
   if (!hasMilestone("truck",2))    player.c.upgrades = [12,41]
      if (!hasMilestone("truck",4))  player.wi.upgrades = []
     if (!hasMilestone("truck",8))  player.truck.upgrades = []
          if (!hasMilestone("truck",17)) player.pa.points = new Decimal(0)

        if (!hasMilestone("truck",17))   player.s.pointsInCheeseburger = new Decimal(0)
	      if (!hasMilestone("truck",17)) for (let i=11;i<=16;i++) player.s.buyables[i] = new Decimal(0);
         if (!hasMilestone("truck",17))  	for (let i=21;i<=24;i++) player.s.buyables[i] = new Decimal(0);
          if (!hasMilestone("truck",17))     player.s.affinityIAmount = new Decimal(0);
           if (!hasMilestone("truck",17))      player.s.affinityIIAmount = new Decimal(0);
            if (!hasMilestone("truck",17))       player.s.affinityIIIAmount = new Decimal(0);
       if (!hasMilestone("truck",8))   player.truck.pointsinTrucking = new Decimal(0)
          if (!hasMilestone("truck",17)) 	for (let i=21;i<=33;i++) player.ic.buyables[i] = new Decimal(0);
           if (!hasMilestone("truck",17))    player.ic.uniDimILvl = new Decimal(0)
             if (!hasMilestone("truck",17))    player.ic.uniDimIILvl = new Decimal(0)
             if (!hasMilestone("truck",17))      player.ic.uniDimIIILvl = new Decimal(0)

              if (!hasMilestone("truck",17))     player.ic.elementsDimILvl = new Decimal(0)
                if (!hasMilestone("truck",17))     player.ic.elementsDimIILvl = new Decimal(0)
              if (!hasMilestone("truck",17))           	for (let i=41;i<=69;i++) player.ic.buyables[i] = new Decimal(0);
                if (!hasMilestone("truck",17))              	for (let i=11;i<=99;i++) player.p.buyables[i] = new Decimal(0);

           if (!hasMilestone("truck",17))    player.s.expansion = new Decimal(0);
              if (!hasMilestone("truck",17))       player.s.expansionII = new Decimal(0);
              if (!hasMilestone("truck",17))             player.s.expansionIII = new Decimal(0);
                   if (!hasMilestone("truck",17))              player.s.expansionIV = new Decimal(0);

                if (!hasMilestone("truck",17))       player.s.corruption = new Decimal(0);
       doReset("z",true);
       
       
        },
     
        style: {'height':'95px','width':'95px'},
    
        
       
    },
    },
    expEffect() {
 if (!player.z.unlocked) return new Decimal(1)
        let eff = Decimal.pow(1.05, player.z.zombifiedExponent.plus()).max(0);
          let effSoftcap = new Decimal(1000)
    if (eff.gte(effSoftcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(effSoftcap)).pow(9/6)).mul(effSoftcap)
    return eff;
},
sectorEffect() {
 if (!player.z.unlocked) return new Decimal(1)
        let eff = Decimal.pow(1.03, player.z.zombifiedSector.plus()).max(0);
    let effSoftcap = new Decimal("1e10000")
    if (eff.gte(effSoftcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(effSoftcap)).pow(3/6)).mul(effSoftcap)
    return eff;
},
effHardcap() {
    let hardcap = new Decimal(1.2e11)
    return hardcap;
},
truckEffect() {
 if (!player.z.unlocked) return new Decimal(1)
        let eff = Decimal.pow(1.01, player.z.zombifiedTruck.plus()).max(0);
  
        let effSoftcap = new Decimal(3.3)
    if (eff.gte(effSoftcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(effSoftcap)).pow(12/6)).mul(effSoftcap)
           let effSoftcap2 = new Decimal(1e9)
    if (eff.gte(effSoftcap2)) eff = Decimal.pow(10,Decimal.log10(eff.div(effSoftcap2)).pow(2/6)).mul(effSoftcap2)
        if (eff.gte(1.2e11)) return new Decimal(1.2e11)

    return eff;
},
   resetsNothing() {return true},
     canBuyMax() {return hasMilestone("truck",12)},
onPrestige() {
      if (!hasMilestone("truck",15))player.points = new Decimal(0)
         if (!hasMilestone("truck",17))   player.ex.points = new Decimal(0)
           if (!hasMilestone("truck",17))     player.ic.points = new Decimal(0)
              if (!hasMilestone("truck",17))      player.o.points = new Decimal(0)
                if (!hasMilestone("truck",17))        player.p.points = new Decimal(0)

           if (!hasMilestone("truck",17))     player.s.points = new Decimal(0)
           if (!hasMilestone("truck",17))      player.ic.energy = new Decimal(0)
           if (!hasMilestone("truck",17))             player.ic.element = new Decimal(0)
          if (!hasMilestone("truck",17))       player.s.affinity = new Decimal(0)
          if (!hasMilestone("truck",17))       player.s.furtherPoints = new Decimal(0)
             
           if (!hasMilestone("truck",17))      player.c.points = new Decimal(0)
            if (!hasMilestone("truck",17))     player.wi.cookies = new Decimal(0)
            if (!hasMilestone("truck",17))     player.ic.elements = new Decimal(0)
       if (!hasMilestone("truck",8)) player.tr.points = new Decimal(0)
    if (!hasMilestone("truck",12))  player.ex.upgrades = [11,15,21]
   if (!hasMilestone("truck",0)) player.ic.upgrades = [11,12,13,14,16,21]
    if (!hasMilestone("truck",3))   player.s.upgrades = [11,24,27]
    if (!hasMilestone("truck",5))  player.pa.upgrades = [31,32,47,52]
   if (!hasMilestone("truck",2))    player.c.upgrades = [12,41]
      if (!hasMilestone("truck",4))  player.wi.upgrades = []
     if (!hasMilestone("truck",8))  player.truck.upgrades = []
          if (!hasMilestone("truck",17)) player.pa.points = new Decimal(0)

        if (!hasMilestone("truck",17))   player.s.pointsInCheeseburger = new Decimal(0)
	      if (!hasMilestone("truck",17)) for (let i=11;i<=16;i++) player.s.buyables[i] = new Decimal(0);
         if (!hasMilestone("truck",17))  	for (let i=21;i<=24;i++) player.s.buyables[i] = new Decimal(0);
          if (!hasMilestone("truck",17))     player.s.affinityIAmount = new Decimal(0);
           if (!hasMilestone("truck",17))      player.s.affinityIIAmount = new Decimal(0);
            if (!hasMilestone("truck",17))       player.s.affinityIIIAmount = new Decimal(0);
       if (!hasMilestone("truck",8))   player.truck.pointsinTrucking = new Decimal(0)
          if (!hasMilestone("truck",17)) 	for (let i=21;i<=33;i++) player.ic.buyables[i] = new Decimal(0);
           if (!hasMilestone("truck",17))    player.ic.uniDimILvl = new Decimal(0)
             if (!hasMilestone("truck",17))    player.ic.uniDimIILvl = new Decimal(0)
             if (!hasMilestone("truck",17))      player.ic.uniDimIIILvl = new Decimal(0)

              if (!hasMilestone("truck",17))     player.ic.elementsDimILvl = new Decimal(0)
                if (!hasMilestone("truck",17))     player.ic.elementsDimIILvl = new Decimal(0)
              if (!hasMilestone("truck",17))           	for (let i=41;i<=69;i++) player.ic.buyables[i] = new Decimal(0);
                if (!hasMilestone("truck",17))              	for (let i=11;i<=99;i++) player.p.buyables[i] = new Decimal(0);

           if (!hasMilestone("truck",17))    player.s.expansion = new Decimal(0);
              if (!hasMilestone("truck",17))       player.s.expansionII = new Decimal(0);
              if (!hasMilestone("truck",17))             player.s.expansionIII = new Decimal(0);
                   if (!hasMilestone("truck",17))              player.s.expansionIV = new Decimal(0);

                if (!hasMilestone("truck",17))       player.s.corruption = new Decimal(0);
},


})


