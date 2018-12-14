'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function (req, res) {
	res.sendfile("index.html");
})

// Tell our app to listen on port 3000
app.listen(3000, function (err) {
  if (err) {
    throw err
  }

  console.log('Server started on port 3000')
})
