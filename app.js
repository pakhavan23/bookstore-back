const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const authRouter = require('./routes/authentication');
const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');

app.use(bodyParser.json());
require('dotenv').config(); 

app.use('/auth' , authRouter);
app.use('/user' , userRouter);
app.use('/book' , bookRouter);


module.exports = app;