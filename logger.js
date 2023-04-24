const pinoms = require("pino-multi-stream");
const path = require("path");
const fs = require("fs");

const date = new Date(Date.now());
const logDir = path.join(__dirname, "logs");

const consoleStream = process.stdout;
const fileStream = fs.createWriteStream(
  path.join(logDir, `${date.toDateString()}.log`)
);
const streams = [{ stream: fileStream }, { stream: consoleStream }];

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

module.exports = pinoms({
  streams: streams,
  timestamp: () => `,"Time":"${new Date(Date.now()).toUTCString()}"`,
});
