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
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "exponent coins", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {let base = new Decimal(2) 
 if (hasUpgrade("ic",37)) base = base.sub(0.5)
        return base;
    }, // Prestige currency exponent
    base: 4,
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
        return "which are generating "+format(tmp.ex.effect)+" Exponent Points/sec"
    },
    
    update(diff) {
        if (hasUpgrade("ex",11)) player.ex.expPoints = player.ex.expPoints.plus(tmp.ex.effect.times(diff));
        if (hasChallenge("ic",11)) layers.ex.buyables[11].buyMax();
        if (hasChallenge("ic",12)) layers.ex.buyables[12].buyMax();
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

   

        return exp
    },
    onPrestige() {
      if (!hasUpgrade("ic",14))  player.ex.expPoints = new Decimal(0);

    },
    autoPrestige() {return hasUpgrade("ic",12)},
    resetsNothing() {return hasUpgrade("ic",12)},
    doReset(resettingLayer) {

        let keep = [];

     
      if (hasUpgrade("ic",11)) keep.push("upgrades")
        if (hasAchievement("ach",14)) keep.push("buyables")
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
        return eff;
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
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Cost: " + formatWhole(data.cost) + " Exponent Points"+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Adds by 1 to base point gain."
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

            return start;
           },
            effect() {
                
             if (inChallenge("ic",13)) return new Decimal(1)
                let eff = player.ex.expPoints.plus(1).pow(0.3).pow(hasUpgrade("ex",31) ? 1.2 : 1)
           
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
            effect() {
                
                if (inChallenge("ic",13)) return new Decimal(1)
                let eff = player.ex.expPoints.plus(1).pow(0.15);
                 if (getBuyableAmount("ic",12).gte(1)) eff = eff.times(tmp.ic.buyables[12].effect.first)
             
                return eff;
            },
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
            effectDisplay() { return format(tmp.ex.upgrades[13].effect)+"x" },
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
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
            effect() {
                let eff = Decimal.pow(1.05, player.ex.upgrades.length);

                return eff;
            },
            effectDisplay() { return "^"+format(tmp.ex.upgrades[22].effect) },
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
        if (player.o.unlocked) mult = mult.times(tmp.o.effect)
        
            if (hasUpgrade("ic",24)) mult = mult.times(upgradeEffect("ic",24))
        if (hasUpgrade("ic",26)) mult = mult.pow(5)
        return mult
    },

   
 

    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

   

        return exp
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
    
 
    
        if (layers[resettingLayer].row > this.row) layerDataReset("ic", keep)
    },

