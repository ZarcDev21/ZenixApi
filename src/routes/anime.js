const { Router } = require("express");
const fetch = require("node-fetch")
const axios = require("axios");
const route = Router();
const punch = require("../assets/json/punch.json");
const hug = require("../assets/json/hug.json")
const slap = require("../assets/json/slap.json")

route.get("/quote", async (req, res) => {
  const rese = await fetch("https://katanime.vercel.app/api/getrandom").then((reses) =>
    reses.json()
  );

  return res.json(rese);
});

 route.get("/hug", (req, res) => {
  return res.json({
    url: hug[Math.floor(Math.random() * hug.length)],
  });
});


 route.get("/slap", (req, res) => {
  return res.json({
    url: slap[Math.floor(Math.random() * slap.length)],
  });
});


route.get("/pat", async (req, res) => {
  const rese = await fetch("https://api.waifu.pics/sfw/pat").then((reses) =>
    reses.json()
  );

  return res.json(rese);
});


route.get("/wave", async (req, res) => {
  const rese = await fetch("https://api.waifu.pics/sfw/wave").then((reses) =>
    reses.json()
  );

  return res.json(rese);
});

route.get("/punch", (req, res) => {
  return res.json({
    url: punch[Math.floor(Math.random() * punch.length)],
  });
});


module.exports = {
  endpoint: "/anime",
  router: route,
};
