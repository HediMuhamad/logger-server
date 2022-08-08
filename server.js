const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")

dotenv.config();
const app = express();
const jsonParser = bodyParser.json();
let n = 0;

const logFile = fs.createWriteStream('logs.log', {
	autoClose: true,
	flags: "a"
})


function configNumberPrefix(x, n){ 
	const xLength = (x+"").length;
	const difference = n-xLength;
	
	return difference<=0 ? x : "0".repeat(difference)+x;
}



function log(logMsg){
	
	const date = new Date();
	const dateInHumanFormat = date.toDateString().toString().replace(' ', ', ') 
	const h=configNumberPrefix(date.getHours(), 2), 
	m=configNumberPrefix(date.getMinutes(), 2),
	s=configNumberPrefix(date.getSeconds(), 2),
	ms=configNumberPrefix(date.getMilliseconds(), 3);
	
	const clockInHumanFormat = `${h}:${m}:${s}:${ms}`;
	
	const logMsgString = Object.keys(logMsg).reduce((p, key, i)=>{
		const newField = `[${key}: ${logMsg[key]}]`
		const link = i===0 ? "" : "-";
		return (p + link + newField);
	}, "")
	
	const logOutput = 
	`[#${n++}]-` +
	`[${dateInHumanFormat} ${clockInHumanFormat}]: ` +
	logMsgString;
	
	logFile.write(logOutput+"\n");
	console.log(logOutput);
}

app.post("/", jsonParser, (req, res)=>{
	log(req.body);
	res.send("true");
})

const PORT = process.env.LOGGER_PORT || 9000;
app.listen(PORT, ()=>{
	console.log(`SERVER STARTED AT PORT #${PORT}`);
})