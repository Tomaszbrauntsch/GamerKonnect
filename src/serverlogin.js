//tomaszbrauntsch worked on csgo webscrape and initialized idea on working
//express for starting app
//building cookies
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('csgojson'));

var steamid;
app.post('/csgologin', (req, res) => {
  steamid = req.body.steamid;
  console.log(`${steamid}`)
  res.cookie("steamid", steamid);
  //Gets path for html file and opens it up
  path = __dirname + '/csgojson/'
  res.sendFile(__dirname + '/templates/demo.html');
});

app.get('/userData', (req, res)=>{
  res.send(req.cookies);
  console.log(req.cookies);
});
//Below is used for running not for work
const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
