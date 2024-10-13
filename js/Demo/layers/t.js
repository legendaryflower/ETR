addLayer("t", {
    infoboxes:{
        coolInfo: {
            title: "Lore",
            titleStyle: {'color': '#FE0000'},
            body: "DEEP LORE!",
            bodyStyle: {'background-color': "#0000EE"}
        }
    },

    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    
    }},
    onReset() {
        player.c.upgrades = ["23"];
    },
    color: "#FE0102",
    requires() {return new Decimal(0)}, 
    resource: "tech points", 
    baseResource: "points", 
    baseAmount() {return player.points},
    type: "static",
    exponent: 0.5,
    base: 3,
    roundUpCost: true,
    canBuyMax() {return false},
    //directMult() {return new Decimal(player.c.otherThingy)},

    row: 2,
    layerShown() {return true}, 
    branches: ["f"], // When this layer appears, a branch will appear from this layer to any layers here. Each entry can be a pair consisting of a layer id and a color.

    tooltipLocked() { // Optional, tooltip displays when the layer is locked
        return ("This weird farmer dinosaur will only see you if you have at least " + this.requires() + " points. You only have " + formatWhole(player.points))
    },
    midsection: [
        "blank", ['display-image', 'https://images.beano.com/store/24ab3094eb95e5373bca1ccd6f330d4406db8d1f517fc4170b32e146f80d?auto=compress%2Cformat&dpr=1&w=390'],
        ["display-text", "Bork bork!"]
    ],
    // The following are only currently used for "custom" Prestige type:
    prestigeButtonText() { //Is secretly HTML
        if (!this.canBuyMax()) return "Hi! I'm a <u>weird dinosaur</u> and I'll give you a Farm Point in exchange for all of your points and lollipops! (At least " + formatWhole(tmp[this.layer].nextAt) + " points)"
        if (this.canBuyMax()) return "Hi! I'm a <u>weird dinosaur</u> and I'll give you <b>" + formatWhole(tmp[this.layer].resetGain) + "</b> Farm Points in exchange for all of your points and lollipops! (You'll get another one at " + formatWhole(tmp[this.layer].nextAtDisp) + " points)"
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
    // This is also non minimal, a Clickable!
 

        
}, 
)