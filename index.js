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
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// timestamp date (yyyy-mm-dd)
app.get("/api/:date?", (req, res) => {
  // vars
  const getDate = req.params.date;
  let date;
  let unix;

  // check date
  // current date
  if (!getDate) {
    date = new Date();
  
  // not integer 
  } else if (!isNaN(getDate)) {
    date = new Date(parseInt(getDate));
  } else {
  
  // get date
    date = new Date(getDate);
  }

  // check formatting/ if input is a date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // get unix
  unix = date.getTime();

  // return json 
  res.json({unix: unix, utc: date.toUTCString()});
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
