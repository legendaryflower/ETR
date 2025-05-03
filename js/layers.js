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
        if (inChallenge("s",11)) return new Decimal(1).times(tmp.s.cheeseburgerEff) 
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
        if (resettingLayer=="s") player.ex.upgrades.push(11)
     
      if (hasUpgrade("ic",11)) keep.push("upgrades")
        if ((hasAchievement("ach",14))&&resettingLayer=="o"||resettingLayer=="ic"||resettingLayer=="r") keep.push("buyables")
      
        if (layers[resettingLayer].row > this.row) layerDataReset("ex", keep)

   
    },
  baseEff() {
return new Decimal(1.05)
  },
    effect() {
 if (!player.ex.unlocked) return new Decimal(0)
        let eff = Decimal.pow(this.baseEff(), player.ex.points.plus()).sub(1).max(0);
 if (inChallenge("ic",12)) eff = eff.add(1)
 if (hasUpgrade("ex",13)) eff = eff.times(upgradeEffect("ex",12))
    

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
            tooltip() {return "1.5sup>x<sup>1.15</sup></sup>"} ,
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

              
                               return cap; },
                           
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
            effect() {
                let eff = Decimal.pow(1.05, player.ex.upgrades.length).min(tmp.ex.upgrades[this.id].cap);;
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
                if (inChallenge("s",11)) eff = eff.root(2)
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
        if (inChallenge("s",11)) return new Decimal(1).times(tmp.s.cheeseburgerEff) 
        if (player.o.unlocked) mult = mult.times(tmp.o.effect)
        
            if (hasUpgrade("ic",24)) mult = mult.times(upgradeEffect("ic",24))
        if (hasUpgrade("ic",26)) mult = mult.pow(5)

            if (hasUpgrade("c",23)) mult = mult.times(upgradeEffect("c",23))
                if (hasAchievement("ach",41)) mult = mult.times(36)
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
        if (layers[resettingLayer].row > this.row) layerDataReset("ic", keep)
    },

update(diff) {
if (getBuyableAmount("ic",21).gte(1)) player.ic.energy = player.ic.energy.add(getBuyableAmount("ic",21).times(diff)).add(player.ic.uniDimILvl.pow(hasAchievement("ach",41) ? 1.05 : 1))
    if (getBuyableAmount("ic",22).gte(1)) player.ic.uniDimILvl = player.ic.uniDimILvl.add(getBuyableAmount("ic",22).times(diff)).add(player.ic.uniDimIILvl.add(1).pow(5).pow(hasAchievement("ach",41) ? 1.05 : 1))

if (getBuyableAmount("ic",23).gte(1)) player.ic.uniDimIILvl = player.ic.uniDimIILvl.add(getBuyableAmount("ic",23).times(diff))
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


        if (player.ic.elements.gte(1e80)) player.ic.elements = new Decimal(1e80)
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
                if (x.gte(0)) eff.first = Decimal.pow(1.11, x.pow(1.05))
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
                        ["row", [["buyable", 21],["buyable", 22],["buyable", 23]]],
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
   
   
    
        effect() {
                
             
            let eff = player.ex.points.plus(1).pow(0.5)
       
         
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
        title: "Not Nice",
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
  if (hasUpgrade("ic",36)) base = base.sub(1)
    if (hasUpgrade("s",25)) base = base.sub(0.5)
        return base;
    }, // Prestige currency exponent
    base: 5,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (inChallenge("s",11)) return new Decimal(1).times(tmp.s.cheeseburgerEff) 
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
        if (inChallenge("s",11)) return new Decimal(1).times(tmp.s.cheeseburgerEff) 
     if (getBuyableAmount("ic",43).gte(1)) mult = mult.add(1).pow(tmp.ic.buyables[43].effect.first)
        if (hasAchievement("ach",41)) mult = mult.times(600)
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

   buyables: {
    11: {
        title: "Egg",
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
        title: "Pigs",
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
        title: "Birds",
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
        title: "Angry Birds",
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
        title: "Bad Piggies",
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
        expansionII: new Decimal(0),
        cheeseburgerCostPur2: new Decimal(0),
        cheeseburgerCostPur3: new Decimal(0),
        furtherPoints: new Decimal(0),
        furtherCoins: new Decimal(0),
    }},

    color: "lime",
		
    requires: new Decimal("1e930"), // Can be a function that takes requirement increases into account
    resource: "sectors", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {let base = new Decimal(0.005)

        return base;
    }, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
       if (hasAchievement("ach",42)) mult = mult.times(2)
        if (hasUpgrade("s",26)) mult = mult.times(upgradeEffect("s",26))
            if (hasAchievement("ach",44)) mult = mult.times(8)


                if (hasUpgrade("s",71)) mult = mult.times(upgradeEffect("s",71))

        if (getBuyableAmount("s",13).gte(1)) mult = mult.times(tmp.s.buyables[13].effect.first)
        return mult
    },

    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

        if (hasUpgrade("s",42)) exp = exp.add(0.5)
        return exp
    },
   
   

    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["o","ex","p"],
   /* hotkeys: [
        {
            key:"O", description: "O: Reset for orbs", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
*/
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
  return duration;
},

