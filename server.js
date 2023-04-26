const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const logger = require("./logger.js");
const ipBlocker = require("./middlewares/ip-blocker.js");

const app = express();
const jsonParser = bodyParser.json();

app.use(ipBlocker([process.env.ALLOWED_IP], []));

app.post("/", jsonParser, (req, res) => {
  logger.info({ recieved: req.body });
  res.sendStatus(200);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  logger.info({ message: `SERVER STARTED AT PORT #${PORT}` });
});
