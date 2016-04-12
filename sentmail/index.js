'use strict';
var config = require('./../config');
var Firebase = require('firebase');
var nodemailer = require('nodemailer');


module.exports = function(){
	/*-----------Contact Us Email---------------*/
	var contactRef = config.fireBaseUrl + 'contactUs/';
	contactRef = new Firebase(contactRef);
	contactRef.on('child_added', function(row){		
		var data = row.val();
		var key = row.key();
		if(data.sent == true){
			return true
		}else{
			contactRef.child(key).update({
				sent:true
			})
			
			//send email
			var transporter = nodemailer.createTransport(config.smtpConfig);
			
			// setup e-mail data with unicode symbols 
			var mailOptions = {
				from: '"' + data.firstName  + ' ' + data.lastName + '" <' + data.email + '>', // sender address 
				to: config.mailTo, // list of receivers 
				subject: data.title, // Subject line 
				text: data.content, // plaintext body 				
			};
			
			// send mail with defined transport object 
			transporter.sendMail(mailOptions, function(error, info){
				if(error){
					return console.log(error);
				}
				console.log('Message sent: ' + info.response);
			});
			
		}
	})

	/*-----------Notification  Email---------------*/
	var emailRef = config.fireBaseUrl + 'contactUs/';
	emailRef = new Firebase(emailRef);
	emailRef.on('child_added', function(row){		
		var data = row.val();
		var key = row.key();
		var transporter = nodemailer.createTransport(config.smtpConfig);
		// setup e-mail data with unicode symbols 
		var mailOptions = {
			from: config.notificaitonFormEmail, // sender address 
			to: data.toEmail, // list of receivers 
			subject: data.title, // Subject line 
			html: data.content, // plaintext body 				
		};
		// send mail with defined transport object 
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				return console.log(error);
			}
			console.log('Message sent: ' + info.response);
			emailRef.child(key).remove();
		});		
	})
}