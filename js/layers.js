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
    exponent: 2, // Prestige currency exponent
    base: 4,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("ex",14)) mult = mult.div(5)

        if (hasUpgrade("ex",16)) mult = mult.div(upgradeEffect("ex",16))
        return mult
    },

   
 
    
	effectDescription() {
        return "which are generating "+format(tmp.ex.effect)+" Exponent Points/sec"
    },
    
    update(diff) {
        if (hasUpgrade("ex",11)) player.ex.expPoints = player.ex.expPoints.plus(tmp.ex.effect.times(diff));
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

   

        return exp
    },
    onPrestige() {
        player.ex.expPoints = new Decimal(0);

    },
    doReset(resettingLayer) {

        let keep = [];

     
     
        if (layers[resettingLayer].row > this.row) layerDataReset("ex", keep)
    },
  baseEff() {
return new Decimal(1.05)
  },
    effect() {
 if (!player.ex.unlocked) return new Decimal(0)
        let eff = Decimal.pow(this.baseEff(), player.ex.points.plus()).sub(1).max(0);
 if (hasUpgrade("ex",13)) eff = eff.times(upgradeEffect("ex",12))
    

if (getBuyableAmount("ex",12).gte(1)) eff = eff.times(tmp.ex.buyables[12].effect.first)

    if (hasUpgrade("ex",22)) eff = eff.pow(upgradeEffect("ex",22))

      if (hasUpgrade("ex",24)) eff = eff.pow(1.05)
     
        if (hasUpgrade("ex",25)) eff = eff.pow(1.03)
        if (hasUpgrade("ex",26)) eff = eff.pow(1.015)

            
    if (hasUpgrade("ex",27)) eff = eff.times(upgradeEffect("ex",27))
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

    doReset(resettingLayer) {
        let keep = [];
    
 
    
        if (layers[resettingLayer].row > this.row) layerDataReset("ex", keep)
    },
    buyables: {
      
        11: {
            title: "Base Point Adder",
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
           
            effect() {
                
             
                let eff = player.ex.expPoints.plus(1).pow(0.3).pow(hasUpgrade("ex",31) ? 1.2 : 1)

             
                return eff;
            },
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
            effectDisplay() { return format(tmp.ex.upgrades[12].effect)+"x" },
            unlocked() {return hasUpgrade("ex",11)},
            tooltip() {return "ExpPoint+1<sup>0.3</sup>"+(hasUpgrade("ex",31) ? "^1.2" : "")} ,
        },

        13: {
            title: "Exponent Points Multiplier",
            description: "Exponent Points multiply their own gen.",
            cost: new Decimal(5),
            effect() {
                
             
                let eff = player.ex.expPoints.plus(1).pow(0.15);

             
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
            description: "Each upgrade purchased adds to Points Multiplier base..",
            cost: new Decimal(1e17),
            currencyDisplayName: "exponent points",
            currencyInternalName: "expPoints",
            currencyLayer: "ex",
            effect() {
                let eff = Decimal.pow(1.2, player.ex.upgrades.length).floor();

                return eff;
            },
            effectDisplay() { return "+"+format(tmp.ex.upgrades[31].effect) },
            unlocked() {return hasUpgrade("ex",27)},
            tooltip() {return "floor(ExpUpgradePurchased<sup>1.2</sup>)"} ,
        },
    },
})
