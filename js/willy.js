addLayer("wi", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
        cookies: new Decimal(0),
  
    }},
    color: "gold",
  symbol: "<img src='Willy 3.png' style='width:calc(85% - 2px);height:calc(85% - 2px);margin:-5%'></img>",
    row: "side",
    layerShown() {return hasUpgrade("c",41)}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Feed Willy")
    },
   
  
  

    tabFormat: [
        "blank", 
        ["display-text", function() { return "<h3>Willy seems to be hungry, feed him cookies to obtain Willy Cookies.</h3>" }], 
        ["display-text", function() { return "Feed him cookies to obtain some Willy Cookies! 1e18 cookies required!" }], 
         ["display-image", () =>   (true) ? "/Willy 3.png":""],
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
              player.c.points = new Decimal(0)
              doReset("ic", true)
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
                
             
                return eff;
            },
            tooltip() {return "ExpPoint+1<sup>0.0008</sup"} ,
            effectDisplay() { return format(tmp.wi.upgrades[11].effect)+"x" },
        },
        12: {
            title: "Cookie Garden",
            description: "Passively generate Cookies based on Points (capped at 100%).",
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
    },
})

