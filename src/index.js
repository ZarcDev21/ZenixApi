const express = require("express");
const glob = require("glob");
const logger = require("morgan");
const path = require("path");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const config = require("../config");
app.use(bodyparser.json());

const BASE_URL = config.servers || '';

const loadFiles = async () => {
  let files = glob.sync("./src/routes/*.js");
  files.forEach((route) => {
    const file = require(`${path.resolve(route)}`);
    app.use(`/v1${file.endpoint}`, file.router);
  });
};

//ratelimit
const rateLimit = require("express-rate-limit");
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 minutes
  max: 100,
});

//base
const jokereceh = require("./router/index.js");
const gay = require("./router/index.js")
//endpoint
app.use("/v1/joke", jokereceh);
app.use("/v1/gay", gay)

//middleware
app.set('json spaces', 2)
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);
app.set('views', './public');
app.set('view engine', 'html');
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

//routers
app.get('/', function(req, res) {
  res.sendFile(path.join('public', '/index.html'));
});

app.get('/docs', (req, res) => {
   res.sendFile(__dirname + '/public/docs.html')
})

app.get('/endpoint', (req, res) => {
  return res.status(200).send({
    maintainer: 'Alvin N',
    source: 'not open yet',
    endpoint: {
      quote: {
      englishquote: `${BASE_URL}/v1/fun/en/quote`,
      indonesiaquote: `${BASE_URL}/v1/fun/id/quote`,
      },
      jokes: {
      englishjoke: `${BASE_URL}/v1/joke/joke`,
      Indonesiareceh: `${BASE_URL}/v1/joke/jokereceh`,
      },
    },
  });
});

app.get('/v1', (req, res) => {
  return res.status(200).send({
    maintainer: 'Alvin Nobel',
    source: 'https://github.com/ZarcDev21',
  });
});

//errorhandler


//loadfiles
loadFiles();
app.listen(config.port, function () {
  console.log(`[Running on port: ${config.port}]`);
});
