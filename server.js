const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  console.log('Received email:', email);

  fs.appendFile('subscribers.txt', `${email}\n`, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Subscription successful');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
