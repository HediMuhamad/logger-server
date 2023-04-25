const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const logger = require("./logger.js");
const ipBlocker = require("./middlewares/ip-blocker.js");

dotenv.config();
const app = express();
const jsonParser = bodyParser.json();

app.use(ipBlocker([process.env.ALLOWED_IP], []));

app.post("/", jsonParser, (req, res) => {
  console.log(req.ip);
  logger.info({ recieved: req.body });
  res.sendStatus(200);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  logger.info({ message: `SERVER STARTED AT PORT #${PORT}` });
});
