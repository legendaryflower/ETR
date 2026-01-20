"use strict"; // credit to Yahtzee Master#0168
let ticker = document.getElementById("newsContent");
let tickerContainer = document.getElementById("newsTicker"); // ticker is the text element, tickerContainer is... the thing that contains ticker

let newsPosition = -1e100; // hopefully noones screen is this big

function tickNews() {
  if (player) {
  if (!player.hideNews) {
  newsPosition -= 2;
  ticker.style.left = `${newsPosition}px`;

  if (newsPosition < -ticker.offsetWidth) newNewsMessage()};
  }
}

function newNewsMessage() {
  if (!player.hideNews) {
  const newsCandidates = [];
  for (const i in newsArray)
    if (newsArray[i][1] === undefined || newsArray[i][1]())
      newsCandidates.push(newsArray[i][0]);
  player.newsTotal = player.newsTotal.plus(1);
  ticker.innerHTML =
    newsCandidates[Math.floor(newsCandidates.length * Math.random())];
  newsPosition = tickerContainer.offsetWidth;
  ticker.style.left = `${newsPosition}px`};
}
// you can add a second element to each message's array
// the second element is a function that returns a boolean of whether to shown it
const newsArray = [
  ["I don't have a word to say this one..."],
  ["If a folder licks a lemon, it turns into a RAR file."],
  ["This is what a 5 year old kid will say this: WE GOT EXPONENT TREE REWRITTEN UPDATE BEFORE GTA 6!1!1!1!!!11!!."],
  ["I ate a burrito, and it redirected me to meatspin."],
  ["e"],
  ["1.246F1,761 is something related to inflation. Inflation is when like a resource hogs a bunch of stats and then decides to break free and then just inflate into tetrations."],
  ["*PUKES* I SAW AN UGLY FLY TODAY"],
  ["keyboard movement is forever superior"],
    ["Excuse me bro"],
        ["Click here to make nothing happen."],
  ["Aw sheet we got hammered by Google."],
  ["What in tarnation is this"],
    ["Kill a zombie and then watch what just happens."],
      ["there’s no way you can force someone to remove someone’s skin even if they put the same skin on different games"],
        ["'If I don't care about it anymore, why do I not care about it anymore? Because I DONT CARE ABOUT IT ANYMORE' visible confusion 💀"],

            ["Please stop alr."],
         ["🏴‍☠️"],
                  ["bip beep beeeeeeep beep beep beep beep"],
                         ["It's called exponent tree but there are some unrelated things - by a random person"],


    ["They say that someone felt in love in trading so he had to bug the creator to add one. But, this is not an RPG game. That's an incremental game!"],
    ["What killed the dinosaurs? IT'S ICE"],      
      ["So I just heard online that someone is throwing an Intel CPU into a trash can because they think that Intel sucks because of their [CENSORED] issues with one of their CPUs."],      
          ['<h1>I am so big!</h1>'],      
            ['<small>I am so small!</small>'],      
          ["There might be a bee powering your system in the psu, don’t agitate them, you watch out"],         
                    ['<img src="discord.png"> - Yes, you can put an image in the news ticker. Doesn’t matter if it works or not.'],      
];
setTimeout(() => {
  ticker = document.getElementById("newsContent");
  tickerContainer = document.getElementById("newsTicker");
  setInterval(tickNews, 15);
}, 150);