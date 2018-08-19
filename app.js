const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
var https = require('https');
var fs = require('fs');
const app = express();
var options = {
  key: fs.readFileSync('certs/privkey.pem'),
  cert: fs.readFileSync('certs/cert.pem'),
  ca: fs.readFileSync('certs/chain.pem')
};
https.createServer(options, app).listen(6660);
mongoose.connect(config.database, { useMongoClient: true });

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});
 

const tournament = require('./routes/tournament');
// Port Number

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
//app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// Passport Middleware

app.use('/api/tournament', tournament);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server



