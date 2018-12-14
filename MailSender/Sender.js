'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var checkStats = "Not Posted";


app.use(bodyParser.urlencoded({ extended: false }))

// Route that receives a POST request to /sms
app.post('/mailsender', function (req, res) {
	checkStats = "Ready";
	let userForm = req.body;

	const nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: "brian.shisanya2000@gmail.com",
	        pass: "******"
	    }
	});

	checkStats = "Sending";
	transporter.sendMail({
	  from: ""+userForm.Subject+" <"+userForm.From+">",
	  to: "brian.shisanya2000@gmail.com",
	  subject: userForm.Subject,
	  html: "<h3 style=\"color:green;\">"+userForm.Date+"</h3><hr><br><p>"+userForm.Message+"</p><br><br><br><br><br>Message End"
	}, function(error, info){
	    if(error){
	        console.log(error);
	        checkStats = "Failed";
	    }else{
	        console.log('Message sent: ' + info.response);
	         checkStats = "Success";
	    }
	});
})

app.get('/reponse',function(req,res){
	 res.jsonp('{ "Status":"'+checkStats+'" }');

	 if (checkStats == "Failed" || checkStats == "Success") {checkStats = "Not Posted";}
	console.log("Get_Active");
})

// Tell our app to listen on port 3000
app.listen(process.env.PORT || 8080, function (err) {
  if (err) {
    throw err
  }

  console.log('Server started on port 8080')
})
