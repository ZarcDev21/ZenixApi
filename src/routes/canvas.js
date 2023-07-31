const { Router } = require("express");
const { loadImage, createCanvas, registerFont } = require("canvas");
const jimp = require("jimp");
const route = Router();

route.get("/gay", async (req, res) => {
  let imgUrl = req.query.image;
  if (!imgUrl)
    return res.json({
      error: true,
      message: "missing image query",
    });
  let bg = await loadImage(`./src/assets/canvas/gay.png`);
  let img = await loadImage(imgUrl);
  const canvas = createCanvas(480, 480);
  const ctx = canvas.getContext(`2d`);
  ctx.drawImage(img, 0, 0, 480, 480);
  ctx.drawImage(bg, 0, 0, 480, 480);
  res.set({ "Content-Type": "image/png" });
  res.status(200).send(canvas.toBuffer());
});


route.get("/ad", async (req, res) => {
  let imgUrl = req.query.image;
  if (!imgUrl)
    return res.json({
      error: true,
      message: "missing image query",
    });
  let bg = await loadImage(`./src/assets/canvas/ad.png`);
  let img = await loadImage(imgUrl);
  const canvas = createCanvas(550, 474);
  const ctx = canvas.getContext(`2d`);
  ctx.drawImage(img, 150, 75, 230, 230);
  ctx.drawImage(bg, 0, 0, 550, 474);
  res.set({ "Content-Type": "image/png" });
  res.status(200).send(canvas.toBuffer());
});


route.get("/fail", async (req, res) => {
  let imgUrl = req.query.image;
  if (!imgUrl)
    return res.json({
      error: true,
      message: "missing image query",
    });
  let img;
  try {
    img = await jimp.read(imgUrl);
    img.resize(620, 410)
  } catch (err) {
    return res.json({
      error: true,
      message: "Failed to load this image",
    });
  }
  const bonk = await jimp.read(`./src/assets/canvas/fail.png`);
  bonk.composite(img, 70, 48 )
  res.set({ "Content-Type": "image/png" });
  res.status(200).send(await bonk.getBufferAsync("image/png"));
});

module.exports = {
  endpoint: "/canvas",
  router: route,
};