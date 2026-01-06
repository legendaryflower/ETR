addLayer("ex", {
    name: "exponent", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EX", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
  expPoints: new Decimal(0),
    }},
    color: "#4BDC13",
    color2: "#2d9e00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "exponent coins", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {let base = new Decimal(2) 
        if (inChallenge("pa",11)) return new Decimal(2)
 if (hasUpgrade("ic",37)) base = base.sub(0.5)
    if (hasUpgrade("s",52)&&inChallenge("s",11)) base = base.sub(0.3)
        return base;
    }, // Prestige currency exponent
    base() {let base = new Decimal(4)
if (getBuyableAmount("p",12).gte(1)) base = base.sub(tmp.p.buyables[12].effect)
        return base;
    },
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

          
        return mult
    },

   
 canBuyMax() {return hasUpgrade("ic",25)},    
	effectDescription() {
        return "which are generating "+format(tmp.ex.effect)+" Exponent Points/sec"+(tmp.ex.effect.gte(tmp.ex.effSoftcap)?" (SOFTCAPPED)":"")
    },

    update(diff) {
        if (hasUpgrade("ex",11)) player.ex.expPoints = player.ex.expPoints.plus(tmp.ex.effect.times(diff));
        if (hasChallenge("ic",11)) layers.ex.buyables[11].buyMax();
        if (hasChallenge("ic",12)) layers.ex.buyables[12].buyMax();
        if (hasAchievement("ach",32)) layers.ex.buyables[13].buyMax();
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

   

        return exp
    },
    onPrestige() {
      if (!hasUpgrade("ic",14)||hasUpgrade("s",11))  player.ex.expPoints = new Decimal(0);

    },
    autoPrestige() {return hasUpgrade("ic",12)},
    resetsNothing() {return hasUpgrade("ic",12)},
    doReset(resettingLayer) {

        let keep = [];
   
     
      if (hasUpgrade("ic",11)) keep.push("upgrades")
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

        return eff;
    },

    effSoftcap() {
        let cap = new Decimal("1e4100")
     if (hasUpgrade("s",37)) cap = cap.times(upgradeEffect("s",37))
        if (hasUpgrade("pa",45)) cap = cap.pow(upgradeEffect("pa",45))
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
                return base;
            },
            pegasus() {
                let pegasus = new Decimal(1)
          if (hasUpgrade("s",66)) pegasus = pegasus.times(upgradeEffect("s",66))
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

              
                if (x.gte(0)) eff.first = Decimal.pow(3, x.pow(1.1))
                    
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
            cost: new Decimal(2.75),
           softcapStart() {let start = new Decimal(1e17)
          if (hasUpgrade("c",11)) start = start.times(upgradeEffect("c",11))
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
            cost: new Decimal(5),
            softcapStart() {let start = new Decimal(2e71)
          
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
            cost: new Decimal(15),
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
      
            unlocked() {return hasUpgrade("ex",13)},
            
        },
        15: {
            title: "Buyable I",
            description: "Unlock a new Buyable.",
            cost: new Decimal(60),
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
      
            unlocked() {return hasUpgrade("ex",14)},
            
        },
        16: {
            title: "Night Adder",
            description: "Each upgrade purchased divides Exponent Coin's req.",
            cost: new Decimal(20000),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            effect() {
                let eff = Decimal.pow(1.4, player.ex.upgrades.length);
                if (getBuyableAmount("ex",13).gte(1)) eff = eff.times(tmp.ex.buyables[13].effect.first)
                if (hasUpgrade("c",24)) eff = eff.times(3.5)
             if (getBuyableAmount("ic",45).gte(1)) eff = eff.pow(tmp.ic.buyables[45].effect.first)
                if (hasAchievement("ach",41)) eff = eff.pow(2)
                    if (hasUpgrade("pa",14)) eff = eff.times(upgradeEffect("pa",14))
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
            cost: new Decimal(200000),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            
            unlocked() {return hasUpgrade("ex",17)},
            
        },
        22: {
            title: "Nightadding Booster",
            description: "Each upgrade purchased raises Exponent Points gain.",
            cost: new Decimal(2500),
            cap() { let cap = new Decimal(2500)
 if (hasUpgrade("pa",13)) cap = cap.add(500)
              if (hasUpgrade("pa",35)) cap = cap.pow(2)
                               return cap; },
                           
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
            effect() {
                let eff = Decimal.pow(1.05, player.ex.upgrades.length).min(tmp.ex.upgrades[this.id].cap);;
                if (player.truck.inTrucking.gte(1)) eff = eff.root(3)
                if (player.s.unlocked) eff =eff.times(2)
                if (inChallenge("s",11)) eff = eff.root(2)
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
    },
})
addLayer("ic", {
    name: "incremental", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "IC", // This appears on the layer's node. Default is the id with the first letter capitalized
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
        return mult
    },

   
 

    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

   

        return exp
    },
   
    softcap: new Decimal("1e1500"), 
    softcapPower: new Decimal(0.5), 

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
        if (hasUpgrade("s",12)) keep.push("upgrades")
        if (hasUpgrade("s",14)) keep.push("challenges")
            if (hasMilestone("pa",0)) keep.push("challenges")

          if (hasMilestone("pa",1)) keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("ic", keep)
    },

update(diff) {
if (getBuyableAmount("ic",21).gte(1)) player.ic.energy = player.ic.energy.add(getBuyableAmount("ic",21).times(diff)).add(player.ic.uniDimILvl.pow(hasAchievement("ach",41) ? 1.05 : 1))
    if (getBuyableAmount("ic",22).gte(1)) player.ic.uniDimILvl = player.ic.uniDimILvl.add(getBuyableAmount("ic",22).times(diff)).add(player.ic.uniDimIILvl.add(1).pow(5).pow(hasAchievement("ach",41) ? 1.05 : 1))

if (getBuyableAmount("ic",23).gte(1)) player.ic.uniDimIILvl = player.ic.uniDimIILvl.add(getBuyableAmount("ic",23).times(diff)).add(player.ic.uniDimIIILvl.add(1).pow(5))

    
if (getBuyableAmount("ic",24).gte(1)) player.ic.uniDimIIILvl = player.ic.uniDimIIILvl.add(getBuyableAmount("ic",24).times(diff))
        if (getBuyableAmount("ic",31).gte(1)) player.ic.elements = player.ic.elements.add(getBuyableAmount("ic",31).times(diff)).add(player.ic.elementsDimILvl.pow(tmp.ic.buyables[42].effect.first).pow(hasAchievement("ach",41) ? 1.05 : 1))

            if (getBuyableAmount("ic",32).gte(1)) player.ic.elementsDimILvl = player.ic.elementsDimILvl.add(getBuyableAmount("ic",32).times(diff)).add(player.ic.elementsDimIILvl.add(1).pow(5).pow(hasAchievement("ach",41) ? 1.05 : 1))
                if (getBuyableAmount("ic",33).gte(1)) player.ic.elementsDimIILvl = player.ic.elementsDimIILvl.add(getBuyableAmount("ic",33).times(diff).pow(hasAchievement("ach",41) ? 1.05 : 1))
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
        if (player.ic.elements.gte(tmp.ic.elementHardcap)) player.ic.elements = new Decimal(tmp.ic.elementHardcap)
},

elementHardcap() {
let cap = new Decimal(1e80)
if (hasUpgrade("truck",11)) cap = cap.times(1e20)
    if (player.s.intel.gte(5)) cap = cap.pow(tmp.s.pentiumIIIEffect)
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
                if (x.gte(0)) eff.first = Decimal.pow(1.8, x.pow(1.3))
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
                if (x.gte(0)) eff.first = Decimal.pow(1.5, x.pow(1.2))
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
                if (x.gte(0)) eff.first = Decimal.pow(5, x.pow(2))
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
        41: {
            title: "Hydrogen",
            costBase() {
                let base = new Decimal(1.85);
            
              if (player.s.intel.gte(6)) base = base.sub(tmp.s.pentiumIVEffect)
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
            
                if (getBuyableAmount("ic",47).gte(1)) base = base.sub(tmp.ic.buyables[47].effect)
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
            
                if (getBuyableAmount("ic",63).gte(1)) base = base.sub(tmp.ic.buyables[63].effect)
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
            
                if (getBuyableAmount("ic",63).gte(1)) base = base.sub(tmp.ic.buyables[63].effect)
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
        61: {
            title: "Oxygen",
            costBase() {
                let base = new Decimal(2.8);
            
            
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
                if (x.gte(0)) eff.first = Decimal.pow(1.01, x.pow(1.01))
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
                  ["display-text", function() { return "You have <h3>"+format(player.ic.elements)+"</h3> Elements, which are dividing Exponent Coins and Orbs req by "+format(tmp.ic.eleEffect)+"."+(tmp.ic.eleEffect.gte("1e645")?" (SOFTCAPPED)":"") }],
                  "blank",
                   ["row", [
                    ["column", [
                        ["row", [["buyable", 21],["buyable", 22],["buyable", 23],["buyable", 24],["buyable", 25]]],
                    ], {width: "15em"}],
                    ["column", [
                        ["row", [["buyable", 31],["buyable", 32],["buyable", 33]]],
                    ], {width: "15em"}],
                    ["column", [
                        ["row", [["buyable", 51]]],
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
    let eff= Decimal.pow(player.ic.energy.plus(1),1.05)
 if (hasUpgrade("ic",23)) eff = eff.pow(1.7)
    if (getBuyableAmount("s",21)) eff = eff.pow(tmp.s.affinityEffect)
        if (hasUpgrade("truck",11)) eff = eff.pow(2)
    return eff;
},
eleEffect() {
    let eff= Decimal.pow(player.ic.elements.plus(1),1.1)

    
    if (player.ex.points.gte(21)||hasUpgrade("ic",33)) eff = eff.pow(9)
        if (getBuyableAmount("s",21)) eff = eff.pow(tmp.s.affinityEffect)
        let softcap = new Decimal(tmp.ic.eleSoftcap)
    if (eff.gte(softcap)) eff = Decimal.pow(10,Decimal.log10(eff.div(softcap)).pow(3/6)).mul(softcap)
    return eff;
},

eleSoftcap() {
    let cap = new Decimal("1e645")

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
        cost: new Decimal(1e8),
   
   
    
        effect() {
                
             
            let eff = player.points.plus(1).pow(0.005)
            if (player.truck.inTrucking.gte(1)) eff = eff.root(3)
            if (inChallenge("s",11)) eff = eff.root(2)
            return eff;
        },
        effectDisplay() { return format(tmp.ic.upgrades[15].effect)+"x" },
        unlocked() {return hasUpgrade("ic",14)},
        tooltip() {return "Points+1<sup>0.005</sup>"},
    },
    16: {
        title: "New Challenges",
        description: "Unlock Challenges. Also, divide exponent coins req by their own amount.",
        cost: new Decimal(1.5e8),
   formula() {
    let formula = new Decimal(0.5)
    if (hasUpgrade("pa",27)) formula = formula.add(1.5)
    return formula;
   },
   
    
        effect() {
                
             
            let eff = player.ex.points.plus(1).pow(tmp.ic.upgrades[16].formula)
       
         
            return eff;
        },
        effectDisplay() { return "/"+format(tmp.ic.upgrades[16].effect) },
        unlocked() {return hasUpgrade("ic",15)},
        tooltip() {return "ExpCoins+1<sup>0.5</sup>"},
    },
    17: {
        title: "The First Glance",
        description: "Points divide exponent coins req.",
        cost: new Decimal(3e8),
   
        softcapStart() {let start = new Decimal(1e150)
          
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
        cost: new Decimal(1e9),
   
   
    
       
        unlocked() {return hasUpgrade("ic",17)},
       
    },
    22: {
        title: "Minificent Ability",
        description: "Points gain is raised 1.1.",
        cost: new Decimal(1.5e9),
   
   
    
       
        unlocked() {return hasUpgrade("ic",21)},
       
    },
    23: {
        title: "A Great Adventure",
        description: "Universe Energy's effect is raised 1.7.",
        cost: new Decimal(1e12),
   
   
    
       
        unlocked() {return hasUpgrade("ic",22)&&player.o.points.gte(4)},
       
    },
    24: {
        title: "Incremented Roots",
        description: "Mostly reduce Exponent Coins req. Also, incremental coins multiplies their own gain.",
        cost: new Decimal(1e13),
        softcapStart() {
            let softcap = new Decimal("1e140")
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
        cost: new Decimal(1e14),
   
   
    
  
        unlocked() {return hasUpgrade("ic",24)},
       
    },
    26: {
        title: "Incremental Thingy",
        description: "Raise Incremental Coins gain by 5. Incremental Coins multiply Points gain.",
        cost: new Decimal(1e14),
   
        softcapStart() {let start = new Decimal(1e40)
          
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
        cost: new Decimal(1e27),
   
   
    
  
         
      
        unlocked() {return hasUpgrade("ic",26)},
    
       
    },
    31: {
        title: "QoL Incremental",
        description: "Gain 100% of Incremental Coins per second, automate Orbs and divide its req by 1e125.",
        cost: new Decimal(1e29),
   
   
    
  
         
      
        unlocked() {return hasUpgrade("ic",27)},
    
       
    },
    32: {
        title: "Arsenal Incremental",
        description: "Points multiply Exponent Points gain.",
        cost: new Decimal(3e31),
        softcapStart() {
            let softcap = new Decimal("1e1300")
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
        description: "Square points gain.",
        cost: new Decimal(1e35),
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",32)},
       
    
       
    },
    34: {
        title: "Not Nice",
        description: "Unlock Universe Dimension III.",
        cost: new Decimal(1e69),
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",33)},
       
    
       
    },
    35: {
        title: "Scaled to the Brim",
        description: "Cost scalings for the first 2 Exponent Buyables are reduced.",
        cost: new Decimal(1e89),
   
   
    
  
         
      
        
        unlocked() {return hasUpgrade("ic",34)},
       
    
       
    },
    36: {
        title: "Unorbbed",
        description: "Orbs base exp is reduced by 1 and it resets nothing.",
        cost: new Decimal(1e89),
        unlocked() {return hasUpgrade("ic",35)},
    },
    37: {
        title: "The Final Glance",
        description: "Square 'The First Glance' upgrade again, and buy max Orbs. Exponent base exponent is subtracted by 0.5.",
        cost: new Decimal(1e105),
        unlocked() {return hasUpgrade("ic",36)},
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
        return base;
    }, // Prestige currency exponent
    base: 5,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.truck.inTrucking.gte(1)) return new Decimal(0)

     if (getBuyableAmount("ic",13).gte(1)) mult = mult.div(tmp.ic.buyables[13].effect.first)
        if (hasUpgrade("ic",25)) mult = mult.div(tmp.ic.eleEffect)
        if (hasUpgrade("ic",31)) mult = mult.div(1e125)
        if (hasUpgrade("s",16)) mult = mult.div(upgradeEffect("s",16))
        return mult
    },
resetsNothing() {return hasUpgrade("ic",36)},
    baseEff() {
        let eff = new Decimal(1.2)

 if (getBuyableAmount("p",13).gte(1)) eff = eff.add(tmp.p.buyables[13].effect)
        return eff;
          },
            effect() {
         if (!player.o.unlocked) return new Decimal(1)
                let eff = Decimal.pow(this.baseEff(), player.o.points.plus()).max(0);
         if (getBuyableAmount("ic",51).gte(1)) eff = eff.times(tmp.ic.buyables[51].effect.first)

            if (hasUpgrade("pa",44)) eff = eff.pow(upgradeEffect("pa",44))
                return eff;
            },
 
            effectDescription() {
                return "which are multiplying Points and Incremental Coins gain, dividing Exponent Coins req by "+format(tmp.o.effect)+"."+(hasChallenge("ic",13)? "<br><br>Due to an Incremental Challenge 13 completion, your Exponent Point gain is raised 1.3.":"")
            },
    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

   

        return exp
    },
   
   

    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["ic","ex"],
    hotkeys: [
        {
            key:"O", description: "O: Reset for orbs", onPress() {
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
        return mult
    },
    passiveGeneration() { return (hasUpgrade("s", 14)?1:0) },
   
 
   
    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

    if (getBuyableAmount("p",14).gte(1)) exp = exp.add(tmp.p.buyables[14].effect)

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
            key:"P", description: "P: Reset for poachers", onPress() {
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

        },
   buyables: {
    11: {
        title: "Poached Exponent",
        costBase() {
            let base = new Decimal(2);
            if (getBuyableAmount("s",12).gte(1)) base = base.sub(tmp.s.buyables[12].effect)
        
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
          
            let eff = {}
            if (x.gte(0)) eff.first = Decimal.pow(1.11, x.pow(1.03))
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

                if (!x.gte(1)) return new Decimal(0)
                let eff = Decimal.plus(0.02, x.times(0.02))

        
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

                if (!x.gte(1)) return new Decimal(0)
                let eff = Decimal.plus(0.015, x.times(0.015))

        
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

                if (!x.gte(1)) return new Decimal(0)
                let eff = Decimal.plus(0.072, x.times(0.072))

        
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
          
            let eff = {}
            if (x.gte(0)) eff.first = Decimal.pow(1.4, x.pow(1.1))
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
   },
   
    layerShown(){return player.ic.unlocked},

  
})

addLayer("s", {
    name: "sectors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
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

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
          if (player.truck.inTrucking.gte(1)) return new Decimal(0)
       if (hasAchievement("ach",42)) mult = mult.times(2)
        if (hasUpgrade("s",26)) mult = mult.times(upgradeEffect("s",26))
            if (hasAchievement("ach",44)) mult = mult.times(8)


                if (hasUpgrade("s",71)) mult = mult.times(upgradeEffect("s",71))

        if (getBuyableAmount("s",13).gte(1)) mult = mult.times(tmp.s.buyables[13].effect.first)
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
        return exp
    },
   
   

    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["o","ex","p"],
    hotkeys: [
        {
            key:"S", description: "S: Reset for sectors", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],

    doReset(resettingLayer) {
        let keep = [];
    
        player.s.cheeseburgers = new Decimal(0);
        player.s.catchedBurgers = new Decimal(0);
        player.s.time = new Decimal(0);
        player.s.cheeseDuration = new Decimal(0);

        if (layers[resettingLayer].row > this.row) layerDataReset("s", keep)
    },
cheeseBurgerDuration() {
  let duration = new Decimal(0.5)

if (hasUpgrade("s",43)) duration = duration.add(0.33)
    if (hasUpgrade("wi",21)) duration = duration.add(upgradeEffect("wi",21))
        if (player.s.cheeseburgerCostPur2.gte(10)) duration = duration.add(tmp.s.clickables[32].effect)
            if (player.pa.unlocked) duration = duration.add(1)
  return duration;
},

cheeseburgerEff() {
 let eff = new Decimal(10).add(tmp.s.clickables[33].effect).div(player.s.cheeseburgers.add(1))
if (player.pa.unlocked) eff = eff.times(100)
 return eff;

},

passiveGeneration() { 
    let passive = new Decimal(0)

    if (hasUpgrade("s",94)) passive = passive.add(1)
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
                  ["display-text", () =>    (inChallenge("s",11)) ? "You have <h2>"+format(player.s.cheeseburgers)+"</h2> Cheeseburgers, translating to your layer multis being multiplied (doesn't affect static layers) by <h2>"+format(tmp.s.cheeseburgerEff)+"</h2>.":""],
                  ["display-image", () =>   (true) ? "TMT.png":""],

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
                  ["row", [["clickable", 61]]],
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
                   ["display-text", function() { return "<h2>AMD:</h2>" }],
                  ["display-text", () =>    (player.s.amd.gte(1)) ? "<b>Am9080 Rewards:</b>":""],
                   "blank",
                    ["display-text", () =>    (player.s.amd.gte(1)) ? "Further-Exponent Points generation is boosted by "+format(tmp.s.am9080Effect)+"x.":""],
                     "blank",
                    ["display-text", () =>    (player.s.amd.gte(2)) ? "Universal Shift's effect is raised by ^"+format(tmp.s.am286Effect)+".":""],
                ]
    
        },
    },
   pentiumEffect() {
     if (!player.pa.unlocked) return new Decimal(1)
     let eff = new Decimal(2)
     if (player.s.intel.gte(1)) eff = eff.add(tmp.s.pentiumPro2Effect)
        if (hasUpgrade("pa",11)) eff = eff.times(1.5)
            if (hasUpgrade("pa",41)) eff = eff.times(2)
     return eff;
   },
    am9080Effect() {
     if (!hasChallenge("pa",11)) return new Decimal(1)
     let eff = new Decimal(1.8)
     return eff;
   },
    am286Effect() {
     if (!hasChallenge("pa",11)) return new Decimal(1)
     let eff = new Decimal(3125)
     return eff;
   },
   pentiumEffect2() {
     if (!player.pa.unlocked) return new Decimal(1)
    let eff = new Decimal(1).times(player.points.pow(0.05).root(8).add(1))
    return eff;
  },
  pentiumProEffect() {
    if (!player.pa.unlocked) return new Decimal(1)
    let eff = new Decimal(16)
    if (player.s.intel.gte(2)) eff = eff.times(tmp.s.pentiumIIEffect)
  
    return eff;
  },
  pentiumPro2Effect() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(0.1)
    if (player.s.intel.gte(4)) eff = eff.add(tmp.s.xeonEffect)
    return eff;
  },
  pentiumIIEffect() {
     if (!player.pa.unlocked) return new Decimal(1)
    let eff = new Decimal(4).times(player.points.pow(0.01).root(32).add(1))

    return eff;
  },
  celeronEffect() {
     if (!player.pa.unlocked) return new Decimal(1)
    let eff = new Decimal(1.0002)
  if (hasUpgrade("pa",16)) eff = eff.add(0.0018)
    if (hasUpgrade("pa",35)) eff= eff.add(0.0982)
    return eff;
  },
  xeonEffect() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(0.1).add(getBasePointGen().pow(0.002).root(32))

    return eff;
  },
  pentiumIIIEffect() {
     if (!player.pa.unlocked) return new Decimal(1)
    let eff = new Decimal(1).add(player.points.add(1).pow(0.002).root(96).log10())

    return eff;
  },
   pentiumIVEffect() {
     if (!player.pa.unlocked) return new Decimal(0)
  let eff = new Decimal(0.1)
 
   if (hasUpgrade("pa",41)) eff = eff.times(1.5)
    return eff;
  },
    itaniumEffect() {
     if (!player.pa.unlocked) return new Decimal(0)
    let eff = new Decimal(1).times(player.s.affinityPoints.pow(0.2).add(1))
 

    return eff;
  },
    affEffect2Power() {
        let eff = player.s.affinityPoints.log10().sub(1.57).times(1.05)
     
        return eff;
    },
    furtherEffect() {
        let eff = player.s.furtherPoints.pow(7).add(1)
        if (hasUpgrade("pa",17)) eff = eff.pow(2)
        return eff;
    },
    furtherPointGen() {
        let eff = player.s.furtherCoins.div(10)
        if (player.s.amd.gte(1)) eff = eff.times(tmp.s.am9080Effect)
            if (hasUpgrade("pa",37)) eff = eff.times(500)
            if (player.s.intel.gte(7)) eff = eff.times(tmp.s.itaniumEffect)
        return eff; 
    },
    challenges: {
        11: {
            name: "TMT's Mighty Cheeseburger",
            challengeDescription: "TMT is eating his cheeseburger and laughs you as you try to fix the errors shown in Console. See another tab to view penalties.",
           
          goal(){
           return new Decimal("1e100000");
                
            
            },
           
            rewardDescription: "Unlock Bifurther-Exponents. Gives a boost to pre-Pashtocha layers. This will change as updates go on.",
         
        },
     
    },
    affinityGeneration() {
    return new Decimal(player.s.affinityIAmount.times(player.s.affinityIIAmount.add(1).times(player.s.affinityIIIAmount.add(1).times(player.s.affinityIVAmount.add(1))))).div(tmp.s.affinityEffect2).times(tmp.s.affinityGenMult)
    },
affinityGenMult() {

let gen = new Decimal(1)

if (getBuyableAmount("ic",46).gte(1)) gen = gen.times(tmp.ic.buyables[46].effect.first)
    return gen;
},
    
    update(diff) {
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
      player.s.affinityPoints = player.s.affinityPoints.plus(tmp.s.affinityGeneration.div(20))

       player.s.furtherPoints = player.s.furtherPoints.plus(tmp.s.furtherPointGen.div(20))
   if (hasUpgrade("pa", 37)) {
         
      layers.s.buyables[21].buyMax();
   layers.s.buyables[22].buyMax();
     layers.s.buyables[23].buyMax();
       layers.s.buyables[24].buyMax();
 
    }
  
    },
    buyables: {
        11: {
            title: "Random Access Memory",
            costBase() {
                let base = new Decimal(1.4);
            
            
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
                Points softcap starts later. <br>Currently: ^"+format(data.effect.first)+"."
                return display;
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.01, x.pow(1.01))
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
        21: {
            title: "Affinity Dimension I",
          
          costBase() {
                let base = new Decimal("1e535");
            
            
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
        
                let target = player.points.max(1).log("1e50");
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
        
                let target = player.points.max(1).log("1e50");
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
        
                let target = player.points.max(1).log("1e50");
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
        
                let target = player.points.max(1).log("1e50");
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
        
                let target = player.points.max(1).log(1024);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("s",91)},
          
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
                        ["row", [["clickable", 11],["clickable", 41],["clickable", 42]]],
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
           
                       let eff = Decimal.pow(1.001, player.s.affinityPoints.plus()).max(0);
                    if (hasUpgrade("c",81)) eff = eff.pow(1.05)
                       return eff;
                   },

                   
    affinityEffect2() {
           
        let eff = Decimal.pow(1.05, player.s.affinityPoints.plus()).max(0);
 if (hasUpgrade("s",61)) eff = eff.root(2)
 if (player.s.affinityPoints.gte(375)) eff = eff.pow(tmp.s.affEffect2Power)
   if (hasUpgrade("pa",32)) eff = eff.root(2)

    
        return eff;
    },

  
  upgrades: {
    11: {
        title: "Massive Start",
        description: "Completely remove the point rooting, exponent coins resetting exponent points, and you will ALWAYS gain points, regardless if you purchased 'Beginning'.",
        cost: new Decimal(1),
        unlocked() {return player.s.unlocked},
       
        style: {'height':'256px','width':'256px'},
       
    },
    12: {
        title: "Inefficient Sectors",
        description: "Keep Incremental Coins upgrade on reset, and base points gain is multiplied by 10.",
        cost: new Decimal(5),
        unlocked() {return player.s.total.gte(5)},
       
    
       
    },
    13: {
        title: "Partition Spacers",
        description: "Points gain is multiplied based on Willy Cookies, and Cookies gain exponent is added by 0.05.",
        cost: new Decimal(5),
        unlocked() {return hasUpgrade("s",12)},
        effect() {
                
             
            let eff = player.wi.cookies.plus(1).pow(0.6)
       
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[13].effect)+"x" },
      
        tooltip() {return "WillyCookies+1<sup>0.6</sup>"},
    
       
    },
    14: {
        title: "Quality of Lification",
        description: "Generate 100% of Poachers, autobuy 'Night Remover', 'Night-night Adder' and 'Orb Points' and Incremental Challenges",
        cost: new Decimal(10),
        unlocked() {return hasUpgrade("s",13)},
        
    
       
    },
    15: {
        title: "Decimated",
        description: "Unlock Corruption.",
        cost: new Decimal(20),
        unlocked() {return hasUpgrade("s",14)},
       
      
   
    
       
    },
    16: {
        title: "NTFS",
        description: "Partition space now boosts Orbs req decreaser.",
        cost: new Decimal(20),
        unlocked() {return hasUpgrade("s",15)},
        effect() {
                
             
            let eff = tmp.s.clickables[11].capacity.plus(1).pow(0.6)
       
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[16].effect)+"x" },
      
        tooltip() {return "Partition+1<sup>0.6</sup>"},
    },
    21: {
        title: "FAT32",
        description: "Partition space is boosted based on its capacity. Points gain is raised 1.1.",
        cost: new Decimal(25),
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
        cost: new Decimal(35),
        unlocked() {return hasUpgrade("s",21)},
  
    },
    23: {
        title: "FAT16",
        description: "Keep Cookie upgrades and unlock new upgrades.",
        cost: new Decimal(40),
        unlocked() {return hasUpgrade("s",22)},
  
    },
    24: {
        title: "APFS",
        description: "Unlock a new Poacher buyable.",
        cost: new Decimal(60),
        unlocked() {return hasUpgrade("s",23)},
  
    },
    25: {
        title: "HFS+",
        description: "Drops the Orbs req exponent by -0.5.",
        cost: new Decimal(80),
        unlocked() {return hasUpgrade("s",24)},
  
    },
    26: {
        title: "ext4",
        description: "Multiply Sectors gain based on Exponent Coins.",
        cost: new Decimal(240),
        effect() {
                
             
       let eff = player.ex.points.plus(1).pow(tmp.s.upgrades[26].formula)
       
         
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
        cost: new Decimal(2500),
       
        unlocked() {return hasUpgrade("s",26)},
  
    },
    31: {
        title: "ext2",
        description: "Keep Poacher buyables on reset and unlock a new Elemental Dimension.",
        cost: new Decimal(6000),
       
        unlocked() {return hasUpgrade("s",27)},
  
    },
    32: {
        title: "XFS",
        description: "Corruption's effect now boosts Partition space, and base points multiplies Partition space.",
        cost: new Decimal(25000),
        effect() {
                
             
            let eff = getBasePointGen().plus(1).pow(0.08)
       
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[32].effect)+"x" },
      
        tooltip() {return "BasePoint+1<sup>0.08</sup>"},
        unlocked() {return hasUpgrade("s",31)},
  
    },
    33: {
        title: "Btrfs",
        description: "Autobuy Partitions and they cost nothing and Sector exp+0.5",
        cost: new Decimal(60000),
      
        unlocked() {return hasUpgrade("s",32)},
  
    },
    34: {
        title: "ReiserFS",
        description: "Willy Cookies now multiply their own gain.",
        cost: new Decimal(1e8),
        effect() {
                
             
            let eff = player.wi.cookies.plus(1).pow(0.1)
       
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[34].effect)+"x" },
      
        tooltip() {return "Willy+1<sup>0.1</sup>"},
        unlocked() {return hasUpgrade("s",33)},
  
    },
    35: {
        title: "ISO 9660",
        description: "Unlock Steal TMT's Cheeseburger",
        cost: new Decimal(7e8),
   
       
        unlocked() {return hasUpgrade("s",34)}
  
    },
    36: {
        title: "UDF",
        description: "Unlocks a new element and is automated.",
        cost: new Decimal(5e16),
   
       
        unlocked() {return hasUpgrade("s",53)}
  
    },
    37: {
        title: "VFAT",
        description: "Exponent Coin generation softcap starts later based on Points.",
        cost: new Decimal(1e17),
        effect() {
                
             
            if (!hasUpgrade("pa",42)) eff = player.points.add(1).log10().root(3).plus(1)
         if (hasUpgrade("pa",42)) eff = player.points.add(1).log10().plus(1)
          if (hasUpgrade("pa",34)) eff = eff.pow(5)
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
       
        unlocked() {return inChallenge("s",11)}
  
    },
    42: {
        title: "Hamburgers",
        description: "Sectors exp+0.5",
        cost: new Decimal(2),
        currencyDisplayName: "catched cheeseburgers",
        currencyInternalName: "catchedBurgers",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",41)&&inChallenge("s",11)}
  
    },
      43: {
        title: "Hold Big Tide",
        description: "Cheeseburger interval is increased by 0.33 seconds.",
        cost: new Decimal(3),
        currencyDisplayName: "catched cheeseburgers",
        currencyInternalName: "catchedBurgers",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",42)&&inChallenge("s",11)}
  
    },
    44: {
        title: "Big Mac",
        description: "Unlock a new Sector buyable and Exponent Coins gain is increased by x1e12 but only in the challenge.",
        cost: new Decimal("1e330"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",43)&&inChallenge("s",11)}
  
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
            if (!inChallenge("s",11)) return new Decimal(1)
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[45].effect)+"x" },
        unlocked() {return hasUpgrade("s",44)&&inChallenge("s",11)}
  
    },
    46: {
        title: "Cheeseburger Nirval",
        description: "Catching Cheeseburger cost increase^^0.8, and unlocks Replicated Cheeseburgers",
        cost: new Decimal("1e354"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",

        unlocked() {return hasUpgrade("s",45)&&inChallenge("s",11)}
  
    },
    51: {
        title: "Autocatcher",
        description: "You will automatically catch TMT's Cheeseburger, and multiply Partition bulk buy by 100.",
        cost: new Decimal("1e355"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",

        unlocked() {return hasUpgrade("s",46)&&inChallenge("s",11)}
  
    },
    52: {
        title: "Genius Sheep",
        description: "While in TMT's Mighty Cheeseburger, Exponent Coins req is reduced even more.",
        cost: new Decimal("1e358"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",

        unlocked() {return hasUpgrade("s",51)&&inChallenge("s",11)}
  
    },
    53: {
        title: "Follow the Midnight Train",
        description: "Unlock Affinity Dimensions.",
        cost: new Decimal("1e370"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",

        unlocked() {return hasUpgrade("s",52)&&inChallenge("s",11)}
  
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
            return eff;
        },
        effect() {
            let eff = Decimal.pow(tmp.s.upgrades[54].effectBase, player.s.upgrades.length);
       
            return eff;
        },
        effectDisplay() { return "^"+format(tmp.s.upgrades[54].effect) },
     
        tooltip() {return "SectorPurchased<sup>1.0015</sup>"} ,
        unlocked() {return hasUpgrade("s",72)&&inChallenge("s",11)}
  
    },
    55: {
        title: "Willy Rootfile",
        description: "Willy Cookies gain is multiplied based on your Base Points.",
        cost: new Decimal("1e530"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        effect() {
                 
            let eff = getBasePointGen().add(1).pow(1.2)
            if (!inChallenge("s",11)) return new Decimal(1)
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[55].effect)+"x" },
     
        tooltip() {return "BasePoints<sup>1.2</sup>+1"} ,
        unlocked() {return hasUpgrade("s",54)&&inChallenge("s",11)}
  
    },
    56: {
        title: "Cheeseburger Breakdown",
        description: "Cheeseburger Cost is automated, and unlock a new set of Cheeseburger Buyables.",
        cost: new Decimal("1e530"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
      
        unlocked() {return hasUpgrade("s",55)&&inChallenge("s",11)}
  
    },
    61: {
        title: "Affinity Stronger",
        description: "Weakens the second Affinity effect slightly.",
        cost: new Decimal("1e530"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
      
        unlocked() {return hasUpgrade("s",56)&&inChallenge("s",11)}
  
    },
    62: {
        title: "Blue Screen of Death",
        description: "Points gain is also boosted by Affinity's effect.",
        cost: new Decimal("1e540"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
      
        unlocked() {return hasUpgrade("s",61)&&inChallenge("s",11)}
  
    },
    63: {
        title: "Your PC/Device needs to be repaired",
        description: "Unlock Nitrogen.",
        cost: new Decimal("1e1000"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
      
        unlocked() {return hasUpgrade("s",62)&&inChallenge("s",11)}
  
    },
    64: {
        title: "A disk read error occurred",
        description: "Unlock a new Sector buyable.",
        cost: new Decimal("1e1013"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
      
        unlocked() {return hasUpgrade("s",63)&&inChallenge("s",11)}
  
    },
    65: {
        title: "BOOTMGR is missing",
        description: "Points raise their own gain.",
        cost: new Decimal("1e1015"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        effect() {
                 
            let eff = player.points.max(1).add(1).log10().log10().root(32)
        
         
            return eff;
        },
        effectDisplay() { return "^"+format(tmp.s.upgrades[65].effect) },
     
        tooltip() {return "log10(log10(√^32 Points))"} ,
        unlocked() {return hasUpgrade("s",64)&&inChallenge("s",11)}
  
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
        
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[66].effect)+"x" },
     
        tooltip() {return "Sectors<sup>0.1</sup>+1"} ,
        unlocked() {return hasUpgrade("s",65)&&inChallenge("s",11)}
  
    },
    71: {
        title: "NFS",
        description: "Boost Sectors gain based on points in TMT's Cheeseburger.",
        cost: new Decimal(1e17),
        effect() {
                
             
            let eff = player.s.pointsInCheeseburger.log10().add(1)
       
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[71].effect)+"x" },
      
        tooltip() {return "log10(PointsIn🍔)+1"},
       
        unlocked() {return hasUpgrade("s",37)}
  
    },
    72: {
        title: "SMB",
        description: "Unlock second Partition.",
        cost: new Decimal(1e19),
      
       
        unlocked() {return hasUpgrade("s",71)}
  
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
        
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[91].effect)+"x" },
     
        tooltip() {return "Sectors<sup>0.3</sup>+1"} ,
        unlocked() {return hasUpgrade("s",66)&&inChallenge("s",11)}
  
    },
    92: {
        title: "NTLDR is compressed",
        description: "Catched cheeeseburger bulk is increased to 10.",
        cost: new Decimal("1e1027"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
    
        unlocked() {return hasUpgrade("s",91)&&inChallenge("s",11)}
  
    },
    93: {
        title: "An operating system wasn't found",
        description: "Points is raised 1.5 in Steal TMT's Cheeseburger.",
        cost: new Decimal("1e1030"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
    
        unlocked() {return hasUpgrade("s",92)&&inChallenge("s",11)}
  
    },
    94: {
        title: "Non-System disk or disk error",
        description: "Cost base for Further-Exponent Points gen is reduced based on Points in Cheeseburger, and generate 100% of Sectors per second.",
        cost: new Decimal("1e1547"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        effect() {
                 
            let eff = player.s.pointsInCheeseburger.log10().root(8).add(1)
        
           if (hasUpgrade("pa",43)) eff = eff.pow(2)
            return eff;
        },
        effectDisplay() { return "/"+format(tmp.s.upgrades[94].effect) },
        tooltip() {return "log10(√^8(PointsInCheeseburger))+1"} ,
        unlocked() {return hasUpgrade("s",93)&&inChallenge("s",11)}
  
    },
    95: {
        title: "Invalid partition table",
        description: "Cheeseburger Points softcap starts later based on Points in Cheeseburger.",
        cost: new Decimal("1e1550"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        effect() {
                 
            let eff = player.s.pointsInCheeseburger.log10().pow(0.02)
        
         
            return eff;
        },
        effectDisplay() { return "^"+format(tmp.s.upgrades[95].effect) },
        tooltip() {return "log10(PointsInCheeseburger<sup>0.02</sup>)"} ,
        unlocked() {return hasUpgrade("s",94)&&inChallenge("s",11)}
  
    },
    96: {
        title: "Error loading operating system",
        description: "Add 0.002 to 'Exponential Corruption' base effect.",
        cost: new Decimal("1e1791"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",95)&&inChallenge("s",11)}
  
    },
    101: {
        title: "Missing operating system",
        description: "Points gain is raised by another 1.5 in Steal TMT's Cheeseburger, but 1.1 outside.",
        cost: new Decimal("1e1799"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",96)&&inChallenge("s",11)}
  
    },
    102: {
        title: "Operating System not found",
        description: "Unlock a new row of Cheeseburger upgrades.",
        cost: new Decimal("1e2725"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",101)&&inChallenge("s",11)}
  
    },
     103: {
        title: "Disk error",
        description: "Unlock a new Poacher buyable, is automated and Poachers multiply their own gain.",
        cost: new Decimal("1e4500"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
         effect() {
                 
            let eff = player.p.points.pow(0.02).add(1)
        
         
            return eff;
        },
        effectDisplay() { return +format(tmp.s.upgrades[103].effect)+"x" },
        tooltip() {return "Poachers<sup>0.02</sup>+1"} ,
        unlocked() {return hasMilestone("pa",7)&&inChallenge("s",11)}
  
    },
     104: {
        title: "Remove disks or other media",
        description: "Raise points by 1.05 while trucking up.",
        cost: new Decimal("1e5100"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        
        unlocked() {return hasMilestone("pa",7)&&inChallenge("s",11)}
  
    },
      105: {
        title: "Reboot and Select Proper Boot Device",
        description: "Triple Pashtocha gains and unlock a new set of Cookie upgrades.",
        cost: new Decimal("1e5700"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
        
        unlocked() {return hasMilestone("pa",7)&&inChallenge("s",11)}
  
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
        
         
            return eff;
        },
        effectDisplay() { return +format(tmp.s.upgrades[106].effect)+"x" },
        tooltip() {return "Orbs<sup>0.5</sup>+1"} ,
        unlocked() {return hasMilestone("pa",7)&&inChallenge("s",11)}
  
    },
    47: {
        title: "Intel",
        description: "Raise Points by 1.1.",
        cost: new Decimal("1e2727"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",102)&&inChallenge("s",11)}
  
    },
    57: {
        title: "AMD",
        description: "Raise Points by another 1.1.",
        cost: new Decimal("1e3007"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",102)&&inChallenge("s",11)}
  
    },
    67: {
        title: "Nvidia",
        description: "Raise Points by yet another 1.1.",
        cost: new Decimal("1e3320"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",102)&&inChallenge("s",11)}
  
    },
    97: {
        title: "Qualcomm",
        description: "Raise Points by fourth another 1.1 and unlock Pashtocha.",
        cost: new Decimal("1e3667"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",102)&&inChallenge("s",11)}
  
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
           return partition;

        },
       
    },
    12: {
        title() {return "Corrupt Data"},
        baseCost() {
            return new Decimal(75)
        },
        cost() {
              let cost = this.baseCost()
              if (player.s.corruption.gte(1)) cost = cost.times(player.s.corruption).max(1).add(1)
            if (player.s.corruption.gte(4)) cost = cost.times(player.s.corruption.pow(1.5)).max(1).add(1)

            if (player.s.corruption.gte(10)) cost = cost.times(player.s.corruption.pow(player.s.corruption.div(10).max(1))).max(1).add(1)
                
            if (player.s.corruption.gte(18)) cost = cost.times(player.s.corruption.pow(player.s.corruption.div(5).max(1).pow(player.s.corruption.sub(17).div(20)))).max(1).add(1)
                if (player.s.corruption.gte(23)) cost = cost.times(player.s.corruption.pow(player.s.corruption.div(5).max(1).pow(player.s.corruption.sub(22).div(5)))).max(1).add(1)
            if (player.pa.unlocked) cost = cost.root(tmp.s.pentiumEffect)
                    return cost.times(player.s.corruption.add(1));

        },
        canClick() {
            return tmp[this.layer].clickables[11].capacity.gte(this.cost())
        },

        onClick() {
        player.s.expansion = new Decimal(0)
       
        player.s.corruption = player.s.corruption.add(1)
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
            let eff = new Decimal(0).add(player.s.cheeseburgerCostPur3.times(2))
          
            return eff;
        },
        unlocked() {return inChallenge("s",11)&&hasUpgrade("s",56)},
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
    let increment = new Decimal(1)

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
        
           return partition;

        },
       
    },
    51: {
        title() {return "Upgrade Intel CPU Type"},
        
        cost() {
              let cost = [10000,1e16,1e60,1e100,1e115,1e165,1e199,1e264,"1.80e308","1e600","1e900","1e1100","1e1600","1e1700","1e2100","1e3500","1e5400","1e10900","1e23400"]
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
              let cost = [1e141,1e170,1e250,"1e400","1e600","1e1200","1e3003","1e4000","1e6700","1e8200","1e11000","1e13000","1e16000","1e17000","1e21000","1e35000","1e54000","1e109000","1e114000","1e150000","1e330000","1e550000","1e790000","1e1.2e6","1e1.7e6","1e3e6","2e1e6"]
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
}
})

addLayer("c", {
    name: "cookie", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
 
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
             if (inChallenge("pa",11)) return new Decimal(1)
        if (player.truck.inTrucking.gte(1)) return new Decimal(0)
        if (inChallenge("s",11)) return new Decimal(1).times(tmp.s.cheeseburgerEff) 
       if (hasUpgrade("c",52)) mult = mult.times(upgradeEffect("c",52))
        if (hasUpgrade("s",22)) mult = mult.pow(10)
            if (hasUpgrade("c",54)) mult = mult.times(upgradeEffect("c",54))
                if (hasAchievement("ach",41)) mult = mult.times(100)
        return mult
    },

    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade("s",13)) exp = exp.add(0.05)

        return exp
    },
   
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

    if (hasUpgrade("wi",12)) passive = passive.add(upgradeEffect("wi",12).div(100))
    return passive; },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    branches: [["ex",2]],
    hotkeys: [
        {
            key:"C", description: "C: Reset for cookies", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],

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
        if (layers[resettingLayer].row > this.row) layerDataReset("c", keep)
    },

    layerShown(){return player.p.unlocked},
    upgrades: {
        11: {
            title: "Cookie Cursor",
            description: "'Points Multiplier' softcap starts later based on your Exponent Points.",
            cost: new Decimal(10),
            unlocked() {return player.c.unlocked},
            effect() {
                

                let eff = player.ex.expPoints.plus(1).pow(0.001);
                if (hasUpgrade("c",61)) eff = eff.times(upgradeEffect("c",61))
             
                return eff;
            },
            tooltip() {return "ExpPoint+1^0.001"} ,
            effectDisplay() { return format(tmp.c.upgrades[11].effect)+"x" },
        },
        21: {
            title: "Cookie Grandma",
            description: "Multiply base point gain based on Points.",
            cost: new Decimal(200),
            unlocked() {return hasUpgrade("c",12)},
            effect() {
                
if (inChallenge("s",11)) return new Decimal(1)
                let eff = player.points.plus(1).pow(0.001);
                if (hasUpgrade("wi",11)) eff = eff.times(upgradeEffect("wi",11))   
             
                return eff;
            },
                   tooltip() {return "Points+1^0.001"},
            effectDisplay() { return format(tmp.c.upgrades[21].effect)+"x" },
          
        },
       22: {
            title: "Cookie Farm",
            description: "Multiply base point gain based on Exponent Points.",
            cost: new Decimal(750),
            unlocked() {return hasUpgrade("c",12)},
            effect() {
                
                if (inChallenge("s",11)) return new Decimal(1)
                let eff = player.ex.expPoints.plus(1).pow(0.005);
                
             
                return eff;
            },
                   tooltip() {return "ExpPoints+1^0.005"},
            effectDisplay() { return format(tmp.c.upgrades[22].effect)+"x" },
          
        },
        23: {
            title: "Cookie Mine",
            description: "Incremental Coin gain is multiplied by your current Base Point.",
            cost: new Decimal(15e3),
            unlocked() {return hasUpgrade("c",12)},
            effect() {
                

                let eff = getBasePointGen().plus(1)
                
             
                return eff;
            },
                   tooltip() {return "BasePoint+1"},
            effectDisplay() { return format(tmp.c.upgrades[23].effect)+"x" },
       
        },
        24: {
            title: "Cookie Factory",
            description: "Autobuy Universe ane Elements buyables every tick. Also, multiply 'Night Adder' by 3.5.",
            cost: new Decimal(1e5),
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
            cost: new Decimal("1e22"),
            unlocked() {return player.s.unlocked},
           
        },
        51: {
            title: "Cookie Temple",
            description: "Cookies add to the first Partition capacity and your first partition now adds to Cookie's direct multi.",
            cost: new Decimal("5e22"),
            unlocked() {return player.s.unlocked},
            effect() {
                

                let eff = player.c.points.add(1).pow(0.04)
                
             
                return eff;
            },
                   tooltip() {return "Cookies<sup>0.04</sup>+1"},
            effectDisplay() { return "+"+format(tmp.c.upgrades[51].effect) },
           
        },
        52: {
            title: "Cookie Wizard Tower",
            description: "Partition space now boosts Cookie gain.",
            cost: new Decimal("1.2e23"),
            unlocked() {return player.s.unlocked},
            effect() {
                

                let eff = tmp.s.clickables[11].capacity.add(1).pow(0.1)
                
             
                return eff;
            },
                   tooltip() {return "FirstSpace<sup>0.1</sup>+1"},
            effectDisplay() { return format(tmp.c.upgrades[52].effect)+"x." },
           
        },
        53: {
            title: "Cookie Shipment",
            description: "Multiply points base gain by 16.",
            cost: new Decimal("1e24"),
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
          
            unlocked() {return hasUpgrade("s",106)},
           
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
        12: {
            title: "Grimoire",
            description: "Unlock Lithium.",
            cost: new Decimal(150),
            unlocked() {return hasUpgrade("c",12)||player.c.points.gte(150)},
            
 
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
    branches: ["s"],
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
              
    return mult;// Factor in any bonuses multiplying gain here.
},
gainExp() {                             // Returns the exponent to your gain of the prestige resource.
    return new Decimal(1)
},                                 // Also the amount required to unlock the layer.
doReset(resettingLayer) {

    let keep = [];
   
   
  
    if (layers[resettingLayer].row > this.row) layerDataReset("pa", keep)


},

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
resetsNothing() {return hasMilestone("pa",6)},

passiveGeneration() { 
    let passive = new Decimal(0)

    if (hasMilestone("pa",7)) passive = passive.add(1)
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
       /* done() {return player[this.layer].total.gte(1e38)}, // Used to determine when to give the milestone
       */

       done() {return false},
        effectDescription: "Unlocks the second Pashtocha challenge.<br>Coming soon in next update",
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
                

                 let eff = player.truck.pointsinTrucking.add(1).log10().pow(0.01)
                
             
                return eff;
            },
                   tooltip() {return "log10(PointsInTruck<sup>0.01</sup>)+1"},
            effectDisplay() { return "^"+format(tmp.pa.upgrades[53].effect)},
              
 
            unlocked() {return hasUpgrade("pa",52)},
             
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
    }
})

