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
           unlocked() {return player.ic.unlocked},

        },
        15: {
            name: "Marble Race",
            done() { return player.o.points.gte(2) },
            tooltip: "Reach 2 Orbs.",
            unlocked() {return player.ic.unlocked},
        
        },
        16: {
            name: "Willy Likes Cookies reference",
            done() { return player.wi.cookies.gte(1) },
            tooltip: "Get a Willy Cookie.",
            unlocked() {return player.s.unlocked},
        
        },
        21: {
            name: "New Layer Awaits",
            done() { return player.ic.unlocked },
            tooltip: "Reset for Incremental Coins.<br><small>Reward: Points gain is raised 1.2.</small>",
            unlocked() {return player.ic.unlocked},
    
        },
        22: {
            name: "Maximum Insights",
            done() { return player.points.gte(1e36) },
            tooltip: "Reach 1e36 Points.",
            unlocked() {return player.ic.unlocked},
    
        },
        23: {
            name: "Fluctuated",
            done() { return player.ex.expPoints.gte(1e90) },
            tooltip: "Reach 1e90 Exponent Points.",
            unlocked() {return player.ic.unlocked},
        
        },
        24: {
            name: "Incremented",
            done() { return player.ic.points.gte(1e135) },
            tooltip: "Reach 1e135 Incremental Coins.",
            unlocked() {return player.ic.unlocked},
        

        },
        25: {
            name: "Super Marble Race.",
            done() { return player.o.points.gte(50) },
            tooltip: "Reach 50 Orbs.",
            unlocked() {return player.s.unlocked},
        
        },
        26: {
            name: "MY DATA",
            done() { return player.s.corruption.gte(1) },
            tooltip: "Corrupt your partition for the first time.",
            unlocked() {return player.s.unlocked},
        
        },
        31: {
            name: "Illegal Hunters",
            done() { return player.p.unlocked },
            tooltip: "Reset for Poachers.<br><small>Reward: Unlock Universal Shifts.</small>",
            unlocked() {return player.p.unlocked},
    
        },
        32: {
            name: "Distanced Up",
            done() { return player.points.gte("1e500") },
            tooltip: "Reach 1e500 Points.<br><small>Reward: Automate Dubnium and its cost scaling is subtracted by 1.75.</small>",
            unlocked() {return player.p.unlocked},
    
        },
        33: {
            name: "Boomed Inflation",
            done() { return player.points.gte("1e1000") },
            tooltip: "Reach 1e1,000 Points.",
            unlocked() {return player.p.unlocked},
    
        },
        34: {
            name: "Willy Loves Cookies",
            done() { return player.c.points.gte("1e28") },
            tooltip: "Reach 1e28 Cookies.<br><small>Reward: Automate the first 3 Periodic Element buyables.</small>",
            unlocked() {return player.s.unlocked},
    
        },
        35: {
            name: "He has a cheeseburger!",
            done() { return hasUpgrade("s",35) },
            tooltip: "Unlock Steal TMT's Cheeseburger",
            unlocked() {return player.s.unlocked},
    
        },
        36: {
            name: "Is it done yet?",
            done() { return player.s.points.gte(1e12 )},
            tooltip: "Reach 1e12 Sectors.",
            unlocked() {return player.s.unlocked},
    
        },
        41: {
            name: "New Layer Awaits?",
            done() { return player.s.unlocked },
            tooltip: "Reset for Sectors.<br><small>Reward: Introduces a massive boost to previous layers!</small>",
            unlocked() {return player.s.unlocked},
    
        },
        42: {
            name: "We can't break but we can burn it",
            done() { return player.ex.points.gte(256) },
            tooltip: "Reach 256 Exponent Coins. <small>Reward: Double Sectors gain.</small>",
            unlocked() {return player.s.unlocked},
    
        },
        43: {
            name: "There's more than disk management!",
            done() { return hasUpgrade("s",27) },
            tooltip: "Unlock Sector buyables.",
            unlocked() {return player.s.unlocked},
    
        },
        44: {
            name: "On the floor",
            done() { return player.s.pointsInCheeseburger.gte("1e400")},
            tooltip: "Reach 1e400 points while in TMT's Mighty Cheeseburger challenge. <small>Reward: Sector gain is multiplied by 8, and unlock a new set of Willy upgrades.</small>",
            unlocked() {return player.s.unlocked},
    
        },
        45: {
            name: "Humority Audience",
            done() { return hasUpgrade("s",53)},
            tooltip: "Unlock Affinity.",
            unlocked() {return player.s.unlocked},
    
        },
        46: {
            name: "Getting 1e100,000 points in William's Idle in Download RAM Idle 2 feels impossible",
            done() { return player.wi.cookies.gte(1e16)},
            tooltip: "Reach 1e16 Willy Cookies.",
            unlocked() {return hasUpgrade("s",53)},
    
        },
        51: {
            name: "Another one?",
            done() { return hasUpgrade("s",72)},
            tooltip: "Unlock the second partition.",
            unlocked() {return hasUpgrade("s",53)},
    
        },
        52: {
            name: "My phone is trapped in Fastboot mode.",
            done() { return player.s.points.gte(1e21)},
            tooltip: "Reach 1e21 Sectors.<br><small>Reward: Unlock Affinity Dimension II and III.</small>",
            unlocked() {return hasUpgrade("s",53)},
    
        },
        53: {
            name: "Buy a new phone or stop playing the game",
            done() { return player.p.points.gte(1e76)},
            tooltip: "Reach 1e76 Poachers.",
            unlocked() {return hasUpgrade("s",53)},
    
        },
        54: {
            name: "Beginning of Inflation?!",
            done() { return player.s.furtherPoints.gte(1)},
            tooltip: "Reach 1 Further-Exponent Point.<br><small>Automate Corruptions and they reset nothing.</small>",
            unlocked() {return hasUpgrade("s",53)},
    
        },
    },

    tabFormat: [
        "blank", 
        ["display-text", function() { return "You currently have obtained "+player.ach.achievements.length+"/"+(Object.keys(tmp.ach.achievements).length-2+" Achievements.")+"" }], 
        "blank", "blank",
     
        "achievements",
     
    ],
    
})

