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
         17: {
            name: "True Iron Golem",
            done() { return player.pa.points.gte(1e6) },
            tooltip: "Reach 1,000,000 Pashtocha Points.",
            unlocked() {return player.pa.unlocked},
        
        },
          27: {
            name: "Thousand Years of Exponent",
            done() { return player.ex.points.gte(1000)&&!inChallenge("s",11) },
            tooltip: "Reach 1,000 Exponent Coins outside of Steal TMT's Cheeseburger.<br><small>Reward: Points softcap start ^1.02 later.</small>",
            unlocked() {return player.pa.unlocked},
        
        },
         37: {
            name: "Intel used to be the king of CPUs, now it's AMD.",
            done() { return hasChallenge("pa",11) },
            tooltip: "Unlock AMD CPU.",
            unlocked() {return player.pa.unlocked},
        
        },
          47: {
            name: "Mega-Cheeseburger",
            done() { return player.points.gte("1e7000")&&inChallenge("s",11) },
            tooltip: "Reach 1e7,000 Points while in TMT's Mighty Cheeseburger.",
            unlocked() {return player.pa.unlocked},
        
        },
          57: {
            name: "Gargantuan Explosion",
            done() { return player.s.points.gte(1e300) },
            tooltip: "Reach 1e300 Sectors.<br><small>Reward: Unlocks Achievement Power, where based on how many Achievements you completed, gains boosts to Pashtocha layer.</small>Coming soon in next update",
            unlocked() {return player.pa.unlocked},
        
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
            done() { return player.s.pointsInCheeseburger.gte("1e365")},
            tooltip: "Reach 1e365 points while in TMT's Mighty Cheeseburger challenge. <small>Reward: Sector gain is multiplied by 8, and unlock a new set of Willy upgrades.</small>",
            unlocked() {return player.s.unlocked},
    
        },
        45: {
            name: "Humority Audience",
            done() { return hasUpgrade("s",53)},
            tooltip: "Unlock Affinity. <small>Reward: Points gain is raised 1.3 while in TMT's Mighty Cheeseburger</small>",
            unlocked() {return player.s.unlocked},
    
        },
        46: {
            name: "Willshire Cookie",
            done() { return player.wi.cookies.gte(1e16)},
            tooltip: "Reach 1e16 Willy Cookies.",
            unlocked() {return hasUpgrade("s",53)},
    
        },
        56: {
            name: "Where is Pentium 5?",
            done() { return player.s.intel.gte(6)},
            tooltip: "Have your Intel CPU be Pentium 4.",
            unlocked() {return player.pa.unlocked},
    
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
            tooltip: "Reach 1 Further-Exponent Point.<br><small>Reward: Automate Corruptions and they reset nothing.</small>",
            unlocked() {return hasUpgrade("s",53)},
    
        },
        55: {
            name: "Ella Elle L'a",
            done() { return player.pa.unlocked },
            tooltip: "Reset for Pashtocha.<br><small>Reward: Introduces a massive boost to previous layers!</small>",
            unlocked() {return player.pa.unlocked},
    
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
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc2NzYxMDg5ODkyNSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4yIiwidGltZVBsYXllZCI6MTIzNy4zNzUxMzI4ODczNTA0LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJoaWRlTmV3cyI6ZmFsc2UsInBvaW50cyI6IjEuNDQ4MjM5MTkyMDc0Njc3M2UyMiIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sImljIjp7Im1haW5UYWJzIjoiTWFpbiJ9LCJzIjp7Im1haW5UYWJzIjoiTWFpbiIsImRpc2siOiJQYXJ0aXRpb25zIn0sInBhIjp7Im1haW5UYWJzIjoiTWFpbiJ9LCJ0cnVjayI6eyJtYWluVGFicyI6Ik1haW4ifX0sImxhc3RTYWZlVGFiIjoiaWMiLCJuZXdzVG90YWwiOiI4OCIsImluZm9ib3hlcyI6e30sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTIzNy4zNzUxMzI4ODczNTA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTIzNy4zNzUxMzI4ODczNTA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImNoYW5nZWxvZy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMjM3LjM3NTEzMjg4NzM1MDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYmxhbmsiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMjM3LjM3NTEzMjg4NzM1MDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMjM3LjM3NTEzMjg4NzM1MDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiZXgiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjciLCJleHBQb2ludHMiOiIxLjY0NzE0ODgwOTI1Njc1NTllODEiLCJ0b3RhbCI6IjgiLCJiZXN0IjoiNyIsInJlc2V0VGltZSI6OS4zNDU5OTk5OTk5OTk5OTEsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiOSIsIjEyIjoiNSIsIjEzIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMTYsMTcsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMzFdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiaWMiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwiZW5lcmd5IjoiMCIsInVuaURpbUlMdmwiOiIwIiwidW5pRGltSUlMdmwiOiIwIiwiZWxlbWVudHMiOiIwIiwiZWxlbWVudHNEaW1JTHZsIjoiMCIsImVsZW1lbnRzRGltSUlMdmwiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEyMzcuMzc1MTMyODg3MzUwNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIwIiwiMTIiOiIwIiwiMTMiOiIwIiwiMjEiOiIwIiwiMjIiOiIwIiwiMjMiOiIwIiwiMzEiOiIwIiwiMzIiOiIwIiwiMzMiOiIwIiwiNDEiOiIwIiwiNDIiOiIwIiwiNDMiOiIwIiwiNDQiOiIwIiwiNDUiOiIwIiwiNDYiOiIwIiwiNDciOiIwIiwiNTEiOiIwIiwiNjEiOiIwIiwiNjIiOiIwIiwiNjMiOiIwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MCwiMTIiOjAsIjEzIjowLCIyMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm8iOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEyMzcuMzc1MTMyODg3MzUwNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJwIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMjM3LjM3NTEzMjg4NzM1MDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCIsIjEyIjoiMCIsIjEzIjoiMCIsIjE0IjoiMCIsIjE1IjoiMCIsIjE2IjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsImJlc3QiOiIwIiwidG90YWwiOiIwIiwiZXhwYW5zaW9uIjoiMCIsImNvcnJ1cHRpb24iOiIwIiwiY2hlZXNlYnVyZ2VycyI6IjAiLCJjaGVlc2VEdXJhdGlvbiI6IjAiLCJ0aW1lIjoiMCIsImNhdGNoZWRCdXJnZXJzIjoiMCIsInBvaW50c0luQ2hlZXNlYnVyZ2VyIjoiMCIsImFmZmluaXR5UG9pbnRzIjoiMCIsImNoZWVzZWJ1cmdlckNvc3RQdXIiOiIwIiwiYWZmaW5pdHlJQW1vdW50IjoiMCIsImFmZmluaXR5SUlBbW91bnQiOiIwIiwiYWZmaW5pdHlJSUlBbW91bnQiOiIwIiwiYWZmaW5pdHlJVkFtb3VudCI6IjAiLCJleHBhbnNpb25JSSI6IjAiLCJjaGVlc2VidXJnZXJDb3N0UHVyMiI6IjAiLCJjaGVlc2VidXJnZXJDb3N0UHVyMyI6IjAiLCJmdXJ0aGVyUG9pbnRzIjoiMCIsImZ1cnRoZXJDb2lucyI6IjAiLCJpbnRlbCI6IjAiLCJhbWQiOiIwIiwicmVzZXRUaW1lIjoxMjM3LjM3NTEzMjg4NzM1MDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCIsIjEyIjoiMCIsIjEzIjoiMCIsIjE0IjoiMCIsIjE1IjoiMCIsIjIxIjoiMCIsIjIyIjoiMCIsIjIzIjoiMCIsIjI0IjoiMCIsIjMxIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIyMSI6IiIsIjMxIjoiIiwiMzIiOiIiLCIzMyI6IiIsIjQxIjoiIiwiNTEiOiIiLCI1MiI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImMiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEyMzcuMzc1MTMyODg3MzUwNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInBhIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMjM3LjM3NTEzMjg4NzM1MDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjowfSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJ1Y2siOnsidW5sb2NrZWQiOnRydWUsImluVHJ1Y2tpbmciOiIwIiwicG9pbnRzaW5UcnVja2luZyI6IjAiLCJ0aW1lIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMjM3LjM3NTEzMjg4NzM1MDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIndpIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJjb29raWVzIjoiMCIsInJlc2V0VGltZSI6MTIzNy4zNzUxMzI4ODczNTA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhY2giOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTIzNy4zNzUxMzI4ODczNTA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2IiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTIzNy4zNzUxMzI4ODczNTA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIiwiMTQiOiIiLCIyMSI6IiIsIjMxIjoiIiwiMzIiOiIiLCI0MSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInN0YXQiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTIzNy4zNzUxMzI4ODczNTA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm5ld3NBcnJheSI6W119")
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
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc2NzYxMjQzMzYxNSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4yIiwidGltZVBsYXllZCI6Mjc3Mi4xMDA4NDY1MTI1MDg3LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJoaWRlTmV3cyI6ZmFsc2UsInBvaW50cyI6IjMuMjc0MDM3NjEzMDY1MDg2NmUxMDQiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJpYyI6eyJtYWluVGFicyI6Ik1haW4ifSwicyI6eyJtYWluVGFicyI6Ik1haW4iLCJkaXNrIjoiUGFydGl0aW9ucyJ9LCJwYSI6eyJtYWluVGFicyI6Ik1haW4ifSwidHJ1Y2siOnsibWFpblRhYnMiOiJNYWluIn19LCJsYXN0U2FmZVRhYiI6Im8iLCJuZXdzVG90YWwiOiIyMDYiLCJpbmZvYm94ZXMiOnt9LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjI3NzIuMTAwODQ2NTEyNTA4NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjI3NzIuMTAwODQ2NTEyNTA4NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6Mjc3Mi4xMDA4NDY1MTI1MDg3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6Mjc3Mi4xMDA4NDY1MTI1MDg3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6Mjc3Mi4xMDA4NDY1MTI1MDg3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImFjaCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyNzcyLjEwMDg0NjUxMjUwODcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOlsiMTEiLCIxMiIsIjEzIiwiMjEiLCIxNCIsIjIyIl0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyNzcyLjEwMDg0NjUxMjUwODcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIiwiMTMiOiIiLCIxNCI6IiIsIjIxIjoiIiwiMzEiOiIiLCIzMiI6IiIsIjQxIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic3RhdCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyNzcyLjEwMDg0NjUxMjUwODcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwid2kiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsImNvb2tpZXMiOiIwIiwicmVzZXRUaW1lIjoyNzcyLjEwMDg0NjUxMjUwODcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRydWNrIjp7InVubG9ja2VkIjp0cnVlLCJpblRydWNraW5nIjoiMCIsInBvaW50c2luVHJ1Y2tpbmciOiIwIiwidGltZSI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6Mjc3Mi4xMDA4NDY1MTI1MDg3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJleCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMTQiLCJleHBQb2ludHMiOiI5LjYzMjc1MDY0MjA2MzU4MmU4NCIsInRvdGFsIjoiMTQiLCJiZXN0IjoiMTQiLCJyZXNldFRpbWUiOjMuNTU0OTk5OTk5OTk5OTk5MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI5IiwiMTIiOiI1IiwiMTMiOiIzIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwxNiwxNywyMSwyMiwyMywyNCwyNSwyNiwyNywzMV0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJpYyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiNTA1MDIzNjkiLCJlbmVyZ3kiOiIwIiwidW5pRGltSUx2bCI6IjAiLCJ1bmlEaW1JSUx2bCI6IjAiLCJlbGVtZW50cyI6IjAiLCJlbGVtZW50c0RpbUlMdmwiOiIwIiwiZWxlbWVudHNEaW1JSUx2bCI6IjAiLCJ0b3RhbCI6IjMyOTQ0NjM1MyIsImJlc3QiOiIzMjk0NDYzMTciLCJyZXNldFRpbWUiOjMuNTU0OTk5OTk5OTk5OTk5MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxMCIsIjEyIjoiMCIsIjEzIjoiMCIsIjIxIjoiMCIsIjIyIjoiMCIsIjIzIjoiMCIsIjMxIjoiMCIsIjMyIjoiMCIsIjMzIjoiMCIsIjQxIjoiMCIsIjQyIjoiMCIsIjQzIjoiMCIsIjQ0IjoiMCIsIjQ1IjoiMCIsIjQ2IjoiMCIsIjQ3IjoiMCIsIjUxIjoiMCIsIjYxIjoiMCIsIjYyIjoiMCIsIjYzIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMTZdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MCwiMTIiOjAsIjEzIjowLCIyMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwibyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6Mjc3Mi4xMDA4NDY1MTI1MDg3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicCI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6Mjc3Mi4xMDA4NDY1MTI1MDg3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjAiLCIxMiI6IjAiLCIxMyI6IjAiLCIxNCI6IjAiLCIxNSI6IjAiLCIxNiI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsImJlc3QiOiIwIiwidG90YWwiOiIwIiwiZXhwYW5zaW9uIjoiMCIsImNvcnJ1cHRpb24iOiIwIiwiY2hlZXNlYnVyZ2VycyI6IjAiLCJjaGVlc2VEdXJhdGlvbiI6IjAiLCJ0aW1lIjoiMCIsImNhdGNoZWRCdXJnZXJzIjoiMCIsInBvaW50c0luQ2hlZXNlYnVyZ2VyIjoiMCIsImFmZmluaXR5UG9pbnRzIjoiMCIsImNoZWVzZWJ1cmdlckNvc3RQdXIiOiIwIiwiYWZmaW5pdHlJQW1vdW50IjoiMCIsImFmZmluaXR5SUlBbW91bnQiOiIwIiwiYWZmaW5pdHlJSUlBbW91bnQiOiIwIiwiYWZmaW5pdHlJVkFtb3VudCI6IjAiLCJleHBhbnNpb25JSSI6IjAiLCJjaGVlc2VidXJnZXJDb3N0UHVyMiI6IjAiLCJjaGVlc2VidXJnZXJDb3N0UHVyMyI6IjAiLCJmdXJ0aGVyUG9pbnRzIjoiMCIsImZ1cnRoZXJDb2lucyI6IjAiLCJpbnRlbCI6IjAiLCJhbWQiOiIwIiwicmVzZXRUaW1lIjoyNzcyLjEwMDg0NjUxMjUwODcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCIsIjEyIjoiMCIsIjEzIjoiMCIsIjE0IjoiMCIsIjE1IjoiMCIsIjIxIjoiMCIsIjIyIjoiMCIsIjIzIjoiMCIsIjI0IjoiMCIsIjMxIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIyMSI6IiIsIjMxIjoiIiwiMzIiOiIiLCIzMyI6IiIsIjQxIjoiIiwiNTEiOiIiLCI1MiI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImMiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMuNTU0OTk5OTk5OTk5OTk5MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInBhIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyNzcyLjEwMDg0NjUxMjUwODcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjowfSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwibmV3c0FycmF5IjpbXX0=")
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
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc2NzYxMjkzMDkwNSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4yIiwidGltZVBsYXllZCI6MzI2OS40NzcxMzk5NDE5MjM3LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJoaWRlTmV3cyI6ZmFsc2UsInBvaW50cyI6IjMuMTMwMDEyMzc2MTA0MDM5M2U0MzgiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJpYyI6eyJtYWluVGFicyI6Ik1haW4ifSwicyI6eyJtYWluVGFicyI6Ik1haW4iLCJkaXNrIjoiUGFydGl0aW9ucyJ9LCJwYSI6eyJtYWluVGFicyI6Ik1haW4ifSwidHJ1Y2siOnsibWFpblRhYnMiOiJNYWluIn19LCJsYXN0U2FmZVRhYiI6ImljIiwibmV3c1RvdGFsIjoiMjYwIiwiaW5mb2JveGVzIjp7fSwiaW5mby10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMjY5LjQ3NzEzOTk0MTkyMzcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMjY5LjQ3NzEzOTk0MTkyMzcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMyNjkuNDc3MTM5OTQxOTIzNywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJibGFuayI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMyNjkuNDc3MTM5OTQxOTIzNywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMyNjkuNDc3MTM5OTQxOTIzNywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ3aSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwiY29va2llcyI6IjAiLCJyZXNldFRpbWUiOjMyNjkuNDc3MTM5OTQxOTIzNywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJ1Y2siOnsidW5sb2NrZWQiOnRydWUsImluVHJ1Y2tpbmciOiIwIiwicG9pbnRzaW5UcnVja2luZyI6IjAiLCJ0aW1lIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMjY5LjQ3NzEzOTk0MTkyMzcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImFjaCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMjY5LjQ3NzEzOTk0MTkyMzcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOlsiMTEiLCIxMiIsIjEzIiwiMjEiLCIxNCIsIjIyIiwiMTUiLCIyMyJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2IiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzI2OS40NzcxMzk5NDE5MjM3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIiwiMTQiOiIiLCIyMSI6IiIsIjMxIjoiIiwiMzIiOiIiLCI0MSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInN0YXQiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzI2OS40NzcxMzk5NDE5MjM3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImV4Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzOCIsImV4cFBvaW50cyI6IjEuNTcyMDczNzExMDc1ODk5M2U0ODIiLCJ0b3RhbCI6IjM4IiwiYmVzdCI6IjM4IiwicmVzZXRUaW1lIjoyNS42NDA3OTg3ODAwMDAwNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI2NSIsIjEyIjoiMjAiLCIxMyI6IjQifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImljIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxLjA3ODAxMDI3ODQ2MjQ2OTJlMTA2IiwiZW5lcmd5IjoiMS42NDgzOTkzNjk0MTEyNzg2ZTE4IiwidW5pRGltSUx2bCI6IjgxOTkxNDk5ODQ2NDkzMjMiLCJ1bmlEaW1JSUx2bCI6IjUwMC41ODU5OTM5MDAwMTI3NCIsImVsZW1lbnRzIjoiNTQ0Mjk4My43MzYzNDQ1MzIiLCJlbGVtZW50c0RpbUlMdmwiOiI0MjYxLjkxODc4NjU3OTk0MiIsImVsZW1lbnRzRGltSUlMdmwiOiIwIiwidG90YWwiOiIxLjA3ODAxMDI3ODQ2MjQ2OTJlMTA2IiwiYmVzdCI6IjEuMDc4MDEwMjc4NDYyNDY5MmUxMDYiLCJyZXNldFRpbWUiOjExMy4xODI3OTg3ODAwMDE1OCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxNiIsIjEyIjoiMzEiLCIxMyI6IjIiLCIyMSI6Ijc4IiwiMjIiOiIzOCIsIjIzIjoiNSIsIjMxIjoiMjciLCIzMiI6IjExIiwiMzMiOiIwIiwiNDEiOiI2IiwiNDIiOiIwIiwiNDMiOiIwIiwiNDQiOiIwIiwiNDUiOiIwIiwiNDYiOiIwIiwiNDciOiIwIiwiNTEiOiIwIiwiNjEiOiIwIiwiNjIiOiIwIiwiNjMiOiIwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwxNiwxNywyMSwyMiwyMywyNCwyNSwyNiwyNywzMSwzMiwzMywzNCwzNSwzNl0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjoxLCIxMiI6MSwiMTMiOjEsIjIxIjoxfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJvIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIyOCIsInRvdGFsIjoiMjgiLCJiZXN0IjoiMjgiLCJyZXNldFRpbWUiOjI1LjY0MDc5ODc4MDAwMDA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicCI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzI2OS40NzcxMzk5NDE5MjM3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjAiLCIxMiI6IjAiLCIxMyI6IjAiLCIxNCI6IjAiLCIxNSI6IjAiLCIxNiI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsImJlc3QiOiIwIiwidG90YWwiOiIwIiwiZXhwYW5zaW9uIjoiMCIsImNvcnJ1cHRpb24iOiIwIiwiY2hlZXNlYnVyZ2VycyI6IjAiLCJjaGVlc2VEdXJhdGlvbiI6IjAiLCJ0aW1lIjoiMCIsImNhdGNoZWRCdXJnZXJzIjoiMCIsInBvaW50c0luQ2hlZXNlYnVyZ2VyIjoiMCIsImFmZmluaXR5UG9pbnRzIjoiMCIsImNoZWVzZWJ1cmdlckNvc3RQdXIiOiIwIiwiYWZmaW5pdHlJQW1vdW50IjoiMCIsImFmZmluaXR5SUlBbW91bnQiOiIwIiwiYWZmaW5pdHlJSUlBbW91bnQiOiIwIiwiYWZmaW5pdHlJVkFtb3VudCI6IjAiLCJleHBhbnNpb25JSSI6IjAiLCJjaGVlc2VidXJnZXJDb3N0UHVyMiI6IjAiLCJjaGVlc2VidXJnZXJDb3N0UHVyMyI6IjAiLCJmdXJ0aGVyUG9pbnRzIjoiMCIsImZ1cnRoZXJDb2lucyI6IjAiLCJpbnRlbCI6IjAiLCJhbWQiOiIwIiwicmVzZXRUaW1lIjozMjY5LjQ3NzEzOTk0MTkyMzcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCIsIjEyIjoiMCIsIjEzIjoiMCIsIjE0IjoiMCIsIjE1IjoiMCIsIjIxIjoiMCIsIjIyIjoiMCIsIjIzIjoiMCIsIjI0IjoiMCIsIjMxIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIyMSI6IiIsIjMxIjoiIiwiMzIiOiIiLCIzMyI6IiIsIjQxIjoiIiwiNTEiOiIiLCI1MiI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImMiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjI1LjY0MDc5ODc4MDAwMDA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicGEiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMyNjkuNDc3MTM5OTQxOTIzNywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjB9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJuZXdzQXJyYXkiOltdfQ==")
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
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc2NzYxMzEyMzg2Nywibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4yIiwidGltZVBsYXllZCI6MzQ2Mi41NDY4MzczNjQ4OTY0LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJoaWRlTmV3cyI6ZmFsc2UsInBvaW50cyI6IjIuMDc3NjQ1NTQyMDYwNTcyNGU1MTMiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJpYyI6eyJtYWluVGFicyI6IkVsZW1lbnRzIn0sInMiOnsibWFpblRhYnMiOiJNYWluIiwiZGlzayI6IlBhcnRpdGlvbnMifSwicGEiOnsibWFpblRhYnMiOiJNYWluIn0sInRydWNrIjp7Im1haW5UYWJzIjoiTWFpbiJ9fSwibGFzdFNhZmVUYWIiOiJjIiwibmV3c1RvdGFsIjoiMjc0IiwiaW5mb2JveGVzIjp7fSwiaW5mby10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNDYyLjU0NjgzNzM2NDg5NjQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNDYyLjU0NjgzNzM2NDg5NjQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM0NjIuNTQ2ODM3MzY0ODk2NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJibGFuayI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM0NjIuNTQ2ODM3MzY0ODk2NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM0NjIuNTQ2ODM3MzY0ODk2NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhY2giOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzQ2Mi41NDY4MzczNjQ4OTY0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyIsIjIxIiwiMTQiLCIyMiIsIjE1IiwiMjMiLCIzMSIsIjMyIl0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNDYyLjU0NjgzNzM2NDg5NjQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIiwiMTMiOiIiLCIxNCI6IiIsIjIxIjoiIiwiMzEiOiIiLCIzMiI6IiIsIjQxIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic3RhdCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNDYyLjU0NjgzNzM2NDg5NjQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwid2kiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsImNvb2tpZXMiOiIwIiwicmVzZXRUaW1lIjozNDYyLjU0NjgzNzM2NDg5NjQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRydWNrIjp7InVubG9ja2VkIjp0cnVlLCJpblRydWNraW5nIjoiMCIsInBvaW50c2luVHJ1Y2tpbmciOiIwIiwidGltZSI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzQ2Mi41NDY4MzczNjQ4OTY0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJleCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMTY2IiwiZXhwUG9pbnRzIjoiNy45Mzg1NjQ5MTg1MjYxMDdlODQ0IiwidG90YWwiOiIxNjYiLCJiZXN0IjoiMTY2IiwicmVzZXRUaW1lIjo0LjQ5OTk5OTk5OTk5OTk5NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI2OSIsIjEyIjoiMjEiLCIxMyI6IjcifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImljIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIyLjE1OTA0OTgyNDc0NTcyMWUxMjUiLCJlbmVyZ3kiOiI0LjU2ODI1MDkzNTY2MTU0N2UyMiIsInVuaURpbUlMdmwiOiI4LjIxMjkyNTM2NzM5MTkyMmUxOSIsInVuaURpbUlJTHZsIjoiMjYxOS42NDc1NjI5NzYwNiIsImVsZW1lbnRzIjoiMTYwMzE0NzUyNzkuNzcxNTEzIiwiZWxlbWVudHNEaW1JTHZsIjoiOTg0Ni42MTY2NDc5MjQ2OTEiLCJlbGVtZW50c0RpbUlJTHZsIjoiMCIsInRvdGFsIjoiMi4xNjA3MTM0MTg5MzcwNTI1ZTEyNSIsImJlc3QiOiIyLjE1OTA0OTgyNDc0NTcyMWUxMjUiLCJyZXNldFRpbWUiOjMwNi4yNTI0OTYyMDMwMDExNiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxNyIsIjEyIjoiMzMiLCIxMyI6IjMiLCIyMSI6IjExMCIsIjIyIjoiNTQiLCIyMyI6IjEzIiwiMzEiOiIzNyIsIjMyIjoiMTYiLCIzMyI6IjAiLCI0MSI6IjciLCI0MiI6IjYiLCI0MyI6IjAiLCI0NCI6IjAiLCI0NSI6IjAiLCI0NiI6IjAiLCI0NyI6IjAiLCI1MSI6IjEiLCI2MSI6IjAiLCI2MiI6IjAiLCI2MyI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxLDMyLDMzLDM0LDM1LDM2LDM3XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjEsIjEyIjoxLCIxMyI6MSwiMjEiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sIm8iOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjMxIiwidG90YWwiOiIzMSIsImJlc3QiOiIzMSIsInJlc2V0VGltZSI6MjE4LjcxMDQ5NjIwMjk5Mzk3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiNDEiLCJ0b3RhbCI6IjMwNSIsImJlc3QiOiIxMzEiLCJyZXNldFRpbWUiOjQuNDk5OTk5OTk5OTk5OTk3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjQiLCIxMiI6IjMiLCIxMyI6IjAiLCIxNCI6IjAiLCIxNSI6IjAiLCIxNiI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsImJlc3QiOiIwIiwidG90YWwiOiIwIiwiZXhwYW5zaW9uIjoiMCIsImNvcnJ1cHRpb24iOiIwIiwiY2hlZXNlYnVyZ2VycyI6IjAiLCJjaGVlc2VEdXJhdGlvbiI6IjAiLCJ0aW1lIjoiMCIsImNhdGNoZWRCdXJnZXJzIjoiMCIsInBvaW50c0luQ2hlZXNlYnVyZ2VyIjoiMCIsImFmZmluaXR5UG9pbnRzIjoiMCIsImNoZWVzZWJ1cmdlckNvc3RQdXIiOiIwIiwiYWZmaW5pdHlJQW1vdW50IjoiMCIsImFmZmluaXR5SUlBbW91bnQiOiIwIiwiYWZmaW5pdHlJSUlBbW91bnQiOiIwIiwiYWZmaW5pdHlJVkFtb3VudCI6IjAiLCJleHBhbnNpb25JSSI6IjAiLCJjaGVlc2VidXJnZXJDb3N0UHVyMiI6IjAiLCJjaGVlc2VidXJnZXJDb3N0UHVyMyI6IjAiLCJmdXJ0aGVyUG9pbnRzIjoiMCIsImZ1cnRoZXJDb2lucyI6IjAiLCJpbnRlbCI6IjAiLCJhbWQiOiIwIiwicmVzZXRUaW1lIjozNDYyLjU0NjgzNzM2NDg5NjQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCIsIjEyIjoiMCIsIjEzIjoiMCIsIjE0IjoiMCIsIjE1IjoiMCIsIjIxIjoiMCIsIjIyIjoiMCIsIjIzIjoiMCIsIjI0IjoiMCIsIjMxIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIyMSI6IiIsIjMxIjoiIiwiMzIiOiIiLCIzMyI6IiIsIjQxIjoiIiwiNTEiOiIiLCI1MiI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImMiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQuNDk5OTk5OTk5OTk5OTk3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicGEiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM0NjIuNTQ2ODM3MzY0ODk2NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjB9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJuZXdzQXJyYXkiOltdfQ==")
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
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc2NzYxMzQyNDEzMiwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4yIiwidGltZVBsYXllZCI6Mzc2Mi45MzM5NDMwOTcyNzczLCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJoaWRlTmV3cyI6ZmFsc2UsInBvaW50cyI6IjMuOTA3MjU5NzE3NDY3MjQ5ZTk5NSIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sImljIjp7Im1haW5UYWJzIjoiVW5pdmVyc2FsIn0sInMiOnsibWFpblRhYnMiOiJNYWluIiwiZGlzayI6IlBhcnRpdGlvbnMifSwicGEiOnsibWFpblRhYnMiOiJNYWluIn0sInRydWNrIjp7Im1haW5UYWJzIjoiTWFpbiJ9fSwibGFzdFNhZmVUYWIiOiJzIiwibmV3c1RvdGFsIjoiMzA0IiwiaW5mb2JveGVzIjp7fSwiaW5mby10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNzYyLjkzMzk0MzA5NzI3NzMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNzYyLjkzMzk0MzA5NzI3NzMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM3NjIuOTMzOTQzMDk3Mjc3MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJibGFuayI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM3NjIuOTMzOTQzMDk3Mjc3MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM3NjIuOTMzOTQzMDk3Mjc3MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cnVjayI6eyJ1bmxvY2tlZCI6dHJ1ZSwiaW5UcnVja2luZyI6IjAiLCJwb2ludHNpblRydWNraW5nIjoiMCIsInRpbWUiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM3NjIuOTMzOTQzMDk3Mjc3MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwid2kiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsImNvb2tpZXMiOiIwIiwicmVzZXRUaW1lIjozNzYyLjkzMzk0MzA5NzI3NzMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImFjaCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNzYyLjkzMzk0MzA5NzI3NzMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOlsiMTEiLCIxMiIsIjEzIiwiMjEiLCIxNCIsIjIyIiwiMTUiLCIyMyIsIjMxIiwiMzIiLCIyNCJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2IiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6Mzc2Mi45MzM5NDMwOTcyNzczLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIiwiMTQiOiIiLCIyMSI6IiIsIjMxIjoiIiwiMzIiOiIiLCI0MSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInN0YXQiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6Mzc2Mi45MzM5NDMwOTcyNzczLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImV4Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIyNDMiLCJleHBQb2ludHMiOiIzLjk3NDk4MjgxNDI0NTIzOTVlMTEwOCIsInRvdGFsIjoiMjQzIiwiYmVzdCI6IjI0MyIsInJlc2V0VGltZSI6MjYuMjQzMDAwMDAwMDAwMDEzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjcxIiwiMTIiOiIyMiIsIjEzIjoiNyJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMTYsMTcsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMzFdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiaWMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjIuNTgyMzQxNzUxNzU3OTU2OGUyNTMiLCJlbmVyZ3kiOiIxLjI1NzYxOTUyMjgwODQxNDJlMjYiLCJ1bmlEaW1JTHZsIjoiNC41NzYwOTY4OTE4MTI3MTJlMjMiLCJ1bmlEaW1JSUx2bCI6IjE4MDI1LjAyNDk3MTcyMDgyIiwiZWxlbWVudHMiOiIzNTIyMzE1NDQ1MTYuNzQ1MiIsImVsZW1lbnRzRGltSUx2bCI6IjIyNzcxLjY4MDA4NjMwNjIzOCIsImVsZW1lbnRzRGltSUlMdmwiOiIwIiwidG90YWwiOiIyLjU4MjM0MTc1MTc1Nzk1NjhlMjUzIiwiYmVzdCI6IjIuNTgyMzQxNzUxNzU3OTU2OGUyNTMiLCJyZXNldFRpbWUiOjI0OS41NTczMTc0Nzc0MDAxOCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxNyIsIjEyIjoiMzMiLCIxMyI6IjMiLCIyMSI6IjI0OSIsIjIyIjoiMTU4IiwiMjMiOiIxNTgiLCIzMSI6Ijg0IiwiMzIiOiI1MyIsIjMzIjoiMCIsIjQxIjoiNyIsIjQyIjoiNiIsIjQzIjoiNiIsIjQ0IjoiMCIsIjQ1IjoiMCIsIjQ2IjoiMCIsIjQ3IjoiMCIsIjUxIjoiMiIsIjYxIjoiMCIsIjYyIjoiMCIsIjYzIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMTYsMTcsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMzEsMzIsMzMsMzQsMzUsMzYsMzddLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MSwiMTIiOjEsIjEzIjoxLCIyMSI6MX0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwibyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiNDEiLCJ0b3RhbCI6IjQxIiwiYmVzdCI6IjQxIiwicmVzZXRUaW1lIjo1MTkuMDk3NjAxOTM1NDA1NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInAiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjE0MzAiLCJ0b3RhbCI6IjE3MDQiLCJiZXN0IjoiMTQzMCIsInJlc2V0VGltZSI6MjYuMjQzMDAwMDAwMDAwMDEzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjQiLCIxMiI6IjMiLCIxMyI6IjIiLCIxNCI6IjAiLCIxNSI6IjAiLCIxNiI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsImJlc3QiOiIwIiwidG90YWwiOiIwIiwiZXhwYW5zaW9uIjoiMCIsImNvcnJ1cHRpb24iOiIwIiwiY2hlZXNlYnVyZ2VycyI6IjAiLCJjaGVlc2VEdXJhdGlvbiI6IjAiLCJ0aW1lIjoiMCIsImNhdGNoZWRCdXJnZXJzIjoiMCIsInBvaW50c0luQ2hlZXNlYnVyZ2VyIjoiMCIsImFmZmluaXR5UG9pbnRzIjoiMCIsImNoZWVzZWJ1cmdlckNvc3RQdXIiOiIwIiwiYWZmaW5pdHlJQW1vdW50IjoiMCIsImFmZmluaXR5SUlBbW91bnQiOiIwIiwiYWZmaW5pdHlJSUlBbW91bnQiOiIwIiwiYWZmaW5pdHlJVkFtb3VudCI6IjAiLCJleHBhbnNpb25JSSI6IjAiLCJjaGVlc2VidXJnZXJDb3N0UHVyMiI6IjAiLCJjaGVlc2VidXJnZXJDb3N0UHVyMyI6IjAiLCJmdXJ0aGVyUG9pbnRzIjoiMCIsImZ1cnRoZXJDb2lucyI6IjAiLCJpbnRlbCI6IjAiLCJhbWQiOiIwIiwicmVzZXRUaW1lIjozNzYyLjkzMzk0MzA5NzI3NzMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCIsIjEyIjoiMCIsIjEzIjoiMCIsIjE0IjoiMCIsIjE1IjoiMCIsIjIxIjoiMCIsIjIyIjoiMCIsIjIzIjoiMCIsIjI0IjoiMCIsIjMxIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIyMSI6IiIsIjMxIjoiIiwiMzIiOiIiLCIzMyI6IiIsIjQxIjoiIiwiNTEiOiIiLCI1MiI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEyMDAyMyIsInRvdGFsIjoiMCIsImJlc3QiOiIxMjAwMjMiLCJyZXNldFRpbWUiOjI2LjI0MzAwMDAwMDAwMDAxMywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMjEsMjIsMjMsMjQsMzFdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicGEiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM3NjIuOTMzOTQzMDk3Mjc3MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjB9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJuZXdzQXJyYXkiOltdfQ==")
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
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc2NzYzNzY0MDIwOSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4yIiwidGltZVBsYXllZCI6MTc1NTEuNDU2MjMxNjExMzY2LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJoaWRlTmV3cyI6ZmFsc2UsInBvaW50cyI6IjEuOTM2MjY0MDM0ODYzMjQ2ZTEzODEiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJpYyI6eyJtYWluVGFicyI6IkVsZW1lbnRzIn0sInMiOnsibWFpblRhYnMiOiJNYWluIiwiZGlzayI6IkNvcnJ1cHRpb24ifSwicGEiOnsibWFpblRhYnMiOiJNYWluIn0sInRydWNrIjp7Im1haW5UYWJzIjoiTWFpbiJ9fSwibGFzdFNhZmVUYWIiOiJzIiwibmV3c1RvdGFsIjoiNjI0IiwiaW5mb2JveGVzIjp7fSwiaW5mby10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxNzU1MS40NTYyMzE2MTEzNjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxNzU1MS40NTYyMzE2MTEzNjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE3NTUxLjQ1NjIzMTYxMTM2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJibGFuayI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE3NTUxLjQ1NjIzMTYxMTM2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE3NTUxLjQ1NjIzMTYxMTM2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhY2giOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTc1NTEuNDU2MjMxNjExMzY2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyIsIjIxIiwiMTQiLCIyMiIsIjE1IiwiMjMiLCIzMSIsIjMyIiwiMjQiLCIzMyIsIjQxIiwiNDIiLCIxNiIsIjM0IiwiMjYiLCIyNSIsIjQzIiwiMzUiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNiIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE3NTUxLjQ1NjIzMTYxMTM2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIxMyI6IiIsIjE0IjoiIiwiMjEiOiIiLCIzMSI6IiIsIjMyIjoiIiwiNDEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzdGF0Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE3NTUxLjQ1NjIzMTYxMTM2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ3aSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwiY29va2llcyI6IjE2NDAxMjUxMjkiLCJyZXNldFRpbWUiOjE3NTUxLjQ1NjIzMTYxMTM2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cnVjayI6eyJ1bmxvY2tlZCI6dHJ1ZSwiaW5UcnVja2luZyI6IjAiLCJwb2ludHNpblRydWNraW5nIjoiMCIsInRpbWUiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE3NTUxLjQ1NjIzMTYxMTM2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiZXgiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjMxNiIsImV4cFBvaW50cyI6IjAiLCJ0b3RhbCI6IjMxNiIsImJlc3QiOiIzMTYiLCJyZXNldFRpbWUiOjMuMjA5OTk5OTk5OTk5OTk5NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI3NCIsIjEyIjoiMjMiLCIxMyI6IjcifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDE3LDIzLDIxLDIyLDI0LDI1LDI2LDI3LDMxXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImljIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI4LjM1Nzg4NDczNTA2MjQxNWU0NjciLCJlbmVyZ3kiOiI4LjA0MDYyNDQwODgxMjI2ZTE2IiwidW5pRGltSUx2bCI6IjMxODgwOTY0NzE4MzgwMzUuNSIsInVuaURpbUlJTHZsIjoiNjU0LjQzODk5OTk5OTk5OTkiLCJlbGVtZW50cyI6IjMuNDM5Nzc2MzczNDk1MDQ1M2UzMiIsImVsZW1lbnRzRGltSUx2bCI6IjE0MTEwNjgxODU2NTgwLjY0NSIsImVsZW1lbnRzRGltSUlMdmwiOiIyMjEuNTIyMjMxMzg2MDExMyIsInRvdGFsIjoiOC4zNTc4ODQ3MzUwNjI0MTVlNDY3IiwiYmVzdCI6IjguMzU3ODg0NzM1MDYyNDE1ZTQ2NyIsInJlc2V0VGltZSI6My4yMDk5OTk5OTk5OTk5OTk1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjIwIiwiMTIiOiIzOSIsIjEzIjoiMyIsIjIxIjoiNDY4IiwiMjIiOiIzNzMiLCIyMyI6IjM2NCIsIjMxIjoiMTUzIiwiMzIiOiIxMzAiLCIzMyI6IjkxIiwiNDEiOiI4IiwiNDIiOiI4IiwiNDMiOiI4IiwiNDQiOiIwIiwiNDUiOiIwIiwiNDYiOiIwIiwiNDciOiIwIiwiNTEiOiIyIiwiNjEiOiIwIiwiNjIiOiIwIiwiNjMiOiIwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMiwxMywxNCwxNSwxNiwxNywyMSwyMiwxMSwyMywyNCwyNSwyNiwyNywzMSwzMiwzMywzNCwzNSwzNiwzNywxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNF0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjoxLCIxMiI6MSwiMTMiOjEsIjIxIjoxfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJvIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxODQiLCJ0b3RhbCI6IjE4NCIsImJlc3QiOiIxODQiLCJyZXNldFRpbWUiOjMuMjA5OTk5OTk5OTk5OTk5NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInAiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjUuNTQ5MTA1MzA1OTQ0OTc1ZTE2IiwidG90YWwiOiI1LjU0OTEwNTMwNTk0NDk3NWUxNiIsImJlc3QiOiI1LjU0OTEwNTMwNTk0NDk3NWUxNiIsInJlc2V0VGltZSI6My4yMDk5OTk5OTk5OTk5OTk1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjciLCIxMiI6IjUiLCIxMyI6IjQiLCIxNCI6IjQiLCIxNSI6IjMiLCIxNiI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzMjE0NDAiLCJiZXN0IjoiNzAwMDAwMDAwIiwidG90YWwiOiI1OTQ4NTgzIiwiZXhwYW5zaW9uIjoiMTkxMyIsImNvcnJ1cHRpb24iOiIyMCIsImNoZWVzZWJ1cmdlcnMiOiIwIiwiY2hlZXNlRHVyYXRpb24iOiIwIiwidGltZSI6IjAiLCJjYXRjaGVkQnVyZ2VycyI6IjAiLCJwb2ludHNJbkNoZWVzZWJ1cmdlciI6IjAiLCJhZmZpbml0eVBvaW50cyI6IjAiLCJjaGVlc2VidXJnZXJDb3N0UHVyIjoiMCIsImFmZmluaXR5SUFtb3VudCI6IjAiLCJhZmZpbml0eUlJQW1vdW50IjoiMCIsImFmZmluaXR5SUlJQW1vdW50IjoiMCIsImFmZmluaXR5SVZBbW91bnQiOiIwIiwiZXhwYW5zaW9uSUkiOiIwIiwiY2hlZXNlYnVyZ2VyQ29zdFB1cjIiOiIwIiwiY2hlZXNlYnVyZ2VyQ29zdFB1cjMiOiIwIiwiZnVydGhlclBvaW50cyI6IjAiLCJmdXJ0aGVyQ29pbnMiOiIwIiwiaW50ZWwiOiIwIiwiYW1kIjoiMCIsInJlc2V0VGltZSI6My4yMDk5OTk5OTk5OTk5OTk1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjEyIiwiMTIiOiIwIiwiMTMiOiIwIiwiMTQiOiIwIiwiMTUiOiIwIiwiMjEiOiIwIiwiMjIiOiIwIiwiMjMiOiIwIiwiMjQiOiIwIiwiMzEiOiIwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjIxIjoiIiwiMzEiOiIiLCIzMiI6IiIsIjMzIjoiIiwiNDEiOiIiLCI1MSI6IiIsIjUyIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxLDMyLDMzLDM0LDM1XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjB9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEuNjc0ODU1MzA5OTQ0MDk0ZTUyIiwidG90YWwiOiIxLjY3NDg1NTMwOTk0NDA5NGU1MiIsImJlc3QiOiIxLjY3NDg1NTMwOTk0NDA5NGU1MiIsInJlc2V0VGltZSI6My4yMDk5OTk5OTk5OTk5OTk1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwyMSwyMiwyMywyNCwzMSw0MSw1Miw1MSw1Myw1NCw2MSw3MV0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJwYSI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTc1NTEuNDU2MjMxNjExMzY2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm5ld3NBcnJheSI6W119")
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
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc2NzYzOTk3MjU0NSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4yIiwidGltZVBsYXllZCI6MTk4ODMuOTQwNTYzMDQxMTM1LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOnRydWUsImhpZGVOZXdzIjpmYWxzZSwicG9pbnRzIjoiMS4zMzEwNjkzNTIwNDY5NzllMTAxOSIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sImljIjp7Im1haW5UYWJzIjoiRWxlbWVudHMifSwicyI6eyJtYWluVGFicyI6IlN0ZWFsIFRNVCdzIENoZWVzZWJ1cmdlciIsImRpc2siOiJQYXJ0aXRpb25zIn0sInBhIjp7Im1haW5UYWJzIjoiTWFpbiJ9LCJ0cnVjayI6eyJtYWluVGFicyI6Ik1haW4ifX0sImxhc3RTYWZlVGFiIjoicyIsIm5ld3NUb3RhbCI6IjcwNyIsImluZm9ib3hlcyI6e30sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTk4ODMuOTQwNTYzMDQxMTM1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTk4ODMuOTQwNTYzMDQxMTM1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImNoYW5nZWxvZy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxOTg4My45NDA1NjMwNDExMzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYmxhbmsiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxOTg4My45NDA1NjMwNDExMzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxOTg4My45NDA1NjMwNDExMzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYWNoIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE5ODgzLjk0MDU2MzA0MTEzNSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjEyIiwiMTMiLCIyMSIsIjE0IiwiMjIiLCIxNSIsIjIzIiwiMzEiLCIzMiIsIjI0IiwiMzMiLCI0MSIsIjQyIiwiMTYiLCIzNCIsIjI2IiwiMjUiLCI0MyIsIjM1IiwiNDQiLCI0NSIsIjM2IiwiNTEiLCI1MiIsIjQ2Il0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxOTg4My45NDA1NjMwNDExMzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIiwiMTMiOiIiLCIxNCI6IiIsIjIxIjoiIiwiMzEiOiIiLCIzMiI6IiIsIjQxIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic3RhdCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxOTg4My45NDA1NjMwNDExMzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwid2kiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsImNvb2tpZXMiOiI4LjIxOTQxNjQwMDQ2MDU5OWUyMCIsInJlc2V0VGltZSI6MTk4ODMuOTQwNTYzMDQxMTM1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMTYsMTcsMjEsMjIsMjMsMjRdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRydWNrIjp7InVubG9ja2VkIjp0cnVlLCJpblRydWNraW5nIjoiMCIsInBvaW50c2luVHJ1Y2tpbmciOiIwIiwidGltZSI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTk4ODMuOTQwNTYzMDQxMTM1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJleCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMTIzNSIsImV4cFBvaW50cyI6IjQuOTYzMzAzOTg0Nzc1MTA3NWUxNzE5IiwidG90YWwiOiIxMjM1IiwiYmVzdCI6IjEyMzUiLCJyZXNldFRpbWUiOjM2NS40MDYwOTkyMjY1NTg4NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI3NCIsIjEyIjoiMjMiLCIxMyI6IjcifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDE3LDIzLDIxLDIyLDI0LDI1LDI2LDI3LDMxXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImljIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI0LjY1MTUzNjUyNzQzNzA5NGUxMDIiLCJlbmVyZ3kiOiIxLjQ3NDU5ODQ0MzQwODk2MDNlMzAiLCJ1bmlEaW1JTHZsIjoiMS4wMzUzMjA0ODgxOTY4NTEyZTI2IiwidW5pRGltSUlMdmwiOiIyNTY4MC43NzgwNDUwODM5MjciLCJlbGVtZW50cyI6IjEuOTk4OTY5OTc1Mjg1ODEwOGU2NiIsImVsZW1lbnRzRGltSUx2bCI6IjIuMTU5MDkxNDYxMjEwODcwNWUyMyIsImVsZW1lbnRzRGltSUlMdmwiOiI3OTQ3LjIxMTI2MzczNzE1NjUiLCJ0b3RhbCI6IjQuNjUxNTM2NTI3NDM3MDk0ZTEwMiIsImJlc3QiOiI0LjY1MTUzNjUyNzQzNzA5NGUxMDIiLCJyZXNldFRpbWUiOjM2NS40MDYwOTkyMjY1NTg4NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxNiIsIjEyIjoiMzIiLCIxMyI6IjMiLCIyMSI6Ijk2IiwiMjIiOiIxMDEiLCIyMyI6IjcxIiwiMzEiOiIzMyIsIjMyIjoiMTUiLCIzMyI6IjIxIiwiNDEiOiI5IiwiNDIiOiI5IiwiNDMiOiI5IiwiNDQiOiI3IiwiNDUiOiI2IiwiNDYiOiI4IiwiNDciOiI2IiwiNTEiOiIyIiwiNjEiOiIwIiwiNjIiOiIwIiwiNjMiOiIwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMiwxMywxNCwxNSwxNiwxNywyMSwyMiwxMSwyMywyNCwyNSwyNiwyNywzMSwzMiwzMywzNCwzNSwzNiwzNywxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNCwxMywxNF0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjoxLCIxMiI6MSwiMTMiOjEsIjIxIjoxfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJvIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxODQiLCJ0b3RhbCI6IjE4NCIsImJlc3QiOiIxODQiLCJyZXNldFRpbWUiOjM2NS40MDYwOTkyMjY1NTg4NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInAiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjMyMjkxOTg5ODUxMi4yNDkyNyIsInRvdGFsIjoiMzIyOTE5ODk4NTEyLjI0OTI3IiwiYmVzdCI6IjMyMjkxOTg5ODUxMi4yNDkyNyIsInJlc2V0VGltZSI6MzY1LjQwNjA5OTIyNjU1ODg3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjkiLCIxMiI6IjYiLCIxMyI6IjUiLCIxNCI6IjQiLCIxNSI6IjQiLCIxNiI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIyLjY0Mzk2NjgzMTgxOTI2MmUzNSIsImJlc3QiOiIyLjY0NDUwMzkyNTU2OTQ2ODRlMzUiLCJ0b3RhbCI6IjIuNjQ0NTAzOTI1NTY5ODU3NWUzNSIsImV4cGFuc2lvbiI6IjYuMzQ5OTQ5ODMwNzgyODA3ZTE3IiwiY29ycnVwdGlvbiI6IjIzIiwiY2hlZXNlYnVyZ2VycyI6IjQxIiwiY2hlZXNlRHVyYXRpb24iOiI0LjE5NTI5MTgwODk2MDgzIiwidGltZSI6IjM2NS40MDYwOTkyMjY1NTg4NyIsImNhdGNoZWRCdXJnZXJzIjoiMjIwIiwicG9pbnRzSW5DaGVlc2VidXJnZXIiOiIxLjMzMTA2OTM1MjA0Njk3OWUxMDE5IiwiYWZmaW5pdHlQb2ludHMiOiI0MDMuMzgwMDE0MDkyMTQyMzUiLCJjaGVlc2VidXJnZXJDb3N0UHVyIjoiODUiLCJhZmZpbml0eUlBbW91bnQiOiIxNSIsImFmZmluaXR5SUlBbW91bnQiOiIxMiIsImFmZmluaXR5SUlJQW1vdW50IjoiMTAiLCJhZmZpbml0eUlWQW1vdW50IjoiMCIsImV4cGFuc2lvbklJIjoiNDIzMzI5MDQwNzMuNTkxODYiLCJjaGVlc2VidXJnZXJDb3N0UHVyMiI6IjIzIiwiY2hlZXNlYnVyZ2VyQ29zdFB1cjMiOiIyMyIsImZ1cnRoZXJQb2ludHMiOiIwIiwiZnVydGhlckNvaW5zIjoiMCIsImludGVsIjoiMCIsImFtZCI6IjAiLCJyZXNldFRpbWUiOjM2NS40MDYwOTkyMjY1NTg4NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxNyIsIjEyIjoiNyIsIjEzIjoiNiIsIjE0IjoiMCIsIjE1IjoiMCIsIjIxIjoiMTUiLCIyMiI6IjEyIiwiMjMiOiIxMCIsIjI0IjoiMCIsIjMxIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIyMSI6IiIsIjMxIjoiIiwiMzIiOiIiLCIzMyI6IiIsIjQxIjoiIiwiNTEiOiIiLCI1MiI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwxNiwyMSwyMiwyMywyNCwyNSwyNiwyNywzMSwzMiwzMywzNCwzNSw0MSw0Miw0Myw0NCw0NSw0Niw1MSw1Miw1MywzNiwzNyw3MSw3Miw1NCw1NSw1Niw2MSw2Miw2Myw2NCw2NSw2Niw5MV0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjowfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOjExfSwiYyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMy4xNTc3Mzg2Nzg5ODYzOTc1ZTEzMiIsInRvdGFsIjoiMy4xNTc3Mzg2Nzg5ODYzOTc1ZTEzMiIsImJlc3QiOiIzLjE1NzczODY3ODk4NjM5NzVlMTMyIiwicmVzZXRUaW1lIjozNjUuNDA2MDk5MjI2NTU4ODcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDIxLDIyLDIzLDI0LDMxLDQxLDUyLDUxLDUzLDU0LDYxLDcxXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInBhIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxOTg4My45NDA1NjMwNDExMzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjowfSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwibmV3c0FycmF5IjpbXX0=")
            },
            style() {
                return {
                    'background-color': tmp.ex.color2,
                }
            },
        },
        41: {
            title: "Pashtocha",
            display: "Starting Point",
            canClick: true,
            onClick() {
                if (!confirm("Your current progress will not be saved!"))
                    return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc2NzY0MDkzMTY3OSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4yIiwidGltZVBsYXllZCI6MjA4NDMuMjQ0MzkzNjI0OTIyLCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOnRydWUsImhpZGVOZXdzIjpmYWxzZSwicG9pbnRzIjoiNi43NTYyNjcxNTkyMTc0OTdlNDA0MyIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sImljIjp7Im1haW5UYWJzIjoiRWxlbWVudHMifSwicyI6eyJtYWluVGFicyI6IlN0ZWFsIFRNVCdzIENoZWVzZWJ1cmdlciIsImRpc2siOiJDb3JydXB0aW9uIn0sInBhIjp7Im1haW5UYWJzIjoiTWFpbiJ9LCJ0cnVjayI6eyJtYWluVGFicyI6Ik1haW4ifX0sImxhc3RTYWZlVGFiIjoicyIsIm5ld3NUb3RhbCI6Ijc3MiIsImluZm9ib3hlcyI6e30sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjA4NDMuMjQ0MzkzNjI0OTIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjA4NDMuMjQ0MzkzNjI0OTIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImNoYW5nZWxvZy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyMDg0My4yNDQzOTM2MjQ5MjIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYmxhbmsiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyMDg0My4yNDQzOTM2MjQ5MjIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyMDg0My4yNDQzOTM2MjQ5MjIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwid2kiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsImNvb2tpZXMiOiIyLjg3MjI2NjI2NjAxMzQ3NzdlMjgiLCJyZXNldFRpbWUiOjIwODQzLjI0NDM5MzYyNDkyMiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhY2giOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjA4NDMuMjQ0MzkzNjI0OTIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyIsIjIxIiwiMTQiLCIyMiIsIjE1IiwiMjMiLCIzMSIsIjMyIiwiMjQiLCIzMyIsIjQxIiwiNDIiLCIxNiIsIjM0IiwiMjYiLCIyNSIsIjQzIiwiMzUiLCI0NCIsIjQ1IiwiMzYiLCI1MSIsIjUyIiwiNDYiLCI1NCJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2IiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjA4NDMuMjQ0MzkzNjI0OTIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIiwiMTQiOiIiLCIyMSI6IiIsIjMxIjoiIiwiMzIiOiIiLCI0MSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInN0YXQiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjA4NDMuMjQ0MzkzNjI0OTIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRydWNrIjp7InVubG9ja2VkIjp0cnVlLCJpblRydWNraW5nIjoiMCIsInBvaW50c2luVHJ1Y2tpbmciOiIwIiwidGltZSI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjA4NDMuMjQ0MzkzNjI0OTIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJleCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMjM3OCIsImV4cFBvaW50cyI6IjUuNzY5NTcyNzcyMzgwMTE5ZTMzMTgiLCJ0b3RhbCI6IjIzNzgiLCJiZXN0IjoiMjM3OCIsInJlc2V0VGltZSI6MzkwLjA2OTMxODQxNzIxOSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI3OSIsIjEyIjoiMjUiLCIxMyI6IjgifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDE3LDIzLDIxLDIyLDI0LDI1LDI2LDI3LDMxXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImljIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI5LjczNDk4OTMzNDExOTQ5MmU0MDIiLCJlbmVyZ3kiOiIyLjcxOTMxMDExNjM5MzY1NmUzMSIsInVuaURpbUlMdmwiOiIxLjE5MTkyODQzODI4MjA0NGUyNyIsInVuaURpbUlJTHZsIjoiMzcwMDMuODYwMjQ5NjM2NTkiLCJlbGVtZW50cyI6IjguNjcyNTIzNDY2MjI3MjNlNzEiLCJlbGVtZW50c0RpbUlMdmwiOiIyLjk2MzY4ODAzNzM4MzU5MmUyNSIsImVsZW1lbnRzRGltSUlMdmwiOiIyMTUwNC4xODExNjY0Nzk5MiIsInRvdGFsIjoiOS43MzQ5ODkzMzQxMTk0OTJlNDAyIiwiYmVzdCI6IjkuNzM0OTg5MzM0MTE5NDkyZTQwMiIsInJlc2V0VGltZSI6MzkwLjA2OTMxODQxNzIxOSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIyMCIsIjEyIjoiMzgiLCIxMyI6IjMiLCIyMSI6IjQwMSIsIjIyIjoiMjY3IiwiMjMiOiI5NSIsIjMxIjoiMTM0IiwiMzIiOiI4OSIsIjMzIjoiMTIxIiwiNDEiOiIxMCIsIjQyIjoiOSIsIjQzIjoiOSIsIjQ0IjoiNyIsIjQ1IjoiNiIsIjQ2IjoiOCIsIjQ3IjoiNiIsIjUxIjoiMyIsIjYxIjoiMCIsIjYyIjoiMCIsIjYzIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTIsMTMsMTQsMTUsMTYsMTcsMjEsMjIsMTEsMjMsMjQsMjUsMjYsMjcsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTQsMTMsMTRdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MSwiMTIiOjEsIjEzIjoxLCIyMSI6MX0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwibyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMzYxIiwidG90YWwiOiIzNjEiLCJiZXN0IjoiMzYxIiwicmVzZXRUaW1lIjozOTAuMDY5MzE4NDE3MjE5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMS4xNTA2MjAwNjE3NDMxNzk3ZTUwIiwidG90YWwiOiIxLjE1MDYyMDA2MTc0MzE3OTdlNTAiLCJiZXN0IjoiMS4xNTA2MjAwNjE3NDMxNzk3ZTUwIiwicmVzZXRUaW1lIjozOTAuMDY5MzE4NDE3MjE5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjkiLCIxMiI6IjYiLCIxMyI6IjUiLCIxNCI6IjQiLCIxNSI6IjQiLCIxNiI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxLjI2NzU0NTc5MzEzOTkyODhlNTQiLCJiZXN0IjoiMS4yNjc1NDU3OTMxMzk5Mjg4ZTU0IiwidG90YWwiOiIxLjI2NzU2MzcxNDE0NDY4NzJlNTQiLCJleHBhbnNpb24iOiI2LjU2MDk1MjY3NjExMzg1NGUyNSIsImNvcnJ1cHRpb24iOiIzMiIsImNoZWVzZWJ1cmdlcnMiOiIzNyIsImNoZWVzZUR1cmF0aW9uIjoiMTAuNzQwOTk5OTk5OTk5OTgyIiwidGltZSI6IjM5MC4wNjkzMTg0MTcyMTkiLCJjYXRjaGVkQnVyZ2VycyI6IjI0MjAiLCJwb2ludHNJbkNoZWVzZWJ1cmdlciI6IjYuNzU2MjY3MTU5MjE3NDk3ZTQwNDMiLCJhZmZpbml0eVBvaW50cyI6IjUyMC4zNTk4NjA0NzQ1NzQ1IiwiY2hlZXNlYnVyZ2VyQ29zdFB1ciI6Ijg3IiwiYWZmaW5pdHlJQW1vdW50IjoiODEiLCJhZmZpbml0eUlJQW1vdW50IjoiNzEiLCJhZmZpbml0eUlJSUFtb3VudCI6IjYzIiwiYWZmaW5pdHlJVkFtb3VudCI6IjAiLCJleHBhbnNpb25JSSI6IjU1MDczODkxMzQ2NTU0NC4zIiwiY2hlZXNlYnVyZ2VyQ29zdFB1cjIiOiIzMCIsImNoZWVzZWJ1cmdlckNvc3RQdXIzIjoiMzAiLCJmdXJ0aGVyUG9pbnRzIjoiMTIwLjI5NTAwMDAwMDAyNDYxIiwiZnVydGhlckNvaW5zIjoiMiIsImludGVsIjoiMCIsImFtZCI6IjAiLCJyZXNldFRpbWUiOjM5MC4wNjkzMTg0MTcyMTksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTgiLCIxMiI6IjgiLCIxMyI6IjciLCIxNCI6IjAiLCIxNSI6IjAiLCIyMSI6IjgxIiwiMjIiOiI3MSIsIjIzIjoiNjMiLCIyNCI6IjAiLCIzMSI6IjIifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIiwiMjEiOiIiLCIzMSI6IiIsIjMyIjoiIiwiMzMiOiIiLCI0MSI6IiIsIjUxIjoiIiwiNTIiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMTYsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMzEsMzIsMzMsMzQsMzUsNDEsNDIsNDMsNDQsNDUsNDYsNTEsNTIsNTMsMzYsMzcsNzEsNzIsNTQsNTUsNTYsNjEsNjIsNjMsNjQsNjUsNjYsOTEsOTIsOTMsOTQsOTUsOTYsMTAxLDEwMiw0Nyw1Nyw2Nyw5N10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjowfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOjExfSwiYyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMy4zMzMyNDM2MDEyMTkxODNlMTc3IiwidG90YWwiOiIzLjMzMzI0MzYwMTIxOTE4M2UxNzciLCJiZXN0IjoiMy4zMzMyNDM2MDEyMTkxODNlMTc3IiwicmVzZXRUaW1lIjozOTAuMDY5MzE4NDE3MjE5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwyMSwyMiwyMywyNCwzMSw0MSw1Miw1MSw1Myw1NCw2MSw3MV0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJwYSI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjA4NDMuMjQ0MzkzNjI0OTIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm5ld3NBcnJheSI6W119")
            },
            style() {
                return {
                    'background-color': tmp.pa.color,
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
"blank",
"blank",
["display-text", () =>    (hasUpgrade("s",53)) ? "You have "+format(player.s.affinityPoints)+" Affinity Points.":""],
"blank",
"blank",
["display-text", () =>    (hasUpgrade("s",91)) ? "You have "+format(player.s.furtherPoints)+" Further-Exponent Points.":""], 
"blank",
"blank",
["display-text", () =>    (hasUpgrade("s",91)) ? "You have "+format(player.s.furtherCoins)+" Further-Exponent Coins.":""],
"blank",
"blank",
["display-text", () =>    (player.pa.unlocked) ? "You have "+format(player.pa.points)+" Pashtocha Points.":""],
"blank",
"blank",
["display-text", () =>    (player.pa.unlocked) ? "You have reached "+format(player.truck.pointsinTrucking)+" points while Trucked Up.":""],
    ],
 
})

