const { Router } = require("express");
const route = Router();
const fetch = require("node-fetch");

route.get("/covid", async (req, res) => {
  const rese = await fetch("https://disease.sh/v3/covid-19/all").then((reses) =>
    reses.json()
  );

  return res.json(rese);
});

route.get("/gempa", async (req, res) => {
  const rese = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json").then((reses) =>
    reses.json()
  );

  return res.json(rese);
});

module.exports = {
  endpoint: "/info",
  router: route,
};
