const { Router } = require("express");
const route = Router()
const fetch = require("node-fetch")
const { fetchJoke } = require("../utils/functions");

route.get("/joke", async (req, res) => {
  const d = await fetchJoke("joke");

  return res.json(d);
});


route.get("/dadjoke", async (req, res) => {
  const rese = await fetch("https://icanhazdadjoke.com/slack").then((reses) =>
    reses.json()
  );

  return res.json(rese);
});

route.get("/meme", async (req, res) => {
  const rese = await fetch("https://meme-api.com/gimme").then((reses) =>
    reses.json()
  );

  return res.json(rese);
});


module.exports = {
  endpoint: "/joke",
  router: route,
};