addLayer("p", {
    name: "machintrc", // This is optional, only used in a few places, If absent it just uses the layer id.
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
    doReset(resettingLayer) {
        let keep = [];
     
        if (hasMilestone("g", 0) && resettingLayer=="g") keep.push("upgrades")
        if (hasMilestone("ps", 0) && resettingLayer=="ps") keep.push("upgrades")
         if (layers[resettingLayer].row > this.row) layerDataReset("p", keep)
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
               return eff;
            },
            unlocked() { return (hasUpgrade(this.layer, 22))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
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
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    canBuyMax() { return hasMilestone("g", 1) },
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
    milestones: {
        0: {
            requirementDescription: "8 Gears",
            done() { return player.g.best.gte(8) },
            effectDescription: "Keep Machintruc Upgrades on reset.",
        },
        1: {
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
                return eff;
             },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return (hasUpgrade(this.layer, 12))},
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
            return new Decimal(1.2);
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
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#a0d669",
    requires() { return new Decimal(300000).times((player.d.unlockOrder&&!player.d.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    resource: "data storages", // Name of prestige currency
    baseResource: "cogs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    doReset(resettingLayer) {
        let keep = [];
     
        if (hasMilestone("i", 0) && resettingLayer=="i") keep.push("upgrades")
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
    branches: ["ps, g"],
    hotkeys: [
        {key: "g", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  
    layerShown(){return player.g.unlocked},
    milestones: {
        0: {
            requirementDescription: "3 Data Storages",
            done() { return player.d.best.gte(3) },
            effectDescription: "Keep your all Gear upgrades",
           
        },
        1: {
            requirementDescription: "35 Data Storages",
            done() { return player.d.best.gte(35) },
            effectDescription: "Unlock the Machintruc Automator",
            toggles: [["m", "auto"]],
        },
    },
    challenges: {
        11: {
            name: "Kalafior",
            challengeDescription: "The double gain for Cogs is at 1.5x multilpier instead of 2x",
            canComplete: function() {return player.points.gte(250000)},
  
            goal(){
                if (challengeCompletions(this.layer, this.id) == 0) return new Decimal(1e4);
                if (challengeCompletions(this.layer, this.id) == 1) return new Decimal(1e6);
              
            },
            rewardDescription: "Cogs gain is increased by 8x",
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
addLayer("cb", {
    name: "CMOS Battery", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
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
    },
   
 upgrades: {
        11: {
        title: "Power Operation",
        description: "Power Stations upgrades are ^1.5 stronger",
        cost: new Decimal(5),
    },
    12: {
        title: "Time Renderer",
        description: "The cog gain is increased by 4.5x.",
        cost: new Decimal(100),
    },
    13: {
        title: "Lock Timeout",
        description: "Machintruc upgrades are ^1.1 stronger.",
        cost: new Decimal(500),
    },
    14: {
        title: "Modchipper",
        description: "Crackdown any Machintruc and modchip the Power Stations.",
        cost: new Decimal("1e900"),
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
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#c0d1a5",
    requires() { return new Decimal(2000000000).times((player.mo.unlockOrder&&!player.mo.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    resource: "motherboard connectors", // Name of prestige currency
    baseResource: "cogs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
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
    },
   
})
addLayer("re", {
    name: "Replicanti", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
  
    color: "#f705bb",
    requires() { return new Decimal(1e100).times((player.re.unlockOrder&&!player.re.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    resource: "replicants", // Name of prestige currency
    baseResource: "cogs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    branches: ["mo,d"],
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
            unlocked: true,
            points: new Decimal(0),
        }},
      
        color: "#ffffff",
        requires() { return new Decimal("1e1000").times((player.i.unlockOrder&&!player.i.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
        resource: "internet connections", // Name of prestige currency
        baseResource: "cogs", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 1, // Prestige currency exponent
        gainMult() {
            let mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 3, // Row the layer is in on the tree (0 is the first row)
        branches: ["cb"],
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
				return hasMilestone("d", 1)?(player.m.auto?"On":"Off"):"Locked"
			},
			unlocked() { return player.d.unlocked },
			canClick() { return hasMilestone("d", 1) },
			onClick() { player.m.auto = !player.m.auto },
			/* style: {"background-color"() { return player.m.auto?"#6e64c4":"#666666" }}, */
		},
    }
})
