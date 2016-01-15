/* Written by Martin Hammerchmidt.
 * Fields : - name
 			- email
 			- options
 			- text
 			- budget
 */

var Email = require('email').Email;

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var settings = require('./settings.json');

function generateMailContent(data)
{
	var text;
	text += '<b>Name:</b> ' + data.name;
	text += '<br><b>Email:</b> ' + data.email;
	text += '<br><b>Options:</b> ' + data.options;
	text += '<br><br><b>Message:</b> ' + data.text;
	text += '<br><br><b>Budget:</b> ' + data.budget;
	return text;
}

app.post('/submit', function(req, res)
{
	res.send('ok');
	var mailContent = generateMailContent(req.body);

	var msg = new Email(
	{
		from: 'no-reply@vanila.io',
		to: settings.receiver,
		subject: '[VANILA] New message',
		body: mailContent,
		bodyType: 'html'
	});

	msg.send(function(err)
	{
		if(err)
			console.log(err);
		else
			console.log('Mail sended!');
	})
});

app.listen(settings.port);