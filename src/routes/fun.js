const { Router } = require("express");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const route = Router();
const eightball = require("../assets/json/8ball.json");
const papkitsu = require("../assets/json/papkitsu.json");
const roast = require("../assets/json/roast.json");
const gombal = require("../assets/json/gombal.json");
const yomama = require("../assets/json/yomama.json");
const { facts } = require("../assets/js/facts");
const quotes = require("../assets/json/quotes.json");


route.get("/wyr", async (req, res) => {
  const data = await fetch("http://either.io").then((resp) => resp.text());
  const $ = cheerio.load(data);

  const wyr = String($('div[class="option"] a').text()).split("\n");
  const votes = [
    Number(
      $(
        'div[class="result result-1"] div[class="total-votes"] span[class="count"]'
      )
        .html()
        .replace(/,+/g, "")
    ),
    Number(
      $(
        'div[class="result result-2"] div[class="total-votes"] span[class="count"]'
      )
        .html()
        .replace(/,+/g, "")
    ),
  ];
  const total_votes = Number(
    $('span[class="contents"]').text().split(" votes")[0].replace(/,+/g, "")
  );
  const percentage = [
    ((votes[0] / total_votes) * 100).toFixed(2),
    ((votes[1] / total_votes) * 100).toFixed(2),
  ];
  const author = $('span[id="question-author"] a').text();

  return res.json({
    questions: [wyr[1].trim(), wyr[2].trim()],
    votes: {
      1: votes[0],
      2: votes[1],
    },
    percentage: {
      1: percentage[0],
      2: percentage[1],
    },
    author: author,
  });
});


route.get("/8ball", (req, res) => {
  return res.json({
    answer: eightball[Math.floor(Math.random() * eightball.length)],
  });
});

 route.get("/papkitsu", (req, res) => {
  return res.json({
    pap: papkitsu[Math.floor(Math.random() * papkitsu.length)],
  });
});

route.get("/fact", (req, res) => {
  const fact = facts[Math.floor(Math.random() * facts.length)];

  return res.json({ fact: fact });
});


route.get("/roast", (req, res) => {
  return res.json({
    roast: roast[Math.floor(Math.random() * roast.length)],
  });
});


route.get("/gombal", (req, res) => {
  return res.json({
    kata: gombal[Math.floor(Math.random() * gombal.length)],
  });
});


route.get("/en/quote", async (req, res) => {
  const rese = await fetch("https://api.popcat.xyz/quote").then((reses) =>
    reses.json()
  );

  return res.json(rese);
});

route.get("/yomama", (req, res) => {
  return res.json({
    yomama: yomama[Math.floor(Math.random() * yomama.length)],
  });
});

route.get("/id/quote", (req, res) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return res.json({
    author: quote.author,
    quotes: quote.quotes,
  });
});
     
module.exports = {
  endpoint: "/fun",
  router: route,
};
