var https = require("https");
var fs = require("fs");
var path = require("path");

require("dotenv").config();

var modules = {};
var dist = path.resolve('./dist');

//loop through /dist files and create a string with each on the 'modules' object

const dir = fs.readdirSync(dist);
dir.forEach(filename => {
  const fullPath = path.resolve(dist, filename);

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  filename = filename.split('.');
  filename.pop();
  filename = filename.join('.');

  modules[filename] = fileContents.toString();
});

var data = {
  branch: process.env.BRANCH,
  modules,
};

var req = https.request({
  hostname: "screeps.com",
  port: 443,
  path: "/api/user/code",
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-Token": process.env.TOKEN
  },
}, res => {
  res.on('data', (d) => {
    console.log(d.toString());
  });
});

req.write(JSON.stringify(data));
req.end();