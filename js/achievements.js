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
        41: {
            name: "New Layer Awaits?",
            done() { return player.s.unlocked },
            tooltip: "Reset for Sectors.",
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
            done() { return player.s.pointsInCheeseburger.gte("1e600")},
            tooltip: "Reach 1e600 points while in TMT's Mighty Cheeseburger challenge. <small>Reward: Sector gain is multiplied by 8, and unlock a new set of Willy upgrades.</small>",
            unlocked() {return player.s.unlocked},
    
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
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTczOTI5NzIzNDE1OCwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJURVRSZXdyaXQiLCJ2ZXJzaW9uIjoiMS4xIiwidGltZVBsYXllZCI6NTUzNy4yNDk3NTMzMTM3MDc1LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJoaWRlTmV3cyI6ZmFsc2UsInBvaW50cyI6IjEuNzEyNTI1MDMxNjUzNDYzN2UxMTQyIiwic3VidGFicyI6eyJjaGFuZ2Vsb2ctdGFiIjp7fSwiaWMiOnsibWFpblRhYnMiOiJDaGFsbGVuZ2VzIn0sInMiOnsibWFpblRhYnMiOiJTdGVhbCBUTVQncyBDaGVlc2VidXJnZXIiLCJkaXNrIjoiUGFydGl0aW9ucyJ9fSwibGFzdFNhZmVUYWIiOiJzIiwibmV3c1RvdGFsIjoiMTE3NTIiLCJpbmZvYm94ZXMiOnt9LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjU1MzcuMjQ5NzUzMzEzNzA3NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjU1MzcuMjQ5NzUzMzEzNzA3NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTUzNy4yNDk3NTMzMTM3MDc1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImV4Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzMDUiLCJleHBQb2ludHMiOiI1LjE3Njc1NTg3NTAxNDY1NmUxMDA0IiwidG90YWwiOiIzMDUiLCJiZXN0IjoiMzA1IiwicmVzZXRUaW1lIjo2MS4zMDUwMDAwMDAwMDAxMywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI3MCIsIjEyIjoiMjIiLCIxMyI6IjcifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDE2LDE3LDIxLDIyLDIzLDI0LDI1LDI2LDI3LDMxLDExXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImljIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzLjE0MjkwMzAyMDk4ODg4OTdlNDQzIiwiZW5lcmd5IjoiNC44ODIwOTY4MTA0Mzk0ODdlMjMiLCJ1bmlEaW1JTHZsIjoiMi44MjEyNjczOTE1NDkxOTZlMjEiLCJ1bmlEaW1JSUx2bCI6IjY3NDQuODAzOTk5OTk5OTQ0IiwiZWxlbWVudHMiOiIxLjgzMjMzMTE0MDEwOTkxNjNlNTgiLCJlbGVtZW50c0RpbUlMdmwiOiI0LjU3OTQzMzAwMzUwNTEyODVlMjEiLCJlbGVtZW50c0RpbUlJTHZsIjoiNzUwNy4zMjUwMDAwMDAwNDQiLCJ0b3RhbCI6IjMuMTQyOTAzMDIwOTg4ODg5N2U0NDMiLCJiZXN0IjoiMy4xNDI5MDMwMjA5ODg4ODk3ZTQ0MyIsInJlc2V0VGltZSI6NjEuMzA1MDAwMDAwMDAwMTMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMjAiLCIxMiI6IjM4IiwiMTMiOiIzIiwiMjEiOiI0MzkiLCIyMiI6IjI5OCIsIjIzIjoiMTExIiwiMzEiOiIxNDUiLCIzMiI6IjEwNSIsIjMzIjoiMTMwIiwiNDEiOiI5IiwiNDIiOiI5IiwiNDMiOiI4IiwiNDQiOiI2IiwiNDUiOiI2IiwiNTEiOiIyIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMiwxMywxMSwxNCwxNSwxNiwxNywyMSwyMiwyMywyNCwyNSwyNiwyNywzMSwzMiwzMywzNCwzNSwzNiwzNywxMywxNF0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjoxLCIxMiI6MSwiMTMiOjEsIjIxIjoxfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJvIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxODUiLCJ0b3RhbCI6IjE4NSIsImJlc3QiOiIxODUiLCJyZXNldFRpbWUiOjYxLjMwNTAwMDAwMDAwMDEzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMjg0NTI0NDc1NDgwLjYxNDE0IiwidG90YWwiOiIyODQ1MjQ0NzU0ODAuNjE0MTQiLCJiZXN0IjoiMjg0NTI0NDc1NDgwLjYxNDE0IiwicmVzZXRUaW1lIjo2MS4zMDUwMDAwMDAwMDAxMywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI2IiwiMTIiOiI0IiwiMTMiOiI0IiwiMTQiOiIzIiwiMTUiOiIzIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMTI0MTgiLCJiZXN0IjoiMTI0MTgiLCJ0b3RhbCI6IjUyMDUiLCJleHBhbnNpb24iOiIxMTEiLCJjb3JydXB0aW9uIjoiMTgiLCJyZXNldFRpbWUiOjYxLjMwNTAwMDAwMDAwMDEzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjExIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwxNiwyMSwyMiwyMywyNCwyNSwyNiwyNywzMSwzMiwzMywzNCwzNV0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjowfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJjaGVlc2VidXJnZXJzIjoiMCIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEuNzcyODY3OTIyNTU1OTc5ZTQ4IiwidG90YWwiOiIxLjc3Mjg2NzkyMjU1NTk3OWU0OCIsImJlc3QiOiIxLjc3Mjg2NzkyMjU1NTk3OWU0OCIsInJlc2V0VGltZSI6NjEuMzA1MDAwMDAwMDAwMTMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDIxLDIyLDI0LDIzLDMxLDQxLDUxLDUyLDUzLDU0LDYxLDcxXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTUzNy4yNDk3NTMzMTM3MDc1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTUzNy4yNDk3NTMzMTM3MDc1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImFjaCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo1NTM3LjI0OTc1MzMxMzcwNzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIyMSIsIjIyIiwiMTUiLCIyMyIsIjMxIiwiMzIiLCIyNCIsIjQxIiwiMTYiLCIzMyIsIjQyIiwiMzQiLCIyNSIsIjQzIiwiMjYiLCIzNSJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2IiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTUzNy4yNDk3NTMzMTM3MDc1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIiwiMTQiOiIiLCIyMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIndpIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJjb29raWVzIjoiMTAwMDAwMDAiLCJyZXNldFRpbWUiOjU1MzcuMjQ5NzUzMzEzNzA3NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDE0LDE1LDEzLDE2XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJuZXdzQXJyYXkiOltdfQ==")
            },
            style() {
                return {
                    'background-color': tmp.s.color,
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
["display-text", () =>    (player.c.unlocked) ? "You have "+format(player.c.points)+" Willy Cookies.":""],
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

