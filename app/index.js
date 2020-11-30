/* Written by Martin Hammerchmidt.
 * Fields : - name
 			- email
 			- options
 			- text
 			- budget
 */
const port = process.env.PORT || 8001;
const { Email } = require('email');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { nanoid } = require('nanoid');

const settings = require('./settings.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(({ headers }, res, next) => {
  const allowedOrigins = settings.acceptedDomains;
  const { origin } = headers;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Contr1ol-Allow-Credentials', true);
  return next();
});

function prettyFormating(data) {
  let text = '';
  text += data;
  return text.replace(',', ', ');
}

function generateMailContent(id, data) {
  const text = `
	<!DOCTYPE>
	<html>
    <body>
      <b>ID:<b> ${id}
			<b>Name:</b> ${data.name}
			<br><b>Email:</b> ${data.email}
			<br><b>Options:</b> ${prettyFormating(data.options)}
			<br><br><b>Message:</b> ${data.text}
			<br><br><b>Budget:</b> $${data.budget}
		</body>
	</html>`;
  return text;
}

app.post('/mail/submit', async ({ body }, res) => {
  const id = nanoid();

  const mailContent = await generateMailContent(id, body);
  // logging as a backup
  await fs.writeFileSync(`data/${Date.now()}_${id}.html`, mailContent, 'utf-8');

  if (settings.receivers && settings.receivers.length) {
    for (const receiver of settings.receivers) {
      const msg = new Email({
        from: settings.from,
        to: receiver,
        replyTo: body.email,
        subject: `[${settings.domain} - new message] - ${prettyFormating(
          body.options
        )} - $${body.budget}`,
        body: mailContent,
        bodyType: 'html',
      });

      msg.send(err => {
        if (err) {
          console.log(err);
          res.send('not ok');
        } else {
          console.log(`Mail sent ${Date.now()}_${body.email}`);
          res.send('ok');
        }
      });
    }
  }
});

app.get('/', (req, res) => {
  res.send('server working');
});

app.listen(port, function() {
  console.log(`App listening on PORT: ${port}`);
});
