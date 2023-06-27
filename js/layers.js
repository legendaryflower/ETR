addLayer("p", {
    name: "machintruc", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#2e2e2e",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "machintruc systems", // Name of prestige currency
    baseResource: "cogs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
  
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade("p", 23)) exp = exp.times(1.15);
        return exp;
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    automate() {},
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration() { return (hasMilestone("g", 1))?1:0 },
    doReset(resettingLayer) {
        let keep = [];
     
        if (hasMilestone("g", 0) && resettingLayer=="g") keep.push("upgrades")
        if (hasMilestone("ps", 0) && resettingLayer=="ps") keep.push("upgrades")
        if (hasMilestone("da", 0) && resettingLayer=="da") keep.push("upgrades")
         if (layers[resettingLayer].row > this.row) layerDataReset("p", keep)
    },
    milestones: {
        0: {
            requirementDescription: "1e5000 Machintruc Systems",
            done() { return player.p.best.gte("1e5000") },
            effectDescription: "Unlock Replicanti upgrades for Machintruc and a Powerer to Gears",
               unlocked() { return hasMilestone("da", 3) },
        },
       
    },
    upgrades: {
        11: {
            title: "Cog Generator",
            description: "Double your cog gain.",
            cost: new Decimal(10),
            
        },
        12: {
            title: "Cog Booster",
            description: "Increase your cog gain based on your current Machintruc Systems.",
            cost: new Decimal(20),
            effect() {
              let eff = player[this.layer].points.add(1).pow(0.5)
                if (hasUpgrade("d", 11)) eff = eff.pow(1.5);
                if (hasUpgrade("d", 12)) eff = eff.pow(1.3);
                if (hasUpgrade("cb", 13)) eff = eff.pow(1.1);    if (hasUpgrade("re", 11)) eff = eff.pow(1.1);
                if (hasUpgrade("ps", 13)) eff = eff.pow(2.0);
                if (inChallenge("d", 11)) eff = eff.pow(0.25);
                if (hasUpgrade("mo", 14)) eff = eff.pow(1.3);
                if (hasAchievement("a", 15)) eff = eff.pow(1.01);
                return eff;
            
            },
            unlocked() { return (hasUpgrade(this.layer, 11))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

        },
        13: {
            title: "Turbo Booster",
            description: "Decrease cogs required for Machintruc system and boost more machintruc system gain",
            cost: new Decimal(50),
            effect() {
               let eff = player.points.add(1).pow(0.15)
               if (hasUpgrade("d", 12)) eff = eff.pow(1.3);
               if (hasUpgrade("cb", 13)) eff = eff.pow(1.1);    if (hasUpgrade("re", 11)) eff = eff.pow(1.1);
               if (hasUpgrade("ps", 13)) eff = eff.pow(2.0);
               if (inChallenge("d", 11)) eff = eff.pow(0.25);
               if (hasAchievement("a", 15)) eff = eff.pow(1.01);
               return eff;
            },
            unlocked() { return (hasUpgrade(this.layer, 12))},
        },
        14: {
            title: "True Cog Booster",
            description: "Exponetial trees now have possible generators",
            cost: new Decimal(200),
            effect() {
               let eff = player.points.add(1).pow(0.25)
               if (hasUpgrade("d", 12)) eff = eff.pow(1.3);
               if (hasUpgrade("cb", 13)) eff = eff.pow(1.1);    if (hasUpgrade("re", 11)) eff = eff.pow(1.1);
               if (hasUpgrade("ps", 13)) eff = eff.pow(2.0);
               if (inChallenge("d", 11)) eff = eff.pow(0.25);
               if (hasAchievement("a", 15)) eff = eff.pow(1.01);
               return eff;
            },
            unlocked() { return (hasUpgrade(this.layer, 22))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
        },
        15: {
            title: "Self-Synergy",
            description: "Cogs boost their own generation",
            cost: new Decimal(450),
            effect() { 
                let eff = player.points.plus(1).log10().pow(0.75).plus(1);
                if (hasAchievement("a", 15)) eff = eff.pow(1.01);
                return eff;
            },
            unlocked() { return hasUpgrade("p", 12) },
            effectDisplay() { return format(tmp.p.upgrades[13].effect)+"x" },
        },
        21: {
            title: "Super Generator",
            description: "Triple your cog gain.",
            cost: new Decimal(65),
            unlocked() { return (hasUpgrade(this.layer, 13))},
            softcap() { return new Decimal(65) },
        },
        22: {
            title: "Daredevil",
            description: "Unlock any upgrades that require Daredevil.",
            cost: new Decimal(175),
            unlocked() { return (hasUpgrade(this.layer, 21))},
        },
        23: {
            title: "I need more resets!",
            description: "Machintruc system gain is bigger",
            cost: new Decimal(20),
           
            unlocked() { return (hasUpgrade(this.layer, 21))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

        },
        31: {
            title: "Cheap Machines",
            description: "Boosts Power Stations upgrades by ^1.2",
            cost: new Decimal("1e1200"),
           
            unlocked() { return hasMilestone("ps", 1) },

        },
        32: {
            title: "True Manners",
            description: "Boosts Damage upgrades by ^1.1",
            cost: new Decimal("1e2400"),
           
            unlocked() { return hasMilestone("da", 1) },

        },
        33: {
            title: "Big Numbers",
            description: "Increases cogs gain by 7.5x",
            cost: new Decimal("1e2600"),
           
            unlocked() { return (hasUpgrade(this.layer, 32))},

        },
        34: {
            title: "Beyond Them",
            description: "Boost any upgrades from Row 1 by ^1.1",
            cost: new Decimal("1e3500"),
           
            unlocked() { return (hasUpgrade(this.layer, 33))},

        },
       41: {
            title: "Replicative Upgrades",
            description: "Boost Damage upgrades by ^1.2",
            cost: new Decimal("1e3500"),
           
            unlocked() { return (hasUpgrade(this.layer, 34))},

        },
    },
})
addLayer("g", {
    name: "Gears", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#361bbf",
    requires() { return new Decimal(200).times((player.g.unlockOrder&&!player.g.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    resource: "gears", // Name of prestige currency
    baseResource: "cogs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    resetsNothing() { return hasMilestone("mo", 1)&&player.g.current!="g" },
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    canBuyMax() { return hasMilestone("g", 2) },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade("g", 13)) exp = exp.times(1.08);
        return exp;
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["p"],
    hotkeys: [
        {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        let keep = [];
     
        if (hasMilestone("d", 0) && resettingLayer=="d") keep.push("upgrades")
        if (hasMilestone("da", 0)) keep.push("milestones")
        if (hasMilestone("d", 0)) keep.push("milestones")
        if (hasMilestone("bo", 0)) keep.push("milestones")
        if (hasMilestone("mo", 0)) keep.push("milestones")
        if (hasMilestone("mo", 0) && resettingLayer=="mo") keep.push("upgrades")
        if (hasMilestone("da", 3) && resettingLayer=="da") keep.push("upgrades")
         if (layers[resettingLayer].row > this.row) layerDataReset("g", keep)
    },
    tabFormat: ["main-display",
			"prestige-button",
			"blank",
			["display-text",
				function() {return 'You have ' + format(player.g.power) + ' Gears Power, which boosts Cogs generation by '+format(tmp.g.powerEff)+'x'+(tmp.nerdMode?" ((x+1)^"+format(tmp.g.powerExp)+")":"")},
					{}],
			"blank",
			["display-text",
				function() {return 'Your best Gears is ' + formatWhole(player.g.best) + '<br>You have made a total of '+formatWhole(player.g.total)+" Gears."},
					{}],
			"blank",
			"milestones", "blank", "blank", "upgrades"],
            layerShown(){return player.p.unlocked},
        
            addToBase() {
                let base = new Decimal(0);
               
                return base;
            },
            effectBase() {
                let base = new Decimal(2);
                
                // ADD
                base = base.plus(tmp.g.addToBase);
                
                // MULTIPLY
                
                
                return base.pow(tmp.g.power);
            },
            power() {
                let power = new Decimal(1);           return power;
            },
            effect() {
      return new Decimal(1);
           
            },
            effectDescription() {
                return "Bush"
            },
    milestones: {
        0: {
            requirementDescription: "8 Gears",
            done() { return player.g.best.gte(8) },
            effectDescription: "Keep Machintruc Upgrades on reset.",
        },
        1: {
            requirementDescription: "10 Gears",
            done() { return player.g.best.gte(10) },
            effectDescription: "You passivly gain 100% of Machintruc systems",
        },
        2: {
            requirementDescription: "14 Gears",
            done() { return player.g.best.gte(14) },
            effectDescription: "You can buy max Gears",
        },
    },
    upgrades: {
        11: {
            title: "Worth of Goods",
            description: "Generate more cogs.",
            cost: new Decimal(5),
            
        },
        12: {
            title: "The Servant",
            description: "Boost cog gains based on your unspent Gears",
            cost: new Decimal(10),
           
            unlocked() { return player.g.unlocked },
            effect() {
               let eff = player[this.layer].points.add(1).pow(0.5)
               if (hasUpgrade("d", 11)) eff = eff.pow(1.5);
               if (hasUpgrade("d", 13)) eff = eff.pow(1.2);
               if (hasUpgrade("mo", 11)) eff = eff.pow(1.5);
               if (hasUpgrade("re", 11)) eff = eff.pow(1.1);
               if (hasUpgrade("p", 34)) eff = eff.pow(1.1);
               if (inChallenge("d", 11)) eff = eff.pow(0.25);
               return eff;
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      
        },
        13: {
            title: "Machintrucs in the packings.",
            description: "Reset gain for Gears is better",
            cost: new Decimal(20),
           
            unlocked() { return (hasUpgrade(this.layer, 12))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

        },
        14: {
            title: "A lack of bank",
            description: "Generate more cog gains based on your Gears",
            cost: new Decimal(100),
            effect() {
                let eff = player[this.layer].points.add(1).pow(0.75)
                if (hasUpgrade("d", 11)) eff = eff.pow(1.5);
                if (hasUpgrade("d", 13)) eff = eff.pow(1.2);
                if (hasUpgrade("mo", 11)) eff = eff.pow(1.5);
                if (hasUpgrade("p", 34)) eff = eff.pow(1.1);
                if (inChallenge("d", 11)) eff = eff.pow(0.25);
                return eff;
             },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return (hasUpgrade(this.layer, 12))},
        },
        15: {
            title: "Cog Supergenerator",
            description: "Increase your cog gain based on your unspent Gear.",
            cost: new Decimal(450),
            unlocked() { return hasChallenge("d", 11) },
        },
    },

})
addLayer("ps", {
    name: "Power Supply", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#56545e",
    requires() { return new Decimal(1000).times((player.ps.unlockOrder&&!player.ps.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    resource: "power stations", // Name of prestige currency
    baseResource: "cogs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    resetsNothing() { return hasMilestone("i", 1)&&player.cb.current!="cb" },
    gainMult() {
        let mult = new Decimal(1)
  
  
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["p"],
    hotkeys: [
        {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        let keep = [];
     
       
        if (hasMilestone("d", 0)) keep.push("milestones")
        if (hasMilestone("bo", 0)) keep.push("milestones")
         if (layers[resettingLayer].row > this.row) layerDataReset("ps", keep)
    },
    layerShown(){return player.p.unlocked},
    
    milestones: {
        0: {
            requirementDescription: "8 Power Stations",
            done() { return player.ps.best.gte(8) },
            effectDescription: "Keep Machintruc Upgrades on reset.",
        },
        1: {
            requirementDescription: "1e10 Power Stations",
            done() { return player.ps.best.gte(1000000000) },
            effectDescription: "Unlock Replicants",
        },
        2: {
            requirementDescription: "1e308 Power Stations",
            done() { return player.ps.best.gte("1e308") },
            effectDescription: "Unlock 3 more Replicanti upgrades",
        },
    },
    upgrades: {
        11: {
            title: "Cog Generator but in Power Station",
            description: "Every tree layer that resets Machintruc system now has 2x starting cog gain",
            cost: new Decimal(1),
            
        },
    12: {
        title: "Upgrade Machine",
            description: "Base level gain is powered to ^1.1",
            cost: new Decimal(3),
            unlocked() { return player[this.layer].unlocked },
            effect() {
                let eff = new Decimal(1.1);
                if (hasUpgrade("d", 11)) eff = eff.pow(1.5);
                if (hasUpgrade("cb", 11)) eff = eff.pow(1.5);    if (hasUpgrade("re", 11)) eff = eff.pow(1.1);
                if (hasUpgrade("p", 31)) eff = eff.pow(1.1);
                if (hasUpgrade("p", 34)) eff = eff.pow(1.1);
                if (inChallenge("q", 12)) eff = eff.pow(0.001);
                return eff;
            },
            effectDisplay() { return "^" + format(this.effect()) }, // Add formatting to the effect

    },   
    13: {
        title: "Unreachable Milestones",
        description: "Power Stations Replicanti now boosts Machintruc Upgrades by ^2.0",
        cost: new Decimal(1e15),
        unlocked() { return hasMilestone("ps", 1) },
        
    },
    14: {
        title: "Solarnia Combustion",
        description: "Base level gain is powered to ^1.2",
        cost: new Decimal(1e20),
        unlocked() { return hasMilestone("ps", 1) },
        effect() {
           let eff = new Decimal(1.2);
            if (hasUpgrade("p", 34)) eff = eff.pow(1.1);
            if (inChallenge("q", 12)) eff = eff.pow(0.001);
            return eff;
        },
        effectDisplay() { return "^" + format(this.effect()) }, // Add formatting to the effect
    },
}
})
addLayer("d", {
    name: "Data", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#a0d669",
    requires() { return new Decimal(16384).times((player.d.unlockOrder&&!player.d.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    resource: "data storages", // Name of prestige currency
    baseResource: "cogs", // Name of resource prestige is based on
    baseAmount() {return player.ps.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    doReset(resettingLayer) {
        let keep = [];
     
        if (hasMilestone("i", 0) && resettingLayer=="i") keep.push("upgrades")
        if (hasMilestone("bo", 0)) keep.push("milestones")
         if (layers[resettingLayer].row > this.row) layerDataReset("d", keep)
    },
    gainMult() {
        let mult = new Decimal(1)
   
  
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["ps", "g"],
    hotkeys: [
        {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  
    layerShown(){return player.g.unlocked},
    milestones: {
        0: {
            requirementDescription: "3 Data Storages",
            done() { return player.d.best.gte(3) },
            effectDescription: "Keep your all Gear upgrades but also keeps Power Supply and Gears milestone",
           
        },
        1: {
            requirementDescription: "35 Data Storages",
            done() { return player.d.best.gte(35) },
            effectDescription: "Unlock the Machintruc Automator",
            toggles: [["p", "auto"]],
        },
    },
    challenges: {
        11: {
            name: "Kalafior",
            challengeDescription: "Machintruc are Gear upgrades are heavily weaken.",
            canComplete: function() {return player.points.gte(10000)},
  
            goal(){
                if (challengeCompletions(this.layer, this.id) == 0) return new Decimal(1e4);
                if (challengeCompletions(this.layer, this.id) == 1) return new Decimal(1e6);
              
            },
            rewardDescription: "Unlock a new Gear upgrade",
        },
        12: {
            name: "Weak Key",
            challengeDescription: "The cog gain is divided by half, but upgrades can recover back to fully but still weakened.",
            canComplete: function() {return player.points.gte(2500)},
            unlocked() { return hasChallenge("d", 11) },
            goal(){
                if (challengeCompletions(this.layer, this.id) == 0) return new Decimal(1e4);
                if (challengeCompletions(this.layer, this.id) == 1) return new Decimal(1e6);
              
            },
            rewardDescription: "You gain 1.2x more cogs.",
        },
    },
    upgrades: {
        11: {
        title: "ICann Name Collison",
        description: "Upgrades from Machintruc, Gears and Power Stations are ^1.5 stronger",
        cost: new Decimal(3),
    },
    12: {
        title: "Creating CMOS Battery",
        description: "Upgrades from Machintruc are ^1.3 stronger",
        cost: new Decimal(10),
        unlocked() { return (hasUpgrade(this.layer, 11))},
    },
    13: {
        title: "Don't make the battery dead",
        description: "Upgrades from Gears are ^1.2 stronger",
        cost: new Decimal(10),
        unlocked() { return (hasUpgrade(this.layer, 12))},
    },}
})
addLayer("sm", {
    name: "Super Machintruc", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#524e3c",
    requires() { return new Decimal("1e1024").times((player.sm.unlockOrder&&!player.sm.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    resource: "super machintruc systems", // Name of prestige currency
    baseResource: "machintruc systems", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    passiveGeneration() { return (hasMilestone("bo", 4))?0.05:0 },
    gainMult() {
        let mult = new Decimal(1)
   
  
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["p"],
    hotkeys: [
        {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  
    layerShown(){return player.g.unlocked},
    upgrades: {
        11: {
            title: "The Machine Chores",
            description: "Cogs boost their own generation",
            cost: new Decimal(1),
            effect() { 
                let eff = player.points.plus(1).log10().pow(0.75).plus(1);
                return eff;
            },
            effectDisplay() { return format(tmp.p.upgrades[13].effect)+"x" },
        },}
})
addLayer("ch", {
    name: "Chassis", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CH", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFFF00",
    requires() { return new Decimal("256").times((player.ch.unlockOrder&&!player.ch.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    resource: "chassis", // Name of prestige currency
    baseResource: "super machintruc systems", // Name of resource prestige is based on
    baseAmount() {return player.sm.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
   
  
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    branches: ["sm"],
    hotkeys: [
        {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  
    layerShown(){return player.g.unlocked},
})
addLayer("cb", {
    name: "CMOS Battery", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#9c9a97",
    requires() { return new Decimal(15000000).times((player.d.unlockOrder&&!player.d.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    resource: "CMOS batteries", // Name of prestige currency
    baseResource: "cogs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    resetsNothing() { return hasMilestone("i", 1)&&player.cb.current!="cb" },
    doReset(resettingLayer) {
        let keep = [];
     
        if (hasMilestone("i", 0) && resettingLayer=="i") keep.push("upgrades")
        if (hasMilestone("bo", 0)) keep.push("milestones")
         if (layers[resettingLayer].row > this.row) layerDataReset("cb", keep)
    },
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
      
  
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["ps"],
    hotkeys: [
        {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  
    layerShown(){return player.ps.unlocked},
    milestones: {
        0: {
            requirementDescription: "2 CMOS batteries",
            done() { return player.cb.best.gte(2) },
            effectDescription: "Keep your all Power Station upgrades",
           
        },
        1: {
            requirementDescription: "11 CMOS batteries",
            done() { return player.cb.best.gte(11) },
            effectDescription: "Power stations reset nothing.",
           
        },
    },
   
 upgrades: {
        11: {
        title: "Power Operation",
        description: "Power Stations upgrades are ^1.5 stronger",
        cost: new Decimal(2),
    },
    12: {
        title: "Time Renderer",
        description: "The cog gain is increased by 4.5x.",
        cost: new Decimal(8),
    },
    13: {
        title: "Lock Timeout",
        description: "Machintruc upgrades are ^1.1 stronger.",
        cost: new Decimal(32),
    },
    14: {
        title: "Modchipper",
        description: "Crackdown any Machintruc and modchip the Machintruc and Power Stations.",
        cost: new Decimal(1500),
        unlocked() { return hasMilestone("i", 2) },
    },
    },
    buyables: {
        11: {
            title: "Long CMOS battery",
            cost(x) { return new Decimal(1).mul(x) },
            display() { return "Makes power stations stronger" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
           
        },
       
    }
})
addLayer("mo", {
    name: "Motherboard", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MO", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#c0d1a5",
    requires() { return new Decimal(1024).times((player.mo.unlockOrder&&!player.mo.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    resource: "motherboard connectors", // Name of prestige currency
    baseResource: "gears", // Name of resource prestige is based on
    baseAmount() {return player.g.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
    
  
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["g"],
    hotkeys: [
        {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  
    layerShown(){return player.g.unlocked},
    milestones: {
        0: {
            requirementDescription: "1 Motherboard",
            done() { return player.mo.best.gte(1) },
            effectDescription: "Keep your all Gear upgrades but also keeps Power Supply and Gears milestone",
           
        },
        1: {
            requirementDescription: "5 Motherboards",
            done() { return player.mo.best.gte(5) },
            effectDescription: "Gears reset nothing.",
        },
    },
    buyables: {
        11: {
            title: "Add CPU",
            cost(x) { return new Decimal(1).mul(x) },
            display() { return "Adds CPU to make motherboards stronger" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
           
        },
        12: {
            title: "Add GPU",
            cost(x) { return new Decimal(1).mul(x) },
            display() { return "Adds GPU to make motherboards stronger" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
           
        },
       
    },
 upgrades: {
        11: {
        title: "True Gears",
        description: "Gear upgrades are ^1.5 stronger",
        cost: new Decimal(2),
    },
    12: {
        title: "Nine Circles",
        description: "The cog gain multiplier starts at 8x.",
        cost: new Decimal(45),
        unlocked() { return (hasUpgrade(this.layer, 11))},
    },
    13: {
        title: "Panko, Beer, Grass, Tempura",
        description: "The gear's multiplier is improved.",
        cost: new Decimal(300),
        unlocked() { return (hasUpgrade(this.layer, 11))},
    },
    14: {
        title: "Omninux",
        description: "The Machintruc upgrade 2 powerer is better.",
        cost: new Decimal(1500),
        unlocked() { return (hasUpgrade(this.layer, 12))},
    },
    },
   
})

addLayer("re", {
    name: "Replicanti", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
  
    color: "#f705bb",
    requires() { return new Decimal(64).times((player.re.unlockOrder&&!player.re.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    resource: "replicants", // Name of prestige currency
    baseResource: "gears", // Name of resource prestige is based on
    baseAmount() {return player.g.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    branches: ["mo","d","sm"],
    hotkeys: [
        {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  
    layerShown(){return player.mo.unlocked},
     upgrades: {
        11: {
        title: "Gray Candy",
        description: "Upgrades for rows 0, 1 and 2 are ^1.1 stronger",
        cost: new Decimal(1),
    
   
    },

        12: {
        title: "More gainier",
        description: "Increase your cog gain based on your current Replicants",
        cost: new Decimal(1000000),
        effect() {
            return player[this.layer].points.add(1).pow(0.5)
          },
          unlocked() { return (hasUpgrade(this.layer, 11))},
          effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
   
    },
   }

     })
     addLayer("i", {
        name: "Internet", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: false,
            points: new Decimal(0),
        }},
      
        color: "#ffffff",
        requires() { return new Decimal("1e10000").times((player.i.unlockOrder&&!player.i.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
        resource: "internet connections", // Name of prestige currency
        baseResource: "cogs", // Name of resource prestige is based on
        doReset(resettingLayer) {
            let keep = [];
         
            if (hasMilestone("bo", 0)) keep.push("milestones")
             if (layers[resettingLayer].row > this.row) layerDataReset("i", keep)
        },
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        gainMult() {
            let mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        /* 
        powerExp() {
			let exp = new Decimal(1/3);
			return exp;
		},
		powerEff() {
			if (!unl(this.layer)) return new Decimal(1);
			return player.i.power.plus(1).pow(this.powerExp());
		},
        */
        row: 3, // Row the layer is in on the tree (0 is the first row)
        tabFormat: ["main-display",
        "prestige-button",
        "blank",
        ["display-text",
            function() {return 'You have ' + format(player.i.power) + ' Horsepower, which carries Machintruc generation by '+format(tmp.i.powerEff)+'x'+(tmp.nerdMode?" ((x+1)^"+format(tmp.g.powerExp)+")":"")},
                {}],
        "blank",
        ["display-text",
            function() {return 'Your best Internet is ' + formatWhole(player.i.best) + '<br>You have made a total of '+formatWhole(player.i.total)+" Internet."},
                {}],
        "blank",
        "milestones", "blank", "blank", "upgrades"],
        branches: ["cb", "d"],
        hotkeys: [
            {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
      
        layerShown(){return player.mo.unlocked},
        milestones: {
            0: {
                requirementDescription: "1 Internet Connections",
                done() { return player.i.best.gte(1) },
                effectDescription: "Keep your CMOS Battery and Data Storage upgrades",
               
            },
            1: {
                requirementDescription: "3 Internet Connections",
                done() { return player.i.best.gte(3) },
                effectDescription: "CMOS batteries reset nothing.",
               
            },
            2: {
                requirementDescription: "100 Internet Connections",
                done() { return player.i.best.gte(100) },
                effectDescription: "Allows you to modchip CMOS batteries to break Machintruc systems",
               
            },
        },
        upgrades: {
            11: {
            title: "Assembler",
            description: "Base level is increased to the power of ^1.1",
            cost: new Decimal(1),
            effect() {
                let eff = new Decimal(1.1);
               
                return eff;
            },
            effectDisplay() { return "^" + format(this.effect()) }, // Add formatting to the effect

       
        },
        12: {
            title: "Skimmer",
            description: "Gain more cogs based on your current Internet connections",
            cost: new Decimal(2), effect() {
              let eff = player[this.layer].points.add(1).pow(0.5)
               
                return eff;
            },
   
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

       
        },
           
       }
    
         })
         addLayer("da", {
            name: "Damage", // This is optional, only used in a few places, If absent it just uses the layer id.
            symbol: "DA", // This appears on the layer's node. Default is the id with the first letter capitalized
            position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
            startData() { return {
                unlocked: false,
                points: new Decimal(0),
            }},
          
            color: "#ff0000",
            requires() { return new Decimal("128").times((player.da.unlockOrder&&!player.da.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
            resource: "damages", // Name of prestige currency
            baseResource: "gears", // Name of resource prestige is based on
            baseAmount() {return player.g.points}, // Get the current amount of baseResource
            type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
            exponent: 1, // Prestige currency exponent
            doReset(resettingLayer) {
                let keep = [];
             
                if (hasMilestone("bo", 0)) keep.push("milestones")
                 if (layers[resettingLayer].row > this.row) layerDataReset("da", keep)
            },
            gainMult() {
                let mult = new Decimal(1)
          
                return mult
            },
            gainExp() { // Calculate the exponent on main currency from bonuses
                return new Decimal(1)
            },
            /* 
            powerExp() {
                let exp = new Decimal(1/3);
                return exp;
            },
            powerEff() {
                if (!unl(this.layer)) return new Decimal(1);
                return player.i.power.plus(1).pow(this.powerExp());
            },
            */
            row: 3, // Row the layer is in on the tree (0 is the first row)
           
            branches: ["p"],
            hotkeys: [
                {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
            ],
          
            layerShown(){return player.mo.unlocked},
            milestones: {
                0: {
                    requirementDescription: "1 Damage",
                    done() { return player.da.best.gte(1) },
                    effectDescription: "Keep all of your Machintruc upgrades and Gears milestones",
                   
                },
                1: {
                    requirementDescription: "2 Damages",
                    done() { return player.da.best.gte(2) },
                    effectDescription: "Unlock 4 more Machintruc upgrades",
                   
                },
                2: {
                    requirementDescription: "10 Damages",
                    done() { return player.da.best.gte(10) },
                    effectDescription: "You now deal 2x damage to any modchipped Machintruc upgrades and unlock 2 more Replicanti upgrades",
                   
                },
               3: {
                    requirementDescription: "50 Damages",
                    done() { return player.da.best.gte(50) },
                    unlocked() { return hasMilestone("da", 2) },
                    effectDescription: "Keep all of your Gear upgrades and unlock a milestone for Machintruc",
                   
                },
                4: {
                    requirementDescription: "10000 Damages",
                    done() { return player.da.best.gte(10000) },
                    unlocked() { return hasMilestone("da", 3) },
                    effectDescription: "Modchipped Machintruc are ^1.1 stronger",
                   
                },
            },
            upgrades: {
                11: {
                title: "Prisitine",
                description: "Unlock a new Machintruc Upgrade",
                cost: new Decimal(5),
            
    
           
            },
            12: {
                title: "The Cog Sacirfire",
                description: "Upgrades from Row 1 are stronger",
                cost: new Decimal(300),
            
    
           
            },
               
           }
                
            
        
             })
             addLayer("smo", {
                name: "Superboard", // This is optional, only used in a few places, If absent it just uses the layer id.
                symbol: "SUB", // This appears on the layer's node. Default is the id with the first letter capitalized
                position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
                startData() { return {
                    unlocked: false,
                    points: new Decimal(0),
                }},
                color: "#c0d1a5",
                nodeStyle() { return {
                        background: (player.smo.unlocked||canReset("smo"))?((player.grad&&!player.oldStyle)?"radial-gradient(circle, #707A60 0%, #B7B771 75%)":"#B7B771"):"#B5B52B",
                    }},
                    componentStyles: {
                        background() { return (player.smo.unlocked||canReset("smo"))?((player.grad&&!player.oldStyle)?"radial-gradient(circle, #707A60 0%, #B7B771 75%)":"#B7B771"):"#B5B52B" },
                    },
                requires() { return new Decimal(32768).times((player.mo.unlockOrder&&!player.mo.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
                resource: "superboard currencies", // Name of prestige currency
                baseResource: "motherboard connectors", // Name of resource prestige is based on
                baseAmount() {return player.mo.points}, // Get the current amount of baseResource
                type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
                exponent: 2.5, // Prestige currency exponent
                gainMult() {
                    let mult = new Decimal(1)
                
              
                    return mult
                },
                gainExp() { // Calculate the exponent on main currency from bonuses
                    return new Decimal(1)
                },
                row: 3, // Row the layer is in on the tree (0 is the first row)
                branches: ["mo"],
                hotkeys: [
                    {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
                ],
              
                layerShown(){return player.mo.unlocked},
                buyables: {
                    11: {
                        title: "Add CPU",
                        cost(x) { return new Decimal(1).mul(x) },
                        display() { return "Adds CPU to make motherboards stronger" },
                        canAfford() { return player[this.layer].points.gte(this.cost()) },
                        buy() {
                            player[this.layer].points = player[this.layer].points.sub(this.cost())
                            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                        },
                       
                    },
                    12: {
                        title: "Add GPU",
                        cost(x) { return new Decimal(1).mul(x) },
                        display() { return "Adds GPU to make motherboards stronger" },
                        canAfford() { return player[this.layer].points.gte(this.cost()) },
                        buy() {
                            player[this.layer].points = player[this.layer].points.sub(this.cost())
                            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                        },
                       
                    },
                   
                },
             upgrades: {
                    11: {
                    title: "True Gears",
                    description: "Gear upgrades are ^1.5 stronger",
                    cost: new Decimal(2),
                },
                12: {
                    title: "Nine Circles",
                    description: "The cog gain multiplier starts at 8x.",
                    cost: new Decimal(45),
                    unlocked() { return (hasUpgrade(this.layer, 11))},
                },
                13: {
                    title: "Panko, Beer, Grass, Tempura",
                    description: "The gear's multiplier is improved.",
                    cost: new Decimal(300),
                    unlocked() { return (hasUpgrade(this.layer, 11))},
                },
                14: {
                    title: "Omninux",
                    description: "The Machintruc upgrade 2 powerer is better.",
                    cost: new Decimal(1500),
                    unlocked() { return (hasUpgrade(this.layer, 12))},
                },
                },
               
            })
             addLayer("bo", {
                name: "Bot", // This is optional, only used in a few places, If absent it just uses the layer id.
                symbol: "BO", // This appears on the layer's node. Default is the id with the first letter capitalized
                position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
                startData() { return {
                    unlocked: false,
                    points: new Decimal(0),
                }},
              
                color: "#ffcd00",
                requires: new Decimal("512"),       // Can be a function that takes requirement increases into account
                resource: "bots", // Name of prestige currency
                baseResource: "damages", // Name of resource prestige is based on
                baseAmount() {return player.da.points}, // Get the current amount of baseResource
                type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
                exponent: 1, // Prestige currency exponent
                gainMult() {
                    let mult = new Decimal(1)
                    return mult
                },
                gainExp() { // Calculate the exponent on main currency from bonuses
                    return new Decimal(1)
                },
                tabFormat: ["main-display",
                "prestige-button",
                "blank",
                ["display-text",
                function() {return 'Your best Bots are ' + formatWhole(player.bo.best) + '<br>You have made a total of '+formatWhole(player.bo.total)+" bots."},
                {}],
                "blank",
                ["display-text",
                    function() {return  'You have made a total of '+formatWhole(player.da.total)+" Damage."},
                        {}],
                "blank",
                "milestones", "blank", "blank", "upgrades"],
                tabFormat: {
                    "Main Tab": {
                        content: ["main-display",
                            "prestige-button",
                            "resource-display",
                            "blank",
                            "milestones",
                            "blank",
                            ["buyable", 11],
                        ],
                    },
                 Tank: {
      
                        buttonStyle() { return {'background-color': '#ffcd00'} },
                        content: [
                            "main-display",
                            "blank",
                            ["upgrade", 11],
                            "blank",
                            "blank",
                            "blank",
                            "blank"],
                    },
                },
                /* 
                powerExp() {
                    let exp = new Decimal(1/3);
                    return exp;
                },
                powerEff() {
                    if (!unl(this.layer)) return new Decimal(1);
                    return player.i.power.plus(1).pow(this.powerExp());
                },
                */
                row: 4, // Row the layer is in on the tree (0 is the first row)
               
                branches: ["da","re"],
                hotkeys: [
                    {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
                ],
              
                layerShown(){return player.re.unlocked},
                milestones: {
                    0: {
                        requirementDescription: "1 Bot",
                        done() { return player.bo.best.gte(1) },
                        effectDescription: "Keep all of your milestones from Row 0, 1, 2 and 3.",
                       
                    },
                    1: {
                        requirementDescription: "2 Bots",
                        done() { return player.bo.best.gte(2) },
                        effectDescription: "Damage and Replicants reset nothing.",
                       
                    },
                    2: {
                        requirementDescription: "10 Bots",
                        done() { return player.bo.best.gte(10) },
                        effectDescription: "You can now deal 16x damage to Damage and unlock Damage Powerers",
                       
                    },
                    3: {
                        requirementDescription: "1e10 Bots",
                        done() { return player.bo.best.gte(1e10) },
                        effectDescription: "Unlock 2 more Damage Powerer upgrades.",
                       
                    },
                    4: {
                        requirementDescription: "1e50 Bots",
                        done() { return player.bo.best.gte(1e50) },
                        effectDescription: "You now gain 5% of Super Machintruc systems per second.",
                       
                    },
                    5: {
                        requirementDescription: "1.80e308 Bots",
                        done() { return player.bo.best.gte("1.80e308") },
                        unlocked() { return hasMilestone("bo", 3) },
                        effectDescription: "Damage buyables now have effect on Replicanti.",
                       
                    },
                },
                buyables: {
                    showRespec: true,
                    respec() { // Optional, reset things and give back your currency. Having this function makes a respec button appear
                        player[this.layer].points = player[this.layer].points.add(player[this.layer].spentOnBuyables) // A built-in thing to keep track of this but only keeps a single value
                        resetBuyables(this.layer)
                        doReset(this.layer, true) // Force a reset
                    },
                    respecText: "Respec your Tank stats", // Text on Respec button, optional
                    respecMessage: "Are you sure? This will reset Bots.",
                    11: {
                        title: "Damage", // Optional, displayed at the top in a larger font
                        cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
                            if (x.gte(25)) x = x.pow(2).div(25)
                            let cost = Decimal.pow(2, x.pow(1.5))
                            return cost.floor()
                        },
                        effect(x) { // Effects of owning x of the items, x is a decimal
                            let eff = {}
                            if (x.gte(0)) eff.first = Decimal.pow(25, x.pow(1.1))
                            else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
                        
                            if (x.gte(0)) eff.second = x.pow(0.8)
                            else eff.second = x.times(-1).pow(0.8).times(-1)
                            return eff;
                        },
                        display() { // Everything else displayed in the buyable button after the title
                            let data = tmp[this.layer].buyables[this.id]
                            return "Cost: " + format(data.cost) + " cogs\n\
                            Amount: " + player[this.layer].buyables[this.id] + "/4\n\
                            Adds " + format(data.effect.first) + " more damage to your Tank and multiplies your Bots by " + format(data.effect.second)
                        },
                        unlocked() { return player[this.layer].unlocked }, 
                        canAfford() {
                            return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                        buy() { 
                            cost = tmp[this.layer].buyables[this.id].cost
                            player[this.layer].points = player[this.layer].points.sub(cost)	
                            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                            player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
                        },
                        buyMax() {}, // You'll have to handle this yourself if you want
                        style: {'height':'222px'},
                        purchaseLimit: new Decimal(1024),
                        sellOne() {
                            let amount = getBuyableAmount(this.layer, this.id)
                            if (amount.lte(0)) return // Only sell one if there is at least one
                            setBuyableAmount(this.layer, this.id, amount.sub(1))
                            player[this.layer].points = player[this.layer].points.add(this.cost)
                        },
                    },
                },
                upgrades: {
                    11: {
                    title: "Robot Bulk",
                    description: "You gain cogs 2 times faster based on your Bots.",
                    cost: new Decimal(200000),
                
        
               
                },
            
                   
               }
            
                 })
                 addLayer("q", {
                    name: "Quantum", // This is optional, only used in a few places, If absent it just uses the layer id.
                    symbol: "Q", // This appears on the layer's node. Default is the id with the first letter capitalized
                    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
                    startData() { return {
                        unlocked: false,
                        points: new Decimal(0),
                    }},
                  
                    color: "#ff007b",
                    requires: new Decimal("1024"),       // Can be a function that takes requirement increases into account
                    resource: "quantums", // Name of prestige currency
                    baseResource: "internet connections", // Name of resource prestige is based on
                    baseAmount() {return player.i.points}, // Get the current amount of baseResource
                    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
                    exponent: 2.5, // Prestige currency exponent
                    gainMult() {
                        let mult = new Decimal(1)
                        return mult
                    },
                    gainExp() { // Calculate the exponent on main currency from bonuses
                        return new Decimal(1)
                    },
                    tabFormat: ["main-display",
                    "prestige-button",
                    "blank",
                    ["display-text",
                    function() {return 'Your best Quantum are ' + formatWhole(player.q.best) + '<br>You have made a total of '+formatWhole(player.q.total)+" quantum."},
                    {}],
                    "blank",
                   "blank",
                    "blank",
                    "milestones", "blank", "blank", "upgrades"],
                   
                    /* 
                    powerExp() {
                        let exp = new Decimal(1/3);
                        return exp;
                    },
                    powerEff() {
                        if (!unl(this.layer)) return new Decimal(1);
                        return player.i.power.plus(1).pow(this.powerExp());
                    },
                    */
                    row: 4, // Row the layer is in on the tree (0 is the first row)
                   
                    branches: ["i"],
                    hotkeys: [
                        {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
                    ],
                  
                    layerShown(){return player.re.unlocked},
                    milestones: {
                        0: {
                            requirementDescription: "1 Quantum",
                            done() { return player.q.best.gte(1) },
                            effectDescription: "Keep all of your Internet Milestones.",
                           
                        },
                        1: {
                            requirementDescription: "2 Quantum",
                            done() { return player.q.best.gte(2) },
                            effectDescription: "You can buy max Internet connections.",
                           
                        },
                        2: {
                            requirementDescription: "5 Quantum",
                            done() { return player.q.best.gte(5) },
                            effectDescription: "Internet reset nothing.",
                           
                        },
                        3: {
                            requirementDescription: "10000 Total Quantum",
                        	done() { return player.q.total.gte(10000) },
                            effectDescription: "Unlock 1 new Data Storage upgrade, which generates more cogs",
                           
                        },
                       
                    },
                    
                    challenges: {
                        11: {
                            name: "Hard Time",
                            challengeDescription: "It is Kalafior and Weak key challenge combined.",
                            canComplete: function() {return player.points.gte(5e10)},
                  
                            goal(){
                                if (challengeCompletions(this.layer, this.id) == 0) return new Decimal(1e4);
                                if (challengeCompletions(this.layer, this.id) == 1) return new Decimal(1e6);
                              
                            },
                            rewardDescription: "Cog gain is raised to the power of ^1.15",
                        },
                        12: {
                            name: "Bad Advice",
                            challengeDescription: "Power Station upgrades are raised to the power of ^0.001",
                            canComplete: function() {return player.points.gte(1e25)},
                            unlocked() { return hasChallenge("q", 11) },
                            goal(){
                                if (challengeCompletions(this.layer, this.id) == 0) return new Decimal(1e4);
                                if (challengeCompletions(this.layer, this.id) == 1) return new Decimal(1e6);
                              
                            },
                            rewardDescription: "Unlock a new Data Storage upgrade.",
                        },
                    },
                       
                   
                
                     })
addLayer("ab", {
	startData() { return {unlocked: true}},
	color: "yellow",
	symbol: "AB",
	row: "side",
	layerShown() { return player.d.unlocked},
	tooltip: "Autobuyers",
	clickables: {
		rows: 6,
		cols: 4,
		11: {
			title: "Machintruc",
			display(){
				return hasMilestone("d", 1)?(player.p.auto?"On":"Off"):"Locked"
			},
			unlocked() { return player.d.unlocked },
			canClick() { return hasMilestone("d", 1) },
			onClick() { player.p.auto = !player.p.auto },
			style: {"background-color"() { return player.p.auto?"#6e64c4":"#666666" }},
		},
    }
})
addLayer("a", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievements: {
        rows: 16,
        cols: 5,
        11: {
            name: "Imagine using your moddcoins to buy almighty cape",
            done() { return player.p.points.gt(0) },
            tooltip: "Reset your cogs for Machintruc system",
            image: "images/achs/21.png",
        },
        12: {
            name: "I do handle unsubs you idiot!",
            done() { return player.points.gte(100) },
            tooltip: "Reach 100 cogs",
            image: "images/achs/22.png",
        },
        13: {
            name: "Don't play the same animations",
            done() { return player.g.points.gt(0) },
            tooltip: "Reset for Gears. Reward: You gain 10% more Cogs",
            image: "images/achs/23.png",
        },
        14: {
            name: "A grimm reaper",
            done() { return player.p.points.gt(25) },
            tooltip: "Reach 25 machintruc systems",
            image: "images/achs/24.png",
        },
        15: {
            name: "A furcorn",
            done() { return player.ps.points.gt(0) },
            tooltip: "Reset for Power Stations. Reward: Machintruc Upgrades are raised to the power of ^1.01",
            image: "images/achs/25.png",
        },
       21: {
            name: "It is a bulk",
            done() { return player.g.points.gt(25) },
            tooltip: "Reach 25 Gears",
            image: "images/achs/26.png",
        },
        22: {
            name: "Million Zeros",
            done() { return player.points.gte(1000000) },
            tooltip: "Reach 1M cogs, Reward: You gain cogs 2x faster",
            image: "images/achs/27.png",
        },
        23: {
            name: "Radar Spells",
            done() { return player.d.points.gte(1) },
            tooltip: "Reset for Data Storages.",
            image: "images/achs/28.png",
        },
    },
    tabFormat: [
        "blank", 
        ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-2) }], 
        "blank", "blank",
        "achievements",
    ],
   
}, 
)
