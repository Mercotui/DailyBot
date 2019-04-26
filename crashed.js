#!/usr/bin/env node

const crashcount = require("./crashed.json")
const fs = require('fs');

crashcount.crashcount = crashcount.crashcount + 1;
let data = JSON.stringify(crashcount, null, 2);
fs.writeFile('crashed.json', data, err => {});
