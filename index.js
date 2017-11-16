/* Written by Martin Hammerchmidt.
 * Fields : - name
 			- email
 			- options
 			- text
 			- budget
 */

const Email = require("email").Email;
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const settings = require("./settings.json");

function prettyFormating(data) {
	let text = "";
	text += data;
	return text.replace(",", ", ");
}

function generateMailContent(data) {
	let text = "";
	text += "<!DOCTYPE><html><body>";
	text += `<b>Name:</b> ${data.name}`;
	text += `<br><b>Email:</b> ${data.email}`;
	text += `<br><b>Options:</b> ${prettyFormating(data.options)}`;
	text += `<br><br><b>Message:</b> ${data.text}`;
	text += `<br><br><b>Budget:</b> $${data.budget}`;
	text += "</body></html>";
	return text;
}

app.post("/mail/submit", ({ body }, res) => {
	const mailContent = generateMailContent(body);

	const msg = new Email({
		from: settings.from,
		to: settings.receiver,
		replyTo: body.email,
		subject: `[${settings.domain} - new message] - ${prettyFormating(
			body.options
		)} - $${body.budget}`,
		body: mailContent,
		bodyType: "html"
	});

	msg.send(err => {
		if (err) {
			console.log(err);
			res.send("not ok");
		} else {
			console.log("Mail sent!");
			res.send("ok");
		}
	});
});

app.get("/", (req, res) => {
	res.send("server working");
});

app.listen(settings.port);
