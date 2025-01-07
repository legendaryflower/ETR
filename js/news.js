"use strict"; // credit to Yahtzee Master#0168
let ticker = document.getElementById("newsContent");
let tickerContainer = document.getElementById("newsTicker"); // ticker is the text element, tickerContainer is... the thing that contains ticker

let newsPosition = -1e100; // hopefully noones screen is this big

function tickNews() {
  if (player) {
  if (!player.hideNews) {
  newsPosition -= 3;
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
  ["Chancemakers are actually gamblers. This is because they just always get too lucky, defeating gamblers that lose 99% of the time before they win big."],
  ["This is what a 5 year old kid will say this: WE GOT EXPONENT TREE REWRITTEN UPDATE BEFORE GTA 6!1!1!1!!!11!!."],
  ["I ate a burrito and it redirected me to meatspin - By some random guy. How can you get redirected into meatspin by just eating a burrito? ??? No answer"],
  ["Don't click on an elephant."],
  ["Rickrolling seems to be too popular now, maybe let's do alternative rickroll. Onlyroll! You can use this for $0.99/month in a commerical use. Personal use is free."],
  ["e"],
  ["1.246F1,761 stats sounds what a simple modder will encounter."],
  ["*PUKES* I SAW AN UGLY FLY TODAY"],
];
setTimeout(() => {
  ticker = document.getElementById("newsContent");
  tickerContainer = document.getElementById("newsTicker");
  setInterval(tickNews, 15);
}, 150);