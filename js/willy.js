addLayer("wi", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
        cookies: new Decimal(0),
  
    }},
    color: "gold",
  symbol: "<img src='Willy 3.PNG' style='width:calc(85% - 2px);height:calc(85% - 2px);margin:-5%'></img>",
    row: "side",
    layerShown() {return hasUpgrade("c",41)}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Feed Willy")
    },
   
      autoUpgrade() {return player.z.unlocked&&player.si.current==null},
    update(diff) {
      
        if (hasUpgrade("wi", 17)) {
          
            if (layers.wi.clickables[11].canClick()) layers.wi.clickables[11].onClick();
         
        }
    
      },

    tabFormat: [
        "blank", 
        ["display-text", function() { return "<h3>Willy seems to be hungry, feed him cookies to obtain Willy Cookies.</h3>" }], 
        ["display-text", function() { return "Feed him cookies to obtain some Willy Cookies! 1e18 cookies required!" }], 
         ["display-image", () =>   (true) ? "Willy 3.PNG":""],
        "blank", "blank",
        ["display-text", function() { return "You have "+formatWhole(player.c.points)+" Cookies." }], 
        "blank", "blank",
        ["display-text", function() { return "You have "+formatWhole(player.wi.cookies)+" Willy Cookies." }],
        "blank", "blank",
        "blank",
        "clickables",
        "upgrades",
    ],
    clickables: {
        11: {
            gain() { 
                let n = player.c.points.add(1).max(1)
                if (n.lt("1e18")) return new Decimal(0)
                n = Decimal.pow(18,n.log10().div(15).sub(1)).max(1).mul(tmp.wi.clickables[11].gainmult)
                return n.floor()
            },
            next() {
                let gain = tmp.wi.clickables[11].gain.add(1).max(1)
                let next = Decimal.pow(3,gain.div(tmp.wi.clickables[11].gainmult).log10().add(1).max(1).mul(30))
                return next
            },
            gainmult() {
                let mult = new Decimal(1)
               if (hasAchievement("ach",26)) mult = mult.times(tmp.s.corruptEffect)
                if (getBuyableAmount("ic",44).gte(1)) mult = mult.times(tmp.ic.buyables[44].effect.first)
                
                if (hasUpgrade("wi",14)) mult = mult.times(upgradeEffect("wi",14))

                    if (hasUpgrade("s",34)) mult = mult.times(upgradeEffect("s",34))

                        if (hasUpgrade("wi",22)) mult = mult.times(5)

                            if (hasUpgrade("s",55)) mult = mult.times(upgradeEffect("s",55))
if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("c"):false) mult = mult.pow(2)
                                
                return mult;
            },
            display() {
                let dis = "Feed all of your cookies to willy to get +<h3>" + formatWhole(tmp.wi.clickables[11].gain) + "</h3> Willy Cookies<br><br>(forces a Row 2 reset)" 

           
                return dis
            },
            canClick() {
                return player.c.points.gte(1e18)
            },
            onClick() {
              player.wi.cookies =     player.wi.cookies.add(tmp.wi.clickables[11].gain)
              if (!hasUpgrade("wi",17))  player.c.points = new Decimal(0)
         if (!hasUpgrade("wi",17))     doReset("ic", true)
                },
                style: {'height':'130px', 'width':'175px', 'font-size':'13px',
               
            
            },
        },
    },
    upgrades: {
        11: {
            title: "Grandmapocalypse",
            description: "'Cookie Grandma' is now multiplied based on Exponent Points.",
            cost: new Decimal(10),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
            unlocked() {return player.s.unlocked},
            effect() {
                

                let eff = player.ex.expPoints.pow(0.0008).add(1)
                
                if (player.truck.inTrucking.gte(1)) eff = eff.root(3)
                    if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("c"):false) eff = eff.pow(8)
                return eff;
            },
            tooltip() {return "ExpPoint+1<sup>0.0008</sup"} ,
            effectDisplay() { return format(tmp.wi.upgrades[11].effect)+"x" },
        },
        12: {
            title: "Cookie Garden",
            description() {return "Passively generate Cookies based on Points "+"(capped at "+format(tmp.wi.upgrades[this.id].cap)+"%)."},
            cost: new Decimal(25),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
            unlocked() {return player.s.unlocked},
            effect() {
                

                let eff = player.points.pow(0.0002).add(1).min(tmp.wi.upgrades[this.id].cap)
                
              if (hasUpgrade("wi",16)) eff = eff.times(1.5)
                return eff;
            },
            cap() { let cap = new Decimal(100)
                if (hasMilestone("truck",15)) return new Decimal("1e307")
  if (hasUpgrade("pa",33)) cap = cap.times(1000)
                   
                return cap; },
            tooltip() {return "Points+1<sup>0.0002</sup"} ,
            effectDisplay() { return format(tmp.wi.upgrades[12].effect)+"%" },
        },
        13: {
            title: "Cookieland",
            description: "Unlock 2 new Elements.",
            cost: new Decimal(125),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
            unlocked() {return hasAchievement("ach",26)},
            
        },
        14: {
            title: "Cookieville",
            description: "Willy Cookies gain is now boosted by Cookies.",
            cost: new Decimal(625),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
            effect() {
                

                let eff = player.c.points.pow(0.02).add(1)
                
                    if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("c"):false) eff = eff.pow(2)
                return eff;
            },
           
            tooltip() {return "Cookies+1<sup>0.02</sup"} ,
            effectDisplay() { return format(tmp.wi.upgrades[14].effect)+"x"
             },
            unlocked() {return hasUpgrade("s",23)},
            
        },
        15: {
            title: "Cookie Earth",
            description: "Corruption now boosts your Points gain.",
            cost: new Decimal(3125),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
           
            unlocked() {return hasUpgrade("s",23)},
            
        },
        16: {
            title: "Cookie Milky Way",
            description: "'Cookie Garden' is boosted by 50%.",
            cost: new Decimal(15625),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
           
            unlocked() {return hasUpgrade("s",23)},
            
        },
        17: {
            title: "Cookie Universe",
            description: "Willy Cookies are automatically gained and they don't force an Incremental Reset and don't reset Cookies.",
            cost: new Decimal(1e10),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
          
            unlocked() {return hasAchievement("ach",44)},
            
        },
        21: {
            title: "Cybercookie",
            description: "Cheeseburger interval is increased based on Points.",
            cost: new Decimal(1e13),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
            effect() {
                

                let eff = player.points.add(1).log10().add(1).log10().add(1).log10()
                      if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("c"):false) return player.points.add(1).pow(1e-7)
             
                return eff;
            },
           
            tooltip() {return "log10(log10(log10(Points)))"} ,
            effectDisplay() { return "+"+format(tmp.wi.upgrades[21].effect)
             },
            unlocked() {return hasAchievement("ach",44)},
            
        },
        22: {
            title: "Secure Cookies",
            description: "Base points are raised 1.1.",
            cost: new Decimal(2e13),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
         
            unlocked() {return hasAchievement("ach",44)},
            
        },
        23: {
            title: "Baseline Cookies",
            description: "Partition incrementing is multiplied by 100, and Willy Cookies multi is increased by 5.",
            cost: new Decimal(2e13),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
         
            unlocked() {return hasAchievement("ach",44)},
            
        },
        24: {
            title: "Williest of Cookies",
            description: "Each Willy Upgrade purchased grants a percentage boost to Base Points. Doesn't work on TMT's Mighty Cheeseburger",
            cost: new Decimal(2e14),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
            effect() {
                

                let eff = Decimal.pow(1.5, player.wi.upgrades.length);
                
               if (inChallenge("s",11)) return new Decimal(1)
                       if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("c"):false) eff = eff.pow(2000)
                return eff;
            },
           
            tooltip() {return "WiUpgradePurchased<sup>1.5</sup>"} ,
            effectDisplay() { return "+"+format(tmp.wi.upgrades[24].effect)+"%"
             },
            unlocked() {return hasUpgrade("s",46)},
            
        },
            25: {
            title: "The Willy Shrine",
            description: "Previous upgrade function is now a multiplier.",
            cost: new Decimal(1e200),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
          
          
            unlocked() {return hasUpgrade("pa",56)},
            
        },
           26: {
            title: "Willy God",
            description: "Unlock a new Element and Poacher buyable, and multiply Base Points based on Exponent Coins.",
            cost: new Decimal(1e300),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
           effect() {
                

                let eff = player.ex.points.pow(2).add(1)
                
           if ((Array.isArray(tmp.si.mastered))?tmp.si.mastered.includes("c"):false) eff = eff.pow(10)
                return eff;
            },
           
            tooltip() {return "ExponentCoins<sup>2</sup>+1"} ,
            effectDisplay() { return format(tmp.wi.upgrades[26].effect)+"x"
             },
          
            unlocked() {return hasUpgrade("pa",56)},
            
        },
         27: {
            title: "Infinity Willy",
            description: "Unlock a new Layer.",
            cost: new Decimal("1.8e308"),
            currencyDisplayName: "willy cookies",
            currencyInternalName: "cookies",
            currencyLayer: "wi",
        
          
            unlocked() {return hasUpgrade("pa",56)},
            
        },
    },
})

