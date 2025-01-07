addLayer("ach", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
  
    }},
    color: "gold",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
   
    achievements: {
       
        11: {
            name: "Beginning",
            done() { return player.ex.unlocked },
            tooltip: "Reset for Exponent Coins.",
        
        },
        12: {
            name: "Starting up...",
            done() { return player.points.gte(1000) },
            tooltip: "Reach 1000 Points.",
        
        },
        13: {
            name: "Fluctuate",
            done() { return player.ex.expPoints.gte(1e30) },
            tooltip: "Reach 1e30 Exponent Points.",
        
        },
        14: {
            name: "Grinding up",
            done() { return player.ic.points.gte(10) },
            tooltip: "Reach 10 Incremental Coins.<br><small>Reward: Keep Exponent Buyables on Row 2 reset.</small>",
        

        },
        15: {
            name: "Marble Race",
            done() { return player.o.points.gte(2) },
            tooltip: "Reach 2 Orbs.",
        
        },
        16: {
            name: "Willy Likes Cookies reference",
            done() { return player.wi.cookies.gte(1) },
            tooltip: "Get a Willy Cookie.",
        
        },
        21: {
            name: "New Layer Awaits",
            done() { return player.ic.unlocked },
            tooltip: "Reset for Incremental Coins.<br><small>Reward: Points gain is raised 1.2.</small>",
    
        },
        22: {
            name: "Maximum Insights",
            done() { return player.points.gte(1e36) },
            tooltip: "Reach 1e36 Points.",
    
        },
        23: {
            name: "Fluctuated",
            done() { return player.ex.expPoints.gte(1e90) },
            tooltip: "Reach 1e90 Exponent Points.",
        
        },
        24: {
            name: "Incremented",
            done() { return player.ic.points.gte(1e135) },
            tooltip: "Reach 1e135 Incremental Coins.",
        

        },
        25: {
            name: "Super Marble Race.",
            done() { return player.o.points.gte(50) },
            tooltip: "Reach 50 Orbs.",
        
        },
        26: {
            name: "MY DATA",
            done() { return player.s.corruption.gte(1) },
            tooltip: "Corrupt your partition for the first time.",
        
        },
        31: {
            name: "Illegal Hunters",
            done() { return player.p.unlocked },
            tooltip: "Reset for Poachers.<br><small>Reward: Unlock Universal Shifts.</small>",
    
        },
        32: {
            name: "Distanced Up",
            done() { return player.points.gte("1e500") },
            tooltip: "Reach 1e500 Points.<br><small>Reward: Automate Dubnium and its cost scaling is subtracted by 1.75.</small>",
    
        },
        33: {
            name: "Boomed Inflation",
            done() { return player.points.gte("1e1000") },
            tooltip: "Reach 1e1,000 Points.",
    
        },
        34: {
            name: "Willy Loves Cookies",
            done() { return player.c.points.gte("1e28") },
            tooltip: "Reach 1e28 Cookies.<br><small>Reward: Automate the first 3 Periodic Element buyables.</small>",
    
        },
        41: {
            name: "New Layer Awaits?",
            done() { return player.s.unlocked },
            tooltip: "Reset for Sectors.",
    
        },
        42: {
            name: "We can't break but we can burn it",
            done() { return player.ex.points.gte(256) },
            tooltip: "Reach 256 Exponent Coins. <small>Reward: Double Sectors gain.</small>",
    
        },
        43: {
            name: "There's more than disk management!",
            done() { return hasUpgrade("s",27) },
            tooltip: "Unlock Sector buyables.",
    
        },
    },

    tabFormat: [
        "blank", 
        ["display-text", function() { return "You currently have obtained "+player.ach.achievements.length+"/"+(Object.keys(tmp.ach.achievements).length-2+" Achievements.")+"" }], 
        "blank", "blank",
        ["display-text", function() { return "Your base point is "+format(getBasePointGen())+"." }],
        "achievements",
     
    ],
    
})

