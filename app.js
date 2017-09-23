var fs = require('fs');
var csv = require('csvtojson');
var nodeMailerModule = require('nodemailer');
var ses = require('node-ses')
  , client = ses.createClient({ key: 'xxxxxxxxxxxxxxxxxxxxxx', secret: 'xxxxxxxxxxxxxxxxx/x' });
var ejs = require('ejs');
var file = 'studentList.csv'
var jsonArray = []
var template = './emailTemplate.ejs';

var csvStream = csv()
	.fromFile(file)
	.on('json',(jsonObj)=>{
		jsonArray.push(jsonObj)
	})
	.on('done',(error)=>{
	    console.log('end')
	    sendEmail(jsonArray);
	})

	function sendEmail(jsonArray) {
		console.log(jsonArray)
		for(var i = 55; i <jsonArray.length ; i++) {
	 		var data = {
				name: jsonArray[i].Name,
				project: jsonArray[i].Project
			}
	 		
	 		console.log("template",data)
			ejs.renderFile(template, data, function(err, html){
		 		client.sendEmail({
			       to: jsonArray[i].Email,
			       from: 'gaurav.saini@viithiisys.com'
			     , subject: 'Congratulation for Successfully Completing Google Summer of Code',
			     message: html,
			      altText: 'plain text'
			    }, function (err, data, res) {
			        
			     // ...
			    });
			})
		    // ... or build a message from scratch yourself and send it.
		    // client.sendRawEmail({
		    //     from: 'somewhereOverTheR@inbow.com'
		    //  , rawMessage: 'plain text'
		    // }, function (err, data, res) {
		    //  // ...
		    // });
	 	}

	}