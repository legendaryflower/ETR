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
        if (hasUpgrade("p", 43)) mult = mult.times(2000);
        if (hasChallenge("o", 31)) mult = mult.times(60);
        return mult
    },
    directMult() {
        mult = new Decimal(1)
        if (inChallenge("o", 21)) return new Decimal(1);

        if (hasUpgrade("p", 32)) mult = mult.times(1.4);
        if (hasUpgrade("p", 33)) mult = mult.times(upgradeEffect("p",33));
        if (hasUpgrade("p", 34)) mult = mult.times(upgradeEffect("p",34));
        if (hasUpgrade("p", 41)) mult = mult.times(10);
        if (hasUpgrade("o", 24)) mult = mult.times(7);
        if (hasUpgrade("p", 42)) mult = mult.times(4);
        if (hasUpgrade("p", 51)) mult = mult.times(16);
        if (hasUpgrade("p", 52)) mult = mult.times(upgradeEffect("p",52));
        if (inChallenge("o", 11)) mult = mult.div(player.points);
        if (hasChallenge("o", 11)) mult = mult.times(20);
        if (hasChallenge("o", 21)) mult = mult.pow(1.05);

        return mult
    },
    softcap: new Decimal(1000),
    softcapPower: 0.005,
    automate(){
        if (player.p.auto1) {
          setBuyableAmount("p",11,tmp.p.buyables[11].canAfford?player.p.points.div(10).log(6).floor().add(1):getBuyableAmount("p",11))
        }
       
      },
    passiveGeneration() { return (hasUpgrade("o", 31)?0.25:hasUpgrade("p", 35)?0.025:(hasMilestone("o", 2))?0.001:0) },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

        if (inChallenge("o", 22)) return new Decimal(1);

        if (player.p.unlocked) exp = exp.times(tmp.p.buyables[11].effect.first);
        if (player.o.unlocked) exp = exp.times(tmp.o.buyables[11].effect.first);
       
        if (hasUpgrade("p", 13)) exp = exp.times(upgradeEffect("p", 13));
        if (hasUpgrade("p", 14)) exp = exp.plus(2);
        if(hasUpgrade("p",21)) exp = exp.times(1.1);
        if (hasUpgrade("o", 21)) exp = exp.plus(upgradeEffect("o", 21).ex);
        if (hasUpgrade("p", 25)) exp = exp.plus(5);
        if (hasUpgrade("p", 44)) exp = exp.pow(1.05);
        if (hasChallenge("o", 22)) exp = exp.pow(1.05);
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
                
                if (inChallenge("o", 12)) return new Decimal(1);
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
                
                if (inChallenge("o", 12)) return new Decimal(1);
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
                
                if (inChallenge("o", 12)) return new Decimal(1);
                let eff = player.points.plus(0.5).log10().pow(0.1).plus(0.25);
             
                return eff;
            },
            unlocked() { return hasUpgrade("p", 12) },
            effectDisplay() { return format(tmp.p.upgrades[13].effect)+"x" },
            
        },
        14: {
            title: "Orb Security",
            description: "Orbs cost requirement is divided based on your Exponent coins but effect gets reduced if effect is /8 but also multiply points gain by 2.5.",
            cost: new Decimal(100000),
            effect() {
                
                if (inChallenge("o", 12)) return new Decimal(1);
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
            onPurchase() {if (!hasMilestone("o",0)) player.o.dubnium = new Decimal(0.2);},
            unlocked() { return hasUpgrade("p", 23)||player.p.points.gte(1.5e6) },
          
            
        },
        24: {
            title: "Enforced Anti-Dubnium Soldiers",
            description: "Make the Orb's exponent reduction at 0.5.",
            cost: new Decimal(500000),
            onPurchase() {if (!hasMilestone("o",0)) player.o.dubnium = new Decimal(0.5);},
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
            title: "Very Softcap",
            description: "After the Exponent coin's softcap, the direct multipler is boosted a little.",
            cost: new Decimal(5000000),

            unlocked() { return hasUpgrade("p", 31) },
          
            
        },
        33: {
            title: "Softhat",
            description: "Its direct multipler is increased based on your Orbs.",
            cost: new Decimal(2000000),

            effect() {
                
                
                let eff = player.o.points.plus(0.1).pow(0.1);
              
                return eff;
            },
      
            effectDisplay() { return format(tmp.p.upgrades[33].effect)+"x" },
            unlocked() { return hasUpgrade("p", 32) },
          
            
        },
        34: {
            title: "Upgrade Fastener",
            description: "Its direct multipler is increased based on your Exponent Coins.",
            cost: new Decimal(1500000),

            effect() {
                
                
                let eff = player.p.points.plus(0.04).pow(0.05);
              
                return eff;
            },
      
            effectDisplay() { return format(tmp.p.upgrades[34].effect)+"x" },
            unlocked() { return hasUpgrade("p", 33) },
          
            
        },
        35: {
            title: "Potential Exponent Gain",
            description: "You now gain 2.5% of exponent coins per second instead of 0.1%.",
            cost: new Decimal(4000000),

          
            unlocked() { return hasUpgrade("p", 34) },
          
            
        },
        41: {
            title: "Direct-orb Multipler",
            description: "Direct multipler is multipled by 10 and unlock new Orb Upgrades.",
            cost: new Decimal(6000000),

          
            unlocked() { return hasUpgrade("p", 35) },
          
            
        },
        42: {
            title: "Rocket Music",
            description: "Direct multipler is multipled by 4.",
            cost: new Decimal(5e8),

          
            unlocked() { return hasUpgrade("o", 31) },
          
            
        },
        43: {
            title: "Rocket Music with Beats",
            description: "Multiply the Exponent coin's multipler gain by 2000x (not the direct multipler)",
            cost: new Decimal(2e9),

          
            unlocked() { return hasUpgrade("p", 42) },
          
            
        },
        44: {
            title: "Rocket Music with Beats and Lanching Rockets",
            description: "Raise the Exponent coin's exponent by 1.05.",
            cost: new Decimal(4e9),

          
            unlocked() { return hasUpgrade("p", 43) },
          
            
        },
        45: {
            title: "Point Generarian",
            description: "Raise the Points generation by 1.05.",
            cost: new Decimal(6e9),

          
            unlocked() { return hasUpgrade("p", 44) },
          
            
        },
        51: {
            title: "I Don't Pronounce Archive As ˈärˌkīv",
            description: "Direct multipler is multipled by 16.",
            cost: new Decimal(7e9),

          
            unlocked() { return hasUpgrade("p",45) },
          
            
        },
        52: {
            title: "Who Pronounces Belle as Bell?",
            description: "Multiply direct multipler based on your Points and unlock a new Orb buyable.",
            cost: new Decimal(2.5e10),

            effect() {
                
                
                let eff = player.points.plus(0.05).pow(0.02);
                if (player.o.unlocked) eff = eff.times(tmp.o.buyables[13].effect.first);
                if (hasUpgrade("p", 53)) eff = eff.times(upgradeEffect("p",53));
                return eff;
            },
      
            effectDisplay() { return format(tmp.p.upgrades[52].effect)+"x" },
            unlocked() { return hasUpgrade("p",51) },
          
            
        },
        53: {
            title: "Hafnium Amount Is Not Half",
            description: "Multiply Exponent Coins Upgrade 52 based on your Points.",
            cost: new Decimal(1e11),

            effect() {
                
                
                let eff = player.points.plus(0.02).pow(0.02);
                if (hasUpgrade("p", 54)) eff = eff.times(upgradeEffect("p",54));
                if (hasUpgrade("p", 55)) eff = eff.times(3);
                return eff;
            },
      
            effectDisplay() { return format(tmp.p.upgrades[53].effect)+"x" },
            unlocked() { return hasUpgrade("p",52) },
          
            
        },
        54: {
            title: "White Radium With Black Spots",
            description: "Multiply Exponent Coins Upgrade 53 based on your Points.",
            cost: new Decimal(4e11),

            effect() {
                
                
                let eff = player.points.plus(0.01).pow(0.01);
                if (hasUpgrade("p", 55)) eff = eff.times(3);
                return eff;
            },
      
            effectDisplay() { return format(tmp.p.upgrades[54].effect)+"x" },
            unlocked() { return hasUpgrade("p",53) },
          
            
        },
        55: {
            title: "Zert Didn't Made Zirconium",
            description: "Multiply upgrades that boost Exponent Coins Upgrade 52 by 3.",
            cost: new Decimal(4e11),

          
            unlocked() { return hasUpgrade("p",54) },
          
            
        },
        61: {
            title: "Cookies Are Overrated",
            description: "Multiply Cookies' exponent based on your unfed Cookies.",
            cost: new Decimal(1e17),
            effect() {
                
                
                let eff = player.w.points.plus(1).pow(0.75);
              
                return eff;
            },
      
            effectDisplay() { return format(tmp.p.upgrades[61].effect)+"x" },
          
            unlocked() { return player.w.unlocked },
          
            
        },
        62: {
            title: "Cookie Feasting",
            description: "You can convert fed cookies back to unfed and fed cookies multiply Points gain.",
            cost: new Decimal(1.5e17),
            effect() {
                
                
                let eff = player.w.cookiesFed.plus(1).pow(0.5);
              
                return eff;
            },
      
            effectDisplay() { return format(tmp.p.upgrades[62].effect)+"x" },
          
            unlocked() { return hasUpgrade("p",61) },
          
            
        },
        63: {
            title: "Cookie Monster",
            description: "Gaining cookies via reset doesn't reset Exponent upgrades.",
            cost: new Decimal(2e17),
           
          
            unlocked() { return hasUpgrade("p",62) },
          
            
        },
        64: {
            title: "Cookie Clicker Reference",
            description: "You now gain 1% of Cookies per second.",
            cost: new Decimal(3e17),
           
          
            unlocked() { return hasUpgrade("p",63) },
          
            
        },
    }

})
addLayer("o", {
    name: "orb", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
       best: new Decimal(0),
       total: new Decimal(0),
        dubnium: new Decimal(0.1),
        dubStart: new Decimal(11),
        auto: false,
        hassium: new Decimal(0.4),
        hassStart: new Decimal(31),
    }},
    base: 5,
    color: "#e83427",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "orbs", // Name of prestige currency
    baseResource: "exponent coins", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.5, // Prestige currency exponent
    automate() {},
    autoPrestige() { return (hasMilestone("o", 4) && player.o.auto) },
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
        if(player.o.points.gte(player.o.hassStart)) exp = exp.tetrate(player.o.hassium);
        if(player.p.points.gte(1e8)) exp = exp.times(1.2);
        if(player.p.points.gte(2.5e8)) exp = exp.times(1.2);
        return exp
    },
  
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    canBuyMax() { return hasMilestone("o", 2) },
    resetsNothing() { return hasMilestone("o", 3) },
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
                ["display-text",
                function() {return (player.o.points.gte(player.o.hassStart)?'<font color="red"><b>Hassium</b> will team up with <b>Dubnium</b> and make your orbs exponent is tetrated to '+formatWhole(player.o.hassium)+'.</font>':'')},
                    {}],
                    "blank",
            "buyables",
            "upgrades", 
            "blank",
        ]},
        "Milestones": {
     
            content: ["milestones", ["display-text",
            function() {return 'NOTE: Next milestone would be unlocked when a previous milestone is unlocked, This may not be true for some milestones that are unlocked when doing certain actions, like buying upgrades or completing any challenge.'},
                {}],
,
            "blank", ["blank" ],
            "blank", ["blank" ],
            "blank", "blank", "blank",
            "blank",
        ]},
        "Orbics": {
            unlocked() {return hasMilestone("o", 5)},
            content: ["challenges", 
            "blank",
            "blank",
            ["display-text",
            function() {return 'Complete all Orbics to make Willy layer show.'},
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
        13: {
            cost(x) { return new Decimal(20).mul(new Decimal(1.5).pow(x)) },
            title() { return "O Is For Opera" },
  
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " orbs\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
               Multiplies Exponent Coins Upgrade 52 by " + format(data.effect.first) + "x."
            },
            effect(x) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(1.75, x.pow(1.1))
                else eff.first = Decimal.pow(1/30, x.times(-1).pow(1.2))
               
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
    challenges: {
        11: {
            name: "Hafnium",
            challengeDescription: "Exponent coins's direct multipler will be divided based on your Points.",
          goal(){
           return new Decimal(1e8);
                
              
            },
            onEnter() {
player.points = new Decimal(0),
player.p.points = new Decimal(0),
player.p.best = new Decimal(0),
player.p.total = new Decimal(0),
player.p.upgrades = []
            },
            rewardDescription: "Direct multiplers for Exponent coins is multipled by 20.",
            
        },
        12: {
            name: "Zirconium",
            challengeDescription: "The first 4 Exponent Coins upgrades's effect are always at 1, Orbs divide Points production.",
          goal(){
           return new Decimal(1e6);
                
              
            },
            onEnter() {
player.points = new Decimal(0),
player.p.points = new Decimal(0),
player.p.best = new Decimal(0),
player.p.total = new Decimal(0),
player.p.upgrades = []
            },
            rewardDescription: "Unlock more Orbs upgrades.",
           unlocked() {return hasChallenge("o",11)} 
        },
        21: {
            name: "Rhenium",
            challengeDescription: "The direct multipler for Exponent Coins is always at 1.",
          goal(){
           return new Decimal(1e11);
                
              
            },
            onEnter() {
player.points = new Decimal(0),
player.p.points = new Decimal(0),
player.p.best = new Decimal(0),
player.p.total = new Decimal(0),
player.p.upgrades = []
            },
            rewardDescription: "Raise the exponent's coin direct multipler to 1.05.",
           unlocked() {return hasUpgrade("o",32)} 
        },
        22: {
            name: "Gadolinium",
            challengeDescription: "The exponent multipler for Exponent Coins is always at 1.",
          goal(){
           return new Decimal(1e13);
        
              
            },
            onEnter() {
player.points = new Decimal(0),
player.p.points = new Decimal(0),
player.p.best = new Decimal(0),
player.p.total = new Decimal(0),
player.p.upgrades = []
            },
            rewardDescription: "Raise the exponent's coin exponent to 1.05.",
           unlocked() {return hasChallenge("o",21)} 
        },

        31: {
            name: "Molybdenum",
            challengeDescription: "The first 2 challenges are applied to once.",
          goal(){
           return new Decimal(500000);
        
              
            },
            onEnter() {
player.points = new Decimal(0),
player.p.points = new Decimal(0),
player.p.best = new Decimal(0),
player.p.total = new Decimal(0),
player.p.upgrades = []
            },
            rewardDescription: "The gain for Exponent coins is boosted a little bit.",
           unlocked() {return hasChallenge("o",22)},
           countsAs: [11,12] 
        },
        32: {
            name: "Lawrencium",
            challengeDescription: "All challenges are applied to once except for Molybdenum",
          goal(){
           return new Decimal(500000);
        
              
            },
            onEnter() {
player.points = new Decimal(0),
player.p.points = new Decimal(0),
player.p.best = new Decimal(0),
player.p.total = new Decimal(0),
player.p.upgrades = []
            },
            rewardDescription: "Raise the points generation by 1.08.",
           unlocked() {return hasChallenge("o",31)},
           countsAs: [11,12,21,22] 
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
4: {requirementDescription: "13 Orbs",
done() {return player[this.layer].best.gte(13)&&hasUpgrade("o", 22)}, // Used to determine when to give the milestone
effectDescription: "Automate Orbs Gain",
unlocked() {return hasUpgrade("o", 22)},
toggles: [["o", "auto"]],

},
5: {requirementDescription: "150 Total Orbs",
done() {return player[this.layer].total.gte(150)&&hasUpgrade("o", 31)}, // Used to determine when to give the milestone
effectDescription: "Unlock Orbics",
unlocked() {return hasUpgrade("o", 31)},


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
                if (hasUpgrade("o", 23)) eff = eff.times(2.5);
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
        22: {
            title: "Banned For Life",
            description: "Orbs now reset nothing.",
            cost: new Decimal(12),
            unlocked() { return hasUpgrade("p", 41) },
        },
        23: {
            title: "Direct Share",
            description: "Orb Upgrade 14 is boosted a little bit.",
            cost: new Decimal(13),
            unlocked() { return hasUpgrade("o", 22) },
        },
        24: {
            title: "Directbusters",
            description: "The direct multipler for Exponent Coins is multipled by 7.",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade("o", 23) },
        },
        31: {
            title: "Recursion",
            description: "You now gain 25% of exponent coins per second.",
            cost: new Decimal(18),
        
            unlocked() { return hasUpgrade("o", 24) },
        },
        32: {
            title: "Arsenal Orbs",
            description: "Triple the point gain and unlock Rhenium.",
            cost: new Decimal(28),
        
            unlocked() { return hasChallenge("o", 12) },
        },
        33: {
            title: "Hassled Orbs",
            description: "Weaken the Hassium penalty.",
            cost: new Decimal(32),
            onPurchase() {player.o.hassium = new Decimal(0.75);},
            unlocked() { return hasUpgrade("o", 32) },
        },
    }

})
addLayer("w", {
    name: "willy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
       best: new Decimal(0),
       total: new Decimal(0),
       cookiesFed: new Decimal(0),
    }},
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Willy")
    },
    color: "yellow",
    requires: new Decimal(1e19), // Can be a function that takes requirement increases into account
    resource: "cookies", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    tooltipLocked() { // Optional, tooltip displays when the layer is locked
        return ("???")
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      
        return mult
    },
    passiveGeneration() { return (hasUpgrade("p", 64))?0.05:0 },
    prestigeButtonText() { //Is secretly HTML
      
       return "Reset points, Exponent Coins points and upgrades for " + formatWhole(tmp[this.layer].resetGain) + " cookies. <br><br> Next cookies you'll get is for " + formatWhole(tmp[this.layer].nextAtDisp) + " points"
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade("p", 61)) exp = exp.times(upgradeEffect("p",61));
        return exp
    },
  
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for cookies", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    onPrestige() {
        player.points = new Decimal(0),
        player.p.points = new Decimal(0),
        player.p.best = new Decimal(0),
        player.p.total = new Decimal(0);

      	if (!hasUpgrade("p", 63))  player.p.upgrades = [];
                    },
    tabFormat: ["main-display",
    "prestige-button",
    "blank",
    ['display-image', 'images/Willy.PNG'],
    "blank",
    ["display-text",
    function() {return 'This is Willy and he likes cookies, Feed him with cookies!'},
        {}],
   
    "blank",
    "blank",
    ["display-text",
    function() {return 'You have '+formatWhole(player.w.points)+' unfed cookies.'},
        {}],
    "blank",
    ["display-text",
    function() {return 'You have '+formatWhole(player.w.cookiesFed)+' fed cookies.'},
        {}],
    "blank",
    "blank",
    "clickables"
],
    
    
  
    layerShown(){return hasChallenge("o",32)},
    clickables: {
      
        11: {
            title: "Feed Willy with 1 cookie",
            display() { return "Req: 1 cookie"},
            unlocked() { return player.w.unlocked },
            canClick() { return player.w.unlocked && player.w.points.gt(0) },
            onClick() { 
                player.w.cookiesFed = player.w.cookiesFed.plus(1);
                player.w.points = player.w.points.minus(1);
            },
            style: {width: "160px", height: "160px",background:"yellow",},
        },
        12: {
            title: "Feed Willy with all of your cookies",
            display() { return "Req: 1 cookie"},
            unlocked() { return player.w.unlocked },
            canClick() { return player.w.unlocked && player.w.points.gt(0) },
            onClick() { 
                player.w.cookiesFed = player.w.cookiesFed.plus(player.w.points);
                player.w.points = player.w.points.minus(player.w.points);
            },
            style: {width: "160px", height: "160px",background:"yellow",},
        },
        31: {
            title: "Convert fed cookies into unfed cookies",
            display() { return "Req: 1 fed cookie"},
            unlocked() { return hasUpgrade("p",62) },
            canClick() { return player.w.unlocked && player.w.cookiesFed.gt(0) },
            onClick() { 
                if (!confirm("Are you sure want to do this? Willy will be upset.")) return;
                player.w.points = player.w.points.plus(player.w.cookiesFed);
                player.w.cookiesFed = player.w.cookiesFed.minus(player.w.cookiesFed);
            },
            style: {width: "120px", height: "120px",background:"red",},
        }
    
    },
   

})