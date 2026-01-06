addLayer("truck", {
    startData() { return {
        unlocked: true,
      inTrucking: new Decimal(0),
    pointsinTrucking: new Decimal(0),
    time: new Decimal(0),
    }},
    color: "#AAAAAA",
    row: "side",
    layerShown() {return player.pa.unlocked}, 

 
   symbol: "<img src='Truck up.png' style='width:calc(85% - 2px);height:calc(85% - 2px);margin:-5%'></img>",

   tabFormat: {
    "Main": {
     
        content: [ "blank",
        ["display-text", function() { return "After unlocking Pashtocha, you'll also unlock Peculiar Truck." }],
        "blank",
        ["display-text", function() { return "Use the trucking method to gain an advantage in the long run." }],
        ["blank", "150px"],
      "clickables",
      "blank",
      "blank",
      "upgrades",
    ]},
    "Truck Corruption": {
     
        content: [ "blank",
        ["display-text", function() { return "Requires at least 1e81 total Pashtocha Points and beaten The Wrath of the Black Screen with White Non-Blinking Underscore." }],
        
    ]},
},
tooltip() { // Optional, tooltip displays when the layer is locked
    return ("Peculiar Truck")
},
upgrades: {
    11: {
        title: "Antitimewall",
        description: "Universe Energy's effect is squared and Element hardcap is increased to 1e100.",
        cost: new Decimal("1e100000"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return player.pa.unlocked},
      
    },
},
clickables: {
    11: {
        title() {return "Truck Up"},
       
canClick() {return true},
        onClick() {

       
    
        if (player.truck.inTrucking.gte(1)) {
            player.truck.inTrucking = new Decimal(0)
            player.truck.time = new Decimal(0)
            doReset("s",true)
        }
        else {
            player.truck.inTrucking = new Decimal(1) 
            doReset("s",true)
        }
        },

       
        display() {return "Truck up to see how many points you will gain! You have 30 seconds to test your trucking points.<br><small>Highest points earned in trucking: "+format(player.truck.pointsinTrucking)+".</small>"},
       tooltip() {return "<small>Entering Truck Up mode will force a Sector reset, and you cannot get any Orbs and Cookies. Points gain is raised ^0.400, base points gain is disabled and upgrades that boost either Exponent Points or Points are cube rooted. While trucking, you can't get any Sectors or Pashtocha Points.</small>"},
       style: {'height':'126px','width':'256px'},
    },
},
update(diff) {
    if (player.truck.inTrucking.gte(1)) {
        player.truck.time = player.truck.time.add(diff);
        player.truck.pointsinTrucking = player.truck.pointsinTrucking.max(player.points)
    }
    if (player.truck.inTrucking.gte(1)&&player.truck.time.gte(30)) {
        player.truck.inTrucking = new Decimal(0)
        player.truck.time = new Decimal(0)
        doReset("s",true)
    }
}
})