cheeseburgerEff() {
 let eff = new Decimal(10).add(tmp.s.clickables[33].effect).div(player.s.cheeseburgers.add(1))

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
            ["display-text", () =>    (inChallenge("s",11)) ? "You have <h2>"+format(player.s.cheeseburgers)+"</h2> Cheeseburgers, translating to your layer multis being multiplied by <h2>"+format(tmp.s.cheeseburgerEff)+"</h2>.":""],
            
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
                   ["display-text", () =>    (inChallenge("s",11)) ? "You have <h2>"+format(player.s.cheeseburgers)+"</h2> Cheeseburgers, translating to your layer multis being multiplied by <h2>"+format(tmp.s.cheeseburgerEff)+"</h2>.":""],
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
                         ["display-text", () =>    (inChallenge("s",11)) ? "You have <h2>"+format(player.s.cheeseburgers)+"</h2> Cheeseburgers, translating to your layer multis being multiplied by <h2>"+format(tmp.s.cheeseburgerEff)+"</h2>.":""],"blank",
                  "blank",
                  ["row", [["buyable", 11],["buyable", 12],["buyable", 13],["buyable", 14]]],
            ]
    
        },
        "Steal TMT's Cheeseburger": {
          
            unlocked() {return hasUpgrade("s",35)},
                   content: ["main-display",
                   "prestige-button",
                   "resource-display", "blank",
                  "blank",
                  ["display-text", () =>    (inChallenge("s",11)) ? "You have <h2>"+format(player.s.cheeseburgers)+"</h2> Cheeseburgers, translating to your layer multis being multiplied by <h2>"+format(tmp.s.cheeseburgerEff)+"</h2>.":""],
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
                 

                  ["display-text", function() { return "All layer multiplies are at 1, but exponents are unaffected.<br>There is a layer effect that starts based on Cheeseburgers. With no cheeseburgers, the effect is at 10, but you earn TMT's Cheeseburgers Eaten every 0.5 seconds, which negates the effect (can be nerfed via features).<br>You can catch cheeseburgers, with a cost that exponentially increases over time.<br>Base points gain is disabled.<br>Upgrades related to boosting points and exponent points gain is square rooted.<br>Points is square rooted." }],
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
                  ["row", [["buyable", 21],["buyable", 22],["buyable", 23]]],
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
    },
    affEffect2Power() {
        let eff = player.s.affinityPoints.log10().sub(1.57).times(1.05)
        return eff;
    },
    furtherEffect() {
        let eff = player.s.furtherPoints.pow(7).add(1)
        return eff;
    },
    furtherPointGen() {
        let eff = player.s.furtherCoins.div(10)
        return eff; 
    },
    challenges: {
        11: {
            name: "TMT's Mighty Cheeseburger",
            challengeDescription: "TMT is eating his cheeseburger and laughs you as you try to fix the errors shown in Console. See another tab to view penalties.",
           
          goal(){
           return new Decimal("1e75000");
                
            
            },
           
            rewardDescription: "Unlock a new layer: Pashtocha.",
         
        },
     
    },
    affinityGeneration() {
    return new Decimal(player.s.affinityIAmount.times(player.s.affinityIIAmount.add(1).times(player.s.affinityIIIAmount.add(1)))).div(tmp.s.affinityEffect2).times(tmp.s.affinityGenMult)
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
           player.s.pointsInCheeseburger = player.points
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
       if (inChallenge("s", 11)) tmp.s.cheeseBurgerDuration = tmp.s.cheeseBurgerDuration.sub(diff).max(0)
      player.s.affinityPoints = player.s.affinityPoints.plus(tmp.s.affinityGeneration.div(20))

       player.s.furtherPoints = player.s.furtherPoints.plus(tmp.s.furtherPointGen.div(20))
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
            tooltip() {return "1.14<sup>x<sup>1.036/sup></sup>"} ,
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
        21: {
            title: "Affinity Dimension I",
          
          costBase() {
                let base = new Decimal("1e430");
            
            
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
                return player.points.gte(tmp[this.layer].buyables[this.id].cost)&&inChallenge("s",11)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.points = player.points.sub(cost)	
                player.s.affinityIAmount = player.s.affinityIAmount.add(1)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.points.max(1).log("1e90");
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("s",53)},
          
        },
        22: {
            title: "Affinity Dimension II",
          
          costBase() {
                let base = new Decimal("1e430");
            
            
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
                return player.points.gte(tmp[this.layer].buyables[this.id].cost)&&inChallenge("s",11)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.points = player.points.sub(cost)	
                player.s.affinityIIAmount = player.s.affinityIIAmount.add(1)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.points.max(1).log("1e90");
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasAchievement("ach",52)},
          
        },
        23: {
            title: "Affinity Dimension III",
          
          costBase() {
                let base = new Decimal("1e430");
            
            
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
                return player.points.gte(tmp[this.layer].buyables[this.id].cost)&&inChallenge("s",11)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.points = player.points.sub(cost)	
                player.s.affinityIIIAmount = player.s.affinityIIIAmount.add(1)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
        
                let target = player.points.max(1).log("1e90");
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasAchievement("ach",52)},
          
        },
        31: {
            title: "Further-Exponent Coin Generation",
          
            costBase() {
                let base = new Decimal(1024);
            
         if (hasUpgrade("s",94)) base = base.div(upgradeEffect("s",94))
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
                    function() {return "Tip: Spending your sectors will expand your partition's storage by x2.5." },
                        {}],
                        ["row", [["clickable", 11],["clickable", 41]]],
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
                return eff;
            },

    affinityEffect() {
           
                       let eff = Decimal.pow(1.001, player.s.affinityPoints.plus()).max(0);
               
                       return eff;
                   },

                   
    affinityEffect2() {
           
        let eff = Decimal.pow(1.05, player.s.affinityPoints.plus()).max(0);
 if (hasUpgrade("s",61)) eff = eff.root(2)
 if (player.s.affinityPoints.gte(375)) eff = eff.pow(tmp.s.affEffect2Power)
   
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
                
             
            let eff = player.ex.points.plus(1).pow(0.2)
       
         
            return eff;
        },
        effectDisplay() { return format(tmp.s.upgrades[26].effect)+"x" },
      
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
        description: "Autobuy Partitions and they cost nothing.",
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
        cost: new Decimal(1e14),
   
       
        unlocked() {return hasUpgrade("s",53)}
  
    },
    37: {
        title: "VFAT",
        description: "Exponent Coin generation softcap starts later based on Points.",
        cost: new Decimal(3e14),
        effect() {
                
             
            let eff = player.points.log10().root(3).plus(1)
       
         
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
        cost: new Decimal("1e350"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",43)&&inChallenge("s",11)}
  
    },
    45: {
        title: "Undisclosure",
        description: "Gain more points based on Exponent Coins but only in the challenge.",
        cost: new Decimal("1e377"),
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
        cost: new Decimal("1e392"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",

        unlocked() {return hasUpgrade("s",45)&&inChallenge("s",11)}
  
    },
    51: {
        title: "Autocatcher",
        description: "You will automatically catch TMT's Cheeseburger, and multiply Partition bulk buy by 100.",
        cost: new Decimal("1e395"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",

        unlocked() {return hasUpgrade("s",46)&&inChallenge("s",11)}
  
    },
    52: {
        title: "Genius Sheep",
        description: "While in TMT's Mighty Cheeseburger, Exponent Coins req is reduced even more.",
        cost: new Decimal("1e415"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",

        unlocked() {return hasUpgrade("s",51)&&inChallenge("s",11)}
  
    },
    53: {
        title: "Follow the Midnight Train",
        description: "Unlock Affinity Dimensions.",
        cost: new Decimal("1e430"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",

        unlocked() {return hasUpgrade("s",72)&&inChallenge("s",11)}
  
    },
    54: {
        title: "Exponential Corruption",
        description: "Each Sector upgrade purchased raises Points gain.",
        cost: new Decimal("1e530"),
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
        cost: new Decimal("1e580"),
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
        cost: new Decimal("1e580"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
      
        unlocked() {return hasUpgrade("s",55)&&inChallenge("s",11)}
  
    },
    61: {
        title: "Affinity Stronger",
        description: "Weakens the second Affinity effect slightly.",
        cost: new Decimal("1e580"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
      
        unlocked() {return hasUpgrade("s",56)&&inChallenge("s",11)}
  
    },
    62: {
        title: "Blue Screen of Death",
        description: "Points gain is also boosted by Affinity's effect.",
        cost: new Decimal("1e590"),
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
                 
            let eff = player.points.log10().log10().root(32)
        
         
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
        cost: new Decimal(3e14),
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
        cost: new Decimal("1e1017"),
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
        cost: new Decimal("1e2721"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",101)&&inChallenge("s",11)}
  
    },
    47: {
        title: "Intel",
        description: "Raise Points by 1.1.",
        cost: new Decimal("1e2723"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",102)&&inChallenge("s",11)}
  
    },
    57: {
        title: "AMD",
        description: "Raise Points by another 1.1.",
        cost: new Decimal("1e3003"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",102)&&inChallenge("s",11)}
  
    },
    67: {
        title: "Nvidia",
        description: "Raise Points by yet another 1.1.",
        cost: new Decimal("1e3315"),
        currencyDisplayName: "points in Steal TMT's Cheeseburger",
        currencyInternalName: "pointsInCheeseburger",
        currencyLayer: "s",
       
        unlocked() {return hasUpgrade("s",102)&&inChallenge("s",11)}
  
    },
    97: {
        title: "Qualcomm",
        description: "Raise Points by fourth another 1.1 and unlock Pashtocha.",
        cost: new Decimal("1e3663"),
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
              let cost = new Decimal("1e390")
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

       
        display() {return "Cost: "+format(this.cost())+" sectors<br>Increases capacity and increment of previous partition by x"+format(tmp.s.clickables[41].effect)+" bytes.<br>Amount of expansion: "+format(player.s.expansionII)+"."},
       effect() {
           let partition = new Decimal(100).times(player.s.expansionII.times(15)).add(1).max(1)
        
           return partition;

        },
       
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
            cost: new Decimal("1e541"),
            unlocked() {return hasUpgrade("c",24)},
            currencyDisplayName: "points",
            currencyInternalName: "points",
            style: {'height':'256px','width':'256px'},
           
        },
        41: {
            title: "Cookie Bank",
            description: "Unlock Willy.",
            cost: new Decimal("1e18"),
            unlocked() {return player.s.unlocked},
           
        },
        51: {
            title: "Cookie Temple",
            description: "Cookies add to the first Partition capacity and your first partition now adds to Cookie's direct multi.",
            cost: new Decimal("5e19"),
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
            cost: new Decimal("1.2e20"),
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
            cost: new Decimal("1e23"),
            unlocked() {return player.s.unlocked},
           
        },
        54: {
            title: "Cookie Alchemy Lab",
            description: "Cookies now multiplies itself.",
            cost: new Decimal("5e25"),
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
            cost: new Decimal("1e29"),
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
            cost: new Decimal("1e31"),
          
            unlocked() {return hasUpgrade("s",23)},
           
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
        unlocked: true,
        points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
  
    }},
    color: "#AAAAAA",
    row: 4,
    layerShown() {return hasUpgrade("s",97)}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Pashtocha (WIP)")
    },
    branches: ["s"],
   symbol: "PA",
   
    tabFormat: [
        "blank", 
        ["display-text", function() { return "<h2>Pashtocha.</h2>" }],
 "blank",
 "blank",
 ["display-text", function() { return "This layer is currently not finished yet. Check the discord server for more information." }],
    ],
 
})

