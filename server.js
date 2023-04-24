const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./logger.js");

dotenv.config();
const app = express();
const jsonParser = bodyParser.json();

app.use(cors());

app.post("/", jsonParser, (req, res) => {
  logger.info({ user: req.user, body: req.body });
  res.sendStatus(200);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  logger.info({ message: `SERVER STARTED AT PORT #${PORT}` });
});
