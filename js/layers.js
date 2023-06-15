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
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration() { return (hasMilestone("g", 1)&&player.ma.current!="p")?1:0 },
    doReset(resettingLayer) {
        let keep = [];
     
        if (hasMilestone("g", 0) && resettingLayer=="g") keep.push("upgrades")
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
                return player[this.layer].points.add(1).pow(0.5)
                

            },
            unlocked() { return (hasUpgrade(this.layer, 11))},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

        },
        13: {
            title: "Turbo Booster",
            description: "Decrease cogs required for Machintruc system and boost more machintruc system gain",
            cost: new Decimal(50),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            unlocked() { return (hasUpgrade(this.layer, 12))},
        },
        14: {
            title: "True Cog Booster",
            description: "Exponetial trees now have possible generators",
            cost: new Decimal(200),
            effect() {
                return player.points.add(1).pow(0.25)
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
    layerShown(){return true},
    milestones: {
        0: {
            requirementDescription: "8 Gears",
            done() { return player.g.best.gte(8) },
            effectDescription: "Keep Machintruc Upgrades on reset.",
        },
        1: {
            requirementDescription: "14 Gears",
            done() { return player.g.best.gte(14) },
            effectDescription: "You passivily gain Machintruc systems",
        },
    },
    upgrades: {
        11: {
            title: "Worth of Goods",
            description: "Generate more cogs.",
            cost: new Decimal(5),
            
        },
    
    },
})