update(diff) {
if (getBuyableAmount("ic",21).gte(1)) player.ic.energy = player.ic.energy.add(getBuyableAmount("ic",21).times(diff)).add(player.ic.uniDimILvl)
    if (getBuyableAmount("ic",22).gte(1)) player.ic.uniDimILvl = player.ic.uniDimILvl.add(getBuyableAmount("ic",22).times(diff)).add(player.ic.uniDimIILvl.add(1).pow(5))

if (getBuyableAmount("ic",23).gte(1)) player.ic.uniDimIILvl = player.ic.uniDimIILvl.add(getBuyableAmount("ic",23).times(diff))
        if (getBuyableAmount("ic",31).gte(1)) player.ic.elements = player.ic.elements.add(getBuyableAmount("ic",31).times(diff)).add(player.ic.elementsDimILvl.pow(tmp.ic.buyables[42].effect.first))

            if (getBuyableAmount("ic",32).gte(1)) player.ic.elementsDimILvl = player.ic.elementsDimILvl.add(getBuyableAmount("ic",32).times(diff))
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
        
                let target = player.ic.points.max(1).log(10).sub(1e10);
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
        
                let target = player.ic.points.max(1).log(10).sub(1e12);
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
        
                let target = player.ic.points.max(1).log(10).sub(1e69);
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
        
                let target = player.ic.points.max(1).log(1000).sub(1e9);
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
        
                let target = player.ic.points.max(1).log(1000).sub(1e6);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'135px'},
            unlocked() {return hasUpgrade("ic",27)},
          
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
            unlocked() {return hasChallenge("ic",2116)},
                   content: ["main-display",
                   "prestige-button",
                   "resource-display", "blank",
                  "blank",
                  ["display-text", function() { return "You have <h3>"+format(player.ic.energy)+"</h3> Universe Energy, which are multiplying Points gain by "+format(tmp.ic.universeEffect)+"." }],
                  "blank",
                  ["display-text", function() { return "You have <h3>"+format(player.ic.elements)+"</h3> Elements, which are dividing Exponent Coins and Orbs req by "+format(tmp.ic.eleEffect)+"." }],
                  "blank",
                   ["row", [
                    ["column", [
                        ["row", [["buyable", 21],["buyable", 22],["buyable", 23]]],
                    ], {width: "15em"}],
                    ["column", [
                        ["row", [["buyable", 31],["buyable", 32]]],
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
                    
                      ["display-text", function() { return "You have <h3>"+format(player.ic.elements)+"</h3> Elements, which are dividing Exponent Coins and Orbs req by "+format(tmp.ic.eleEffect)+"." }],
                      "blank",
                      ["row", [["buyable", 41],["buyable", 42]]],
                   
                    "blank",	"blank",	"blank",	"blank",	"blank",	"blank",	"blank",	"blank",	"blank",
                       ,
                    ],
                  
        
                      
                       
                       
                   },
    
    },
    layerShown(){return hasUpgrade("ex",31)||player.ic.unlocked},
universeEffect() {
    let eff= Decimal.pow(player.ic.energy.plus(1),1.05)
 if (hasUpgrade("ic",23)) eff = eff.pow(1.7)
    return eff;
},
eleEffect() {
    let eff= Decimal.pow(player.ic.elements.plus(1),1.1)
    if (player.ex.points.gte(21)||hasUpgrade("ic",33)) eff = eff.pow(9)
    return eff;
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
        description: "Removes the Exponent Point reseting on Exponent coin reset but forces a Row 2 reset.",
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
   
   
    
        effect() {
                
             
            let eff = player.points.plus(1).pow(0.03)
        if (hasUpgrade("ic",27)) eff = eff.pow(2)
            if (hasUpgrade("ic",37)) eff = eff.pow(2)
            return eff;
        },
        effectDisplay() { return "/"+format(tmp.ic.upgrades[17].effect) },
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
   
   
    
        effect() {
                
             
            let eff = player.ic.points.plus(1).pow(0.1)
       
         
            return eff;
        },
        effectDisplay() { return format(tmp.ic.upgrades[24].effect)+"x" },
        unlocked() {return hasUpgrade("ic",23)},
        tooltip() {return "IncrementCoins+1<sup>0.1</sup>"},
    },
    25: {
        title: "Buymaking Max",
        description: "Buy max Exponent Coins.",
        cost: new Decimal(1e14),
   
   
    
  
        unlocked() {return hasUpgrade("ic",24)},
       
    },
    26: {
        title: "Incremental Thingy",
        description: "Raise Incremental Coins gain by 5. Incremental Coins multiply Points gain.",
        cost: new Decimal(1e14),
   
   
    
  
         
        effect() {
                
             
            let eff = player.ic.points.plus(1).pow(0.07)
       
         
            return eff;
        },
        effectDisplay() { return format(tmp.ic.upgrades[26].effect)+"x" },
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
   
   
    
  
         
      
        effect() {
                
             
            let eff = player.points.plus(1).pow(0.3)
       
         
            return eff;
        },
        effectDisplay() { return format(tmp.ic.upgrades[32].effect)+"x" },
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
        return base;
    }, // Prestige currency exponent
    base: 5,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
     if (getBuyableAmount("ic",13).gte(1)) mult = mult.div(tmp.ic.buyables[13].effect.first)
        if (hasUpgrade("ic",25)) mult = mult.div(tmp.ic.eleEffect)
        if (hasUpgrade("ic",31)) mult = mult.div(1e125)
        return mult
    },
resetsNothing() {return hasUpgrade("ic",36)},
    baseEff() {
        return new Decimal(1.2)
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
    
        return mult
    },

   
 
   
    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

   

        return exp
    },
   
    doReset(resettingLayer) {

        let keep = [];

     
     
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
 
    }},
    color: "darkgreen",
    requires: new Decimal("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee9001"), // Can be a function that takes requirement increases into account
    resource: "sectors", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {let base = new Decimal(3)
  if (hasUpgrade("ic",36)) base = base.sub(1)
        return base;
    }, // Prestige currency exponent
    base: 5,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
   
        return mult
    },

    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

   

        return exp
    },
   
   
tooltipLocked() {return "Coming soon!"},
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
    
 
    
        if (layers[resettingLayer].row > this.row) layerDataReset("s", keep)
    },

    layerShown(){return player.p.unlocked},
   
  
})

addLayer("c", {
    name: "sectors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
 
    }},
    color: "darkgreen",
    requires: new Decimal("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee9001"), // Can be a function that takes requirement increases into account
    resource: "sectors", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {let base = new Decimal(3)
  if (hasUpgrade("ic",36)) base = base.sub(1)
        return base;
    }, // Prestige currency exponent
    base: 5,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
   
        return mult
    },

    
   
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

   

        return exp
    },
   
   
tooltipLocked() {return "Coming soon!"},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    branches: [["ex",2]],
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
    
 
    
        if (layers[resettingLayer].row > this.row) layerDataReset("s", keep)
    },

    layerShown(){return player.p.unlocked},
   
  
})