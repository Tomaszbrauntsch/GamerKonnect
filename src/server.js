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
//Building Cookies
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.static('csgojson'));
app.use(express.static('scripts'));
app.use(express.static('static'));
app.use(express.static('images'));
app.use(express.static('templates'));

app.use(bodyParser.urlencoded({ extended: true }));

//Folders to be used from localhost directory to server

//
//SIGNUP FOR CSGO
//
/*
TODO:
Work on building a cookie that tells you the status of the loading, of how the
backend is going. If it is process, good or failed
*/
var status = '';
var aboutMe;
app.post('/csgosignup', (req, res) => {
  //building aboutMe Cookie
  var steamid = req.body.steamid;
  var aboutMe = req.body.aboutMe;
  status = 'processing';
  var username = '';
  const siteUrl = "https://csgo-stats.com/player/" + steamid;
  console.log(`${siteUrl}`);

  axios.get(siteUrl)
  .then(response => {
    let getData = html => {
      siteInfo = [];
      const $ = cheerio.load(html);
      $('div.player-profile-banner div.banner').each((i, elem) => {
        siteInfo.push({
          steamid : steamid,
          username : $('div.upper div.row div.col-xs-8 div.title-card h1.steam-name').text(),
          image : $('div.upper div.row div.col-xs-8 div.avatar img.img-avatar').attr('src'),
          rank : $('div.lower div.row div.col-xs-4 span.rank-name').text(),
          aboutMe : aboutMe
    });
  });
  userinfo = siteInfo;
  let data = JSON.stringify(userinfo);
  data = `data = '${data}';`
  fs.writeFileSync(`csgojson/${steamid}.json`, data);
  status = 'success';
  console.log(userinfo);
  }

  getData(response.data);
  })

  .catch(error => {
    status = 'failed';
    console.log(error);
  })
});

app.get('/processingstatus', function(req, res){
  res.send(status);
});
//
//LOGIN FOR CSGO
//

app.post('/csgologin', (req, res) => {
  steamid = req.body.steamid;
  console.log(`${steamid}`);
  res.cookie("steamid", steamid);
  //res.cookie("aboutMe", aboutMe);
  //Gets path for html file and opens it up
  path = __dirname + '/csgojson/'
  res.sendFile(__dirname + '/templates/demo.html');
});


const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
