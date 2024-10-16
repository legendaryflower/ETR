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
        31: {
            name: "Illegal Hunters",
            done() { return player.p.unlocked },
            tooltip: "Reset for Poachers.<br><small>Reward: Unlock Universal Shifts.</small>",
    
        },
    },
    tabFormat: [
        "blank", 
        ["display-text", function() { return "You currently have obtained "+player.ach.achievements.length+"/"+(Object.keys(tmp.ach.achievements).length-2+" Achievements.")+"" }], 
        "blank", "blank",
        "achievements",
     
    ],
    
})

