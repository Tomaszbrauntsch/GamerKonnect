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
var email = '';
var password = '';
app.post('/registration', (req, res) => {
  email = req.body.email;
  password = req.body.password;
  console.log("email: " + `${email}` + "  password: " + `${password}`);
  res.sendFile(__dirname + '/templates/signup.html');
});


var status = '';
var aboutMe;
app.post('/sid', (req, res) => {
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
          email : email,
          password : password,
          steamid : steamid,
          username : $('div.upper div.row div.col-xs-8 div.title-card h1.steam-name').text(),
          image : $('div.upper div.row div.col-xs-8 div.avatar img.img-avatar').attr('src'),
          rank : $('div.lower div.row div.col-xs-4 span.rank-name').text(),
          aboutMe : aboutMe,
          accepted: null,
          rejected: null
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
  fs.readdirSync('csgojson').forEach(file =>{
    email = req.body.email;
    password = req.body.password;
    const fileContents = fs.readFileSync(__dirname + '/csgojson/' + file, 'utf8')
    var parsedata = fileContents.substr(8);
    parsedata = parsedata.replace(/}]\';/, '}]');
    data = JSON.parse(parsedata);
    console.log("useremail:" + email + "  databaseEmail:" + data[0].email);
    console.log("userpassword:" + password + "  databasePassword:" + data[0].password);
    if (email == data[0].email && password == data[0].password){
      res.cookie("steamid", data[0].steamid);
      res.cookie("aboutMe", data[0].aboutMe);
      res.sendFile(__dirname + '/templates/demo.html');
    }
  });
  if(email != data[0].email && password != data[0].password){
    res.send("You have entered the wrong email and/or password, please try again!");
  }
});


const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
