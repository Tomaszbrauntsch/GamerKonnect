//tomaszbrauntsch worked on csgo webscrape and initialized idea on working
//express for starting app
//bodyparser to parse body
const express = require('express');
const bodyParser = require('body-parser');
//webscraping
const axios = require("axios");
const cheerio = require('cheerio');
//json file saving
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/csgologin', (req, res) => {
  var steamid = req.body.steamid;
  console.log(`${steamid}`);
});
//Below is used for running not for work
const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
