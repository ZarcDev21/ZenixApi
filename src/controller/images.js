const { Canvas } = require('canvas-constructor')
const canvas = require('canvas')
const jimp = require('jimp')

exports.ad = async (req, res, next) => {
  try {
    const bg = await canvas.loadImage('https://media.discordapp.net/attachments/1037289023854612554/1049318021350563840/ad.png')

    if (!req.query.image) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'no image was provide.'
      })
      return next()
    }

    const pngChecker = req.query.image.endsWith('.png')
    const jpgChecker = req.query.image.endsWith('.jpg')

    if (req.query.image.endsWith('.png') === true) {
      const logo = await canvas.loadImage(req.query.image)

      const image = new Canvas(550, 474)
        .printImage(logo, 150, 75, 230, 230)
        .printImage(bg, 0, 0, 550, 474)
        .toBuffer()

      res.set({ 'Content-Type': 'image/png' })
      res.send(image)
    } else if (req.query.image.endsWith('.jpg') === true) {
      const logo = await canvas.loadImage(req.query.image)

      const image = new Canvas(550, 474)
        .printImage(logo, 150, 75, 230, 230)
        .printImage(bg, 0, 0, 550, 474)
        .toBuffer()

      res.set({ 'Content-Type': 'image/jpg' })
      res.send(image)
    } else {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'only jpg or png type of images are allowed.'
      })
      return next()
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error
    })
  }
}


exports.gay = async (req, res, next) => {
  try {
    const bg = await canvas.loadImage('https://media.discordapp.net/attachments/1037289023854612554/1049318020843049041/gay.png')

    if (!req.query.image) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'no image was provide.'
      })
      return next()
    }

    if (req.query.image.endsWith('.png') === true) {
      const logo = await canvas.loadImage(req.query.image)

      const image = new Canvas(500, 500)
        .printImage(logo, 0, 0, 500, 500)
        .printImage(bg, 0, 0, 500, 500)
        .toBuffer()

      res.set({ 'Content-Type': 'image/png' })
      res.send(image)
    } else if (req.query.image.endsWith('.jpg') === true) {
      const logo = await canvas.loadImage(req.query.image)

      const image = new Canvas(500, 500)
        .printImage(logo, 0, 0, 500, 500)
        .printImage(bg, 0, 0, 500, 500)
        .toBuffer()

      res.set({ 'Content-Type': 'image/jpg' })
      res.send(image)
    } else {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'only jpg or png type of images are allowed.'
      })
      return next()
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error
    })
  }
}
