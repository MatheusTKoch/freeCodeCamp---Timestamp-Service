// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res, err) {
  const date = req.params.date;
  const dateNowString = new Date().toUTCString();
  const dateNow = Date.now();
  if(!date) {
    res.json({"unix": dateNow, "utc": dateNowString});
  }
  if (date.length <= 11 && new Date(date).toUTCString() === 'Invalid Date'
  || date.length >= 13 && new Date(parseInt(date)).toUTCString() === 'Invalid Date') {
    res.json({"error": "Invalid Date"});
  }
  if(date.length <= 11) {
    res.json({ "unix": Date.parse(date), "utc": new Date(date).toUTCString() })
  }
  if(date.length == 13) {
    res.json({ "unix": Number(date), "utc": new Date(parseInt(date)).toUTCString() })
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
