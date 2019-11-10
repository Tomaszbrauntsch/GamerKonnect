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

app.post('/csgosignup', (req, res) => {
  var steamid = req.body.steamid;
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
          rank : $('div.lower div.row div.col-xs-4 span.rank-name').text()
    });
  });
  userinfo = siteInfo
  let data = JSON.stringify(userinfo);
  fs.writeFileSync(`csgojson/${steamid}.json`, data);
  console.log(userinfo);
  }
  getData(response.data);
  })

  .catch(error => {
    console.log(error);
  })

});
//Below is used for running not for work
const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
