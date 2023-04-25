const pinoms = require("pino-multi-stream");
const path = require("path");
const fs = require("fs");

const date = new Date(Date.now());

const logOnFile = false;
const logOnConsole = true;
const streams = [];

if (logOnFile) {
  const logDir = path.join(__dirname, "logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  const fileStream = fs.createWriteStream(
    path.join(logDir, `${date.toDateString()}.log`)
  );
  streams.push({ stream: fileStream });
}

if (logOnConsole) {
  const consoleStream = process.stdout;
  streams.push({ stream: consoleStream });
}

module.exports = pinoms({
  streams: streams,
  timestamp: () => `,"Time":"${new Date(Date.now()).toUTCString()}"`,
});
