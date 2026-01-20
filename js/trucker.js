addLayer("truck", {
    startData() { return {
        unlocked: true,
      inTrucking: new Decimal(0),
    pointsinTrucking: new Decimal(0),
    time: new Decimal(0),
    compoundFragmentLayers: new Decimal(0),
    penguin: new Decimal(0),
    ant: new Decimal(0),
    xp: new Decimal(0),
    }},
    color: "#AAAAAA",
    row: "side",
    layerShown() {return player.pa.unlocked}, 

     autoUpgrade() {return player.z.unlocked&&player.si.current==null},
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
        ["display-text", function() { return (!hasChallenge("pa",13)?"Requires completed The Wrath of the Black Screen with White Non-Blinking Underscore.":"") }],
         ["raw-html", function() {return (hasChallenge("pa",13)?'<video autoplay muted loop playsinline width="640"><source src="corruption.mp4" type="video/mp4">Unable to load video. I am kinda lazy to add a GIF for it instead.</video>':'')}], "blank",
   "blank",
      ["display-text", function() { return (hasChallenge("pa",13)?"WELCOME THERE. I AM THE CORRUPTER OF TRUCKS AND CAN YOU FACE ME AGAINST THE ENDLESS SERIES OF CORRUPTIONS? I HOPE YOU WON'T PASS BECAUSE YOU ARE GOING TO BE EXPLODED INTO A MILLION PIECES WHEN YOU TRY TO REACH IT! MWHAHAHAHAHAHAHAHA":"") }],
       "blank",
       "blank",
["raw-html", function() {return '<img style="width: 64px; height: 64px" src="gifs/Penguin Fragment.gif"> You have '+formatWhole(player.truck.penguin)+' Penguin Fragments (gained from log10(Points)+1/1e6)'}], "blank",
   "blank",
    "blank",
    ["raw-html", function() {return (player.si.mastered.includes("ic")?'<img style="width: 64px; height: 64px" src="gifs/Ant Fragment.gif"> You have '+formatWhole(player.truck.ant)+' Ant Fragments (gained from ExpCoins/100,000)':'')}], "blank",
   "blank",
    "blank",
     "buyables",
]},
        "Zombie Milestones": {
       unlocked() {return player.z.unlocked},
                  buttonStyle() { return {'border-color': '#00850b'} },
        content: [ "blank",
      "milestones",
        ]},
},
tooltip() { // Optional, tooltip displays when the layer is locked
    return ("Peculiar Truck")
},
penguinFragAmt() {
			let amt = player.points.log10().add(1).div(1e6)
			return amt.floor();
		},
		
        antFragAmt() {
			let amt = player.ex.points.div(1e5)
			return amt.floor();
		},
