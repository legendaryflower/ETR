addLayer("p", {
    name: "exponent", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EX", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "exponent coins", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        return mult
    },
    softcap: new Decimal(1000),
    softcapPower: 0.005,
    automate(){
        if (player.p.auto1) {
          setBuyableAmount("p",11,tmp.p.buyables[11].canAfford?player.p.points.div(10).log(6).floor().add(1):getBuyableAmount("p",11))
        }
       
      },
    passiveGeneration() { return (hasMilestone("o", 2))?0.001:0 },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (player.p.unlocked) exp = exp.times(tmp.p.buyables[11].effect.first);
        if (player.o.unlocked) exp = exp.times(tmp.o.buyables[11].effect.first);
       
        if (hasUpgrade("p", 13)) exp = exp.times(upgradeEffect("p", 13));
        if (hasUpgrade("p", 14)) exp = exp.plus(2);
        if(hasUpgrade("p",21)) exp = exp.times(1.1);
        if (hasUpgrade("o", 21)) exp = exp.plus(upgradeEffect("o", 21).ex);
        if (hasUpgrade("p", 25)) exp = exp.plus(5);
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "X", description: "X: Reset for exponent coins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
   /* passiveGeneration() { return (hasMilestone("po", 0))}, */
    doReset(resettingLayer) {
        let keep = [];
    
        if (hasMilestone("o", 0)) keep.push("upgrades")
    
        if (layers[resettingLayer].row > this.row) layerDataReset("p", keep)
    },
    layerShown(){return true},
    buyables: {
        11: {
            cost(x) { return new Decimal(10).mul(new Decimal(6).pow(x)) },
            title() { return "Exponent Points" },
  
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " exponent coins\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
               Multiplies " + format(data.effect.first) + "x of its exponent "
            },
            effect(x) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.1, x.pow(1.0125))
                else eff.first = Decimal.pow(1/40, x.times(-1).pow(1.0125))
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
                return eff;
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
           
        },
        12: {
            cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(6)) x = x.pow(2).div(2)
                let cost = Decimal.pow(2, x.pow(2.5))
                return cost.floor()
            },
            title() { return "Orb Slasher" },
  
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " exponent coins\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
               Divides Orb's cost requirement by /" + format(data.effect.first) + ". "
            },
            effect(x) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.25, x.pow(1.4))
                else eff.first = Decimal.pow(1/40, x.times(-1).pow(1.5))
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
                return eff;
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return player.o.points.gte(2)}
           
        }
        
    },
    upgrades: {
			
			
        11: {
            title: "Boosting Exponential",
            description: "Exponent coins multiply points gain.",
            cost: new Decimal(1),
            effect() {
                
                
                let eff = player.p.points.plus(2).pow(0.5);
                if (hasUpgrade("o", 12)) eff = eff.times(3);
                
                return eff;
            },
            
            effectDisplay() { return format(tmp.p.upgrades[11].effect)+"x" },
            
        },
        12: {
            title: "Possible Trees",
            description: "Points multiply its own generation",
            cost(){
                if(hasUpgrade("o",11)){
                return new Decimal(25)
            
                }
                else return new Decimal(50)
              },
            effect() {
                
                
                let eff = player.points.plus(1).log10().pow(0.75).plus(1);
    
                
                return eff;
            },
            unlocked() { return hasUpgrade("p", 11) },
            effectDisplay() { return format(tmp.p.upgrades[12].effect)+"x" },
            
        },
        13: {
            title: "Paying Taxes",
            description: "Points boost Exponent Coin's gain.",
            cost(){
                if(hasUpgrade("o",11)){
                return new Decimal(50)
            
                }
                else return new Decimal(100)
              },
            effect() {
                
                
                let eff = player.points.plus(0.5).log10().pow(0.1).plus(0.25);
             
                return eff;
            },
            unlocked() { return hasUpgrade("p", 12) },
            effectDisplay() { return format(tmp.p.upgrades[13].effect)+"x" },
            
        },
        14: {
            title: "Orb Security",
            description: "Orbs cost requirement is divided based on your Exponent coins but effect gets reduced if effect is /8.",
            cost: new Decimal(100000),
            effect() {
                
                
                let eff = player.p.points.plus(0.25).pow(0.25);
                if (eff.gte(8)) eff = eff.div(100).log10().plus(8)
                return eff;
            },
            unlocked() { return player.o.points.gte(4) },
            effectDisplay() { return "/"+format(tmp.p.upgrades[14].effect) },
            
        },
        15: {
            title: "Exponential Function",
            description: "Exponent coin's exponent is added by +2.",
            cost: new Decimal(200000),
           
            unlocked() { return hasMilestone("o", 1) },
          
            
        },
        21: {
            title: "Something That I Didn't Like",
            description: "Exponent coin's exponent is multipled by 1.1, and also divides Orb's cost requirement by 3 times and its exponent is increased a little bit.",
            cost: new Decimal(400000),
           
            unlocked() { return hasMilestone("o", 1) },
          
            
        },
        22: {
            title: "Exponent Exponent",
            description: "Orb's exponent is boosted.",
            cost: new Decimal(1000000),
           
            unlocked() { return hasUpgrade("p", 22)||player.p.points.gte(1e6) },
          
            
        },
        23: {
            title: "Anti-Dubnium Soldiers",
            description: "Make the Orb's exponent reduction at 0.2.",
            cost: new Decimal(1500000),
            onPurchase() {player.o.dubnium = new Decimal(0.2);},
            unlocked() { return hasUpgrade("p", 23)||player.p.points.gte(1.5e6) },
          
            
        },
        24: {
            title: "Enforced Anti-Dubnium Soldiers",
            description: "Make the Orb's exponent reduction at 0.5.",
            cost: new Decimal(500000),
            onPurchase() {player.o.dubnium = new Decimal(0.5);},
            unlocked() { return hasUpgrade("p", 23) },
          
            
        },
        25: {
            title: "Even More Enforced Anti-Dubnium Soldiers",
            description: "Make the Orb's exponent reduction at 0.9 and add Exponent Coin's exponent by 5.",
            cost: new Decimal(650000),
            onPurchase() {player.o.dubnium = new Decimal(0.9);},
            unlocked() { return hasUpgrade("p", 24) },
          
            
        },
        31: {
            title: "Maximum Counts",
            description: "The Orb's exponentation reduction starts at 12 orbs.",
            cost: new Decimal(2500000),
            onPurchase() {player.o.dubStart = new Decimal(12);},
            unlocked() { return hasUpgrade("p", 25) },
          
            
        },
        32: {
            title: "Coming soon!",
            description: "This upgrade is coming soon in an update.",
            cost: new Decimal(0),
            
            unlocked() { return hasUpgrade("p", 31) },
          
            
        }
    
    }

})
addLayer("o", {
    name: "orb", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        dubnium: new Decimal(0.1),
        dubStart: new Decimal(11),
    }},
    base: 5,
    color: "#e83427",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "orbs", // Name of prestige currency
    baseResource: "exponent coins", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.o.unlocked) mult = mult.div(tmp.p.buyables[12].effect.first);
        if(hasUpgrade("p",14)) mult = mult.div(upgradeEffect("p",14));
        if(hasUpgrade("o",13)) mult = mult.div(2);
        if(hasUpgrade("p",21)) mult = mult.div(3);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (player.o.unlocked) exp = exp.times(tmp.o.buyables[11].effect.first);
        if(hasUpgrade("p",21)) exp = exp.times(1.5);
        if(hasUpgrade("p",22)) exp = exp.times(1.65);
        if (hasUpgrade("o", 21)) exp = exp.plus(upgradeEffect("o", 21).o);
        if(player.o.points.gte(player.o.dubStart)) exp = exp.pow(player.o.dubnium);
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    canBuyMax() { return hasMilestone("o", 2) },
    effectDescription() {
        return "which are boosting Points gain by "+format(tmp.o.effect)+"x."
    },
    addToBase() {
        let base = new Decimal(0);
    

        return base;
    },
    effectBase() {
        let base = new Decimal(1.25);
        
        // ADD
        base = base.plus(tmp.o.addToBase);
        
        // MULTIPLY
      
        
        return base.pow(tmp.o.power);
    },
    power() {
        let power = new Decimal(1);
    
        return power;
    },
    effect() {
        return Decimal.pow(tmp.o.effectBase, player.o.points.plus()).max(1).times(1);
    },
    tabFormat: {
        "Orbs": {
            buttonStyle() { return {'background-color': '#e83427'} },
            content: ["main-display",
            "prestige-button",
            "resource-display", "blank",
            ["display-text",
            function() {return (player.o.points.gte(player.o.dubStart)?'<font color="orange">Due to <b>Dubnium</b> stopping you, Your orbs exponent is raised to the power of '+formatWhole(player.o.dubnium)+'.</font>':'')},
                {}],
                "blank",
            "buyables",
            "upgrades", 
            "blank",
        ]},
        "Milestones": {
     
            content: ["milestones", ["display-text",
            function() {return 'NOTE: Next milestone would be unlocked when a previous milestone is unlocked'},
                {}],
,
            "blank", ["blank" ],
            "blank", ["blank" ],
            "blank", "blank", "blank",
            "blank",
        ]},
    
    },
    layerShown(){return true},
    branches: ["p"],
    buyables: {
        11: {
            cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(2)) x = x.pow(2).div(3)
                let cost = Decimal.pow(1.5, x.pow(1.15))
                return cost.floor()
            },
            title() { return "Exponent Power" },
  
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " orbs\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
               Multiplies " + format(data.effect.first) + "x of Exponent coins and Orb's exponent "
            },
            effect(x) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.1, x.pow(1.025))
                else eff.first = Decimal.pow(1/35, x.times(-1).pow(1.025))
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
                return eff;
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
           
        },
        12: {
            cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(2)) x = x.pow(2).div(2.5)
                let cost = Decimal.pow(2.5, x.pow(1.45))
                return cost.floor()
            },
            title() { return "Orb Points" },
  
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " orbs\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
               Multiplies the points gain by " + format(data.effect.first) + "x"
            },
            effect(x) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.11, x.pow(1.025))
                else eff.first = Decimal.pow(1/35, x.times(-1).pow(1.025))
               
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
                return eff;
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
           
        },
    },
    milestones: {
         
        0: {requirementDescription: "2 Orbs",
        done() {return player[this.layer].best.gte(2)}, // Used to determine when to give the milestone
        effectDescription: "Keep Exponent Coin's upgrades",
    },
    1: {requirementDescription: "5 Orbs",
    done() {return player[this.layer].best.gte(5)}, // Used to determine when to give the milestone
    effectDescription: "Unlock 2 new Exponent Coin upgrades and unlock Orb upgrades",

    unlocked() {return hasMilestone("o", 0)},
},   
2: {requirementDescription: "10 Orbs",
done() {return player[this.layer].best.gte(10)}, // Used to determine when to give the milestone
effectDescription: "Gain 0.1% of exponent coins per second and autobuy Exponent Points.",
unlocked() {return hasMilestone("o", 1)},
toggles: [
    ["p","auto1"],
  ]
},
3: {requirementDescription: "12 Orbs",
done() {return player[this.layer].best.gte(12)}, // Used to determine when to give the milestone
effectDescription: "You can buy max Orbs",
unlocked() {return hasMilestone("o", 2)},
},
    },
    upgrades: {
			
			
        11: {
            title: "Upgrade Speeder",
            description: "The first 2 upgrades after Exponent Coin Upgrade 11 has their cost reduced.",
            cost: new Decimal(5),
          
            unlocked() {return hasMilestone("o", 1)},
        
            
        },
        12: {
            title: "Penultimatic Growth",
            description: "Exponent Upgrade 11 is a little bit powerful.",
            cost: new Decimal(6),
            unlocked() { return hasUpgrade("o", 11) },
            
        },
        13: {
            title: "Distant Orb",
            description: "Orb's cost requirement is divided by 2.",
            cost: new Decimal(7),
            
            unlocked() { return hasUpgrade("o", 12) },
        },
        14: {
            title: "Dubnium Sounds Like Dumb Ways To Die",
            description: "Orbs now boost points gain at a reduced rate.",
            cost: new Decimal(9),
            effect() {
                
                
                let eff = player.o.points.plus(0.6).pow(0.5);
             
                return eff;
            },
 
            effectDisplay() { return format(tmp.o.upgrades[14].effect)+"x" },
            unlocked() { return hasUpgrade("o", 12) },
        },
        21: {
            title: "Hassium Is Baby Hazel",
            description: "Orbs & Exponent Coins boost each their exponent.",
            cost: new Decimal(10),
            effect() {
                
                
                let exp = 1
                return {o: player.o.points.add(0.1).log10().pow(exp), ex: player.o.points.add(0.1).log10().pow(exp)} 
            },
 
            effectDisplay() { return "+"+format(tmp.o.upgrades[21].effect.o)+" to Orb's exponent, +"+format(tmp.o.upgrades[21].effect.ex)+" to Exponent Coin's exponent" },
            unlocked() { return hasUpgrade("o", 14) },
        },
    }

})