addLayer("sb", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
  
    }},
    color: "white",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Savebank")
    },
   symbol: "<img src='Savebank.svg' style='width:calc(85% - 2px);height:calc(85% - 2px);margin:-5%'></img>",
   
    tabFormat: [
        "blank", 
        ["display-text", function() { return "If you don't want to spend your time grinding this game, savebanks are for you. Please note that these will OVERWRITE your game saves, so export your original save file." }],
        "clickables",
     
    ],
    clickables: {
        11: {
            title: "Exponent Coins",
            display: "Layer Finished",
            canClick: true,
            onClick() {
                if (!confirm("Your current progress will not be saved!"))
                    return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTczNjI0MzQ5NzUyNywibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4xIiwidGltZVBsYXllZCI6ODAuMDA2MDAwMDAwMDAxLCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJoaWRlTmV3cyI6ZmFsc2UsInBvaW50cyI6IjEuMTgzODEyNjU0NDg5OTU2OGUyMCIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sImljIjp7Im1haW5UYWJzIjoiTWFpbiJ9LCJzIjp7Im1haW5UYWJzIjoiTWFpbiIsImRpc2siOiJQYXJ0aXRpb25zIn19LCJsYXN0U2FmZVRhYiI6ImV4IiwibmV3c1RvdGFsIjoiNDYzOSIsImluZm9ib3hlcyI6e30sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6ODAuMDA2MDAwMDAwMDAxLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6ODAuMDA2MDAwMDAwMDAxLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImNoYW5nZWxvZy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo4MC4wMDYwMDAwMDAwMDEsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiZXgiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjI1IiwiZXhwUG9pbnRzIjoiMS44NTYwNzI5ODE0ODQ4NTUzZTM1IiwidG90YWwiOiIxIiwiYmVzdCI6IjEiLCJyZXNldFRpbWUiOjc4LjgxMDAwMDAwMDAwMDk1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjciLCIxMiI6IjQiLCIxMyI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImljIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsImVuZXJneSI6IjAiLCJ1bmlEaW1JTHZsIjoiMCIsInVuaURpbUlJTHZsIjoiMCIsImVsZW1lbnRzIjoiMCIsImVsZW1lbnRzRGltSUx2bCI6IjAiLCJlbGVtZW50c0RpbUlJTHZsIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo4MC4wMDYwMDAwMDAwMDEsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCIsIjEyIjoiMCIsIjEzIjoiMCIsIjIxIjoiMCIsIjIyIjoiMCIsIjIzIjoiMCIsIjMxIjoiMCIsIjMyIjoiMCIsIjMzIjoiMCIsIjQxIjoiMCIsIjQyIjoiMCIsIjQzIjoiMCIsIjQ0IjoiMCIsIjQ1IjoiMCIsIjUxIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjAsIjEyIjowLCIxMyI6MCwiMjEiOjB9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo4MC4wMDYwMDAwMDAwMDEsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwicCI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6ODAuMDA2MDAwMDAwMDAxLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjAiLCIxMiI6IjAiLCIxMyI6IjAiLCIxNCI6IjAiLCIxNSI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwicyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJiZXN0IjoiMCIsInRvdGFsIjoiMCIsImV4cGFuc2lvbiI6IjAiLCJjb3JydXB0aW9uIjoiMCIsInJlc2V0VGltZSI6ODAuMDA2MDAwMDAwMDAxLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6ODAuMDA2MDAwMDAwMDAxLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiYmxhbmsiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo4MC4wMDYwMDAwMDAwMDEsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo4MC4wMDYwMDAwMDAwMDEsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYWNoIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjgwLjAwNjAwMDAwMDAwMSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjEyIiwiMTMiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNiIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjgwLjAwNjAwMDAwMDAwMSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwid2kiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsImNvb2tpZXMiOiIwIiwicmVzZXRUaW1lIjo4MC4wMDYwMDAwMDAwMDEsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm5ld3NBcnJheSI6W119")
            },
            style() {
                return {
                    'background-color': tmp.ex.color,
                }
            },
        },
        12: {
            title: "Orbs",
            display: "Start of Layer",
            canClick: true,
            onClick() {
                if (!confirm("Your current progress will not be saved!"))
                    return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTczNjI0MzczNjkyNywibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4xIiwidGltZVBsYXllZCI6MzE5LjQwNjAwMDAwMDAwMDc0LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJoaWRlTmV3cyI6ZmFsc2UsInBvaW50cyI6IjUuNTEzODEyNzkzMzA2Mzk4ZTEwMSIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sImljIjp7Im1haW5UYWJzIjoiTWFpbiJ9LCJzIjp7Im1haW5UYWJzIjoiTWFpbiIsImRpc2siOiJQYXJ0aXRpb25zIn19LCJsYXN0U2FmZVRhYiI6Im8iLCJuZXdzVG90YWwiOiIxMTM4MyIsImluZm9ib3hlcyI6e30sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE5LjQwNjAwMDAwMDAwMDc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE5LjQwNjAwMDAwMDAwMDc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImNoYW5nZWxvZy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMTkuNDA2MDAwMDAwMDAwNzQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiZXgiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjE0IiwiZXhwUG9pbnRzIjoiMi4wMjk2ODY1ODgyMjE4NTMzZTY3IiwidG90YWwiOiIxNCIsImJlc3QiOiIxNCIsInJlc2V0VGltZSI6MzEuMjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTUiLCIxMiI6IjYiLCIxMyI6IjMifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImljIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI0NTAwMDAwMDAiLCJlbmVyZ3kiOiIwIiwidW5pRGltSUx2bCI6IjAiLCJ1bmlEaW1JSUx2bCI6IjAiLCJlbGVtZW50cyI6IjAiLCJlbGVtZW50c0RpbUlMdmwiOiIwIiwiZWxlbWVudHNEaW1JSUx2bCI6IjAiLCJ0b3RhbCI6IjIzODUxIiwiYmVzdCI6IjU1MDIzODUwIiwicmVzZXRUaW1lIjozMS4yNiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxMCIsIjEyIjoiMCIsIjEzIjoiMCIsIjIxIjoiMCIsIjIyIjoiMCIsIjIzIjoiMCIsIjMxIjoiMCIsIjMyIjoiMCIsIjMzIjoiMCIsIjQxIjoiMCIsIjQyIjoiMCIsIjQzIjoiMCIsIjQ0IjoiMCIsIjQ1IjoiMCIsIjUxIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTIsMTMsMTEsMTQsMTUsMTYsMTddLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MSwiMTIiOjEsIjEzIjoxLCIyMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwibyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE5LjQwNjAwMDAwMDAwMDc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicCI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE5LjQwNjAwMDAwMDAwMDc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjAiLCIxMiI6IjAiLCIxMyI6IjAiLCIxNCI6IjAiLCIxNSI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsImJlc3QiOiIwIiwidG90YWwiOiIwIiwiZXhwYW5zaW9uIjoiMCIsImNvcnJ1cHRpb24iOiIwIiwicmVzZXRUaW1lIjozMTkuNDA2MDAwMDAwMDAwNzQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMS4yNiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE5LjQwNjAwMDAwMDAwMDc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE5LjQwNjAwMDAwMDAwMDc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImFjaCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMTkuNDA2MDAwMDAwMDAwNzQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIyMSIsIjIyIl0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMTkuNDA2MDAwMDAwMDAwNzQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIndpIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJjb29raWVzIjoiMCIsInJlc2V0VGltZSI6MzE5LjQwNjAwMDAwMDAwMDc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJuZXdzQXJyYXkiOltdfQ==")
            },
            style() {
                return {
                    'background-color': tmp.o.color,
                }
            },
        },
        13: {
            title: "Poachers",
            display: "Start of Layer",
            canClick: true,
            onClick() {
                if (!confirm("Your current progress will not be saved!"))
                    return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTczNjI0NDQ4NjE3OSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4xIiwidGltZVBsYXllZCI6MTA2OS41OTEzMzMzNDExODg4LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJoaWRlTmV3cyI6ZmFsc2UsInBvaW50cyI6IjIuOTY1OTc3Njg1OTI4Nzk0M2U0MjEiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJpYyI6eyJtYWluVGFicyI6IkVsZW1lbnRzIn0sInMiOnsibWFpblRhYnMiOiJNYWluIiwiZGlzayI6IlBhcnRpdGlvbnMifX0sImxhc3RTYWZlVGFiIjoiaWMiLCJuZXdzVG90YWwiOiIxMTYyMCIsImluZm9ib3hlcyI6e30sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTA2OS41OTEzMzMzNDExODg4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTA2OS41OTEzMzMzNDExODg4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImNoYW5nZWxvZy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMDY5LjU5MTMzMzM0MTE4ODgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiZXgiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjE0NyIsImV4cFBvaW50cyI6IjcuODI0NzM5OTExMTA0Njg5ZTI0MCIsInRvdGFsIjoiMTQ3IiwiYmVzdCI6IjE0NyIsInJlc2V0VGltZSI6MjI4Ljk4ODk5OTk5OTk5NzA4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjYwIiwiMTIiOiIxOCIsIjEzIjoiNCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMTYsMTcsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMzFdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiaWMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEuNjQ4MzE5MTUyNzMwNDYzN2UxMDUiLCJlbmVyZ3kiOiIxLjAwMDAwMDE4NDYxOTAwMjNlMjYiLCJ1bmlEaW1JTHZsIjoiMy41MDM5OTc4MjQ4OTQ4ODg0ZTE3IiwidW5pRGltSUlMdmwiOiI5ODkuOTA0OTk5OTk5OTY4MSIsImVsZW1lbnRzIjoiMjEyMjYwNzc4MjkuNTk4MDU3IiwiZWxlbWVudHNEaW1JTHZsIjoiNzQyMi42OTQ5OTk5OTk5MjIiLCJlbGVtZW50c0RpbUlJTHZsIjoiMCIsInRvdGFsIjoiOC42MTU0NTE2ODQ0NDE4NzhlMTA0IiwiYmVzdCI6IjEuNjQ4MzE5MTUyNzMwNDYzN2UxMDUiLCJyZXNldFRpbWUiOjI2NC44OTg5OTk5OTk5OTU4NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxNiIsIjEyIjoiMzIiLCIxMyI6IjMiLCIyMSI6Ijk1IiwiMjIiOiI0NyIsIjIzIjoiOSIsIjMxIjoiMzIiLCIzMiI6IjEzIiwiMzMiOiIwIiwiNDEiOiI2IiwiNDIiOiI2IiwiNDMiOiIwIiwiNDQiOiIwIiwiNDUiOiIwIiwiNTEiOiIwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMiwxMywxMSwxNCwxNSwxNiwxNywyMSwyMiwyMywyNCwyNSwyNiwyNywzMSwzMiwzMywzNCwzNSwzNiwzN10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjoxLCIxMiI6MSwiMTMiOjEsIjIxIjoxfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJvIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIyOSIsInRvdGFsIjoiMjciLCJiZXN0IjoiMjkiLCJyZXNldFRpbWUiOjIyOC45ODg5OTk5OTk5OTcwOCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInAiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEwNjkuNTkxMzMzMzQxMTg4OCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIwIiwiMTIiOiIwIiwiMTMiOiIwIiwiMTQiOiIwIiwiMTUiOiIwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJiZXN0IjoiMCIsInRvdGFsIjoiMCIsImV4cGFuc2lvbiI6IjAiLCJjb3JydXB0aW9uIjoiMCIsInJlc2V0VGltZSI6MTA2OS41OTEzMzMzNDExODg4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjI4Ljk4ODk5OTk5OTk5NzA4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiYmxhbmsiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMDY5LjU5MTMzMzM0MTE4ODgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMDY5LjU5MTMzMzM0MTE4ODgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYWNoIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEwNjkuNTkxMzMzMzQxMTg4OCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjEyIiwiMTMiLCIxNCIsIjIxIiwiMjIiLCIxNSIsIjIzIl0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMDY5LjU5MTMzMzM0MTE4ODgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwid2kiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsImNvb2tpZXMiOiIwIiwicmVzZXRUaW1lIjoxMDY5LjU5MTMzMzM0MTE4ODgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm5ld3NBcnJheSI6W119")
            },
            style() {
                return {
                    'background-color': tmp.p.color,
                }
            },
        },
        14: {
            title: "Cookies",
            display: "Start of Layer",
            canClick: true,
            onClick() {
                if (!confirm("Your current progress will not be saved!"))
                    return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTczNjI0NDg0Nzc2Mywibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4xIiwidGltZVBsYXllZCI6MTQzMS4xODEzNjUxMjkwMjksImtlZXBHb2luZyI6ZmFsc2UsImhhc05hTiI6ZmFsc2UsImhpZGVOZXdzIjpmYWxzZSwicG9pbnRzIjoiMS41MjI2NDMyOTc3MzgyMjE4ZTQ3NiIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sImljIjp7Im1haW5UYWJzIjoiTWFpbiJ9LCJzIjp7Im1haW5UYWJzIjoiTWFpbiIsImRpc2siOiJQYXJ0aXRpb25zIn19LCJsYXN0U2FmZVRhYiI6ImV4IiwibmV3c1RvdGFsIjoiMTE2NzMiLCJpbmZvYm94ZXMiOnt9LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE0MzEuMTgxMzY1MTI5MDI5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTQzMS4xODEzNjUxMjkwMjksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE0MzEuMTgxMzY1MTI5MDI5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImV4Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxNjUiLCJleHBQb2ludHMiOiIzLjQwNTg5ODEzOTU3MzI1NTdlNDczIiwidG90YWwiOiIxNjUiLCJiZXN0IjoiMTY1IiwicmVzZXRUaW1lIjo2NS4xNjEwMDAwMDAwMDA1NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI2NSIsIjEyIjoiMjAiLCIxMyI6IjUifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImljIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI1LjQ2MzM2MTMzMTg4MTIxMWUxMjQiLCJlbmVyZ3kiOiIxLjA3MTY4MzI0MjcwMzgyMTZlMjYiLCJ1bmlEaW1JTHZsIjoiNi4zNzAzMDIzNjI3Mzc4NjdlMjEiLCJ1bmlEaW1JSUx2bCI6IjU1MDAuNTQ0Mjg2MDg4OTI5IiwiZWxlbWVudHMiOiIxLjAwMDEwNjM3NTY3NDc1MzJlMTYiLCJlbGVtZW50c0RpbUlMdmwiOiIxOTM1Ni4zNDU0MTMyMzc5NyIsImVsZW1lbnRzRGltSUlMdmwiOiIwIiwidG90YWwiOiI3LjU4MDc0NDg1NjI3NjE4M2UxMjIiLCJiZXN0IjoiMS42NjAxMDkxMjM5NjA4OTllMTI1IiwicmVzZXRUaW1lIjo2MjYuNDg5MDMxNzg3NjMwNiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxNyIsIjEyIjoiMzMiLCIxMyI6IjMiLCIyMSI6IjExMiIsIjIyIjoiNTciLCIyMyI6IjE1IiwiMzEiOiIzOSIsIjMyIjoiMTciLCIzMyI6IjAiLCI0MSI6IjciLCI0MiI6IjciLCI0MyI6IjAiLCI0NCI6IjAiLCI0NSI6IjAiLCI1MSI6IjIifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzEyLDEzLDExLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxLDMyLDMzLDM0LDM1LDM2LDM3XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjEsIjEyIjoxLCIxMyI6MSwiMjEiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sIm8iOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjMyIiwidG90YWwiOiIyOSIsImJlc3QiOiIzMSIsInJlc2V0VGltZSI6NTkwLjU3OTAzMTc4NzY0OTgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJwIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzMDU4NDgiLCJ0b3RhbCI6IjYiLCJiZXN0IjoiMzA1ODQ4IiwicmVzZXRUaW1lIjo2NS4xNjEwMDAwMDAwMDA1NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI1IiwiMTIiOiI0IiwiMTMiOiIwIiwiMTQiOiIwIiwiMTUiOiIwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJiZXN0IjoiMCIsInRvdGFsIjoiMCIsImV4cGFuc2lvbiI6IjAiLCJjb3JydXB0aW9uIjoiMCIsInJlc2V0VGltZSI6MTQzMS4xODEzNjUxMjkwMjksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo2NS4xNjEwMDAwMDAwMDA1NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTQzMS4xODEzNjUxMjkwMjksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxNDMxLjE4MTM2NTEyOTAyOSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhY2giOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTQzMS4xODEzNjUxMjkwMjksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIyMSIsIjIyIiwiMTUiLCIyMyIsIjMxIl0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxNDMxLjE4MTM2NTEyOTAyOSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIxMyI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIndpIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJjb29raWVzIjoiMCIsInJlc2V0VGltZSI6MTQzMS4xODEzNjUxMjkwMjksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm5ld3NBcnJheSI6W119")
            },
            style() {
                return {
                    'background-color': tmp.c.color,
                }
            },
        },
        21: {
            title: "Incremental Coins",
            display: "Layer Finished",
            canClick: true,
            onClick() {
                if (!confirm("Your current progress will not be saved!"))
                    return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTczNjI0NTAzODQxNSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4xIiwidGltZVBsYXllZCI6MTYyMS44NDY1Nzg1NDEyMTQ1LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJoaWRlTmV3cyI6ZmFsc2UsInBvaW50cyI6IjIuNTUwODg4OTE5Nzk0MjZlOTQ0Iiwic3VidGFicyI6eyJjaGFuZ2Vsb2ctdGFiIjp7fSwiaWMiOnsibWFpblRhYnMiOiJNYWluIn0sInMiOnsibWFpblRhYnMiOiJNYWluIiwiZGlzayI6IlBhcnRpdGlvbnMifX0sImxhc3RTYWZlVGFiIjoicyIsIm5ld3NUb3RhbCI6IjExNjk4IiwiaW5mb2JveGVzIjp7fSwiaW5mby10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxNjIxLjg0NjU3ODU0MTIxNDUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxNjIxLjg0NjU3ODU0MTIxNDUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE2MjEuODQ2NTc4NTQxMjE0NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJleCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMjQwIiwiZXhwUG9pbnRzIjoiMS4wMzQwNTcyNzcwNzExMTQ1ZTg0NyIsInRvdGFsIjoiMjQwIiwiYmVzdCI6IjI0MCIsInJlc2V0VGltZSI6MjAuODA0MDAwMDAwMDAwMDM4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjY5IiwiMTIiOiIyMSIsIjEzIjoiNyJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMTYsMTcsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMzFdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiaWMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEuMzA0NzY3NDQ4MjE4OTU0ZTI0MSIsImVuZXJneSI6IjEuMDAyODQxNjAwMzE3NDU3NGUzMCIsInVuaURpbUlMdmwiOiI1LjUxMjMyMTc3NjQ4OTkwOWUyNCIsInVuaURpbUlJTHZsIjoiMjQ1MDIuNTAyNDg3MjcxMTgiLCJlbGVtZW50cyI6IjU0NzUwMDIxMzkwODk0NTMiLCJlbGVtZW50c0RpbUlMdmwiOiIyOTYyOS44MzkwNDEyNDQiLCJlbGVtZW50c0RpbUlJTHZsIjoiMCIsInRvdGFsIjoiMS4zMDQ3Njc0NDgyMTg5NTRlMjQxIiwiYmVzdCI6IjEuMzA0NzY3NDQ4MjE4OTU0ZTI0MSIsInJlc2V0VGltZSI6NDUuNzA0MDAwMDAwMDAwMjQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTgiLCIxMiI6IjM1IiwiMTMiOiIzIiwiMjEiOiIyNDAiLCIyMiI6IjEyOCIsIjIzIjoiMTMxIiwiMzEiOiI4MSIsIjMyIjoiNDQiLCIzMyI6IjAiLCI0MSI6IjciLCI0MiI6IjciLCI0MyI6IjciLCI0NCI6IjAiLCI0NSI6IjAiLCI1MSI6IjIifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzEyLDEzLDExLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxLDMyLDMzLDM0LDM1LDM2LDM3XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjEsIjEyIjoxLCIxMyI6MSwiMjEiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sIm8iOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjQxIiwidG90YWwiOiIzOCIsImJlc3QiOiI0MSIsInJlc2V0VGltZSI6NzgxLjI0NDI0NTE5OTY3ODcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJwIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIyNTE2MzUyIiwidG90YWwiOiIzNTgxMDQwOCIsImJlc3QiOiIzNDc4OTA3NCIsInJlc2V0VGltZSI6MjAuODA0MDAwMDAwMDAwMDM4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjYiLCIxMiI6IjQiLCIxMyI6IjMiLCIxNCI6IjMiLCIxNSI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsImJlc3QiOiIwIiwidG90YWwiOiIwIiwiZXhwYW5zaW9uIjoiMCIsImNvcnJ1cHRpb24iOiIwIiwicmVzZXRUaW1lIjoxNjIxLjg0NjU3ODU0MTIxNDUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI5LjEyOTYwMDk5MDg3MDc2NWUxNSIsInRvdGFsIjoiMCIsImJlc3QiOiI5LjEyOTYwMDk5MDg3MDc2NWUxNSIsInJlc2V0VGltZSI6MjAuODA0MDAwMDAwMDAwMDM4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwyMSwyMiwyNCwyMywzMV0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJibGFuayI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE2MjEuODQ2NTc4NTQxMjE0NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE2MjEuODQ2NTc4NTQxMjE0NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhY2giOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTYyMS44NDY1Nzg1NDEyMTQ1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMjEiLCIyMiIsIjE1IiwiMjMiLCIzMSIsIjMyIiwiMjQiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNiIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE2MjEuODQ2NTc4NTQxMjE0NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIxMyI6IiIsIjE0IjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwid2kiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsImNvb2tpZXMiOiIwIiwicmVzZXRUaW1lIjoxNjIxLjg0NjU3ODU0MTIxNDUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm5ld3NBcnJheSI6W119")
            },
            style() {
                return {
                    'background-color': tmp.ic.color,
                }
            },
        },
        31: {
            title: "Steal TMT's Cheeseburger",
            display: "Starting Point",
            canClick: true,
            onClick() {
                if (!confirm("Your current progress will not be saved!"))
                    return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc0NTM5OTE3ODY5Niwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4xLjEiLCJ0aW1lUGxheWVkIjoxNjEwNi4wOTA2MTY2MTQ2Niwia2VlcEdvaW5nIjpmYWxzZSwiaGFzTmFOIjpmYWxzZSwiaGlkZU5ld3MiOmZhbHNlLCJwb2ludHMiOiI0LjE0OTU0NjQ4NTA5MTIwNGUyMTk3Iiwic3VidGFicyI6eyJjaGFuZ2Vsb2ctdGFiIjp7fSwiaWMiOnsibWFpblRhYnMiOiJFbGVtZW50cyJ9LCJzIjp7Im1haW5UYWJzIjoiTWFpbiIsImRpc2siOiJQYXJ0aXRpb25zIn19LCJsYXN0U2FmZVRhYiI6InMiLCJuZXdzVG90YWwiOiIxMjUzNCIsImluZm9ib3hlcyI6e30sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTYxMDYuMDkwNjE2NjE0NjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxNjEwNi4wOTA2MTY2MTQ2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTYxMDYuMDkwNjE2NjE0NjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiZXgiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjM5OCIsImV4cFBvaW50cyI6IjEuNDUxNDUwNDM0MDU4ODY2NWU0MTUxIiwidG90YWwiOiIzOTgiLCJiZXN0IjoiMzk4IiwicmVzZXRUaW1lIjo0OS4zOTUwMDAwMDAwMDAyNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI4MCIsIjEyIjoiMjUiLCIxMyI6IjgifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExLDExXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImljIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzLjI0MDgyNTg1NjkxOTk0MDRlNzcxIiwiZW5lcmd5IjoiMi45ODgzODA0NzA4NTgzODQ1ZTI4IiwidW5pRGltSUx2bCI6IjEuMzA5OTUyNDg5MzYwNTFlMjUiLCJ1bmlEaW1JSUx2bCI6IjIzMzI0Ljk2MTAwMDAwMDAxIiwiZWxlbWVudHMiOiIyLjAyMDYyNjQzMTcyOTczZTYyIiwiZWxlbWVudHNEaW1JTHZsIjoiMS40MDgyMjYzNzY3ODc3NmUyMiIsImVsZW1lbnRzRGltSUlMdmwiOiI2MzMyLjE0MzkwODM5MDYyNyIsInRvdGFsIjoiMy4yNDA4MjU4NTY5MTk5NDA0ZTc3MSIsImJlc3QiOiIzLjI0MDgyNTg1NjkxOTk0MDRlNzcxIiwicmVzZXRUaW1lIjo0OS4zOTUwMDAwMDAwMDAyNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIyMSIsIjEyIjoiNDEiLCIxMyI6IjMiLCIyMSI6Ijc2MiIsIjIyIjoiNTA5IiwiMjMiOiI0ODQiLCIzMSI6IjI1NSIsIjMyIjoiMTc0IiwiMzMiOiIxMTkiLCI0MSI6IjkiLCI0MiI6IjkiLCI0MyI6IjkiLCI0NCI6IjYiLCI0NSI6IjYiLCI1MSI6IjMifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzEyLDEzLDExLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxLDMyLDMzLDM0LDM1LDM2LDM3LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjEsIjEyIjoxLCIxMyI6MSwiMjEiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sIm8iOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjI1NiIsInRvdGFsIjoiMjU2IiwiYmVzdCI6IjI1NiIsInJlc2V0VGltZSI6NDkuMzk1MDAwMDAwMDAwMjQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJwIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxLjEzOTQxMzM1Mjg4MjQ1M2UzMCIsInRvdGFsIjoiMS4xMzk0MTMzNTI4ODI0NTNlMzAiLCJiZXN0IjoiMS4xMzk0MTMzNTI4ODI0NTNlMzAiLCJyZXNldFRpbWUiOjQ5LjM5NTAwMDAwMDAwMDI0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjciLCIxMiI6IjUiLCIxMyI6IjQiLCIxNCI6IjQiLCIxNSI6IjMifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwiYmVzdCI6IjE3NjI3ODk4IiwidG90YWwiOiIzNDM4MjE0NCIsImV4cGFuc2lvbiI6IjE3MzIiLCJjb3JydXB0aW9uIjoiMjMiLCJyZXNldFRpbWUiOjQ5LjM5NTAwMDAwMDAwMDI0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjEyIiwiMTIiOiIwIiwiMjEiOiIwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjIxIjoiIiwiMzEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMTYsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMzEsMzIsMzMsMzQsMzVdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiY2hlZXNlYnVyZ2VycyI6IjAiLCJjaGVlc2VEdXJhdGlvbiI6IjAiLCJ0aW1lIjoiMCIsImNhdGNoZWRCdXJnZXJzIjoiMCIsInBvaW50c0luQ2hlZXNlYnVyZ2VyIjoiMCIsImFmZmluaXR5UG9pbnRzIjoiMSIsImNoZWVzZWJ1cmdlckNvc3RQdXIiOiIwIiwiYWZmaW5pdHlJQW1vdW50IjoiMCIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEuMDEzMzU4NTc0MDk2NDQ0ZTcxIiwidG90YWwiOiIxLjAxMzM1ODU3NDA5NjQ0NGU3MSIsImJlc3QiOiIxLjAxMzM1ODU3NDA5NjQ0NGU3MSIsInJlc2V0VGltZSI6NDkuMzk1MDAwMDAwMDAwMjQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDIyLDIxLDIzLDI0LDMxLDQxLDUxLDUyLDUzLDU0LDYxLDcxXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTYxMDYuMDkwNjE2NjE0NjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxNjEwNi4wOTA2MTY2MTQ2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhY2giOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTYxMDYuMDkwNjE2NjE0NjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIyMSIsIjIyIiwiMTUiLCIyMyIsIjMxIiwiMzIiLCIyNCIsIjQxIiwiMTYiLCIzMyIsIjI2IiwiNDIiLCIzNCIsIjI1IiwiNDMiLCIzNSJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2IiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTYxMDYuMDkwNjE2NjE0NjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIiwiMTMiOiIiLCIxNCI6IiIsIjIxIjoiIiwiMzEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzdGF0Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE0NDg0LjI0NDAzODA3NTkzNiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ3aSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwiY29va2llcyI6IjI4NTcxODQzODAiLCJyZXNldFRpbWUiOjE2MTA2LjA5MDYxNjYxNDY2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMTZdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm5ld3NBcnJheSI6W119")
            },
            style() {
                return {
                    'background-color': tmp.s.color,
                }
            },
        },
        32: {
            title: "<span style='animation: further 4s infinite;'>Further-Exponent</span>",
            display: "Starting Point",
            canClick: true,
            onClick() {
                if (!confirm("Your current progress will not be saved!"))
                    return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc0NTQ3ODkyNzkzNiwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4xLjEiLCJ0aW1lUGxheWVkIjo0MTQyNS45ODk3Nzc4MjE0MzYsImtlZXBHb2luZyI6ZmFsc2UsImhhc05hTiI6ZmFsc2UsImhpZGVOZXdzIjpmYWxzZSwicG9pbnRzIjoiNC4zMTcxMDU2OTAzMTE4NTllMTAxOCIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sImljIjp7Im1haW5UYWJzIjoiTWFpbiJ9LCJzIjp7Im1haW5UYWJzIjoiRGlzayBEcml2ZXMiLCJkaXNrIjoiUGFydGl0aW9ucyJ9fSwibGFzdFNhZmVUYWIiOiJzIiwibmV3c1RvdGFsIjoiMTMxODYiLCJpbmZvYm94ZXMiOnt9LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQxNDI1Ljk4OTc3NzgyMTQzNiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQxNDI1Ljk4OTc3NzgyMTQzNiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDE0MjUuOTg5Nzc3ODIxNDM2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImV4Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI1MDMiLCJleHBQb2ludHMiOiI1LjcwNzQ5MDcyNDUwMjQwMWU0MjE3IiwidG90YWwiOiI1MDMiLCJiZXN0IjoiNTAzIiwicmVzZXRUaW1lIjo1NDguNjg4NzIyNDEzOTU4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjgwIiwiMTIiOiIyNSIsIjEzIjoiOCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMTYsMTcsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMzEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTEsMTFdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiaWMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjcuMzc5NzIwNDI2NTMxMzQ4ZTEwMiIsImVuZXJneSI6IjEuNTM1MjM5ODI3NjI5MjM3MmUzMCIsInVuaURpbUlMdmwiOiI0LjY3Nzc5ODAyNjU1MDA3OWUyNiIsInVuaURpbUlJTHZsIjoiNDIyMDYuOTEyNjI1ODc1MTgiLCJlbGVtZW50cyI6IjEuODQ3NzIxNDIwMzc5OTg5ZTY5IiwiZWxlbWVudHNEaW1JTHZsIjoiNC40MjI2OTQ2NDkwNTY5MzJlMjQiLCJlbGVtZW50c0RpbUlJTHZsIjoiMTczNTkuNjcxMTcwMDUxNTYzIiwidG90YWwiOiI3LjM3OTcyMDQyNjUzMTM0OGUxMDIiLCJiZXN0IjoiNy4zNzk3MjA0MjY1MzEzNDhlMTAyIiwicmVzZXRUaW1lIjo1NDguNjg4NzIyNDEzOTU4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjE2IiwiMTIiOiIzMiIsIjEzIjoiMyIsIjIxIjoiOTYiLCIyMiI6Ijc3IiwiMjMiOiI3NyIsIjMxIjoiMzIiLCIzMiI6IjI2IiwiMzMiOiIyNiIsIjQxIjoiMTAiLCI0MiI6IjkiLCI0MyI6IjkiLCI0NCI6IjciLCI0NSI6IjYiLCI0NiI6IjgiLCI0NyI6IjYiLCI1MSI6IjIifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzEyLDEzLDExLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxLDMyLDMzLDM0LDM1LDM2LDM3LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0LDEzLDE0XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjEsIjEyIjoxLCIxMyI6MSwiMjEiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sIm8iOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEyMCIsInRvdGFsIjoiMTIwIiwiYmVzdCI6IjEyMCIsInJlc2V0VGltZSI6NTQ4LjY4ODcyMjQxMzk1OCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInAiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEyMDM0Njc3OTQ5MTMuNzQ4NSIsInRvdGFsIjoiMTIwMzQ2Nzc5NDkxMy43NDg1IiwiYmVzdCI6IjEyMDM0Njc3OTQ5MTMuNzQ4NSIsInJlc2V0VGltZSI6NTQ4LjY4ODcyMjQxMzk1OCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxMCIsIjEyIjoiNyIsIjEzIjoiNSIsIjE0IjoiNSIsIjE1IjoiNCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjIuNDc3MzQ4NzcxODUyOTcyZTQyIiwiYmVzdCI6IjIuNDc3ODIxOTAzMzUzN2U0MiIsInRvdGFsIjoiMi40Nzc4MjE5NDMxNjA1NTI0ZTQyIiwiZXhwYW5zaW9uIjoiMS42NDYyOTE0Mjg5MDI0NjdlMjEiLCJjb3JydXB0aW9uIjoiMjkiLCJyZXNldFRpbWUiOjU0OC42ODg3MjI0MTM5NTgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTciLCIxMiI6IjgiLCIxMyI6IjciLCIyMSI6IjE2IiwiMjIiOiIxMyIsIjIzIjoiMTEifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIiwiMjEiOiIiLCIzMSI6IiIsIjMyIjoiIiwiMzMiOiIiLCI0MSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwxNiwyMSwyMiwyMywyNCwyNSwyNiwyNywzMSwzMiwzMywzNCwzNSw0MSw0Miw0Myw0NCw0NSw0Niw1MSw1Miw1MywzNiwzNyw3MSw3Miw1NCw1NSw1Niw2MSw2Miw2Myw2NCw2NSw2Niw5MV0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjowfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJjaGVlc2VidXJnZXJzIjoiNDgiLCJjaGVlc2VEdXJhdGlvbiI6IjUuMTA2Mzc0MDU3NjQ3MjUiLCJ0aW1lIjoiNTQ4LjY4ODcyMjQxMzk1OCIsImNhdGNoZWRCdXJnZXJzIjoiNDUiLCJwb2ludHNJbkNoZWVzZWJ1cmdlciI6IjQuMzE3MTA1NjkwMzExODU5ZTEwMTgiLCJhZmZpbml0eVBvaW50cyI6IjQ0OS4xMzM1MzU3NDUyNzA0IiwiY2hlZXNlYnVyZ2VyQ29zdFB1ciI6Ijg3IiwiYWZmaW5pdHlJQW1vdW50IjoiMTYiLCJhY3RpdmVDaGFsbGVuZ2UiOjExLCJhZmZpbml0eUlJQW1vdW50IjoiMTMiLCJhZmZpbml0eUlJSUFtb3VudCI6IjExIiwiZXhwYW5zaW9uSUkiOiI1MjI2MzIxNzg2MzU3Ljg1NyIsImNoZWVzZWJ1cmdlckNvc3RQdXIyIjoiMjMiLCJjaGVlc2VidXJnZXJDb3N0UHVyMyI6IjIzIn0sImMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjIuMzQyNDI2ODk1MTQ5NzE2N2UxMDAiLCJ0b3RhbCI6IjIuMzQyNDI2ODk1MTQ5NzE2N2UxMDAiLCJiZXN0IjoiMi4zNDI0MjY4OTUxNDk3MTY3ZTEwMCIsInJlc2V0VGltZSI6NTQ4LjY4ODcyMjQxMzk1OCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMjIsMjEsMjMsMjQsMzEsNDEsNTEsNTIsNTMsNTQsNjEsNzFdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiYmxhbmsiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0MTQyNS45ODk3Nzc4MjE0MzYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0MTQyNS45ODk3Nzc4MjE0MzYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYWNoIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQxNDI1Ljk4OTc3NzgyMTQzNiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjEyIiwiMTMiLCIxNCIsIjIxIiwiMjIiLCIxNSIsIjIzIiwiMzEiLCIzMiIsIjI0IiwiNDEiLCIxNiIsIjMzIiwiMjYiLCI0MiIsIjM0IiwiMjUiLCI0MyIsIjM1IiwiNDQiLCIzNiIsIjQ1IiwiNTEiLCI0NiIsIjUyIiwiNTMiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNiIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQxNDI1Ljk4OTc3NzgyMTQzNiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIxMyI6IiIsIjE0IjoiIiwiMjEiOiIiLCIzMSI6IiIsIjMyIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic3RhdCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozOTgwNC4xNDMxOTkyODQ3MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ3aSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwiY29va2llcyI6IjcuMTg1NDY0NzgzMDUwNzc3ZTIyIiwicmVzZXRUaW1lIjo0MTQyNS45ODk3Nzc4MjE0MzYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwxNiwxNywyMSwyMywyMiwyNF0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwibmV3c0FycmF5IjpbXSwib2ZmVGltZSI6eyJyZW1haW4iOjAuMjQ1ODI1OTQyMzUyNzQ4NDZ9fQ==")
            },
            style() {
                return {
                    'background-color': tmp.ex.color2,
                }
            },
        },
    },
})

