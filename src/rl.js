//tomaszbrauntsch worked on csgo webscrape and initialized idea on working
//express for starting app
//bodyparser to parse body
const express = require('express');
const bodyParser = require('body-parser');

//webscraping
const axios = require("axios");
const cheerio = require('cheerio');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/rocketleague', (req, res) => {
  var steamid = req.body.steamid;
  var username = '';
  const siteUrl = "https://rlstats.net/profile/Steam/" + steamid;
  console.log(`${siteUrl}`);

  axios.get(siteUrl)
  .then(response => {[=]
    let getData = html => {
      data = [];
      const $ = cheerio.load(html);
      $('div.player-profile-banner div.banner').each((i, elem) => {
        data.push({
          steamid : steamid,
          username : $('header.header section.lookup section.userinfo div.block h1 img').text(),
          image : $('div.block-body img.user-img').attr('src'),
          rank : $('div.titles div.block-club section.stats div.btn-group div.block div.block-body div.fullwidth h2').text()
    });
  });
  console.log(data);
  }
  getData(response.data)
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
