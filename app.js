const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to mongo db
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database: ' + config.database);
});

//reporting DB error
mongoose.connection.on('error', (error) => {
  console.log('Database error: ' + error);
});



const app = express();
const port = 3000;

const users = require('./routes/users')

//CORS Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//router
app.use('/users', users);

//index route
app.get('/', (req , res) => {
  res.send('Invalid Endpoint');
});

//start server
app.listen(port, () =>{
  console.log('Server started on port ' + port);
});