addLayer("stat", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
  
    }},
    color: "#AAAAAA",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Statistics")
    },
   symbol: "📄",
   
    tabFormat: [
        "blank", 
        ["display-text", function() { return "<h2>This shows your statistics in game.</h2>" }],
 "blank",
 "blank",
 ["display-text", function() { return "You have "+format(player.points)+" points." }],
 "blank",
 "blank",
 ["display-text", function() { return "You have "+format(getBasePointGen())+" base points." }],
 "blank",
 "blank",
 ["display-text", function() { return "You have "+format(player.ex.points)+" Exponent Coins." }],
 "blank",
 "blank",
 ["display-text", function() { return "You have "+format(player.ex.expPoints)+" Exponent Points." }],
 "blank",
 "blank",
["display-text", () =>    (player.ic.unlocked) ? "You have "+format(player.ic.points)+" Incremental Coins.":""],
"blank",
"blank",
["display-text", () =>    (hasChallenge("ic",21)) ? "You have "+format(player.ic.energy)+" Universal Energies.":""],
"blank",
"blank",
["display-text", () =>    (hasUpgrade("ic",25)) ? "You have "+format(player.ic.elements)+" Elements.":""],
"blank",
"blank",
["display-text", () =>    (player.o.unlocked) ? "You have "+format(player.o.points)+" Orbs.":""],
"blank",
"blank",
["display-text", () =>    (player.p.unlocked) ? "You have "+format(player.p.points)+" Poachers.":""],
"blank",
"blank",
["display-text", () =>    (player.c.unlocked) ? "You have "+format(player.c.points)+" Cookies.":""],
"blank",
"blank",
["display-text", () =>    (player.c.unlocked) ? "You have "+format(player.wi.cookies)+" Willy Cookies.":""],
"blank",
"blank",
["display-text", () =>    (player.s.unlocked) ? "You have "+format(player.s.points)+" Sectors.":""],
"blank",
"blank",
["display-text", () =>    (player.s.unlocked) ? "You have "+format(tmp.s.clickables[11].capacity)+" bytes in Partitions.":""],
"blank",
"blank",
["display-text", () =>    (player.s.unlocked) ? "You have "+format(player.s.corruption)+" Corruptions.":""],
"blank",
"blank",
["display-text", () =>    (inChallenge("s",11)) ? "You have "+format(player.s.cheeseburgers)+" Cheeseburgers.":""],
"blank",
"blank",
["display-text", () =>    (inChallenge("s",11)) ? "You have "+format(player.s.catchedBurgers)+" Catched Cheeseburgers.":""],
"blank",
"blank",
["display-text", () =>    (hasUpgrade("s",35)) ? "You have reached "+format(player.s.pointsInCheeseburger)+" points in TMT's Mighty Cheeseburrger.":""],
    ],
 
})

