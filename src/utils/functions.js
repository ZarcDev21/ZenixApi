const fetch = require("node-fetch");
const moment = require("moment");

async function fetchJoke(type) {
  const data = await fetch(`https://some-random-api.ml/others/${type}`).then(
    (d) => d.json()
  );

  return {
    joke: data.joke,
  };
}

module.exports = {
  fetchJoke,
};