upgrades: {
    11: {
        title: "Antitimewall",
        description: "Universe Energy's effect is squared and Element hardcap is raised 1.1",
        cost: new Decimal("1e39050"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return player.pa.unlocked},
      
    },
       12: {
        title: "Emperor Currency",
        description: "Each Trucker upgrades raises points in The Wrath of Black Screen with White Non-Blinking Underscore challenge.",
        cost: new Decimal("1e39125"),
         effect() {
                let eff = Decimal.pow(1.05, player.truck.upgrades.length);
               if (hasUpgrade("truck",22)) eff = eff.times(2)
                return eff;
            },
            effectDisplay() { return "^"+format(tmp.truck.upgrades[12].effect) },
           
            tooltip() {return "TruckUpgradePurchased<sup>1.05</sup>"} ,
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",11)},
      
    },
     13: {
        title: "Squishcap",
        description: "Each Trucker upgrades pushes Points softcap later.",
        cost: new Decimal("1e39150"),
         effect() {
                let eff = Decimal.pow(1.03, player.truck.upgrades.length);
               if (hasUpgrade("truck",23)) eff  = eff.times(1.25)
                return eff;
            },
            effectDisplay() { return "^"+format(tmp.truck.upgrades[13].effect) },
           
            tooltip() {return "TruckUpgradePurchased<sup>1.03</sup>"} ,
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",12)},
      
    },
      14: {
        title: "Square Diameters",
        description: "Square Further-Exponent Point generation.",
        cost: new Decimal("1e42900"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",13)},
      
    },
     15: {
        title: "Further Volume",
        description: "Cube Further-Exponent Point's effect.",
        cost: new Decimal("1e48800"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",14)},
      
    },
     16: {
        title: "Free Generators",
        description: "Divide cost base of Further-Exponent Coin Generation buyable by 3 and automate them.",
        cost: new Decimal("1e50450"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",15)},
      
    },
     17: {
        title: "Furtherized Generattons",
        description: "Multiply Further-Exponent Point generation based on Points.",
        cost: new Decimal("1e52200"),
         effect() {
                let eff = player.points.add(1).log10().pow(0.5)
              
                return eff;
            },
            effectDisplay() { return format(tmp.truck.upgrades[17].effect)+"x" },
           
            tooltip() {return "log10(Points<sup>0.5</sup>)"} ,
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",16)},
      
    },
      21: {
        title: "Bridged Trucking",
        description: "Raise Cheeseburger Softcap based on Points in Trucking.",
        cost: new Decimal("1e54100"),
         effect() {
                let eff = player.truck.pointsinTrucking.add(1).log10().pow(0.02)
              
                return eff;
            },
            effectDisplay() { return "^"+format(tmp.truck.upgrades[21].effect)},
           
            tooltip() {return "log10(TruckerPoints<sup>0.02</sup>)"} ,
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",17)},
      
    },
      22: {
        title: "Currency Empire",
        description: "Double the upgrade's effect above this upgrade.",
        cost: new Decimal("1e56000"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",21)},
      
    },
     23: {
        title: "No more few thousand OoM buff.",
        description: "Increase the above upgrade's effect by 25%.",
        cost: new Decimal("1e57850"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",22)},
      
    },
      24: {
        title: "Photoshop Hogger",
        description: "Double Affinity Generation.",
        cost: new Decimal("1e75010"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",23)},
      
    },
     25: {
        title: "Alternative Exponent",
        description: "Cube points gen.",
        cost: new Decimal("1e75020"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",24)},
      
    },
     26: {
        title: "Sugar Treatment",
        description: "Square Exponent Points gain while on The Wrath of Black Screen with White Non-Blinking Underscore.",
        cost: new Decimal("1e75023"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",25)},
      
    },
       27: {
        title: "Trucker Softcaps",
        description: "Trucker Points softcap starts later based on best points in Trucking.",
        cost: new Decimal("1e75026"),
         effect() {
                let eff = player.truck.pointsinTrucking.add(1).log10().add(1).pow(1.5)
              
                return eff;
            },
            effectDisplay() { return format(tmp.truck.upgrades[27].effect)+"x"},
           
            tooltip() {return "log10(TruckerPoints<sup>1.5</sup>)"} ,
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",26)},
      
    },


       31: {
        title: "Affinitized Threadripper",
        description: "Multiply Affinity gain after nerf based on best points in Trucking.",
        cost: new Decimal("1e75035"),
         effect() {
                let eff = player.truck.pointsinTrucking.add(1).log10().pow(0.275)
              
                return eff;
            },
            effectDisplay() { return format(tmp.truck.upgrades[31].effect)+"x"},
           
            tooltip() {return "log10(TruckerPoints<sup>0.275</sup>)"} ,
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",27)},
      
    },
     32: {
        title: "Hyperthreading",
        description: "Add a free level to CPU Threads.",
        cost: new Decimal("5e75036"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",31)},
      
    },
     33: {
        title: "Memory Controller",
        description: "Divide all Sector buyable cost base by 1.1 and unlock a new Sector buyable.",
        cost: new Decimal("2e75040"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",32)},
      
    },
    34: {
        title: "LGA Socket",
        description: "Divide all Sector buyable (including the recent newly unlocked one) cost base by 1.1 and automate them.",
        cost: new Decimal("1e75043"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",33)},
      
    },
     35: {
        title: "PGA Socket",
        description: "Sector exp+0.2 and square the Points Softcap.",
        cost: new Decimal("1e75046"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",34)},
      
    },
      36: {
        title: "Z890 Chipset",
        description: "Cookies hardcap gain starts 1e100x later.",
        cost: new Decimal("4.5e708189"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",35)&&player.si.mastered.includes("ex")},
      
    },
      37: {
        title: "B860 Chipset",
        description: "Squishcap now affects Points Softcap<sup>2</sup> at a reduced rate.",
        cost: new Decimal("7e708189"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
        unlocked() {return hasUpgrade("truck",36)&&player.si.mastered.includes("ex")},
      
    },
    41: {
        title: "Z790 Chipset",
        description: "Super Base Points are multiplied based on your Points.",
        cost: new Decimal("6.2e708193"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
  
         effect() {
                let eff = player.points.add(1).log10().add(1)
              
                return eff;
            },
            effectDisplay() { return format(tmp.truck.upgrades[41].effect)+"x"},
                 tooltip() {return "log10(Points)"} ,
        unlocked() {return hasUpgrade("truck",37)&&player.si.mastered.includes("ex")},
      
    },
     42: {
        title: "B760 Chipset",
        description: "Super Base Points are multiplied based on your Base Points.",
        cost: new Decimal("2e708196"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
  
         effect() {
                let eff = getBasePointGen().add(1).log10().add(1)
              
                return eff;
            },
            effectDisplay() { return format(tmp.truck.upgrades[42].effect)+"x"},
                 tooltip() {return "log10(BasePoints)"} ,
        unlocked() {return hasUpgrade("truck",41)&&player.si.mastered.includes("ex")},
      
    },
      43: {
        title: "H610 Chipset",
        description: "Bifurther-Exponent Point generation is faster based on your Superbase Points.",
        cost: new Decimal("2.32e708198"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
  
         effect() {
                let eff = getSuperBasePointGen().add(1).log(2).add(1)
              
                return eff;
            },
            effectDisplay() { return format(tmp.truck.upgrades[43].effect)+"x"},
                 tooltip() {return "log2(SuperBasePoints)"} ,
        unlocked() {return hasUpgrade("truck",42)&&player.si.mastered.includes("ex")},
      
    },
     44: {
        title: "X870E Chipset",
        description: "'Trucker Softcaps' also affects Super Softcap in Trucking.",
        cost: new Decimal("1.4e708200"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
  
     
        unlocked() {return hasUpgrade("truck",43)&&player.si.mastered.includes("ex")},
      
    },
      45: {
        title: "X870 Chipset",
        description: "'Exponent Starter' also affects Points Softcap<sup>2</sup>.",
        cost: new Decimal("5.502e708210"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
  
     
        unlocked() {return hasUpgrade("truck",44)&&player.si.mastered.includes("ex")},
      
    },
     46: {
        title: "B850 Chipset",
        description: "Unlock 4th Partition and Partition Tables.",
        cost: new Decimal("1e708214"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
  
     
        unlocked() {return hasUpgrade("truck",45)&&player.si.mastered.includes("ex")},
      
    },
     47: {
        title: "B840 Chipset",
        description: "Zombie Milestone 2 can now generate Points in TMT's Mighty Cheeseburger equal to your current Points being rooted to 5.",
        cost: new Decimal("1.5e708216"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
  
     
        unlocked() {return hasUpgrade("truck",46)&&player.si.mastered.includes("ex")},
      
    },
      51: {
        title: "X670E Chipset",
        description: "Points starts all Truck Softcaps later.",
        cost: new Decimal("1.43e708218"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
     effect() {
                let eff = player.points.add(1).log10().add(1)
              
                return eff;
            },
            effectDisplay() { return format(tmp.truck.upgrades[51].effect)+"x"},
                 tooltip() {return "log10(Points)"} ,
     
        unlocked() {return hasUpgrade("truck",47)&&player.si.mastered.includes("ex")},
      
    },
     52: {
        title: "B650E Chipset",
        description: "Maximum time in trucking is increased by 50% and IC exp+0.5.",
        cost: new Decimal("2e708231"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
   
     
        unlocked() {return hasUpgrade("truck",51)&&player.si.mastered.includes("ex")},
      
    },
     53: {
        title: "B650 Chipset",
        description: "Automate CPUs, Bifurther-Exponent Coin gain and unlock a new Achievement effect.",
        cost: new Decimal("2e708233"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
   
     
        unlocked() {return hasUpgrade("truck",52)&&player.si.mastered.includes("ex")},
      
    },
      53: {
        title: "A620 Chipset",
        description: "Hydrogen also affects Points Softcap<sup>2</sup>.",
        cost: new Decimal("1e743598"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
   
     
        unlocked() {return hasUpgrade("truck",52)&&player.si.mastered.includes("c")},
      
    },
     54: {
        title: "X570 Chipset",
        description: "Unlock Elemental Dimension IV.",
        cost: new Decimal("3e748014"),
       
        currencyDisplayName: "points while Trucking up",
        currencyInternalName: "pointsinTrucking",
        currencyLayer: "truck",
   
     
        unlocked() {return hasUpgrade("truck",53)&&player.si.mastered.includes("c")},
      
    },
},

milestones: {
  0: {
        requirementDescription: "9 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(9)}, // Used to determine when to give the milestone
        effectDescription: "Keeps Incremental Coins upgrade on reset.",
        unlocked() {return player.z.unlocked},
    },
      1: {
        requirementDescription: "12 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(12)}, // Used to determine when to give the milestone
        effectDescription: "You now gain Points in Cheeseburger based on the current Points you have outside of it, but the generation is rooted to 7.5.",
        unlocked() {return player.z.unlocked},
    },
       2: {
        requirementDescription: "15 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(15)}, // Used to determine when to give the milestone
        effectDescription: "Keeps Cookie Upgrades on reset.",
        unlocked() {return player.z.unlocked},
    },
    3: {
        requirementDescription: "20 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(20)}, // Used to determine when to give the milestone
        effectDescription: "Keeps Sector Upgrades on reset.",
        unlocked() {return hasMilestone("truck",2)},
    },
     4: {
        requirementDescription: "30 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(30)}, // Used to determine when to give the milestone
        effectDescription: "Keeps Willy Upgrades on reset.",
        unlocked() {return hasMilestone("truck",3)},
    },
     5: {
        requirementDescription: "50 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(50)}, // Used to determine when to give the milestone
        effectDescription: "Keeps Pashtocha Upgrades on reset.",
        unlocked() {return hasMilestone("truck",4)},
    },
     6: {
        requirementDescription: "75 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(75)}, // Used to determine when to give the milestone
        effectDescription: "Pashtocha gain softcap starts 1e10x later, and Points Softcap<sup>2</sup> starts ^1.1 later.",
        unlocked() {return hasMilestone("truck",5)},
    },
     7: {
        requirementDescription: "150 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(150)}, // Used to determine when to give the milestone
        effectDescription() {return "Points Softcap<sup>2</sup> starts later based on total Assorted Zombie Essences<br>Currently: ^"+format(player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).add(1).pow(hasMilestone("truck",15) ? 0.016:0.008))+"<br>formula: TotalAssortZombie<sup>0.008</sup>+1"},
        unlocked() {return hasMilestone("truck",6)},
    },
       8: {
        requirementDescription: "225 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(225)}, // Used to determine when to give the milestone
        effectDescription() {return "Automate Zombies, and they don't reset Time Riders, Trucker Upgrades and Points in Trucking. Automatically distribute Zombie Essences."},
        unlocked() {return hasMilestone("truck",7)},
        	toggles: [["z", "auto"]],
    },
    9: {
        requirementDescription: "500 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(500)}, // Used to determine when to give the milestone
        effectDescription() {return "Triple Corruption bulk buy and unlock Time Rider's secondary effect."},
        unlocked() {return hasMilestone("truck",8)},
       
    },
     10: {
        requirementDescription: "1200 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(1200)}, // Used to determine when to give the milestone
        effectDescription() {return "Makes you unable to enter TMT's Mighty Cheeseburger, but now TMT helps you with progression. Instead of the cheeseburger effect decreasing over time you have more cheeseburgers, it instead rises. These are not reset on Zombie resets. Upgrades that increase interval don't function. You can't catch cheeseburgers and you can't increase the interval, but you can still add the starting effect. Zombified Sector's effect is changed to multiply Sector gain."},
        unlocked() {return hasMilestone("truck",9)},
       
    },
      11: {
        requirementDescription: "2225 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(2225)}, // Used to determine when to give the milestone
        effectDescription() {return "Cheeseburger Start's effect formula is improved (x*2 --> x<sup>5</sup>*(2.25+Cheeseburgers+1/100))."},
        unlocked() {return hasMilestone("truck",10)},
       
    },
     12: {
        requirementDescription: "3000 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(3000)}, // Used to determine when to give the milestone
        effectDescription() {return "You can now buy max Zombies, and keep Exponent Upgrades on reset. Points Softcap<sup>2</sup> starts an extra ^1.1 later."},
        unlocked() {return hasMilestone("truck",11)},
       
    },
     13: {
        requirementDescription: "100,000 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(100000)}, // Used to determine when to give the milestone
        effectDescription() {return "Assorting doesn't spend any Zombies, unlock a new Element and new Achievement effect."},
        unlocked() {return hasMilestone("truck",12)},
       
    },
     14: {
        requirementDescription: "1,000,000 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(1000000)}, // Used to determine when to give the milestone
        effectDescription() {return "Raise Points Softcap<sup>2</sup> starting point by 1.5."},
        unlocked() {return hasMilestone("truck",13)},
       
    },
      15: {
        requirementDescription: "2,500,000 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(2500000)}, // Used to determine when to give the milestone
        effectDescription() {return "Extend the cap for 'Cookie Garden' till Infinity, improve Zombie Milestone 7's formula (TotalAssortZombie<sup>0.008</sup>+1 -> TotalAssortZombie<sup>0.016</sup>+1) and Zombies no longer reset Points."},
        unlocked() {return hasMilestone("truck",14)},
       
    },
    16: {
        requirementDescription: "3,500,000 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(3500000)}, // Used to determine when to give the milestone
        effectDescription() {return "Cheeseburger interval is divided by 2 and each Zombie Milestone earned makes Points Softcap<sup>2</sup> start later. Currently: ^"+format(Decimal.pow(1.01, player.truck.milestones.length))+"<br>formula: 1.01<sup>ZombieMilestones</sup>"},
        unlocked() {return hasMilestone("truck",14)},
       
    },
      17: {
        requirementDescription: "7,000,000 Total Assorted Zombie Essences",
        done() {return player.z.zombifiedExponent.add(player.z.zombifiedSector).add(player.z.zombifiedTruck).gte(7000000)}, // Used to determine when to give the milestone
        effectDescription() {return "Unlock Skull Internet, and Zombies no longer reset anything."},
        unlocked() {return hasMilestone("truck",16)},
       
    },
},
clickables: {
    11: {
        title() {return "Truck Up"},
       truckDur() {
        let onehundredsixteen = new Decimal(30)
        if (hasUpgrade("truck",52)) onehundredsixteen = onehundredsixteen.times(1.5)
        return onehundredsixteen;
       },
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

       
        display() {return "Truck up to see how many points you will gain! You have "+format(tmp.truck.clickables[11].truckDur)+" seconds to test your trucking points.<br><small>Highest points earned in trucking: "+format(player.truck.pointsinTrucking)+".</small>"},
       tooltip() {return "<small>Entering Truck Up mode will force a Sector reset, and you cannot get any Orbs and Cookies. Points gain is raised ^0.400, base points gain is disabled and upgrades that boost either Exponent Points or Points are cube rooted. While trucking, you can't get any Sectors or Pashtocha Points.</small>"},
       style: {'height':'126px','width':'256px'},
    },
},
update(diff) {
    if (player.truck.inTrucking.gte(1)) {
        player.truck.time = player.truck.time.add(diff);
        player.truck.pointsinTrucking = player.truck.pointsinTrucking.max(player.points)
    }
    if (player.truck.inTrucking.gte(1)&&player.truck.time.gte(tmp.truck.clickables[11].truckDur)) {
        player.truck.inTrucking = new Decimal(0)
        player.truck.time = new Decimal(0)
        doReset("s",true)
    }
    player.truck.penguin = player.truck.penguin.max(tmp.truck.penguinFragAmt);
      if (player.si.mastered.includes("ic"))  player.truck.ant = player.truck.ant.max(tmp.truck.antFragAmt);
},

 buyables: {
        showRespec: true,
        respec() { // Optional, reset things and give back your currency. Having this function makes a respec button appear
            resetBuyables(this.layer)
            doReset("s",true) // Force a reset
        },
        respecMessage: "Are you sure you want to respec your Buildings? That will cause a Sector reset.",
        respecText: "Respec Buildings", // Text on Respec button, optional    
        11: {
            title: "Penguin Building I",
          
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
             
                let cost = Decimal.add(1).add(x);
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Req: " + formatWhole(data.cost) + " Penguin Fragments"+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Super softcap in Trucking starts "+format(data.effect.first)+"x later."
                return display;
            },
          effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}

              
                if (x.gte(0)) eff.first = Decimal.pow(10, x.pow(1.2))

                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))

           
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
            canAfford() {
                return player.truck.penguin.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
           	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
          
            style: {'height':'222px'},
            unlocked() {return hasChallenge("pa",13)},
            tooltip() {return "10<sup>x</sup><sup>1.2</sup>"} ,
            
        },
         12: {
            title: "Penguin Building II",
          
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
             
                let cost = Decimal.add(1).add(x);
                if (x.gte(10)) cost = cost.add(x.times(3))
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Req: " + formatWhole(data.cost) + " Penguin Fragments"+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Points Softcap<sup>2</sup> starts ^"+format(data.effect.first)+" later."
                return display;
            },
          effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}

              
                if (x.gte(0)) eff.first = Decimal.pow(1.03, x.pow(1.03))

                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))

           
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
            canAfford() {
                return player.truck.penguin.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
           	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
          
            style: {'height':'222px'},
            unlocked() {return player.si.mastered.includes("p")},
            tooltip() {return "1.03<sup>x</sup><sup>1.03</sup>"} ,
            
        },
          21: {
            title: "Ant Building I",
          
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
             
                let cost = Decimal.add(1).add(x);
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Req: " + formatWhole(data.cost) + " Ant Fragments"+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Exponent Coins req is divided by /"+format(data.effect.first)+" later."
                return display;
            },
          effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}

              
                if (x.gte(0)) eff.first = Decimal.pow("1e5e7", x.pow(1.5))

                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))

           
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
            canAfford() {
                return player.truck.ant.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
           	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
          
            style: {'height':'222px'},
            unlocked() {return player.si.mastered.includes("ic")},
            tooltip() {return "10<sup>x</sup><sup>1.2</sup>"} ,
            
        },
        22: {
            title: "Ant Building II",
          
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
             
                let cost = Decimal.add(1).add(x);
                return cost.floor()
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = "Req: " + formatWhole(data.cost) + " Ant Fragments"+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Exponent Coins Points Softcap<sup>2</sup> starts ^"+format(data.effect.first)+" later."
                return display;
            },
          effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
              
                let eff = {}

              
                if (x.gte(0)) eff.first = Decimal.pow(1.03, x.pow(1.03))

                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))

           
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
            
                return eff;
            },
            canAfford() {
                return player.truck.ant.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
           	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
          
            style: {'height':'222px'},
            unlocked() {return player.si.mastered.includes("c")},
            tooltip() {return "1.03<sup>x</sup><sup>1.03</sup>"} ,
            
        },
    },
      
})

