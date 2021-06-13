const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

const authRouter = require('./routes/authentication');
const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
require('dotenv').config(); 


app.use('/auth' , authRouter);
app.use('/user' , userRouter);
app.use('/book' , bookRouter);


module.exports = app;